const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const employers = await User.countDocuments({ role: "employer" });
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