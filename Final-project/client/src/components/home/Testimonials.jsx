import { 
  Star,
  Quote
} from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { text: "The AI resume analysis helped me tailor my profile perfectly. I landed a job at my dream company within 2 weeks!", author: "Sarah Jenkins", role: "Product Designer", initials: "SJ", color: "from-blue-400 to-indigo-500" },
    { text: "The automated interview generator was a game changer. It asked questions exactly like the ones I faced in my actual interview.", author: "David Chen", role: "Software Engineer", initials: "DC", color: "from-emerald-400 to-teal-500" },
    { text: "I've tried many job portals, but the AI matching here is on another level. It finds roles I wouldn't have discovered myself.", author: "Emily Rodriguez", role: "Marketing Director", initials: "ER", color: "from-purple-400 to-pink-500" }
  ];

  return (
    <div>
      <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 dark:from-slate-800/50 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Don't just take <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">our word</span> for it
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl font-medium">
              Real success stories from professionals who accelerated their careers with our AI-powered platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div 
                key={idx} 
                className="group bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative hover:-translate-y-2 transition-transform duration-500"
              >
                {/* Decorative oversized quote mark */}
                <Quote className="w-24 h-24 text-slate-50 dark:text-slate-700/30 absolute -top-4 -right-4 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-10 text-lg leading-relaxed font-medium">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${review.color} p-[2px] shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                        <span className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-br ${review.color}`}>
                          {review.initials}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{review.author}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">{review.role}</p>
                    </div>
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

export default Testimonials;