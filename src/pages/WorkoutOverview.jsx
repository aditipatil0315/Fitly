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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">

        <p className="text-sm sm:text-base text-gray-400">
          Exercise {currentIndex + 1} of {exercises.length}
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold">
          {currentExercise.name}
        </h1>

        <div className="text-5xl sm:text-6xl font-mono">
          {timeLeft}s
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="border border-white px-6 py-3 rounded-lg text-sm sm:text-base
                       hover:bg-white hover:text-black transition"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button
            onClick={handleSkip}
            className="border border-gray-500 px-6 py-3 rounded-lg text-gray-400 text-sm sm:text-base
                       hover:border-white hover:text-white transition"
          >
            Skip
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorkoutPlayer;
