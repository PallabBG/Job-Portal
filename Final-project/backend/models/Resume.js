const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    resumeFile: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },
    aiFeedback: {
      atsScore: Number,

      overallRating: String,

      summary: String,

      strengths: [String],

      weaknesses: [String],

      missingSections: [String],

      grammarSuggestions: [String],

      formatSuggestions: [String],

      careerSuggestions: [String],

      analyzedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);