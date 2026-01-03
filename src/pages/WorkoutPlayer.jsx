import { useEffect, useState } from "react";
import { workouts } from "../data/workouts";

const EXERCISE_DURATION = 60;

const WorkoutPlayer = ({ workoutKey, onFinish }) => {
  const exercises = workouts[workoutKey].exercises;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [skipped, setSkipped] = useState(0);

  const isLastExercise = currentIndex === exercises.length - 1;
  const currentExercise = exercises[currentIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft > 0) return;

    setCompleted((prev) => prev + 1);
    goToNextExercise();
  }, [timeLeft]);

  const goToNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
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
    const total = exercises.length;
    const percentage = Math.round((completed / total) * 100);

    onFinish({
      total,
      completed,
      skipped,
      percentage
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">

        <p className="text-gray-400">
          Exercise {currentIndex + 1} of {exercises.length}
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold">
          {currentExercise.name}
        </h1>

        <div className="text-5xl font-mono">
          {timeLeft}s
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="border border-white px-6 py-3 rounded-lg
                       hover:bg-white hover:text-black transition"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          {!isLastExercise && (
            <button
              onClick={handleSkip}
              className="border border-gray-500 px-6 py-3 rounded-lg text-gray-400
                         hover:border-white hover:text-white transition"
            >
              Skip
            </button>
          )}

          {isLastExercise && (
            <button
              onClick={finishWorkout}
              className="border border-white px-6 py-3 rounded-lg
                         hover:bg-white hover:text-black transition"
            >
              End Workout
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default WorkoutPlayer;
