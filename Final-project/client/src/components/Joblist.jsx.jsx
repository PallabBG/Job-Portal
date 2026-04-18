import JobCard from "./Jobcard";

const JobList = ({ jobs, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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