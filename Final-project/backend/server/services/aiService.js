const Groq = require("groq-sdk");
const Job = require("../../models/Job");
const User = require("../../models/User");
const Resume = require("../../models/Resume");
const { calculateJobMatch } = require("../utils/jobMatcher");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

async function analyzeResume(job, resume) {
  const prompt = `
You are an expert Applicant Tracking System (ATS).

Your task is to compare a candidate's resume with the job description.

Evaluate:

1. Overall Match Score (0-100)
2. Recommendation
3. Candidate Strengths
4. Missing Skills
5. Experience Match
6. Education Match
7. Short Summary

IMPORTANT:
Return ONLY valid JSON.
Do not write markdown.
Do not explain anything.

JSON format:

{
  "score": 0,
  "recommendation": "",
  "strengths": [],
  "missingSkills": [],
  "experienceMatch": "",
  "educationMatch": "",
  "summary": ""
}

======================
JOB TITLE
${job.title}

JOB DESCRIPTION
${job.description}

======================
RESUME

${resume.extractedText}
`;

  const startTime = Date.now();

  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an ATS Resume Screening AI. Return JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const responseTime = Date.now() - startTime;

  return {
    result: JSON.parse(completion.choices[0].message.content),
    prompt,
    model: MODEL,
    tokens: completion.usage?.total_tokens || 0,
    responseTime,
  };
}

async function resumeFeedback(resumeText) {
  const prompt = `
You are an expert ATS (Applicant Tracking System), HR Recruiter, and Career Coach.

Analyze the following resume and return ONLY valid JSON.

Resume:
"""
${resumeText}
"""

Return JSON in exactly this format:

{
  "atsScore": 0,
  "overallRating": "",
  "summary": "",

  "strengths": [],
  "weaknesses": [],

  "missingSections": [],

  "grammarSuggestions": [],

  "formatSuggestions": [],

  "careerSuggestions": []
}

Rules:

- atsScore must be between 0 and 100.
- overallRating should be one of:
  "Excellent"
  "Good"
  "Average"
  "Needs Improvement"

- strengths should contain 3-6 items.
- weaknesses should contain 3-6 items.
- missingSections should contain missing resume sections if any.
- grammarSuggestions should contain writing improvements.
- formatSuggestions should contain formatting improvements.
- careerSuggestions should contain practical career advice.

Return ONLY JSON.
`;

  const completion = await groq.chat.completions.create({
    model: MODEL,

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.2,

    response_format: {
      type: "json_object",
    },
  });

  return JSON.parse(
    completion.choices[0].message.content
  );
};



async function generateJobRecommendations(userId) {

  const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days


  const user = await User.findById(userId);
  // if (
  //   user.aiJobRecommendations?.jobs?.length &&
  //   user.aiJobRecommendations.generatedAt &&
  //   Date.now() -
  //   new Date(user.aiJobRecommendations.generatedAt).getTime() <
  //   CACHE_DURATION
  // ) {
  //   console.log("Returning cached AI recommendations...");

  //   console.log("AI Recommendation Cache Hit");

  //   return user.aiJobRecommendations.jobs;
  // }
  console.log("User:", user);

  if (!user) {
    throw new Error("User not found.");
  }

  const resume = await Resume.findOne({ user: userId });

  const jobs = await Job.find({
    status: "Open",
  })
    .populate({
      path: "employer",
      select: `
    name
    email
    profileImage
    companyProfile
  `,
    })
    .lean();

  console.log("Total Jobs:", jobs.length);


  const userSkills = (user.skills || []).map((skill) =>
    skill.toLowerCase().trim()
  );

  const recommendations = await Promise.all(
    jobs.map(async (job) => {

      const {
        matchScore,
        matchedSkills,
        missingSkills,
        reasons,
      } = calculateJobMatch(user, job);

      return {
        _id: job._id,

        title: job.title,

        salary: job.salary,

        category: job.category,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,

        description: job.description,

        employer: job.employer,

        company:
          job.employer?.companyProfile?.companyName || "",

        location:
          job.employer?.companyProfile?.location || "",

        companyLogo:
          job.employer?.companyProfile?.companyLogo || "",

        industry:
          job.employer?.companyProfile?.industry || "",

        matchScore,

        matchedSkills,

        missingSkills,

        reasons,

        aiSummary: "",
      };
    })
  )
  recommendations.sort(
    (a, b) => b.matchScore - a.matchScore
  );


  const topRecommendations = recommendations.filter(job => job.matchScore >= 40) // optional
    .slice(0, 10);

  await Promise.all(
    topRecommendations.slice(0, 5).map(async (job) => {
      try {
        const prompt = `
You are an AI Career Advisor.

Candidate Skills:
${userSkills.join(", ")}

Job Title:
${job.title}

Company:
${job.employer?.companyProfile?.companyName}

Required Skills:
${job.matchedSkills
            .concat(job.missingSkills)
            .join(", ")}

Matched Skills:
${job.matchedSkills.join(", ")}

Missing Skills:
${job.missingSkills.join(", ")}

Write a professional recommendation in 2-3 sentences.

Don't use markdown.
Keep it under 60 words.
`;

        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        job.aiSummary =
          completion.choices[0]?.message?.content || "";
      } catch (err) {
        job.aiSummary = "";
      }
    })
  );

  user.aiJobRecommendations = {
    jobs: recommendations,

    generatedAt: new Date(),
  };
  await user.save();

  return topRecommendations;
};

async function generateInterviewQuestions(job) {
  const prompt = `
You are an expert Technical Interviewer and HR Manager.

Generate interview questions for the following job.

Job Title:
${job.title}

Category:
${job.category}

Experience Level:
${job.experienceLevel}

Required Skills:
${(job.skills || []).join(", ")}

Job Description:
${job.description}

IMPORTANT:
Return ONLY valid JSON.

{
  "technical": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ],
  "hr": [
    "...",
    "...",
    "..."
  ],
  "coding": [
    "...",
    "..."
  ]
}

Rules:

- Generate exactly 5 technical questions.
- Generate exactly 3 HR questions.
- Generate 2 coding questions only if the job requires programming.
- Do not include markdown.
- Do not include explanations.
- Return valid JSON only.
`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an expert interviewer. Return JSON only.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(
    completion.choices[0].message.content
  );
}





module.exports = {
  analyzeResume,
  resumeFeedback,
  generateJobRecommendations,
  generateInterviewQuestions,
};