import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/jobApi";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        My Posted Jobs
      </h1>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl shadow p-5 mb-5"
        >
          <h2 className="text-xl font-bold">
            {job.title}
          </h2>

          <p>{job.company}</p>

          <Link
            to={`/job/${job._id}/applicants`}
            className="text-blue-600"
          >
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyJobs;