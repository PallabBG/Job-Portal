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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">🎓 Education</h2>

        {editing && (
          <button
            type="button"
            onClick={() => setShowEducationForm(!showEducationForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showEducationForm ? "Cancel" : "+ Add Education"}
          </button>
        )}
      </div>

      {/* Add Education Form */}
      {editing && showEducationForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
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
            className="border rounded-lg px-3 py-2"
          />

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleAddEducation}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Save Education
            </button>
          </div>
        </div>
      )}

      {/* Education List */}
      {education.length === 0 ? (
        <p className="text-gray-500">No education added yet.</p>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>

                  <p className="text-gray-700">{edu.college}</p>

                  <p className="text-gray-500">{edu.university}</p>

                  <p className="text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </p>

                  <p className="text-blue-600 font-medium">CGPA : {edu.cgpa}</p>
                </div>

                {editing && (
                  <div className="flex gap-3 text-xl">
                    <button
                      type="button"
                      onClick={() => handleEditEducation(index)}
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(index)}
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
