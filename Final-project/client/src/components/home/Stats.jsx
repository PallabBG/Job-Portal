import React from 'react';
import { 
  Briefcase,  
  TrendingUp, 
  Users, 
  Building,
} from 'lucide-react';

const Stats = () => {
    return (
        <div>
            {/* Statistics Section - Floating Glass Cards */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950 relative z-20 overflow-hidden transition-colors duration-300">
                {/* Decorative background blurs */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { label: 'Total Jobs', value: '150k+', icon: <Briefcase />, color: 'from-blue-500 to-indigo-500', iconColor: 'text-blue-500 dark:text-blue-400', delay: '0s' },
                            { label: 'Companies', value: '10k+', icon: <Building />, color: 'from-indigo-500 to-purple-500', iconColor: 'text-indigo-500 dark:text-indigo-400', delay: '0.1s' },
                            { label: 'Candidates', value: '2.5M', icon: <Users />, color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-500 dark:text-purple-400', delay: '0.2s' },
                            { label: 'AI Match Accuracy', value: '98%', icon: <TrendingUp />, color: 'from-emerald-400 to-cyan-500', iconColor: 'text-emerald-500 dark:text-emerald-400', delay: '0.3s' }
                        ].map((stat, idx) => (
                            <div 
                                key={idx} 
                                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
                                style={{ animationFillMode: 'both', animationDelay: stat.delay }}
                            >
                                {/* Inner glow on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                {/* Icon container with gradient */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} p-[1px] mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                        {/* Icon */}
                                        <div className="relative z-10">
                                            {React.cloneElement(stat.icon, { className: `w-7 h-7 ${stat.iconColor} transition-transform duration-300` })}
                                        </div>
                                        {/* Subtle hover background effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                    </div>
                                </div>

                                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Stats;