const job = require("../models/Job");
const Application = require("../models/Application");

// add job
exports.addjob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      category,
      description,
    } = req.body;

    const imageFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const newjob = await job.create({
      employer: req.user.id,

      title,
      company,
      location,
      salary,
      category,
      description,

      images: imageFiles,
    });

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
    const jobs = await job.find().sort({ createdAt: -1 });

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
    const { id } = req.params;

    const singleJob = await job.findById(id);

    res.status(200).json(singleJob);
  } catch (err) {
    res.status(400).json({ message: "cannot fetch single job", err });
  }
};

// update
exports.updatejob = async (req, res) => {
  try {
    const { title, company, location, salary, category, description } = req.body;

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
        company,
        location,
        salary,
        category,
        description,
        images: updatedimages,
      },
      { new: true }
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
      sort,
    } = req.query;

    let query = {};

    // Keyword Search
    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Location Filter
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    let jobs = job.find(query);

    // Sorting
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
        jobs = jobs.sort({
          createdAt: -1,
        });
    }

    const result = await jobs;

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
    const jobs = await job.find({ employer: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
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