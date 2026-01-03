import { useEffect, useRef, useState } from "react";
import { workouts } from "../data/workouts";

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
    <div className="min-h-screen relative bg-black text-white px-4 py-6 flex flex-col">

      {/* Back arrow */}
      <button
        onClick={finishWorkout}
        className="absolute top-4 left-4 text-white hover:text-gray-400"
      >
        ←
      </button>

      {/* Progress bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-8">
        <div
          className="bg-white h-full transition-all duration-300"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 text-center space-y-6">
        <p className="text-gray-400">
          Exercise {currentIndex + 1} of {exercises.length}
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold">
          {currentExercise.name}
        </h1>

        <div className="text-5xl sm:text-6xl font-mono">
          {timeLeft}s
        </div>

        <div className="flex gap-4">
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
