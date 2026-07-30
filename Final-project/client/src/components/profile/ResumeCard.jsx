const ResumeCard = ({
    setSelectedResume,
    resume,
    uploading,
    handleResumeUpload,
    handleDownloadResume,
    selectedResume,
}) => {
  return (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">

    {/* Header */}
    <div className="mb-5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        📄 Resume
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Upload your latest PDF resume.
      </p>
    </div>

    {!resume ? (
      <div>

        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 p-5">

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            No resume uploaded yet.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedResume(e.target.files[0])}
            className="block w-full text-sm text-gray-600 dark:text-gray-300
            file:mr-3
            file:px-4
            file:py-2
            file:rounded-lg
            file:border-0
            file:bg-indigo-600
            file:text-white
            file:font-medium
            hover:file:bg-indigo-700
            cursor-pointer"
          />

        </div>

        <button
          onClick={handleResumeUpload}
          disabled={!selectedResume || uploading}
          className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-all duration-300"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

      </div>
    ) : (
      <div>

        {/* Resume Info */}

        <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xl">
              📄
            </div>

            <div className="flex-1 min-w-0">

              <p className="font-semibold text-green-600 dark:text-green-400 text-sm">
                Resume Uploaded
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-sm truncate">
                {resume}
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-2 mt-5">

          <a
            href={resume?.startsWith('http') ? resume : `https://job-portal-v3nf.onrender.com/uploads/resumes/${resume}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            View
          </a>

          <button
            onClick={handleDownloadResume}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Download
          </button>

          <label className="flex-1 text-center cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg transition">

            Replace

            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) =>
                setSelectedResume(e.target.files[0])
              }
            />

          </label>

        </div>

        {selectedResume && (

          <div className="mt-5 border-t border-gray-200 dark:border-slate-700 pt-4">

            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
              Selected: {selectedResume.name}
            </p>

            <button
              onClick={handleResumeUpload}
              disabled={uploading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white text-sm font-medium py-2.5 rounded-xl transition"
            >
              {uploading ? "Uploading..." : "Upload New Resume"}
            </button>

          </div>

        )}

      </div>
    )}

  </div>
);
};

export default ResumeCard;