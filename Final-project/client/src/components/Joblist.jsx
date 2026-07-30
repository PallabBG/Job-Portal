import JobCard from "./Jobcard";

const JobList = ({ jobs, onDelete }) => {
  console.log(jobs);
console.log(Array.isArray(jobs));
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default JobList;