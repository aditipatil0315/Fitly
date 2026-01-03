import { useEffect, useRef, useState } from "react";
import { workouts } from "../data/workouts";
import StickFigure from "../components/StickFigure";

const EXERCISE_DURATION = 60;

const WorkoutPlayer = ({ workoutKey, onFinish }) => {
  const exercises = workouts[workoutKey].exercises;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [skipped, setSkipped] = useState(0);

  const tickSound = useRef(new Audio("/sounds/tick.mp3"));
  const completeSound = useRef(new Audio("/sounds/complete.mp3"));
  const finishSound = useRef(new Audio("/sounds/finish.mp3"));

  const isLastExercise = currentIndex === exercises.length - 1;
  const currentExercise = exercises[currentIndex];

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      // optional tick sound (last 5 seconds only)
      if (timeLeft <= 5 && timeLeft > 1) {
        tickSound.current.play();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft]);

  /* -------- When exercise ends ---------- */
  useEffect(() => {
    if (timeLeft > 0) return;

    completeSound.current.play();
    setCompleted((prev) => prev + 1);
    goToNextExercise();
  }, [timeLeft]);

  const goToNextExercise = () => {
    if (!isLastExercise) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(EXERCISE_DURATION);
    } else {
      finishWorkout();
    }
  };

  const handleSkip = () => {
    setSkipped((prev) => prev + 1);
    goToNextExercise();
  };

  const finishWorkout = () => {
    finishSound.current.play();

    const total = exercises.length;
    const percentage = Math.round((completed / total) * 100);

    onFinish({
      total,
      completed,
      skipped,
      percentage
    });
  };

  /* -------- Progress calculation -------- */
  const currentExerciseProgress =
    (EXERCISE_DURATION - timeLeft) / EXERCISE_DURATION;

  const overallProgress =
    ((currentIndex + currentExerciseProgress) / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lavender-50 to-peach-50 flex flex-col px-4 py-6 relative">
      
      {/* Decorative background elements */}
      <div className="fixed top-20 left-10 w-8 h-8 rounded-full bg-pink-200/30 animate-float"></div>
      <div className="fixed bottom-20 right-10 w-6 h-6 rounded-full bg-rose-200/40 animate-float-delayed"></div>
      
      {/* Back button */}
      <button
        onClick={finishWorkout}
        className="absolute top-6 left-6 group z-10"
      >
        <div className="flex items-center gap-2 text-rose-500 hover:text-pink-600 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200 
                        flex items-center justify-center group-hover:bg-white transition-all">
            <span className="text-lg">←</span>
          </div>
          <span className="text-sm font-medium hidden sm:inline">Back</span>
        </div>
      </button>

      {/* Progress bar */}
      <div className="relative mt-4 mb-8">
        <div className="text-center mb-2">
          <span className="text-sm text-rose-500 font-medium">
            Exercise {currentIndex + 1} of {exercises.length}
          </span>
        </div>
        <div className="relative h-3 bg-white/60 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 
                       transition-all duration-300 ease-out rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
          {/* Progress dots */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            {exercises.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full border-2 ${index <= currentIndex ? 'bg-white border-pink-400' : 'bg-white/30 border-pink-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Timer circle */}
        <div className="relative">
          <div className="w-64 h-64 rounded-full border-8 border-pink-100 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-4 border-transparent 
                          border-t-pink-300 border-r-lavender-300 border-b-rose-300 border-l-peach-300
                          animate-spin-slow">
            </div>
            <div className="absolute text-7xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {timeLeft}s
            </div>
          </div>
          
          {/* Timer status */}
          <div className="mt-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isPaused ? 'bg-rose-100 text-rose-600' : 'bg-pink-100 text-pink-600'}`}>
              <span>{isPaused ? "⏸️ Paused" : "▶️ Active"}</span>
            </div>
          </div>
        </div>

        {/* Exercise name */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200/50 w-full max-w-lg">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {currentExercise.name}
          </h1>
          
          {/* Stick figure container */}
          <div className="bg-gradient-to-br from-pink-50 to-lavender-50 rounded-xl p-6 border border-pink-200 mb-6">
            <StickFigure
              animation={currentExercise.animation}
              paused={isPaused}
            />
          </div>
          
          {/* Inspirational message */}
          <p className="text-rose-500 text-sm italic">
            {timeLeft <= 10 
              ? "💪 Almost there! Push through!" 
              : "✨ You're doing amazing! Keep going!"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="group relative overflow-hidden bg-gradient-to-r from-pink-400 to-rose-400 
                     text-white px-8 py-3 rounded-full font-semibold shadow-lg
                     hover:shadow-xl hover:from-pink-500 hover:to-rose-500 
                     transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              {isPaused ? "▶️ Resume" : "⏸️ Pause"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>

          {!isLastExercise && (
            <button
              onClick={handleSkip}
              className="group bg-white/80 backdrop-blur-sm border-2 border-lavender-300 
                       text-lavender-600 px-8 py-3 rounded-full font-semibold
                       hover:bg-white hover:border-lavender-400 hover:text-lavender-700 
                       transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <span className="flex items-center gap-2">
                ⏭️ Skip
              </span>
            </button>
          )}

          {isLastExercise && (
            <button
              onClick={finishWorkout}
              className="group bg-gradient-to-r from-purple-400 to-pink-400 
                       text-white px-8 py-3 rounded-full font-semibold shadow-lg
                       hover:shadow-xl hover:from-purple-500 hover:to-pink-500 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                🎉 Finish Workout
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm text-rose-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-400"></div>
            <span>Completed: {completed}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lavender-400"></div>
            <span>Skipped: {skipped}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <span>Left: {exercises.length - currentIndex - 1}</span>
          </div>
        </div>
      </div>

      {/* Next exercise preview */}
      {!isLastExercise && (
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-200">
          <p className="text-sm text-rose-500 mb-2">Up Next:</p>
          <p className="text-rose-700 font-medium">
            {exercises[currentIndex + 1].name}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlayer;