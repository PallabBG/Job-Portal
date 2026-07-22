import { useEffect, useState } from "react";
import ApplicationAPI from "../api/applicationApi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await ApplicationAPI.get("/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <div className="grid gap-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-semibold">
                {app.job.title}
              </h2>

              <p>{app.job.company}</p>

              <p>{app.job.location}</p>

              <p className="mt-2">
                Status:
                <span className="font-semibold text-blue-600 ml-2">
                  {app.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;