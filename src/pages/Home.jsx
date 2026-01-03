import { workouts } from "../data/workouts";

const Home = ({ onSelectWorkout }) => {
  const workoutKeys = Object.keys(workouts);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lavender-50 to-peach-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 
                          flex items-center justify-center shadow-lg">
              <span className="text-3xl">💕</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-lavender-200 to-purple-200 
                          flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-sm">✨</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            Fitness Blossom
          </h1>
          
          <p className="text-rose-400 text-lg">
            Choose your workout to begin
          </p>
          
          {/* Animated divider */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <div className="w-8 h-1 bg-gradient-to-r from-pink-300 to-transparent rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
            <div className="w-8 h-1 bg-gradient-to-l from-rose-300 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="space-y-6">
          {workoutKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => onSelectWorkout(key)}
              className="group w-full transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg 
                            border border-pink-200/50 overflow-hidden">
                
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-pink-200 via-rose-200 to-lavender-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center">
                  {/* Icon with count */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 
                                  flex items-center justify-center shadow-md">
                      <span className="text-2xl">
                        {['🌸', '🌷', '🌺', '🌼', '🌻', '💐'][index % 6]}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-pink-200 
                                  flex items-center justify-center text-xs font-bold text-pink-600">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Workout info */}
                  <div className="ml-5 text-left flex-1">
                    <h3 className="text-xl font-bold text-rose-800 mb-1 group-hover:text-pink-600 transition-colors">
                      {workouts[key].title}
                    </h3>
                    <div className="flex items-center text-rose-500 text-sm">
                      <span className="mr-2">📋</span>
                      <span>{workouts[key]?.exercises?.length || 0} exercises</span>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 text-pink-300 group-hover:text-pink-500 transform group-hover:translate-x-2 transition-transform">
                    <span className="text-2xl">→</span>
                  </div>
                </div>
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200">
            <span className="text-pink-500">💫</span>
            <span className="text-sm text-rose-600">Ready to blossom?</span>
            <span className="text-pink-500">✨</span>
          </div>
          
          {/* Decorative dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {workoutKeys.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-pink-400' : 'bg-pink-200'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed top-10 left-5 w-6 h-6 rounded-full bg-pink-200/50 animate-float"></div>
      <div className="fixed top-20 right-10 w-8 h-8 rounded-full bg-rose-200/40 animate-float-delayed" 
           style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-20 left-1/4 w-10 h-10 rounded-full bg-lavender-200/30 animate-float" 
           style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-10 right-1/4 w-4 h-4 rounded-full bg-pink-200/60 animate-float-delayed" 
           style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default Home;