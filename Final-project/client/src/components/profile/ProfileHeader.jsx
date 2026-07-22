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
        }
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
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5500${user.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                form.name
                  ? form.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                  : "U"
              )}
            </div>

            {editing && (
              <label className="absolute bottom-0 right-0 bg-blue-700 text-white rounded-full p-2 cursor-pointer hover:bg-blue-800">
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
            <h1 className="text-3xl font-bold">
              {form.name || "Your Name"}
            </h1>

            <p className="text-blue-100 capitalize mt-1">
              {user?.role}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              ✏ Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                form="profileForm"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  loadProfile();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
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

        <div className="w-full h-3 rounded-full bg-white/30">
          <div
            className="bg-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-blue-100">
          {!form.phone && <p>• Add your phone number</p>}
          {!form.location && <p>• Add your location</p>}
          {!form.bio && <p>• Add a short bio</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;