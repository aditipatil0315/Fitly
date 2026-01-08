const WorkoutSummary = ({ summary, onBack }) => {
  const { total, completed, skipped, percentage } = summary;

  // Get celebration message based on percentage
  const getCelebrationMessage = () => {
    if (percentage === 100) return "🎉 Perfect Completion! You're a superstar!";
    if (percentage >= 80) return "🌟 Amazing job! You crushed it!";
    if (percentage >= 60) return "✨ Great work! You're getting stronger!";
    if (percentage >= 40) return "🌸 Good effort! Every bit counts!";
    return "🌱 You started! That's the hardest part!";
  };

  // Get flower based on percentage
  // const getCelebrationFlower = () => {
  //   if (percentage === 100) return "💐";
  //   if (percentage >= 80) return "🌺";
  //   if (percentage >= 60) return "🌷";
  //   if (percentage >= 40) return "🌼";
  //   return "🌸";
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lavender-50 to-peach-50 flex items-center justify-center px-4 py-8">
      

      <div className="fixed top-10 left-5 w-10 h-10 rounded-full bg-pink-200/40 animate-float"></div>
      <div className="fixed top-20 right-10 w-8 h-8 rounded-full bg-rose-200/50 animate-float-delayed" 
           style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-1/4 left-10 w-6 h-6 rounded-full bg-lavender-200/40 animate-float" 
           style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-10 right-1/3 w-12 h-12 rounded-full bg-pink-100/30 animate-float-delayed" 
           style={{ animationDelay: '0.5s' }}></div>
      
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 
                          flex items-center justify-center shadow-lg mb-4 mx-auto">
              <span className="text-4xl">{getCelebrationFlower()}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-lavender-200 to-purple-200 
                          flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-xl">✨</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            Workout Complete!
          </h1>
          
          <p className="text-rose-500 text-lg italic">
            {getCelebrationMessage()}
          </p>
        </div>


        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl 
                      border border-pink-200/50 mb-8">
          

          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-8 border-pink-100"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 
                          flex items-center justify-center shadow-inner">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <div className="text-sm text-rose-500 mt-1">completed</div>
              </div>
            </div>
            

            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${percentage * 5.28} 528`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="50%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>


          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 
                          border border-pink-200 text-center">
              <div className="text-2xl font-bold text-rose-700">{total}</div>
              <div className="text-sm text-rose-500">Total</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 
                          border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">{completed}</div>
              <div className="text-sm text-green-500">Completed</div>
            </div>
            
            <div className="bg-gradient-to-br from-lavender-50 to-purple-50 rounded-xl p-4 
                          border border-lavender-200 text-center">
              <div className="text-2xl font-bold text-purple-600">{skipped}</div>
              <div className="text-sm text-purple-500">Skipped</div>
            </div>
          </div>


          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-rose-600 font-medium">Progress</span>
              <span className="text-pink-500 font-bold">{percentage}%</span>
            </div>
            <div className="relative h-4 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 
                         rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            animate-shimmer"></div>
            </div>
          </div>
        </div>


        <div className="bg-gradient-to-r from-pink-100/50 to-rose-100/50 rounded-xl p-4 mb-8 
                      border border-pink-200 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-xl">💕</span>
            </div>
            <div className="text-left">
              <p className="text-rose-700 font-medium">You're making progress!</p>
              <p className="text-rose-500 text-sm">Every workout makes you stronger</p>
            </div>
          </div>
        </div>


        <button
          onClick={onBack}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-pink-400 to-rose-400 
                   text-white px-8 py-4 rounded-full font-semibold shadow-lg
                   hover:shadow-xl hover:from-pink-500 hover:to-rose-500 
                   transition-all duration-300 transform hover:-translate-y-1"
        >
          <span className="flex items-center justify-center gap-2 text-lg">
             Back to Home
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          
          {/* Sparkle effect */}
          <div className="absolute -top-1 left-1/4 w-2 h-2 rounded-full bg-white/50 group-hover:animate-ping"></div>
          <div className="absolute -bottom-1 right-1/4 w-2 h-2 rounded-full bg-white/50 group-hover:animate-ping" 
               style={{ animationDelay: '0.2s' }}></div>
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-rose-400/60">
            Keep blooming, beautiful! 💖
          </p>
          <div className="flex justify-center space-x-3 mt-4">
            <span className="text-pink-300 animate-bounce" style={{ animationDelay: '0s' }}>🌸</span>
            <span className="text-rose-300 animate-bounce" style={{ animationDelay: '0.1s' }}>🌷</span>
            <span className="text-lavender-300 animate-bounce" style={{ animationDelay: '0.2s' }}>🌺</span>
            <span className="text-pink-300 animate-bounce" style={{ animationDelay: '0.3s' }}>🌼</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;