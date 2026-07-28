import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ProfileHeader = ({
  editing,
  setEditing,
  form,
  profileCompletion,
  loadProfile, // from JobSeekerProfile
}) => {
  const { user, loadProfile: refreshUser } = useAuth();

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5500/api/auth/upload-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Refresh AuthContext
      await refreshUser();

      // Refresh profile page
      await loadProfile();

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Profile image upload failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white mb-8 border border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white dark:bg-slate-200 text-blue-600 flex items-center justify-center text-4xl font-bold shadow-2xl border-4 border-white/40">
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5500${user.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : form.name ? (
                form.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              ) : (
                "U"
              )}
            </div>

            {editing && (
              <label className="absolute bottom-1 right-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-full p-2.5 shadow-lg transition-all duration-300 cursor-pointer">
                📷
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageUpload}
                />
              </label>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {form.name || "Your Name"}
            </h1>

            <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 shadow-lg transition-all duration-300"
            >
              ✏ Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                form="profileForm"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  loadProfile();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Profile Completion</span>

          <span>{profileCompletion}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
          <div
  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>

        <div className="mt-5 space-y-1 text-sm text-blue-100">
          {!form.phone && <p>• Add your phone number</p>}
          {!form.location && <p>• Add your location</p>}
          {!form.bio && <p>• Add a short bio</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
