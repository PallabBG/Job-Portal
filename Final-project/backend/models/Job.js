const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Contract",
        "Remote",
        "Hybrid",
      ],
      default: "Full-Time",
    },

    experienceLevel: {
      type: String,
      enum: [
        "Fresher",
        "Junior",
        "Mid-Level",
        "Senior",
      ],
      default: "Fresher",
    },

    skills: {
      type: [String],
      default: [],
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    deadline: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Open",
        "Closed",
      ],
      default: "Open",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);