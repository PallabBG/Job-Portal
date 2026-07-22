const ResumeCard = ({
    setSelectedResume,
    resume,
    uploading,
    handleResumeUpload,
    handleDownloadResume,
    selectedResume,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">📄 Resume</h2>

      {!resume ? (
        <>
          <p className="text-gray-500 mb-4">No resume uploaded yet.</p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedResume(e.target.files[0])}
            className="mb-4 cursor-pointer file:cursor-pointer"
          />

          <button
            onClick={handleResumeUpload}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </>
      ) : (
        <>
          <p className="font-medium text-green-600 mb-4">✅ Resume Uploaded</p>

          <p className="text-gray-700 break-all mb-4">{resume}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`http://localhost:5500/uploads/resumes/${resume}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View
            </a>

            <button
              onClick={handleDownloadResume}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Download
            </button>

            <label className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer">
              Replace
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => {
                  setSelectedResume(e.target.files[0]);
                }}
              />
            </label>

            {selectedResume && (
              <button
                onClick={handleResumeUpload}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Upload New Resume
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeCard;