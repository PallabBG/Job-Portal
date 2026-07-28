const job = require("../models/Job");
const Application = require("../models/Application");
const { calculateJobMatch } = require("../server/utils/jobMatcher");
const User = require("../models/User");
const geocoder = require("../server/utils/geocoder");
const { getDistance } = require("geolib");
// add job
exports.addjob = async (req, res) => {
  try {
    let {
      title,
      salary,
      category,
      description,

      jobType,
      experienceLevel,
      skills,
      vacancies,
      deadline,
    } = req.body;


    if (typeof skills === "string") {
      skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    const newjob = await job.create({
      employer: req.user.id,

      title,
      salary,
      category,
      description,

      jobType,
      experienceLevel,
      skills,
      vacancies,
      deadline,
    });

    const User = require("../models/User");

    await User.updateMany(
      {
        role: "jobseeker",
      },
      {
        $set: {
          aiJobRecommendations: {
            jobs: [],
            generatedAt: null,
          },
        },
      }
    );

    res.status(201).json({
      message: "Job added successfully",
      newjob,
    });
  } catch (err) {
    res.status(400).json({
      message: "Job not added",
      err,
    });
  }
};

// view all job
exports.viewjob = async (req, res) => {
  try {
    const {
      category,
      location,
      jobType,
      experienceLevel,
      skills,
    } = req.query;

    const filter = {
      status: "Open",
    };

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    if (skills) {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim());

      filter.skills = {
        $in: skillsArray,
      };
    }

    const jobs = await job
      .find(filter)
      .populate({
        path: "employer",
        select: `
    name
    email
    profileImage
    companyProfile
  `,
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

// single view
exports.singeljob = async (req, res) => {
  try {
    const singleJob = await job
      .findById(req.params.id)
      .populate({
        path: "employer",
        select: `
          name
          email
          profileImage
          companyProfile
        `,
      });

    if (!singleJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // If a logged-in jobseeker is viewing the job,
    // calculate the real AI match score.
    if (req.user?.role === "jobseeker") {
      const user = await User.findById(req.user.id);

      if (user) {
        const {
          matchScore,
          matchedSkills,
          missingSkills,
          reasons,
        } = calculateJobMatch(user, singleJob);

        const jobData = singleJob.toObject();

        jobData.matchScore = matchScore;
        jobData.matchedSkills = matchedSkills;
        jobData.missingSkills = missingSkills;
        jobData.reasons = reasons;

        return res.status(200).json(jobData);
      }
    }

    res.status(200).json(singleJob);
  } catch (err) {
    res.status(400).json({
      message: "Cannot fetch single job",
      err,
    });
  }
};

// update
exports.updatejob = async (req, res) => {
  try {
    let {
      title,
      salary,
      category,
      description,
      jobType,
      experienceLevel,
      skills,
      vacancies,
      deadline,
    } = req.body;

    if (typeof skills === "string") {
      skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    const oldjob = await job.findById(req.params.id);

    if (!oldjob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      oldjob.employer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized to edit this job",
      });
    }

    const updatedJob = await job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        salary,
        category,
        description,
        jobType,
        experienceLevel,
        skills,
        vacancies,
        deadline,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: "job not updated", err });
  }
};

// delete
exports.deletejob = async (req, res) => {
  try {
    const oldjob = await job.findById(req.params.id);

    if (!oldjob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      oldjob.employer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this job",
      });
    }

    await job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "job deleted" });
  } catch (err) {
    res.status(400).json({ message: "job not deleted", err });
  }
};

// search
exports.searchjob = async (req, res) => {
  try {
    const {
      keyword,
      category,
      location,
      jobType,
      experience,
      salary,
      sort,
    } = req.query;

    let query = {};

    // Keyword Search
    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Location Filter
    if (location) {
      query["employer.companyProfile.location"] = {
        $regex: location,
        $options: "i",
      };
    }

    // Job Type Filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Experience Filter
    if (experience) {
      query.experienceLevel = experience;
    }

    // Salary Filter (LPA)
    if (salary) {
      switch (salary) {
        case "0-3 LPA":
          query.salary = { $lte: 3 };
          break;

        case "3-6 LPA":
          query.salary = {
            $gte: 3,
            $lte: 6,
          };
          break;

        case "6-10 LPA":
          query.salary = {
            $gte: 6,
            $lte: 10,
          };
          break;

        case "10+ LPA":
          query.salary = {
            $gte: 10,
          };
          break;

        default:
          break;
      }
    }

    let jobs = job.find(query);

    switch (sort) {
      case "salaryHigh":
        jobs = jobs.sort({ salary: -1 });
        break;

      case "salaryLow":
        jobs = jobs.sort({ salary: 1 });
        break;

      case "oldest":
        jobs = jobs.sort({ createdAt: 1 });
        break;

      default:
        jobs = jobs.sort({ createdAt: -1 });
    }

    const result = await jobs.populate({
      path: "employer",
      select: `
        name
        email
        profileImage
        companyProfile
      `,
    });

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({
      message: "Search failed",
      err,
    });
  }
};

exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await job
      .find({
        employer: req.user.id,
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    const jobsWithCounts = await Promise.all(
      jobs.map(async (j) => {
        const applicantCount = await Application.countDocuments({
          job: j._id,
        });

        return {
          ...j,
          applicantCount,
        };
      })
    );

    res.status(200).json(jobsWithCounts);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch employer jobs.",
    });
  }
};

exports.getEmployerDashboard = async (req, res) => {
  try {
    console.log("Employer:", req.user.id);

    const postedJobs = await job.countDocuments({
      employer: req.user.id,
    });

    console.log("Posted Jobs:", postedJobs);

    const jobs = await job.find({
      employer: req.user.id,
    });

    console.log("Jobs:", jobs);

    const jobIds = jobs.map((j) => j._id);

    console.log("Job IDs:", jobIds);

    const applicationsReceived = await Application.countDocuments({
      job: { $in: jobIds },
    });

    console.log("Applications:", applicationsReceived);

    res.json({
      postedJobs,
      applicationsReceived,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Dashboard error",
    });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const jobData = await job.findById(req.params.id);

    if (!jobData) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      jobData.employer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    jobData.status = req.body.status;

    await jobData.save();

    res.json({
      message: "Job status updated",
      job: jobData,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


exports.getNearbyJobs = async (req, res) => {
  try {

    const {
      latitude,
      longitude,
      radius = 50, // default 50 km
    } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    const jobs = await job.find({
      status: "Open",
    }).populate({
      path: "employer",
      select: `
        name
        email
        profileImage
        companyProfile
      `,
    });

    const nearbyJobs = [];

    for (const j of jobs) {

      const company = j.employer?.companyProfile;

      if (!company?.location) continue;

      // Old employers
      if (
        company.latitude == null ||
        company.longitude == null
      ) {

        try {

          const result = await geocoder.geocode(
            company.location
          );

          if (result.length > 0) {

            company.latitude = result[0].latitude;
            company.longitude = result[0].longitude;

            await j.employer.save();

          }

        } catch (err) {
          console.log(err.message);
          continue;
        }

      }

      const distance = getDistance(
        {
          latitude,
          longitude,
        },
        {
          latitude: company.latitude,
          longitude: company.longitude,
        }
      );

      const distanceKm = Number((distance / 1000).toFixed(1));

      // Skip jobs outside the selected radius
      if (distanceKm > radius) continue;

      nearbyJobs.push({
        ...j.toObject(),
        distance: distanceKm,
      });

    }

    nearbyJobs.sort(
      (a, b) => a.distance - b.distance
    );

    res.json(nearbyJobs);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
};