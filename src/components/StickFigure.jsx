const StickFigure = ({ animation, paused }) => {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 160 200"
        width="200"
        height="250"
        className={`relative z-10 transition-all duration-300 ${paused ? "paused" : ""}`}
      >
        {/* Glow effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="lavenderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Head */}
        <circle 
          cx="80" 
          cy="25" 
          r="12" 
          stroke="url(#pinkGradient)" 
          strokeWidth="4" 
          fill="none"
          className={`${paused ? "opacity-70" : "animate-pulse"}`}
          style={{ animationDuration: '2s' }}
        />
        <circle 
          cx="80" 
          cy="25" 
          r="6" 
          fill="url(#pinkGradient)"
          className={`${paused ? "" : "animate-ping"}`}
          style={{ animationDuration: '1.5s' }}
        />

        {/* Body */}
        <line 
          x1="80" 
          y1="38" 
          x2="80" 
          y2="90" 
          stroke="url(#lavenderGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
        />

        {/* Arms */}
        <line
          x1="80"
          y1="50"
          x2="40"
          y2="70"
          stroke="url(#pinkGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className={`arm left ${animation} ${paused ? "paused" : ""}`}
        />
        <line
          x1="80"
          y1="50"
          x2="120"
          y2="70"
          stroke="url(#pinkGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className={`arm right ${animation} ${paused ? "paused" : ""}`}
        />

        {/* Legs */}
        <line
          x1="80"
          y1="90"
          x2="55"
          y2="150"
          stroke="url(#lavenderGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className={`leg left ${animation} ${paused ? "paused" : ""}`}
        />
        <line
          x1="80"
          y1="90"
          x2="105"
          y2="150"
          stroke="url(#lavenderGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className={`leg right ${animation} ${paused ? "paused" : ""}`}
        />

        {/* Decorative floating hearts */}
        <circle 
          cx="110" 
          cy="15" 
          r="4" 
          fill="#f472b6" 
          opacity="0.6"
          className={`${paused ? "" : "animate-float"}`}
          style={{ animationDuration: '4s', animationDelay: '0s' }}
        />
        <circle 
          cx="50" 
          cy="20" 
          r="3" 
          fill="#c084fc" 
          opacity="0.6"
          className={`${paused ? "" : "animate-float"}`}
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
      </svg>

      {/* Background decorative circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-32 h-32 rounded-full border-4 border-pink-200/30 
                      ${paused ? "" : "animate-spin-slow"}`}></div>
      </div>

      {/* Exercise status */}
      <div className={`text-center mt-4 ${paused ? "text-rose-400" : "text-pink-500"}`}>
        <span className="text-sm font-medium">
          {paused ? "⏸️ Paused" : "▶️ Active"}
        </span>
      </div>
    </div>
  );
};

export default StickFigure;