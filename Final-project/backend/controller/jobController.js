const job = require("../models/Job");

// add job
exports.addjob = async (req, res) => {
  try {
    const { title, company, location, salary, category, description } = req.body;

    const imageFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const newjob = await job.create({
      title,
      company,
      location,
      salary,
      category,
      description,
      images: imageFiles,
    });

    res.status(201).json({ message: "job added successfully", newjob });
  } catch (err) {
    res.status(400).json({ message: "job not added successfully", err });
  }
};

// view all job
exports.viewjob = async (req, res) => {
  try {
    const jobs = await job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ message: "cannot fetch jobs", err });
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
      return res.status(400).json({ message: "job not found" });
    }

    let updatedimages = oldjob.images;

    if (req.files && req.files.length > 0) {
      updatedimages = req.files.map((file) => file.filename);
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
    await job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "job deleted" });
  } catch (err) {
    res.status(400).json({ message: "job not deleted", err });
  }
};

// search
exports.searchjob = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const jobs = await job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ message: "search failed", err });
  }
};