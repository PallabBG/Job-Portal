const CareerPreferencesCard = ({
  editing,
  careerPreferences,
  setCareerPreferences,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🎯 Career Preferences
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tell recruiters about your preferred role and work preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Preferred Role */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Preferred Location */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Expected Salary */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Work Mode */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
          >
            <option value="">Select</option>
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Employment Type */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            className={`w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            }`}
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

      {/* Relocation */}

      <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-5">
        <label className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
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
            className="w-5 h-5 rounded text-indigo-600"
          />
          Willing to Relocate
        </label>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-8">
          Recruiters may prioritize your profile for opportunities in other
          cities.
        </p>
      </div>
    </div>
  );
};

export default CareerPreferencesCard;
