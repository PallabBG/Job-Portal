const CertificationsCard = ({
  editing,
  certifications,
  certificationForm,
  setCertificationForm,
  showCertificationForm,
  setShowCertificationForm,
  handleAddCertification,
  handleEditCertification,
  handleDeleteCertification,
  editingCertificationIndex,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            🏆 Certifications
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Highlight your professional certifications and achievements.
          </p>
        </div>

        {editing && (
          <button
            type="button"
            onClick={() => setShowCertificationForm(!showCertificationForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 shadow"
          >
            {showCertificationForm ? "Cancel" : "+ Add Certification"}
          </button>
        )}
      </div>

      {/* Form */}

      {editing && showCertificationForm && (
        <div className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 mb-6">
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Certificate Title"
              value={certificationForm.title}
              onChange={(e) =>
                setCertificationForm({
                  ...certificationForm,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Issuing Organization"
              value={certificationForm.issuer}
              onChange={(e) =>
                setCertificationForm({
                  ...certificationForm,
                  issuer: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Issue Date
                </label>

                <input
                  type="month"
                  value={certificationForm.issueDate}
                  onChange={(e) =>
                    setCertificationForm({
                      ...certificationForm,
                      issueDate: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>

                <input
                  type="month"
                  value={certificationForm.expiryDate}
                  onChange={(e) =>
                    setCertificationForm({
                      ...certificationForm,
                      expiryDate: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Credential ID"
              value={certificationForm.credentialId}
              onChange={(e) =>
                setCertificationForm({
                  ...certificationForm,
                  credentialId: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="url"
              placeholder="Credential URL"
              value={certificationForm.credentialUrl}
              onChange={(e) =>
                setCertificationForm({
                  ...certificationForm,
                  credentialUrl: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={handleAddCertification}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow"
            >
              {editingCertificationIndex !== null
                ? "Update Certification"
                : "Save Certification"}
            </button>
          </div>
        </div>
      )}

      {/* Certifications */}

      {certifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 py-10 text-center">
          <div className="text-4xl mb-2">🏆</div>

          <p className="font-medium text-gray-700 dark:text-gray-300">
            No certifications added yet
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add your certifications to build credibility.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-5 transition-colors duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {cert.issuer}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      📅 Issued: {cert.issueDate}
                    </span>

                    {cert.expiryDate && (
                      <span className="text-orange-600 dark:text-orange-400 font-medium">
                        ⏳ Expires: {cert.expiryDate}
                      </span>
                    )}
                  </div>

                  {cert.credentialId && (
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      Credential ID:{" "}
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {cert.credentialId}
                      </span>
                    </p>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      🔗 Verify Credential
                    </a>
                  )}
                </div>

                {editing && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditCertification(index)}
                      className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCertification(index)}
                      className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsCard;
