import React from 'react'

const EmployerDashboard = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Employer Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Your Posted Jobs</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600">Applications Received</h3>
          <p className="text-2xl font-bold mt-2">32</p>
        </div>

      </div>

      <div className="mt-10">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition">
          + Post New Job
        </button>
      </div>
    </div>
  )
}

export default EmployerDashboard