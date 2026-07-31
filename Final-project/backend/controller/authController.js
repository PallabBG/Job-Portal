const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Resume = require("../models/Resume");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const geocoder = require("../server/utils/geocoder");

const sendOtpMail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
      <h2 style="color: #1e293b; margin-bottom: 8px;">OTP Verification</h2>
      <p style="color: #64748b; margin-bottom: 24px;">Use the following OTP to verify your account:</p>
      <div style="background: #3b82f6; color: white; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
        ${otp}
      </div>
      <p style="color: #94a3b8; font-size: 14px;">This OTP will expire in 5 minutes. If you didn't request this, please ignore this email.</p>
    </div>
  `;

  // Use Resend if API key is configured (for Render deployment)
  if (process.env.RESEND_API_KEY) {
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Job Portal <onboarding@resend.dev>",
      to: email,
      subject: "OTP Verification - Job Portal",
      html: htmlContent,
    });
    console.log("Resend result:", JSON.stringify(result));
    return;
  }

  // Fallback to nodemailer/Gmail (for local development)
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
    subject: "OTP Verification - Job Portal",
    html: htmlContent,
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
    console.log(`\n\n🔥 [RENDER BYPASS] REGISTER OTP for ${email} is: ${otp} 🔥\n\n`);

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

    if (user.isSuspended) {
      return res.status(403).json({ message: "Your account is suspended." });
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
    console.log(`\n\n🔥 [RENDER BYPASS] RESET PASSWORD OTP for ${email} is: ${otp} 🔥\n\n`);

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

    if (user.isSuspended) {
      return res.status(403).json({ message: "Your account is suspended." });
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
    console.log(`\n\n🔥 [RENDER BYPASS] LOGIN OTP for ${email} is: ${otp} 🔥\n\n`);

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

    if (user.isSuspended) {
      return res.status(403).json({ message: "Your account is suspended." });
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

      if (companyProfile !== undefined) {

        user.companyProfile = companyProfile;

        // Convert company location into coordinates
        if (companyProfile.location) {

          try {

            const result = await geocoder.geocode(
              companyProfile.location
            );

            if (result.length > 0) {

              user.companyProfile.latitude = result[0].latitude;
              user.companyProfile.longitude = result[0].longitude;

            }

          } catch (err) {

            console.log("Geocoding Error:", err.message);

          }

        }

      }

    }
    if (user.role === "admin") {
      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (location !== undefined) user.location = location;
      if (bio !== undefined) user.bio = bio;
    }

    await user.save();

    user.aiJobRecommendations = {
      jobs: [],
      generatedAt: null,
    };

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

    // Cloudinary URL of uploaded PDF
    const pdfUrl = req.file.path;

    // Fetch PDF
    const axios = require("axios");
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
    const pdfBuffer = Buffer.from(response.data);

    // Extract text
    const pdfData = await pdfParse(pdfBuffer);

    const extractedText = pdfData.text.trim();

    const resume = await Resume.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        resumeFile: pdfUrl,
        extractedText,
      },
      {
        new: true,
        upsert: true,
      }
    );

    user.aiJobRecommendations = {
      jobs: [],
      generatedAt: null,
    };

    await user.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resume: resume.resumeFile,
    });
  } catch (err) {
    console.error("Resume Upload Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


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

    if (resume.resumeFile.startsWith('http')) {
      // It's a Cloudinary URL, so we can just redirect
      return res.redirect(resume.resumeFile);
    } else {
      const filePath = path.join(
        __dirname,
        "../uploads/resumes",
        resume.resumeFile
      );
      
      const fs = require('fs');
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Resume file not found on the server. It may have been deleted. Please re-upload your resume." });
      }

      res.download(filePath);
    }
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

    user.companyProfile.companyLogo = req.file.path;

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

    user.profileImage = req.file.path;

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


exports.getPublicUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name role profileImage companyProfile"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};