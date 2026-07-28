const PersonalInfoCard = ({ editing, form, handleChange, handleSubmit }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-8 mb-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Personal Information
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal details and contact information.
          </p>
        </div>
      </div>

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-8">
        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
            }`}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              readOnly
              className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-4 py-3 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone + Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
            }`}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 outline-none
            ${
              editing
                ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
            }`}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            About Yourself
          </label>

          <textarea
            rows={5}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Write a short introduction about yourself..."
            className={`w-full rounded-xl border px-4 py-3 resize-none transition-all duration-300 outline-none
          ${
            editing
              ? "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              : "bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          }`}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoCard;
