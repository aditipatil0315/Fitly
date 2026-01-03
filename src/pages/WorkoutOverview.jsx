import { useEffect, useState } from "react";
import { workouts } from "../data/workouts";

const EXERCISE_DURATION = 60; // seconds

const WorkoutPlayer = ({ workoutKey, onFinish }) => {
  const exercises = workouts[workoutKey].exercises;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
  const [isPaused, setIsPaused] = useState(false);

  const currentExercise = exercises[currentIndex];

  // Timer logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto move to next exercise when time ends
  useEffect(() => {
    if (timeLeft > 0) return;

    goToNextExercise();
  }, [timeLeft]);

  const goToNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(EXERCISE_DURATION);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    goToNextExercise();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-lavender-50 text-rose-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Progress indicator */}
        <div className="relative">
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-300 to-rose-300 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-rose-500 mt-2 font-medium">
            Exercise {currentIndex + 1} of {exercises.length}
          </p>
        </div>

        {/* Exercise card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg 
                       border border-pink-200/50 transform transition-transform hover:scale-[1.02]">
          {/* Timer circle */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute w-40 h-40 rounded-full border-8 border-pink-100"></div>
            <div className="w-40 h-40 rounded-full border-8 border-transparent 
                          border-t-pink-300 border-r-lavender-300 border-b-rose-300 border-l-peach-300
                          animate-spin-slow"></div>
            <div className="absolute text-5xl sm:text-6xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              {timeLeft}s
            </div>
          </div>

          {/* Exercise name */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {currentExercise.name}
          </h1>
          <p className="text-rose-400 text-sm mb-6">💖 Stay strong! You've got this! 💖</p>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="group relative overflow-hidden bg-gradient-to-r from-pink-300 to-rose-300 
                       text-white px-8 py-3 rounded-full font-semibold text-sm sm:text-base
                       shadow-lg hover:shadow-xl hover:from-pink-400 hover:to-rose-400 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                {isPaused ? "▶️ Resume" : "⏸️ Pause"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>

            <button
              onClick={handleSkip}
              className="group bg-white/50 backdrop-blur-sm border-2 border-lavender-300 
                       text-lavender-600 px-8 py-3 rounded-full font-semibold text-sm sm:text-base
                       hover:bg-white/80 hover:border-lavender-400 hover:text-lavender-700 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                ⏭️ Skip
              </span>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-pink-300' : i === 1 ? 'bg-rose-300' : 'bg-lavender-300'} animate-pulse`}></div>
            ))}
          </div>
        </div>

        {/* Inspirational message */}
        <p className="text-sm text-rose-400/70 italic">
          {["🌸 You're doing amazing!", "✨ One step at a time!", "💫 Power through!", "🎀 Almost there!"][currentIndex % 4]}
        </p>
      </div>
      
      {/* Floating decorative elements */}
      <div className="fixed top-1/4 left-1/4 w-6 h-6 rounded-full bg-pink-200/40 animate-float"></div>
      <div className="fixed bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-rose-200/40 animate-float-delayed"></div>
    </div>
  );
};

export default WorkoutPlayer;