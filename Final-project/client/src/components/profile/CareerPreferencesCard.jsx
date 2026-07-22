const CareerPreferencesCard = ({
  editing,
  careerPreferences,
  setCareerPreferences,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-5">
        🎯 Career Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Preferred Role */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Job Role
          </label>

          <input
            type="text"
            disabled={!editing}
            value={careerPreferences.preferredRole}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                preferredRole: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Preferred Location */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Location
          </label>

          <input
            type="text"
            disabled={!editing}
            value={careerPreferences.preferredLocation}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                preferredLocation: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Expected Salary
          </label>

          <input
            type="text"
            disabled={!editing}
            placeholder="₹6 LPA"
            value={careerPreferences.expectedSalary}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                expectedSalary: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Work Mode
          </label>

          <select
            disabled={!editing}
            value={careerPreferences.workMode}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                workMode: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Employment Type
          </label>

          <select
            disabled={!editing}
            value={careerPreferences.employmentType}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                employmentType: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Freelance</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Notice Period */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Notice Period
          </label>

          <select
            disabled={!editing}
            value={careerPreferences.noticePeriod}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                noticePeriod: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select</option>
            <option>Immediate</option>
            <option>15 Days</option>
            <option>30 Days</option>
            <option>60 Days</option>
            <option>90 Days</option>
          </select>
        </div>

      </div>

      <div className="mt-5">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            disabled={!editing}
            checked={careerPreferences.willingToRelocate}
            onChange={(e) =>
              setCareerPreferences({
                ...careerPreferences,
                willingToRelocate: e.target.checked,
              })
            }
          />

          Willing to Relocate
        </label>
      </div>
    </div>
  );
};

export default CareerPreferencesCard;