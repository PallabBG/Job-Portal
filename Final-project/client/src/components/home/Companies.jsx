const Companies = () => {
  const brands = [
    { name: 'Vercel', color: 'text-white' },
    { name: 'Stripe', color: 'text-indigo-400' },
    { name: 'Linear', color: 'text-purple-400' },
    { name: 'Acme Corp', color: 'text-blue-400' },
    { name: 'GlobalTech', color: 'text-emerald-400' },
    { name: 'NextJS', color: 'text-white' },
    { name: 'OpenAI', color: 'text-teal-400' },
    { name: 'Figma', color: 'text-rose-400' }
  ];

  // Duplicate for infinite scroll effect
  const repeatedBrands = [...brands, ...brands, ...brands];

  return (
    <div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/50 relative overflow-hidden transition-colors duration-300">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="container mx-auto px-6 text-center mb-10 relative z-10">
          <p className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-2">
            Trusted by industry leaders
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex">
          {/* Gradient Masks for fading edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-scroll">
            {repeatedBrands.map((brand, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 font-black text-2xl text-slate-800 dark:text-slate-300 mx-10 lg:mx-16 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-xl rotate-45 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 group-hover:border-transparent group-hover:bg-slate-800 dark:group-hover:bg-slate-800 transition-all duration-300 shadow-sm overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300">
                    {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Companies;