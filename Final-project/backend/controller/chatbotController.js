const Groq = require("groq-sdk");
const Job = require("../models/Job");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

exports.jobchatbot = async (req,res)=>{
    try {
        const {message} = req.body;
        const jobs = await Job.find().limit(30);
        if(jobs.length === 0) {
            return res.status(200).json({
                reply:"NO COURSE FOUND,PLEASE ADD COURSE..",
            });
        }
        
        const jobList = jobs.map((job,index)=>{
            return `
            
            ${index+1}. job title: ${job.title}
            company: ${job.company}
            location:${job.location}
            salary:${job.salary}
            category: ${job.category}
            Description:${job.description}
         `;
    })
    .join("\n");

    const response = await groq.chat.completions.create({
        model:"llama3-8b-8192",
        messages:[
            {
                role:"system",
                content:`
                available jobs:
                ${jobList}
                `,

            },
            {
                role:"user",
                content:message,
            },
        ],
    });
    res.json({
        reply:response.choices[0].message.content,
    });
        
    } catch(err){
        console.error(err);
    }
};