import {
    ChevronRight,
    MapPin,
    Clock,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedJobs = () => {
    const navigate = useNavigate();
    const featuredJobs = [
        { role: 'Senior React Engineer', company: 'TechVision Inc.', loc: 'San Francisco, CA', salary: '$120k - $150k', type: 'Full-time', tags: ['React', 'Node.js', 'TypeScript'], logoColor: 'from-blue-500 to-cyan-500' },
        { role: 'AI Research Scientist', company: 'DeepMind Core', loc: 'Remote', salary: '$160k - $200k', type: 'Contract', tags: ['Python', 'PyTorch', 'Machine Learning'], logoColor: 'from-purple-500 to-fuchsia-500' },
        { role: 'Product Designer', company: 'Creative Solutions', loc: 'New York, NY', salary: '$110k - $140k', type: 'Full-time', tags: ['Figma', 'UI/UX', 'Prototyping'], logoColor: 'from-pink-500 to-rose-500' },
        { role: 'Full Stack Developer', company: 'InnovateHub', loc: 'Remote', salary: '$100k - $130k', type: 'Full-time', tags: ['MERN', 'AWS', 'Docker'], logoColor: 'from-amber-400 to-orange-500' }
    ];

    return (
        <div>
            <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span>Premium Listings</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
                                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Opportunities</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                                Hand-picked roles from top companies actively hiring. Find your next big career move today.
                            </p>
                        </div>
                        <button onClick={() => navigate('/')} className="shrink-0 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                            View All Jobs
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {featuredJobs.map((job, idx) => (
                            <div
                                key={idx}
                                className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 lg:p-8 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 transition-all duration-500 cursor-pointer flex flex-col sm:flex-row gap-6 relative overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"></div>

                                {/* Logo Placeholder */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.logoColor} shrink-0 p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-300 relative z-10`}>
                                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-2xl">
                                        <span className={`text-transparent bg-clip-text bg-gradient-to-br ${job.logoColor}`}>
                                            {job.company.charAt(0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 w-full relative z-10">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                                                {job.role}
                                            </h3>
                                            <h4 className="text-slate-600 dark:text-slate-400 font-semibold">
                                                {job.company}
                                            </h4>
                                        </div>
                                        {job.loc === 'Remote' && (
                                            <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase border border-emerald-200 dark:border-emerald-500/30">
                                                Remote
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            {job.loc}
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                            {job.type}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-100 dark:border-slate-700/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-row justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                                        <p className="text-xl font-black text-slate-900 dark:text-white">
                                            {job.salary}
                                        </p>
                                        <button onClick={() => navigate('/register')} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100 dark:border-slate-700">
                                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FeaturedJobs;
