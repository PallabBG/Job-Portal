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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">💼 Experience</h2>

        {editing && (
          <button
            type="button"
            onClick={() => setShowExperienceForm(!showExperienceForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showExperienceForm ? "Cancel" : "+ Add Experience"}
          </button>
        )}
      </div>

      {/* Form */}
      {editing && showExperienceForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={experienceForm.employmentType}
            onChange={(e) =>
              setExperienceForm({
                ...experienceForm,
                employmentType: e.target.value,
              })
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Employment Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Freelance</option>
            <option>Contract</option>
          </select>

          <div>
            <label className="text-sm text-gray-600">Start Date</label>
            <input
              type="month"
              value={experienceForm.startDate}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  startDate: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">End Date</label>
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
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">

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
              />

              Currently Working Here
            </label>
          </div>

          <div className="md:col-span-2">
            <textarea
              rows="4"
              placeholder="Describe your work..."
              value={experienceForm.description}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  description: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleAddExperience}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              {editingExperienceIndex !== null
                ? "Update Experience"
                : "Save Experience"}
            </button>
          </div>

        </div>
      )}

      {/* Experience List */}

      {experience.length === 0 ? (
        <p className="text-gray-500">No experience added yet.</p>
      ) : (
        <div className="space-y-4">

          {experience.map((exp, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="text-lg font-semibold">
                    {exp.jobTitle}
                  </h3>

                  <p className="text-gray-700">
                    {exp.company}
                  </p>

                  <p className="text-gray-500">
                    {exp.location}
                  </p>

                  <p className="text-gray-500">
                    {exp.employmentType}
                  </p>

                  <p className="text-gray-500">
                    {exp.startDate} -{" "}
                    {exp.currentlyWorking
                      ? "Present"
                      : exp.endDate}
                  </p>

                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>

                </div>

                {editing && (
                  <div className="flex gap-3 text-xl">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditExperience(index)
                      }
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteExperience(index)
                      }
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