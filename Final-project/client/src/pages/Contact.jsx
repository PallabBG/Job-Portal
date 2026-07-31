import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Have questions, suggestions, or need support? We'd love to hear
            from you. Feel free to contact us anytime.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Email */}
          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Email
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300 break-all">
              pallabbanerjee074
              <br />
              @gmail.com
            </p>

          </div>

          {/* Phone */}
          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <FaPhoneAlt className="text-3xl text-green-600 dark:text-green-400" />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Phone
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              +91 7980984961
            </p>

          </div>

          {/* Location */}
          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
              <FaMapMarkerAlt className="text-3xl text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Location
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              West Bengal
              <br />
              India
            </p>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-5 text-center">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            We're Here to Help
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you're looking for your dream job, searching for talented
            candidates, or have suggestions to improve Smart Job Portal,
            our team is always ready to assist you.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Contact;
