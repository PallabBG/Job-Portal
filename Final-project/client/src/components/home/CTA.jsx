import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div>
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          {/* CTA Banner Container */}
          <div className="relative w-full max-w-6xl mx-auto rounded-[3rem] p-10 lg:p-20 overflow-hidden shadow-2xl shadow-blue-500/20">
            
            {/* Vibrant Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
            
            {/* Abstract Floating Shapes */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl mix-blend-overlay animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl mix-blend-overlay animate-pulse" style={{ animationDuration: '8s' }}></div>
            
            {/* Glass Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] opacity-40 mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md mb-8 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">Your Next Chapter Starts Here</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm leading-tight">
                Ready to accelerate <br className="hidden lg:block"/> your career?
              </h2>
              
              <p className="text-blue-100 text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of professionals who have already found their dream roles using our AI-powered platform. Fast, intuitive, and built for you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                <Link 
                  to="/register"
                  className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-blue-700 font-bold text-lg hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group"
                >
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/login"
                  className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CTA;
