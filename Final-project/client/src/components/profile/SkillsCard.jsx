const SkillsCard = ({
  editing,
  skills,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleDeleteSkill,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">💻 Skills</h2>

        {editing && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-500">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
            >
              <span>{skill}</span>

              {editing && (
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
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