const SkillsCard = ({
  editing,
  skills,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleDeleteSkill,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          💻 Skills
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Showcase your technical skills to recruiters.
        </p>
      </div>

      {/* Add Skill */}
      {editing && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a skill (e.g. React, Java)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            className="flex-1 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow"
          >
            Add Skill
          </button>
        </div>
      )}

      {/* Skills */}
      {skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 py-8 text-center">
          <div className="text-4xl mb-2">💻</div>

          <p className="font-medium text-gray-700 dark:text-gray-300">
            No skills added yet
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Start adding your technical skills.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-medium text-sm transition-all"
            >
              <span>{skill}</span>

              {editing && (
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="text-red-500 hover:text-red-600 transition-colors font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsCard;
