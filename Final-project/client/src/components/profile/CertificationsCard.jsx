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
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          🏆 Certifications
        </h2>

        {editing && (
          <button
            type="button"
            onClick={() =>
              setShowCertificationForm(!showCertificationForm)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showCertificationForm
              ? "Cancel"
              : "+ Add Certification"}
          </button>
        )}

      </div>

      {/* Form */}

      {editing && showCertificationForm && (

        <div className="space-y-4 mb-6">

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
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Issuer"
            value={certificationForm.issuer}
            onChange={(e) =>
              setCertificationForm({
                ...certificationForm,
                issuer: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
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
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
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
                className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
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
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="button"
            onClick={handleAddCertification}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            {editingCertificationIndex !== null
              ? "Update Certification"
              : "Save Certification"}
          </button>

        </div>
      )}

      {/* List */}

      {certifications.length === 0 ? (
        <p className="text-gray-500">
          No certifications added yet.
        </p>
      ) : (
        <div className="space-y-4">

          {certifications.map((cert, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 shadow-sm"
            >

              <div className="flex justify-between">

                <div className="space-y-2">

                  <h3 className="text-lg font-semibold">
                    {cert.title}
                  </h3>

                  <p className="text-gray-700">
                    {cert.issuer}
                  </p>

                  <p className="text-gray-500">
                    {cert.issueDate}
                    {cert.expiryDate &&
                      ` • Expires: ${cert.expiryDate}`}
                  </p>

                  {cert.credentialId && (
                    <p className="text-gray-500">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🔗 Verify Credential
                    </a>
                  )}

                </div>

                {editing && (
                  <div className="flex gap-3 text-xl">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditCertification(index)
                      }
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteCertification(index)
                      }
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