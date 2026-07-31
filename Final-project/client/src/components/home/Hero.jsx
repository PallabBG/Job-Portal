import {
  Briefcase,
  Bot,
  Sparkles,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-bl from-emerald-500/20 to-cyan-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 text-blue-600 dark:text-blue-400 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 mb-8 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">The Future of Hiring</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
                Find Your True <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  Calling with AI
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Our AI-driven platform connects you with world-class opportunities instantly. Get smart matches, resume analysis, and land the job you deserve.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  to="/jobs" 
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Explore Jobs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Post a Job
                </Link>
              </div>

              {/* Mini Stats under CTA */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-slate-500 dark:text-slate-400">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">10k+</span>
                  <span className="text-sm font-medium">Active Jobs</span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">95%</span>
                  <span className="text-sm font-medium">Match Accuracy</span>
                </div>
              </div>
            </div>

            {/* Right Visuals (Glassmorphic Interface Mockup) */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:h-[600px] flex items-center justify-center">
              
              {/* Main Mockup Card */}
              <div className="relative z-10 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl p-6 lg:p-8 transform hover:scale-[1.02] transition-transform duration-500">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">AI Match Engine</h3>
                      <p className="text-xs font-semibold text-emerald-500">Processing live data...</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="space-y-4">
                  {/* Job Card 1 */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Senior Frontend Eng</h4>
                      <p className="text-xs text-slate-500">TechNova Inc • Remote</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">98% Match</span>
                    </div>
                  </div>
                  
                  {/* Job Card 2 */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4 opacity-75">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Product Designer</h4>
                      <p className="text-xs text-slate-500">CreativeFlow • NY</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">92% Match</span>
                    </div>
                  </div>
                  
                  {/* Analysis loader */}
                  <div className="pt-4 flex flex-col gap-2">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-2/3 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs text-center font-medium text-slate-500 dark:text-slate-400">Scanning 450+ new opportunities...</p>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -left-8 top-12 z-20 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Resume Optimized</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-16 z-20 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Salary $+20%</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero;
