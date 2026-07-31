import InfoCard from "../components/profile/InfoCard";
import DetailModal from "../components/profile/DetailModal";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserAPI from "../api/userApi";

const CandidateProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("");
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await UserAPI.get(`/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCandidate(res.data.user);
      setResume(res.data.resume);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const openModal = (title, type) => {
    setModalTitle(title);
    setModalType(type);
    setModalOpen(true);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold dark:bg-slate-900 dark:text-white">
        Loading Candidate...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl dark:bg-slate-900">
        Candidate not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Link to={-1} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          ← Back
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg mt-5 p-8 border border-transparent dark:border-slate-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left */}

            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={
                  candidate.profileImage
                    ? candidate.profileImage?.startsWith('http') ? candidate.profileImage : `https://job-portal-v3nf.onrender.com${candidate.profileImage}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        candidate.name,
                      )}&background=2563eb&color=fff&size=256`
                }
                alt={candidate.name}
                className="w-44 h-44 rounded-full object-cover border-4 border-blue-600 dark:border-blue-500 shadow-lg"
              />

              <h1 className="text-3xl font-bold mt-5 text-center dark:text-white">
                {candidate.name}
              </h1>

              <p className="text-gray-500 dark:text-gray-400 capitalize mt-2">{candidate.role}</p>

              {resume?.resumeFile && (
                <a
                  href={resume.resumeFile?.startsWith('http') ? resume.resumeFile : `https://job-portal-v3nf.onrender.com/uploads/resumes/${resume.resumeFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Download Resume
                </a>
              )}
            </div>

            {/* Right */}

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Contact Information</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-semibold break-all dark:text-gray-200">
                    {candidate.email || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-semibold dark:text-gray-200">{candidate.phone || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-semibold dark:text-gray-200">{candidate.location || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400">Role</p>
                  <p className="font-semibold capitalize dark:text-gray-200">{candidate.role}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">About</h2>

                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5 leading-7 dark:text-gray-300">
                  {candidate.bio ? candidate.bio : "No bio available."}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Skills</h2>

                {candidate.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {candidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No skills added.</p>
                )}
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Professional Information
                </h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <InfoCard
                    icon="🎓"
                    title="Education"
                    count={candidate.education?.length || 0}
                    color="blue"
                    onClick={() => openModal("Education", "education")}
                  />

                  <InfoCard
                    icon="💼"
                    title="Experience"
                    count={candidate.experience?.length || 0}
                    color="green"
                    onClick={() => openModal("Experience", "experience")}
                  />

                  <InfoCard
                    icon="📁"
                    title="Projects"
                    count={candidate.projects?.length || 0}
                    color="purple"
                    onClick={() => openModal("Projects", "projects")}
                  />

                  <InfoCard
                    icon="🏆"
                    title="Certificates"
                    count={candidate.certifications?.length || 0}
                    color="yellow"
                    onClick={() => openModal("Certificates", "certifications")}
                  />

                  <InfoCard
                    icon="🌐"
                    title="Social Links"
                    count={
                      Object.values(candidate.socialLinks || {}).filter(Boolean)
                        .length
                    }
                    color="indigo"
                    onClick={() => openModal("Social Links", "social")}
                  />

                  <InfoCard
                    icon="🎯"
                    title="Career Preferences"
                    count={1}
                    color="red"
                    onClick={() => openModal("Career Preferences", "career")}
                  />
                </div>
              </div>

              <DetailModal
                open={modalOpen}
                title={modalTitle}
                onClose={() => setModalOpen(false)}
              >
                {modalType === "education" && (
                  <div className="space-y-8">
                    {candidate.education?.length > 0 ? (
                      candidate.education.map((edu, index) => (
                        <div
                          key={index}
                          className="relative border-l-4 border-blue-600 dark:border-blue-500 pl-8 pb-8"
                        >
                          <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-800 shadow"></div>

                          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-lg transition">
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-xl font-bold dark:text-white">
                                  {edu.degree || "Degree"}
                                </h2>

                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                  <div className="mt-3 space-y-2">
                                    <p>
                                      <span className="font-semibold dark:text-gray-200">
                                        College:
                                      </span>{" "}
                                      {edu.college || "-"}
                                    </p>

                                    <p>
                                      <span className="font-semibold dark:text-gray-200">
                                        University:
                                      </span>{" "}
                                      {edu.university || "-"}
                                    </p>

                                    <p>
                                      <span className="font-semibold dark:text-gray-200">
                                        CGPA:
                                      </span>{" "}
                                      {edu.cgpa || "-"}
                                    </p>
                                  </div>
                                </p>
                              </div>

                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                                {edu.startYear || "-"} -{" "}
                                {edu.endYear || "Present"}
                              </span>
                            </div>

                            {edu.grade && (
                              <div className="mt-5">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Grade</p>

                                <p className="font-semibold dark:text-gray-200">{edu.grade}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl">🎓</div>

                        <h3 className="text-2xl font-bold mt-4 dark:text-white">
                          No Education Added
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                          Candidate hasn't added educational details.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {modalType === "experience" &&
                  (candidate.experience?.length > 0 ? (
                    <div className="space-y-6">
                      {candidate.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow hover:shadow-xl transition p-6"
                        >
                          <div className="flex justify-between items-start gap-6 flex-wrap">
                            <div className="flex-1">
                              <h2 className="text-xl font-bold dark:text-white">
                                {exp.jobTitle || "-"}
                              </h2>

                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {exp.company || "-"}
                              </p>

                              <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Location
                                  </p>
                                  <p className="font-medium dark:text-gray-200">
                                    {exp.location || "-"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Employment Type
                                  </p>
                                  <p className="font-medium dark:text-gray-200">
                                    {exp.employmentType || "-"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full h-fit whitespace-nowrap">
                              {exp.startDate || "-"} -{" "}
                              {exp.currentlyWorking ? "Present" : exp.endDate}
                            </span>
                          </div>

                          {exp.description && (
                            <p className="mt-5 leading-7 text-gray-700 dark:text-gray-300">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-6xl">💼</div>

                      <h3 className="text-2xl font-bold mt-4 dark:text-white">
                        No Experience Added
                      </h3>

                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Candidate hasn't added any work experience.
                      </p>
                    </div>
                  ))}

                {modalType === "projects" &&
                  (candidate.projects?.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {candidate.projects.map((project, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow hover:shadow-xl transition p-6"
                        >
                          <h2 className="text-xl font-bold dark:text-white">
                            {project.title || "Untitled Project"}
                          </h2>

                          <p className="text-gray-600 dark:text-gray-300 mt-3">
                            {project.description || "No description available."}
                          </p>

                          {project.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {project.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-3 mt-6">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-black dark:hover:bg-slate-600"
                              >
                                GitHub
                              </a>
                            )}

                            {project.liveDemo && (
                              <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                              >
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-6xl">📁</div>
                      <h3 className="text-2xl font-bold mt-4 dark:text-white">
                        No Projects Added
                      </h3>
                    </div>
                  ))}

                {modalType === "certifications" &&
                  (candidate.certifications?.length > 0 ? (
                    <div className="space-y-6">
                      {candidate.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow p-6"
                        >
                          <h2 className="text-xl font-bold dark:text-white">
                            {cert.title || "-"}
                          </h2>

                          <p className="text-gray-600 mt-2">
                            {cert.issuer || "-"}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mt-5">
                            <div>
                              <p className="text-gray-500 text-sm">
                                Issue Date
                              </p>

                              <p>{cert.issueDate || "-"}</p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-sm">
                                Expiry Date
                              </p>

                              <p>{cert.expiryDate || "No Expiry"}</p>
                            </div>

                            <div className="md:col-span-2">
                              <p className="text-gray-500 text-sm">
                                Credential ID
                              </p>

                              <p>{cert.credentialId || "-"}</p>
                            </div>
                          </div>

                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-5 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                            >
                              Verify Certificate
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-6xl">🏆</div>
                      <h3 className="text-2xl font-bold mt-4 dark:text-white">
                        No Certifications Added
                      </h3>
                    </div>
                  ))}

                {modalType === "social" && (
                  <div className="grid md:grid-cols-2 gap-5">
                    {Object.entries(candidate.socialLinks || {})
                      .filter(([_, value]) => value)
                      .map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow hover:shadow-lg transition"
                        >
                          <h3 className="text-lg font-bold capitalize dark:text-white">
                            {platform}
                          </h3>

                          <p className="text-blue-600 dark:text-blue-400 break-all mt-2">{url}</p>
                        </a>
                      ))}
                  </div>
                )}

                {modalType === "career" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Preferred Role</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.preferredRole || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Preferred Location</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.preferredLocation || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Expected Salary</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.expectedSalary || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Employment Type</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.employmentType || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Work Mode</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.workMode || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5">
                      <p className="text-gray-500 dark:text-gray-400">Notice Period</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.noticePeriod || "-"}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-5 md:col-span-2">
                      <p className="text-gray-500 dark:text-gray-400">Willing To Relocate</p>
                      <p className="font-bold dark:text-white">
                        {candidate.careerPreferences?.willingToRelocate
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>
                )}
              </DetailModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
