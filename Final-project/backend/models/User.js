const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "jobseeker", "employer"],
      default: "jobseeker",
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpire: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },

    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpire: {
      type: Date,
      default: null,
    },
    loginOtp: {
      type: String,
    },

    loginOtpExpire: {
      type: Date,
    },
    phone: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    },
    skills: {
      type: [String],
      default: [],
    },
    education: [
      {
        degree: {
          type: String,
          default: "",
        },
        college: {
          type: String,
          default: "",
        },
        university: {
          type: String,
          default: "",
        },
        startYear: {
          type: String,
          default: "",
        },
        endYear: {
          type: String,
          default: "",
        },
        cgpa: {
          type: String,
          default: "",
        },
      },
    ],
    experience: [
      {
        jobTitle: {
          type: String,
          default: "",
        },
        company: {
          type: String,
          default: "",
        },
        location: {
          type: String,
          default: "",
        },
        employmentType: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        technologies: {
          type: [String],
          default: [],
        },
        github: {
          type: String,
          default: "",
        },
        liveDemo: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
      },
    ],
    certifications: [
      {
        title: {
          type: String,
          default: "",
        },
        issuer: {
          type: String,
          default: "",
        },
        issueDate: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: String,
          default: "",
        },
        credentialId: {
          type: String,
          default: "",
        },
        credentialUrl: {
          type: String,
          default: "",
        },
      },
    ],
    socialLinks: {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
      leetcode: {
        type: String,
        default: "",
      },
      hackerrank: {
        type: String,
        default: "",
      },
      codechef: {
        type: String,
        default: "",
      },
      codeforces: {
        type: String,
        default: "",
      },
    },
    careerPreferences: {
      preferredRole: {
        type: String,
        default: "",
      },
      preferredLocation: {
        type: String,
        default: "",
      },
      expectedSalary: {
        type: String,
        default: "",
      },
      workMode: {
        type: String,
        default: "",
      },
      employmentType: {
        type: String,
        default: "",
      },
      willingToRelocate: {
        type: Boolean,
        default: false,
      },
      noticePeriod: {
        type: String,
        default: "",
      },
    },

    companyProfile: {
      companyName: {
        type: String,
        default: "",
      },
      companyLogo: {
        type: String,
        default: "",
      },
      industry: {
        type: String,
        default: "",
      },
      companySize: {
        type: String,
        default: "",
      },
      foundedYear: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },

      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
      about: {
        type: String,
        default: "",
      },
      hrName: {
        type: String,
        default: "",
      },
      hrEmail: {
        type: String,
        default: "",
      },
      hrPhone: {
        type: String,
        default: "",
      },
    },

    aiJobRecommendations: {
      jobs: [
        {
          jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
          },

          matchScore: Number,

          matchedSkills: [String],

          missingSkills: [String],

          reasons: [String],

          aiSummary: String,
        },
      ],

      generatedAt: Date,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);