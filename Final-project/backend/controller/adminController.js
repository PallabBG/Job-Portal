const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const { getUserSocket } = require("../socket/socket");
const socketInstance = require("../socket/socketInstance");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const employers = await User.countDocuments({ role: "employer" });
    const jobseekers = await User.countDocuments({ role: "jobseeker" });
    const totalApplications = await Application.countDocuments();

    // Fetch recent users (last 5)
    const recentUsers = await User.find()
      .select("name email role profileImage createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch recent jobs (last 5)
    const recentJobs = await Job.find()
      .select("title company category status createdAt")
      .populate("employer", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate monthly growth for current year
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    
    // Aggregate jobs by month
    const jobsByMonth = await Job.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } }
    ]);
    
    // Aggregate users by month
    const usersByMonth = await User.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } }
    ]);

    const monthlyGrowth = Array(12).fill(0).map((_, i) => {
      const monthUsers = usersByMonth.find(m => m._id === i + 1)?.count || 0;
      const monthJobs = jobsByMonth.find(m => m._id === i + 1)?.count || 0;
      return { month: i + 1, users: monthUsers, jobs: monthJobs };
    });

    res.status(200).json({
      totalUsers,
      totalJobs,
      employers,
      jobseekers,
      totalApplications,
      recentUsers,
      recentJobs,
      monthlyGrowth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.isSuspended = !user.isSuspended;
    await user.save();
    
    if (user.isSuspended) {
      const receiverSocketId = getUserSocket(user._id.toString());
      if (receiverSocketId) {
        const io = socketInstance.getIO();
        io.to(receiverSocketId).emit("accountSuspended");
      }
    }
    
    res.status(200).json({ message: `User ${user.isSuspended ? 'suspended' : 'unsuspended'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.isVerified = true;
    await user.save();
    
    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title")
      .populate("applicant", "name email profileImage")
      .populate("employer", "name email companyProfile")
      .populate("resume")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};