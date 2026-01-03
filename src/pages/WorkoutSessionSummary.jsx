import { workouts } from "../data/workouts";

const WorkoutSessionSummary = ({ workoutKey, onBack, onStart }) => {
  const workout = workouts[workoutKey];

  const totalDuration = workout.exercises.reduce(
    (sum, ex) => sum + ex.duration,
    0
  );

  // Convert seconds to minutes:seconds
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Get workout type emoji
  const getWorkoutEmoji = () => {
    const title = workout.title.toLowerCase();
    if (title.includes('full') || title.includes('body')) return '💪';
    if (title.includes('cardio')) return '🏃‍♀️';
    if (title.includes('stretch') || title.includes('yoga')) return '🧘‍♀️';
    if (title.includes('arm') || title.includes('upper')) return '💪';
    if (title.includes('leg') || title.includes('lower')) return '🦵';
    return '🌸';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lavender-50 to-peach-50 px-4 py-6 flex flex-col">
      
      {/* Background decorative elements */}
      <div className="fixed top-10 right-5 w-8 h-8 rounded-full bg-pink-200/40 animate-float"></div>
      <div className="fixed bottom-20 left-5 w-6 h-6 rounded-full bg-rose-200/50 animate-float-delayed" 
           style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-1/3 left-1/4 w-10 h-10 rounded-full bg-lavender-200/30 animate-float" 
           style={{ animationDelay: '2s' }}></div>
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start mb-6 group"
      >
        <div className="flex items-center gap-2 text-rose-500 hover:text-pink-600 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200 
                        flex items-center justify-center group-hover:bg-white group-hover:border-pink-300 
                        transition-all">
            <span className="text-xl">←</span>
          </div>
          <span className="text-sm font-medium">Back to workouts</span>
        </div>
      </button>

      {/* Workout header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200/50 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-200 to-rose-200 
                        flex items-center justify-center shadow-md">
            <span className="text-3xl">{getWorkoutEmoji()}</span>
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {workout.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full border border-pink-200">
                {workout.exercises.length} exercises
              </span>
              <span className="text-sm bg-rose-100 text-rose-600 px-3 py-1 rounded-full border border-rose-200">
                {formatDuration(totalDuration)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Motivational message */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
          <p className="text-center text-rose-600 font-medium">
            You're about to blossom! Get ready to shine ✨
          </p>
        </div>
      </div>

      {/* Exercise list header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-rose-700">Exercise Breakdown</h2>
        <span className="text-sm text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
          Step by step 🌸
        </span>
      </div>

      {/* Exercise list */}
      <div className="flex flex-col gap-3 mb-8 flex-1">
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm 
                      border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Exercise number */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 
                                flex items-center justify-center border border-pink-200">
                    <span className="font-bold text-rose-600">{index + 1}</span>
                  </div>
                  {index < workout.exercises.length - 1 && (
                    <div className="absolute -bottom-5 left-1/2 w-0.5 h-5 bg-gradient-to-b from-pink-200 to-transparent"></div>
                  )}
                </div>
                
                {/* Exercise info */}
                <div className="text-left">
                  <h3 className="font-medium text-rose-800 group-hover:text-pink-600 transition-colors">
                    {exercise.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-pink-50 text-pink-500 px-2 py-1 rounded-full">
                      ⏱️ {formatDuration(exercise.duration)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Duration indicator */}
              <div className="text-right">
                <div className="text-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {exercise.duration}s
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total duration and start button */}
      <div className="bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-sm 
                    rounded-2xl p-6 border border-pink-200/50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-rose-500">Total Duration</p>
            <p className="text-2xl font-bold text-rose-700">{formatDuration(totalDuration)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-rose-500">Estimated Calories</p>
            <p className="text-2xl font-bold text-rose-700">
              {Math.round(totalDuration / 60 * 5)} kcal
            </p>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-pink-400 to-rose-400 
                   text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg
                   hover:shadow-xl hover:from-pink-500 hover:to-rose-500 
                   transition-all duration-300 transform hover:-translate-y-1"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-xl">🚀</span>
            Start Workout
            <span className="text-xl">✨</span>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          
          {/* Sparkle effects */}
          <div className="absolute -top-2 left-1/4 w-3 h-3 rounded-full bg-white/60 group-hover:animate-ping"></div>
          <div className="absolute -bottom-2 right-1/3 w-2 h-2 rounded-full bg-white/60 group-hover:animate-ping" 
               style={{ animationDelay: '0.2s' }}></div>
        </button>
        
        <p className="text-center text-sm text-rose-500 mt-4">
          Take a deep breath and get ready! You've got this! 💖
        </p>
      </div>

      {/* Footer decoration */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-pink-400' : 'bg-pink-200'} animate-pulse`}
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSessionSummary;