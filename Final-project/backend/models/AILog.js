const mongoose = require("mongoose");

const aiLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    type: {
      type: String,
      enum: [
        "resume_screening",
        "resume_feedback",
        "job_recommendation",
        "interview_questions",
        "career_chat",
      ],
      required: true,
    },

    prompt: {
      type: String,
    },

    response: {
      type: mongoose.Schema.Types.Mixed,
    },

    model: {
      type: String,
      default: () => process.env.GROQ_MODEL || "llama-3.1-8b-instant",
    },

    tokens: {
      type: Number,
      default: 0,
    },

    responseTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AILog", aiLogSchema);