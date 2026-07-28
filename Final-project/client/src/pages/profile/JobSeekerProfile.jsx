import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfoCard from "../../components/profile/PersonalInfoCard";
import ResumeCard from "../../components/profile/ResumeCard";
import SkillsCard from "../../components/profile/SkillsCard";
import EducationCard from "../../components/profile/EducationCard";
import ExperienceCard from "../../components/profile/ExperienceCard";
import ProjectsCard from "../../components/profile/ProjectsCard";
import CertificationsCard from "../../components/profile/CertificationsCard";
import SocialLinksCard from "../../components/profile/SocialLinksCard";
import CareerPreferencesCard from "../../components/profile/CareerPreferencesCard";
import {useAuth} from "../../context/AuthContext"

const Profile = () => {
  const token = localStorage.getItem("token");

  const { user } = useAuth();

  console.log("Current User:", user);

  // ====================
  // Skills State
  // ====================
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // ====================
  // Education State
  // ====================
  const [education, setEducation] = useState([]);
  const [educationForm, setEducationForm] = useState({
    degree: "",
    college: "",
    university: "",
    startYear: "",
    endYear: "",
    cgpa: "",
  });
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  // ====================
  // Experience State
  // ====================
  const [experience, setExperience] = useState([]);

  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    company: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  });

  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);

  // ====================
  // Projects State
  // ====================
  const [projects, setProjects] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: [],
    github: "",
    liveDemo: "",
    startDate: "",
    endDate: "",
  });

  const [newTechnology, setNewTechnology] = useState("");

  const [showProjectForm, setShowProjectForm] = useState(false);

  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  // ====================
  // Certifications State
  // ====================
  const [certifications, setCertifications] = useState([]);

  const [certificationForm, setCertificationForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
  });

  const [showCertificationForm, setShowCertificationForm] = useState(false);

  const [editingCertificationIndex, setEditingCertificationIndex] =
    useState(null);

  // ====================
  // SocialLinks State
  // ====================
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
    leetcode: "",
    hackerrank: "",
    codechef: "",
    codeforces: "",
  });

  // ====================
  // careerPreferences State
  // ====================
  const [careerPreferences, setCareerPreferences] = useState({
    preferredRole: "",
    preferredLocation: "",
    expectedSalary: "",
    workMode: "",
    employmentType: "",
    willingToRelocate: false,
    noticePeriod: "",
  });


  // ====================
  // Profile State
  // ====================

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  // ====================
  // Resume State
  // ====================
  const [selectedResume, setSelectedResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState("");

  const calculateProfileCompletion = () => {
    let completed = 0;
    const totalFields = 12;

    if (form.name.trim()) completed++;
    if (form.phone.trim()) completed++;
    if (form.location.trim()) completed++;
    if (form.bio.trim()) completed++;
    if (form.email.trim()) completed++;
    if (resume) completed++;
    if (skills.length > 0) completed++;
    if (education.length > 0) completed++;
    if (experience.length > 0) completed++;
    if (projects.length > 0) completed++;
    if (certifications.length > 0) completed++;
    if (
      socialLinks.github ||
      socialLinks.linkedin ||
      socialLinks.portfolio ||
      socialLinks.leetcode ||
      socialLinks.hackerrank ||
      socialLinks.codechef ||
      socialLinks.codeforces
    ) {
      completed++;
    }

    return Math.round((completed / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // ====================
  // Profile Functions
  // ====================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
        bio: res.data.bio || "",
      });

      setResume(res.data.resume || "");
      setSkills(res.data.skills || []);
      setEducation(res.data.education || []);
      setExperience(res.data.experience || []);
      setProjects(res.data.projects || []);
      setCertifications(res.data.certifications || []);
      setSocialLinks(
        res.data.socialLinks || {
          github: "",
          linkedin: "",
          portfolio: "",
          leetcode: "",
          hackerrank: "",
          codechef: "",
          codeforces: "",
        },
      );

      setCareerPreferences(
        res.data.careerPreferences || {
          preferredRole: "",
          preferredLocation: "",
          expectedSalary: "",
          workMode: "",
          employmentType: "",
          willingToRelocate: false,
          noticePeriod: "",
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ====================
  // Effects
  // ====================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadProfile();
  }, []);

  // Save Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5500/api/auth/profile",
        {
          name: form.name,
          phone: form.phone,
          location: form.location,
          bio: form.bio,
          skills,
          education,
          experience,
          projects,
          certifications,
          socialLinks,
          careerPreferences,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadProfile();

      setEditing(false);

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  // ====================
  // Resume Functions
  // ====================
  const handleResumeUpload = async () => {
    if (!selectedResume) {
      return alert("Please select a PDF file.");
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("resume", selectedResume);

      const res = await axios.put(
        "http://localhost:5500/api/auth/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(res.data.message);

      setSelectedResume(null);

      await loadProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setUploading(false);
    }
  };
  const handleDownloadResume = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/auth/download-resume",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed");
    }
  };

  // ====================
  //  Functions
  // ====================

  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    if (skills.includes(skill)) {
      alert("Skill already exists.");
      return;
    }

    setSkills([...skills, skill]);

    setNewSkill("");
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // ====================
  // Education Functions
  // ====================
  const handleAddEducation = () => {
    if (
      !educationForm.degree ||
      !educationForm.college ||
      !educationForm.university
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingEducationIndex !== null) {
      const updatedEducation = [...education];

      updatedEducation[editingEducationIndex] = educationForm;

      setEducation(updatedEducation);

      setEditingEducationIndex(null);
    } else {
      setEducation([...education, educationForm]);
    }

    setEducationForm({
      degree: "",
      college: "",
      university: "",
      startYear: "",
      endYear: "",
      cgpa: "",
    });

    setShowEducationForm(false);
  };
  const handleEditEducation = (index) => {
    setEducationForm(education[index]);

    setEditingEducationIndex(index);

    setShowEducationForm(true);
  };
  const handleDeleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);

    setEducation(updatedEducation);

    if (editingEducationIndex === index) {
      setEditingEducationIndex(null);
    }
  };

  // ====================
  // Experience Functions
  // ====================
  const handleAddExperience = () => {
    if (
      !experienceForm.jobTitle ||
      !experienceForm.company ||
      !experienceForm.startDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingExperienceIndex !== null) {
      const updatedExperience = [...experience];

      updatedExperience[editingExperienceIndex] = experienceForm;

      setExperience(updatedExperience);

      setEditingExperienceIndex(null);
    } else {
      setExperience([...experience, experienceForm]);
    }

    setExperienceForm({
      jobTitle: "",
      company: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    });

    setShowExperienceForm(false);
  };

  const handleEditExperience = (index) => {
    setExperienceForm(experience[index]);

    setEditingExperienceIndex(index);

    setShowExperienceForm(true);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);

    setExperience(updatedExperience);

    if (editingExperienceIndex === index) {
      setEditingExperienceIndex(null);
    }
  };

  // ====================
  // Projects Functions
  // ====================
  const handleAddTechnology = () => {
    if (!newTechnology.trim()) return;

    if (projectForm.technologies.includes(newTechnology.trim())) return;

    setProjectForm({
      ...projectForm,
      technologies: [...projectForm.technologies, newTechnology.trim()],
    });

    setNewTechnology("");
  };

  const handleDeleteTechnology = (index) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter((_, i) => i !== index),
    });
  };

  const handleAddProject = () => {
    if (!projectForm.title || !projectForm.description) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingProjectIndex !== null) {
      const updatedProjects = [...projects];

      updatedProjects[editingProjectIndex] = projectForm;

      setProjects(updatedProjects);

      setEditingProjectIndex(null);
    } else {
      setProjects([...projects, projectForm]);
    }

    setProjectForm({
      title: "",
      description: "",
      technologies: [],
      github: "",
      liveDemo: "",
      startDate: "",
      endDate: "",
    });

    setNewTechnology("");

    setShowProjectForm(false);
  };

  const handleEditProject = (index) => {
    setProjectForm(projects[index]);

    setEditingProjectIndex(index);

    setShowProjectForm(true);

    setNewTechnology("");
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);

    setProjects(updatedProjects);

    if (editingProjectIndex === index) {
      setEditingProjectIndex(null);
    }
  };

  // ====================
  // Certification Functions
  // ====================
  const handleAddCertification = () => {
    if (
      !certificationForm.title ||
      !certificationForm.issuer ||
      !certificationForm.issueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingCertificationIndex !== null) {
      const updatedCertifications = [...certifications];

      updatedCertifications[editingCertificationIndex] = certificationForm;

      setCertifications(updatedCertifications);

      setEditingCertificationIndex(null);
    } else {
      setCertifications([...certifications, certificationForm]);
    }

    setCertificationForm({
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
    });

    setShowCertificationForm(false);
  };

  const handleEditCertification = (index) => {
    setCertificationForm(certifications[index]);

    setEditingCertificationIndex(index);

    setShowCertificationForm(true);
  };

  const handleDeleteCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);

    setCertifications(updatedCertifications);

    if (editingCertificationIndex === index) {
      setEditingCertificationIndex(null);
    }
  };

  // ====================
  // SocialLinks Functions
  // ====================
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Profile Header */}
        <ProfileHeader
          editing={editing}
          setEditing={setEditing}
          form={form}
          profileCompletion={profileCompletion}
          loadProfile={loadProfile}
        />

        {/* Personal Info Card */}

        <PersonalInfoCard
          editing={editing}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Card */}
          <ResumeCard
            setSelectedResume={setSelectedResume}
            resume={resume}
            uploading={uploading}
            handleResumeUpload={handleResumeUpload}
            handleDownloadResume={handleDownloadResume}
            selectedResume={selectedResume}
          />

          <SkillsCard
            editing={editing}
            skills={skills}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            handleAddSkill={handleAddSkill}
            handleDeleteSkill={handleDeleteSkill}
          />

          <EducationCard
            editing={editing}
            education={education}
            educationForm={educationForm}
            setEducationForm={setEducationForm}
            showEducationForm={showEducationForm}
            setShowEducationForm={setShowEducationForm}
            handleAddEducation={handleAddEducation}
            handleEditEducation={handleEditEducation}
            handleDeleteEducation={handleDeleteEducation}
          />

          <CertificationsCard
            editing={editing}
            certifications={certifications}
            certificationForm={certificationForm}
            setCertificationForm={setCertificationForm}
            showCertificationForm={showCertificationForm}
            setShowCertificationForm={setShowCertificationForm}
            handleAddCertification={handleAddCertification}
            handleEditCertification={handleEditCertification}
            handleDeleteCertification={handleDeleteCertification}
            editingCertificationIndex={editingCertificationIndex}
          />
          <ExperienceCard
            editing={editing}
            experience={experience}
            experienceForm={experienceForm}
            setExperienceForm={setExperienceForm}
            showExperienceForm={showExperienceForm}
            setShowExperienceForm={setShowExperienceForm}
            handleAddExperience={handleAddExperience}
            handleEditExperience={handleEditExperience}
            handleDeleteExperience={handleDeleteExperience}
            editingExperienceIndex={editingExperienceIndex}
          />

          <ProjectsCard
            editing={editing}
            projects={projects}
            projectForm={projectForm}
            setProjectForm={setProjectForm}
            newTechnology={newTechnology}
            setNewTechnology={setNewTechnology}
            showProjectForm={showProjectForm}
            setShowProjectForm={setShowProjectForm}
            handleAddProject={handleAddProject}
            handleEditProject={handleEditProject}
            handleDeleteProject={handleDeleteProject}
            editingProjectIndex={editingProjectIndex}
            handleAddTechnology={handleAddTechnology}
            handleDeleteTechnology={handleDeleteTechnology}
          />

          <SocialLinksCard
            editing={editing}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />

          <CareerPreferencesCard
            editing={editing}
            careerPreferences={careerPreferences}
            setCareerPreferences={setCareerPreferences}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
