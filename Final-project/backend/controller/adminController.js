const User = require("../models/User");
const Job = require("../models/Job");


exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const employers = await User.countDocuments({ role: "employer" });

    res.status(200).json({
      totalUsers,
      totalJobs,
      employers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};