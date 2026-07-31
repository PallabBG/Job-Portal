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
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          📁 Projects
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Showcase your best projects and technical work.
        </p>
      </div>

      {editing && (
        <button
          type="button"
          onClick={() => setShowProjectForm(!showProjectForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow"
        >
          {showProjectForm ? "Cancel" : "+ Add Project"}
        </button>
      )}

    </div>

    {/* Form */}

    {editing && showProjectForm && (

      <div className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 mb-6">

        <div className="space-y-5">

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
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            rows={4}
            placeholder="Describe your project..."
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Technologies */}

          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Technologies Used
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

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
                className="flex-1 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={handleAddTechnology}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition shadow"
              >
                Add
              </button>

            </div>

            {projectForm.technologies.length > 0 && (

              <div className="flex flex-wrap gap-2 mt-4">

                {projectForm.technologies.map((tech, index) => (

                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteTechnology(index)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

          <input
            type="url"
            placeholder="GitHub Repository"
            value={projectForm.github}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                github: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="url"
            placeholder="Live Demo"
            value={projectForm.liveDemo}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                liveDemo: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5"
              />

            </div>

          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition shadow"
          >
            {editingProjectIndex !== null
              ? "Update Project"
              : "Save Project"}
          </button>

        </div>

      </div>

    )}

    {/* Project List */}

    {projects.length === 0 ? (

      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 py-10 text-center">

        <div className="text-4xl mb-2">📁</div>

        <p className="font-medium text-gray-700 dark:text-gray-300">
          No projects added yet
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add your best projects to impress recruiters.
        </p>

      </div>

    ) : (

      <div className="space-y-5">

        {projects.map((project, index) => (

          <div
            key={index}
            className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 transition-colors duration-300"
          >

            <div className="flex justify-between items-start gap-4">

              <div className="flex-1">

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (

                  <div className="flex flex-wrap gap-2 mt-4">

                    {project.technologies.map((tech, i) => (

                      <span
                        key={i}
                        className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                )}

                <div className="flex flex-wrap gap-4 mt-4 text-sm">

                  <span className="text-gray-500 dark:text-gray-400">
                    📅 {project.startDate} - {project.endDate || "Present"}
                  </span>

                </div>

                <div className="flex flex-wrap gap-5 mt-4">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      🔗 GitHub
                    </a>
                  )}

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                    >
                      🌐 Live Demo
                    </a>
                  )}

                </div>

              </div>

              {editing && (

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      handleEditProject(index)
                    }
                    className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteProject(index)
                    }
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

export default ProjectsCard;
