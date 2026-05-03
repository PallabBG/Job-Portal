import React from 'react'

const JobseekerDashboard = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Jobseeker Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Jobs Applied</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Saved Jobs</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>

      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
        <p className="text-gray-600">AI-based recommendations will appear here.</p>
      </div>
    </div>
  )
}

export default JobseekerDashboard