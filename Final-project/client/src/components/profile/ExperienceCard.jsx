const ExperienceCard = ({
  editing,
  experience,
  experienceForm,
  setExperienceForm,
  showExperienceForm,
  setShowExperienceForm,
  handleAddExperience,
  handleEditExperience,
  handleDeleteExperience,
  editingExperienceIndex,
}) => {
  return (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          💼 Experience
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Showcase your work experience and professional journey.
        </p>
      </div>

      {editing && (
        <button
          type="button"
          onClick={() => setShowExperienceForm(!showExperienceForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow"
        >
          {showExperienceForm ? "Cancel" : "+ Add Experience"}
        </button>
      )}

    </div>

    {/* Form */}

    {editing && showExperienceForm && (

      <div className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Job Title"
            value={experienceForm.jobTitle}
            onChange={(e) =>
              setExperienceForm({
                ...experienceForm,
                jobTitle: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Company"
            value={experienceForm.company}
            onChange={(e) =>
              setExperienceForm({
                ...experienceForm,
                company: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Location"
            value={experienceForm.location}
            onChange={(e) =>
              setExperienceForm({
                ...experienceForm,
                location: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={experienceForm.employmentType}
            onChange={(e) =>
              setExperienceForm({
                ...experienceForm,
                employmentType: e.target.value,
              })
            }
            className="rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Employment Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Freelance</option>
            <option>Contract</option>
          </select>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>

            <input
              type="month"
              value={experienceForm.startDate}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  startDate: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </label>

            <input
              type="month"
              value={experienceForm.endDate}
              disabled={experienceForm.currentlyWorking}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  endDate: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 disabled:bg-gray-100 dark:disabled:bg-slate-700 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">

            <label className="flex items-center gap-3 text-gray-700 dark:text-gray-300">

              <input
                type="checkbox"
                checked={experienceForm.currentlyWorking}
                onChange={(e) =>
                  setExperienceForm({
                    ...experienceForm,
                    currentlyWorking: e.target.checked,
                    endDate: e.target.checked
                      ? ""
                      : experienceForm.endDate,
                  })
                }
                className="w-4 h-4 text-indigo-600 rounded"
              />

              Currently Working Here

            </label>

          </div>

          <div className="md:col-span-2">

            <textarea
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              value={experienceForm.description}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  description: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

          </div>

        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow"
        >
          {editingExperienceIndex !== null
            ? "Update Experience"
            : "Save Experience"}
        </button>

      </div>

    )}

    {/* Experience List */}

    {experience.length === 0 ? (

      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 py-10 text-center">

        <div className="text-4xl mb-2">
          💼
        </div>

        <p className="font-medium text-gray-700 dark:text-gray-300">
          No experience added yet
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add your work experience to strengthen your profile.
        </p>

      </div>

    ) : (

      <div className="space-y-4">

        {experience.map((exp, index) => (

          <div
            key={index}
            className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 transition-colors duration-300"
          >

            <div className="flex justify-between items-start gap-4">

              <div className="flex-1">

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.jobTitle}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {exp.company}
                </p>

                <p className="text-gray-500 dark:text-gray-400">
                  {exp.location}
                </p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm">

                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {exp.employmentType}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400">
                    📅 {exp.startDate} -{" "}
                    {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>

                </div>

                {exp.description && (
                  <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                )}

              </div>

              {editing && (

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() => handleEditExperience(index)}
                    className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(index)}
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

export default ExperienceCard;
