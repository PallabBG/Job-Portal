const ProjectsCard = ({
  editing,
  projects,
  projectForm,
  setProjectForm,
  newTechnology,
  setNewTechnology,
  showProjectForm,
  setShowProjectForm,
  handleAddTechnology,
  handleDeleteTechnology,
  handleAddProject,
  handleEditProject,
  handleDeleteProject,
  editingProjectIndex,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">📁 Projects</h2>

        {editing && (
          <button
            type="button"
            onClick={() => setShowProjectForm(!showProjectForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showProjectForm ? "Cancel" : "+ Add Project"}
          </button>
        )}
      </div>

      {/* Form */}
      {editing && showProjectForm && (
        <div className="space-y-4 mb-6">

          <input
            type="text"
            placeholder="Project Title"
            value={projectForm.title}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                title: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            rows="4"
            placeholder="Project Description"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Technologies */}

          <div>

            <label className="font-medium">
              Technologies
            </label>

            <div className="flex gap-2 mt-2">

              <input
                type="text"
                placeholder="React"
                value={newTechnology}
                onChange={(e) =>
                  setNewTechnology(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
                className="flex-1 border rounded-lg px-3 py-2"
              />

              <button
                type="button"
                onClick={handleAddTechnology}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-3">

              {projectForm.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tech}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteTechnology(index)
                    }
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}

            </div>

          </div>

          <input
            type="url"
            placeholder="GitHub Link"
            value={projectForm.github}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                github: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="url"
            placeholder="Live Demo Link"
            value={projectForm.liveDemo}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                liveDemo: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                Start Date
              </label>

              <input
                type="month"
                value={projectForm.startDate}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    startDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                End Date
              </label>

              <input
                type="month"
                value={projectForm.endDate}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    endDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            {editingProjectIndex !== null
              ? "Update Project"
              : "Save Project"}
          </button>

        </div>
      )}

      {/* Projects List */}

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No projects added yet.
        </p>
      ) : (
        <div className="space-y-5">

          {projects.map((project, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between">

                <div className="space-y-2">

                  <h3 className="text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 whitespace-pre-line">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}

                  </div>

                  <p className="text-gray-500">
                    {project.startDate} -{" "}
                    {project.endDate || "Present"}
                  </p>

                  <div className="flex gap-5">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        🔗 GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        🌐 Live Demo
                      </a>
                    )}

                  </div>

                </div>

                {editing && (
                  <div className="flex gap-3 text-xl">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditProject(index)
                      }
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteProject(index)
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

export default ProjectsCard;