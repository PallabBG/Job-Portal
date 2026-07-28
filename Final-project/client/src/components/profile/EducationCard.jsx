const EducationCard = ({
  editing,
  education,
  educationForm,
  setEducationForm,
  showEducationForm,
  setShowEducationForm,
  handleAddEducation,
  handleEditEducation,
  handleDeleteEducation,
}) => {
  return (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🎓 Education
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Showcase your academic qualifications.
        </p>
      </div>

      {editing && (
        <button
          type="button"
          onClick={() => setShowEducationForm(!showEducationForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow"
        >
          {showEducationForm ? "Cancel" : "+ Add Education"}
        </button>
      )}

    </div>

    {/* Form */}

    {editing && showEducationForm && (

      <div className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Degree"
            value={educationForm.degree}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                degree: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="College"
            value={educationForm.college}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                college: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="University"
            value={educationForm.university}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                university: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="CGPA / Percentage"
            value={educationForm.cgpa}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                cgpa: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Start Year"
            value={educationForm.startYear}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                startYear: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="End Year"
            value={educationForm.endYear}
            onChange={(e) =>
              setEducationForm({
                ...educationForm,
                endYear: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow"
        >
          Save Education
        </button>

      </div>

    )}

    {/* Education List */}

    {education.length === 0 ? (

      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 py-10 text-center">

        <div className="text-4xl mb-2">
          🎓
        </div>

        <p className="font-medium text-gray-700 dark:text-gray-300">
          No education added yet
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add your academic qualifications.
        </p>

      </div>

    ) : (

      <div className="space-y-4">

        {education.map((edu, index) => (

          <div
            key={index}
            className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 transition-colors duration-300"
          >

            <div className="flex justify-between items-start gap-4">

              <div className="flex-1">

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {edu.college}
                </p>

                <p className="text-gray-500 dark:text-gray-400">
                  {edu.university}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">

                  <span className="text-gray-500 dark:text-gray-400">
                    📅 {edu.startYear} - {edu.endYear}
                  </span>

                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    🎯 CGPA: {edu.cgpa}
                  </span>

                </div>

              </div>

              {editing && (

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() => handleEditEducation(index)}
                    className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(index)}
                    className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                  >
                    🗑️
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
};

export default EducationCard;
