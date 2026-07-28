const JobForm = ({ formData, handleChange, handleSubmit, btnText }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-10 py-10 dark:bg-slate-800 rounded-2xl space-y-5 transition-colors duration-300"
    >
      {btnText !== "Update Job" && (
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
          {btnText}
        </h2>
      )}

      {/* Basic Details */}
      {[
        { name: "title", placeholder: "Job Title" },
        {
          name: "salary",
          placeholder: "Salary (LPA)",
          type: "number",
        },
        { name: "category", placeholder: "Job Category" },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          required
        />
      ))}

      {/* Job Type */}

      <div>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Job Type
        </label>

        <select
          name="jobType"
          value={formData.jobType ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Experience */}

      <div>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Experience Level
        </label>

        <select
          name="experienceLevel"
          value={formData.experienceLevel ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Skills */}

      <input
        type="text"
        name="skills"
        placeholder="Skills (React, Node.js, MongoDB)"
        value={formData.skills ?? ""}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
      />

      {/* Vacancies */}
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Vacancies
      </label>
      <input
        type="number"
        name="vacancies"
        placeholder="Vacancies"
        value={formData.vacancies ?? ""}
        onChange={handleChange}
        min="1"
        className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
      />

      {/* Deadline */}

      <div>
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Application Deadline
        </label>

        <input
          type="date"
          name="deadline"
          value={formData.deadline ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
      </div>

      {/* Description */}

      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description ?? ""}
        onChange={handleChange}
        rows="5"
        className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        required
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-300">
        {btnText}
      </button>
    </form>
  );
};

export default JobForm;
