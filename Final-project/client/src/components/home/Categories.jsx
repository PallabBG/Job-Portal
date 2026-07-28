import {  
  Sparkles, 
  BrainCircuit,  
  TrendingUp,  
  Building,
  ArrowRight,
  Code,
  Palette,
  Megaphone,
  Briefcase
} from 'lucide-react';

const Categories = () => {
    const categories = [
        { title: 'Software Engineering', jobs: '12.5k Jobs', icon: <Code />, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { title: 'Creative Design', jobs: '8.2k Jobs', icon: <Palette />, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
        { title: 'Marketing & PR', jobs: '5.1k Jobs', icon: <Megaphone />, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { title: 'Finance & Accounts', jobs: '6.3k Jobs', icon: <TrendingUp />, color: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { title: 'AI & Data Science', jobs: '9.4k Jobs', icon: <BrainCircuit />, color: 'from-purple-500 to-fuchsia-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { title: 'Business Ops', jobs: '4.8k Jobs', icon: <Building />, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
        { title: 'Human Resources', jobs: '2.1k Jobs', icon: <Briefcase />, color: 'from-rose-400 to-red-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
        { title: 'Innovation', jobs: '3.3k Jobs', icon: <Sparkles />, color: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' }
    ];

    return (
        <div>
            <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
                {/* Background accents */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span>Industry Sectors</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
                                Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Category</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                                Discover thousands of opportunities across diverse industries perfectly matched to your expertise.
                            </p>
                        </div>
                        <button className="shrink-0 px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300 group border border-slate-200 dark:border-slate-700">
                            All Categories 
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                            >
                                {/* Gradient hover background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                                
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner`}>
                                        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${cat.color}`}>
                                            {/* We use cloneElement to apply the gradient class, but SVG paths need direct coloring or drop-shadow tricks. */}
                                            {/* For standard stroke icons, text-current is inherited. We use a trick for stroke coloring: */}
                                        </div>
                                        {/* Pure CSS gradient on SVG stroke */}
                                        <div className={`[&>svg]:w-7 [&>svg]:h-7 [&>svg]:stroke-[url(#grad-${idx})]`}>
                                            <svg width="0" height="0" className="absolute">
                                              <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: cat.color.split(' ')[1].replace('to-', 'var(--tw-gradient-to, ') }} className={cat.color.split(' ')[0].replace('from-', 'text-')} />
                                                <stop offset="100%" className={cat.color.split(' ')[1].replace('to-', 'text-')} />
                                              </linearGradient>
                                            </svg>
                                            {/* Simplify: just use solid text colors based on the gradient start */}
                                            <div className={`text-${cat.color.split('-')[1]}-500 dark:text-${cat.color.split('-')[1]}-400`}>
                                                {cat.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                                
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        {cat.jobs}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Categories;