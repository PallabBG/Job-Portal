const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Resume = require("../models/Resume");

const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "jobseeker", "employer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUser && !existingUser.isVerified) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.role = role;
      existingUser.otp = otp;
      existingUser.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
      await existingUser.save();
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        otp,
        otpExpire: new Date(Date.now() + 5 * 60 * 1000),
      });
    }

    await sendOtpMail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully. Please verify your email.",
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({
      message: error.message || "Register failed",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpire || user.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP expired. Register again." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OTP verification failed",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Login failed",
    });
  }

};

// 🔹 SEND OTP
exports.sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // ✅ SEND EMAIL (same as register)
    await sendOtpMail(email, otp);

    res.json({ message: "OTP sent successfully to your email" });

  } catch (err) {
    console.error("RESET OTP ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

// 🔹 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp || user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.sendLoginOtp = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not registered"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.loginOtp = otp;
    user.loginOtpExpire = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOtpMail(email, otp);

    res.json({
      message: "OTP sent successfully."
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
};


exports.verifyLoginOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (
      user.loginOtp !== otp ||
      user.loginOtpExpire < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid or Expired OTP"
      });
    }

    user.loginOtp = null;
    user.loginOtpExpire = null;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({

      message: "Login Successful",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const resume = await Resume.findOne({
      user: user._id,
    });
    if (user.role === "jobseeker") {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        phone: user.phone,
        location: user.location,
        bio: user.bio,

        resume: resume ? resume.resumeFile : "",

        skills: user.skills,
        education: user.education,
        experience: user.experience,
        projects: user.projects,
        certifications: user.certifications,
        socialLinks: user.socialLinks,
        careerPreferences: user.careerPreferences,
      });
    }

    if (user.role === "employer") {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyProfile: user.companyProfile,
      });
    }

    if (user.role === "admin") {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.updateProfile = async (req, res) => {

  try {

    const {
      name,
      phone,
      location,
      bio,
      skills,
      education,
      experience,
      projects,
      certifications,
      socialLinks,
      careerPreferences,
      companyProfile,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    if (user.role === "jobseeker") {
      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (location !== undefined) user.location = location;
      if (bio !== undefined) user.bio = bio;

      if (skills !== undefined) user.skills = skills;
      if (education !== undefined) user.education = education;
      if (experience !== undefined) user.experience = experience;
      if (projects !== undefined) user.projects = projects;
      if (certifications !== undefined) user.certifications = certifications;
      if (socialLinks !== undefined) user.socialLinks = socialLinks;
      if (careerPreferences !== undefined)
        user.careerPreferences = careerPreferences;
    }

    if (user.role === "employer") {
      if (companyProfile !== undefined)
        user.companyProfile = companyProfile;
    }

    if (user.role === "admin") {
      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (location !== undefined) user.location = location;
      if (bio !== undefined) user.bio = bio;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user
    });

  } catch (err) {
    console.error("Update Profile Error:", err);

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }

};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resume = await Resume.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        resumeFile: req.file.filename,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      message: "Resume uploaded successfully",
      resume: resume.resumeFile,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const path = require("path");

exports.downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads/resumes",
      resume.resumeFile
    );

    res.download(filePath);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.uploadCompanyLogo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    user.companyProfile.companyLogo =
      `/uploads/companyLogo/${req.file.filename}`;

    await user.save();

    res.json({
      success: true,
      companyLogo: user.companyProfile.companyLogo,
      message: "Company logo uploaded successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profileImage = `/uploads/profileImage/${req.file.filename}`;

    await user.save();

    res.json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Upload Profile Image Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getCandidateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .select("-password -otp -resetOtp -loginOtp");

        if (!user) {
            return res.status(404).json({
                message: "Candidate not found",
            });
        }

        const resume = await Resume.findOne({
            user: user._id,
        });

        res.json({
            user,
            resume,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
};