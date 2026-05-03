import React from 'react'

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          This AI-powered Job Portal helps job seekers find the right opportunities
          and allows employers to hire the best candidates efficiently.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-5 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Smart Job Matching</h3>
            <p className="text-gray-600 text-sm">
              AI recommends jobs based on your profile, skills, and interests.
            </p>
          </div>

          <div className="p-5 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Easy Applications</h3>
            <p className="text-gray-600 text-sm">
              Apply to jobs with a simple and fast process.
            </p>
          </div>

          <div className="p-5 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Employer Tools</h3>
            <p className="text-gray-600 text-sm">
              Employers can post jobs and manage applications easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About