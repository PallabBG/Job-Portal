import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApplicationAPI from "../api/applicationApi";

const STATUS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const JobApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await ApplicationAPI.get(`/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      await ApplicationAPI.patch(
        `/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Applicants...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-8">
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No applicants yet.
        </div>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

              {/* Left */}

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {app.applicant?.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  📧 {app.applicant?.email}
                </p>

                {app.applicant?.phone && (
                  <p className="text-gray-600">
                    📞 {app.applicant.phone}
                  </p>
                )}

                {app.coverLetter && (
                  <>
                    <h3 className="font-semibold mt-4">
                      Cover Letter
                    </h3>

                    <p className="text-gray-700 mt-1">
                      {app.coverLetter}
                    </p>
                  </>
                )}
              </div>

              {/* Right */}

              <div className="flex flex-col gap-3 min-w-[220px]">

                <Link
                  to={`/candidate/${app.applicant._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
                >
                  View Profile
                </Link>

                {app.resume?.resumeFile && (
                  <a
                    href={`http://localhost:5500/uploads/resumes/${app.resume.resumeFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                  >
                    Download Resume
                  </a>
                )}

                <select
                  value={app.status}
                  onChange={(e) =>
                    updateStatus(app._id, e.target.value)
                  }
                  className="border rounded-lg p-2"
                >
                  {STATUS.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default JobApplicants;