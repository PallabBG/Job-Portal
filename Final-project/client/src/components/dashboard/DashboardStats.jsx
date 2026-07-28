import React from "react";

const DashboardStats = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Background Decoration */}

          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100/70 to-blue-100/40 dark:from-indigo-500/10 dark:to-blue-500/10 group-hover:scale-125 transition-transform duration-500" />

          {/* Card Content */}

          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>
            </div>

            {/* Bottom Accent */}

            <div className="mt-6">
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 group-hover:translate-x-2 transition-transform duration-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
