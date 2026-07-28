const Application = require("../models/Application");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Notification = require("../models/Notification");
const socketInstance = require("../socket/socketInstance");
const { getUserSocket } = require("../socket/socket");
const User = require("../models/User");

exports.applyJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const applicantId = req.user.id;

        // Only job seekers can apply
        if (req.user.role !== "jobseeker") {
            return res.status(403).json({
                message: "Only job seekers can apply for jobs.",
            });
        }

        // Check job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
            });
        }

        // Check resume exists
        const resume = await Resume.findOne({
            user: applicantId,
        });

        if (!resume) {
            return res.status(400).json({
                message: "Please upload your resume before applying.",
            });
        }

        // Prevent duplicate applications
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: applicantId,
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job.",
            });
        }

        // Create application
        const application = await Application.create({
            job: job._id,
            applicant: applicantId,
            employer: job.employer,
            resume: resume._id,
        });
        await Notification.create({
            receiver: applicantId,
            title: "Application Submitted",
            message: `You have successfully applied for "${job.title}".`,
            type: "application",
            link: "/my-applications",
        });


        const io = socketInstance.getIO();

        const receiverSocket = getUserSocket(applicantId.toString());

        if (receiverSocket) {
            io.to(receiverSocket).emit("receiveNotification", {
                title: "Application Submitted",
                message: `You have successfully applied for "${job.title}".`,
            });
        }

        const applicant = await User.findById(applicantId);
        await Notification.create({
            receiver: job.employer,
            title: "New Job Application",
            message: `${applicant.name} applied for "${job.title}".`,
            type: "application",
            link: `/job/${job._id}/applicants`,
        });

        console.log("Employer ID:", job.employer);

        const employerSocket = getUserSocket(job.employer.toString());

        console.log("Employer Socket:", employerSocket);

        if (employerSocket) {
            io.to(employerSocket).emit("receiveNotification", {
                title: "New Job Application",
                message: `${applicant.name} applied for "${job.title}".`,
                link: `/job/${job._id}/applicants`,
            });
        }
        res.status(201).json({
            message: "Application submitted successfully.",
            application,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to apply for the job.",
        });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.user.id,
        })
            .populate("job")
            .populate(
                "employer",
                "name email profileImage companyProfile"
            )
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to fetch applications.",
        });
    }
};

exports.getApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
            });
        }

        // Only the owner or admin can view applicants
        if (
            req.user.role !== "admin" &&
            job.employer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Not authorized.",
            });
        }

        const applicants = await Application.find({
            job: req.params.jobId,
        })
            .populate("applicant", "name email phone profileImage")
            .populate("resume")
            .sort({ createdAt: -1 });

        res.status(200).json(applicants);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to fetch applicants.",
        });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
            });
        }

        const job = await Job.findById(application.job);

        if (
            req.user.role !== "admin" &&
            job.employer.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Not authorized.",
            });
        }

        application.status = status;
        application.statusUpdatedAt = new Date();
        await application.save();

        await Notification.create({
            receiver: application.applicant,
            title: "Application Status Updated",
            message: `Your application for "${job.title}" has been updated to "${status}".`,
            type: "status",
            link: "/my-applications",
        });
        const io = socketInstance.getIO();

        const receiverSocket = getUserSocket(application.applicant.toString());

        if (receiverSocket) {
            io.to(receiverSocket).emit("receiveNotification", {
                title: "Application Status Updated",
                message: `Your application for "${job.title}" has been updated to "${status}".`,
            });
        }

        res.status(200).json({
            message: "Application status updated.",
            application,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to update application.",
        });
    }
};

exports.getJobseekerDashboard = async (req, res) => {
    try {
        const applicantId = req.user.id;

        const appliedJobs = await Application.countDocuments({
            applicant: applicantId,
        });

        const pending = await Application.countDocuments({
            applicant: applicantId,
            status: {
                $in: ["Applied", "Under Review", "Shortlisted", "Interview"],
            },
        });

        const accepted = await Application.countDocuments({
            applicant: applicantId,
            status: "Selected",
        });

        const rejected = await Application.countDocuments({
            applicant: applicantId,
            status: "Rejected",
        });

        res.status(200).json({
            appliedJobs,
            pending,
            accepted,
            rejected,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to load dashboard.",
        });
    }
};