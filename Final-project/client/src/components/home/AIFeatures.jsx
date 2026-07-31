import { 
  Search, 
  Sparkles, 
  Bot, 
  BrainCircuit, 
  MessageSquare, 
  Video, 
  TrendingUp, 
} from 'lucide-react';

const AIFeatures = () => {
    const features = [
        {
            title: 'AI Resume Analysis',
            desc: 'Instantly score and optimize your resume against job descriptions to pass ATS filters.',
            icon: <Search className="w-6 h-6" />,
            color: 'from-blue-500 to-cyan-500',
            glow: 'shadow-blue-500/30'
        },
        {
            title: 'Smart Job Matching',
            desc: 'Our algorithm learns your preferences and skills to recommend jobs with 95%+ match rates.',
            icon: <BrainCircuit className="w-6 h-6" />,
            color: 'from-purple-500 to-pink-500',
            glow: 'shadow-purple-500/30'
        },
        {
            title: 'Interview Generator',
            desc: 'Practice with AI-generated questions tailored to specific roles and get instant feedback.',
            icon: <Video className="w-6 h-6" />,
            color: 'from-orange-500 to-red-500',
            glow: 'shadow-orange-500/30'
        },
        {
            title: 'Career Chatbot',
            desc: '24/7 AI career advisor to answer your queries and guide your professional journey.',
            icon: <MessageSquare className="w-6 h-6" />,
            color: 'from-green-500 to-emerald-500',
            glow: 'shadow-emerald-500/30'
        },
        {
            title: 'Salary Insights',
            desc: 'Real-time AI estimations of market rates based on your specific skill set and location.',
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-yellow-400 to-orange-500',
            glow: 'shadow-yellow-500/30'
        },
        {
            title: 'Automated Outreach',
            desc: 'Let AI craft personalized cover letters and outreach messages to recruiters.',
            icon: <Sparkles className="w-6 h-6" />,
            color: 'from-indigo-500 to-purple-500',
            glow: 'shadow-indigo-500/30'
        }
    ];

    return (
        <div>
            <section className="py-24 bg-slate-900 overflow-hidden relative">
                {/* Deep Dark Theme Background for High Contrast Glow */}
                <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full translate-y-1/4 translate-x-1/4 pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white/5 border border-white/10 text-white backdrop-blur-md shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]">
                            <Bot className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-white">
                            Supercharge Search with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">AI</span>
                        </h2>
                        <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto">
                            Our intelligent tools do the heavy lifting, matching you with the perfect opportunities and preparing you for success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className="group p-8 rounded-[2rem] bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col h-full"
                            >
                                {/* Glowing background effect on hover */}
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${feature.color} rounded-bl-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 pointer-events-none`} />
                                
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-8 shadow-lg ${feature.glow} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 relative z-10`}>
                                    {feature.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-4 text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-slate-400 leading-relaxed relative z-10 font-medium flex-grow">
                                    {feature.desc}
                                </p>

                                {/* Decorative bottom line */}
                                <div className={`w-0 h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6 group-hover:w-full transition-all duration-500 ease-out`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AIFeatures;
