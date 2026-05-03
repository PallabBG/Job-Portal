import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Contact Us
        </h2>

        <p className="text-gray-700 mb-8">
          If you have any questions, feedback, or need support, feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="p-5 border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">📧 Email</h3>
            <p className="text-gray-600">pallabbanerjee074@gmail.com</p>
          </div>

          <div className="p-5 border rounded-xl">
            <h3 className="font-semibold text-lg mb-2">📞 Phone</h3>
            <p className="text-gray-600">+91 7980984961</p>
          </div>

          <div className="p-5 border rounded-xl md:col-span-2">
            <h3 className="font-semibold text-lg mb-2">📍 Location</h3>
            <p className="text-gray-600">
              West Bengal, India
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact