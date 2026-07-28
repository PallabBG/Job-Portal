const Application = require("../models/Application");
const AILog = require("../models/AILog");
const Job = require("../models/Job");
const {
  analyzeResume,
  resumeFeedback,
  generateJobRecommendations,
  generateInterviewQuestions,
} = require("../server/services/aiService");
const Resume = require("../models/Resume");

exports.resumeScreening = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("job")
      .populate("resume")
      .populate("applicant");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    console.log("========== AI AUTH ==========");
    console.log("Logged-in Employer :", req.user.id);
    console.log("Application Employer:", application.employer.toString());
    console.log("Job Employer:", application.job.employer.toString());

    if (
      req.user.role !== "admin" &&
      application.employer.toString() !== req.user.id
    ) {
      console.log("❌ Authorization Failed");

      return res.status(403).json({
        success: false,
        message: "You are not authorized to analyze this application.",
      });
    }

    console.log("✅ Authorization Passed");

    if (application.aiScreening?.analyzedAt) {
      return res.json({
        success: true,
        aiScreening: application.aiScreening,
        cached: true,
      });
    }

    const aiResponse = await analyzeResume(
      application.job,
      application.resume
    );


    application.aiScreening = {
      ...aiResponse.result,
      analyzedAt: new Date(),
    };

    await application.save();

    await AILog.create({
      user: application.applicant._id,
      application: application._id,
      job: application.job._id,
      type: "resume_screening",
      prompt: aiResponse.prompt,
      response: aiResponse.result,
      model: aiResponse.model,
      tokens: aiResponse.tokens,
      responseTime: aiResponse.responseTime,
    });

    return res.json({
      success: true,
      aiScreening: application.aiScreening,
    });
  } catch (error) {
    console.error("Resume Screening Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI Resume Screening failed.",
    });
  }
};




exports.getResumeFeedback = async (req, res) => {
  try {
    const userId = req.user.id;

    const resume = await Resume.findOne({ user: userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        success: false,
        message: "Resume text has not been extracted.",
      });
    }

    // ✅ Return cached feedback if available
    if (resume.aiFeedback?.analyzedAt) {
      return res.json({
        success: true,
        cached: true,
        aiFeedback: resume.aiFeedback,
      });
    }

    // 🤖 Analyze resume
    const feedback = await resumeFeedback(resume.extractedText);

    // Save to MongoDB
    resume.aiFeedback = {
      ...feedback,
      analyzedAt: new Date(),
    };

    await resume.save();

    res.json({
      success: true,
      cached: false,
      aiFeedback: resume.aiFeedback,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Resume feedback failed.",
    });
  }
};

exports.getJobRecommendations = async (req, res) => {
  try {
    const recommendations = await generateJobRecommendations(req.user.id);

    res.json({
      success: true,
      total: recommendations.length,
      recommendations,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate job recommendations.",
    });
  }
};


exports.generateInterviewQuestions = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const questions = await generateInterviewQuestions(job);

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Interview Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview questions.",
    });
  }
};