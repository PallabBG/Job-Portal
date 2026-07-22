const PersonalInfoCard = ({ editing, form, handleChange, handleSubmit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium">Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border rounded-lg p-3 mt-1 ${
              editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="font-medium">Email</label>

          <input
            type="email"
            value={form.email}
            readOnly
            className="w-full border rounded-lg p-3 mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border rounded-lg p-3 mt-1 ${
              editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="font-medium">Location</label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border rounded-lg p-3 mt-1 ${
              editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>

          <textarea
            rows="4"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border rounded-lg p-3 mt-1 ${
              editing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoCard;
