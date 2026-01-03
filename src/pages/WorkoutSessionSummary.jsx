import { workouts } from "../data/workouts";

const WorkoutSessionSummary = ({ workoutKey, onBack, onStart }) => {
  const workout = workouts[workoutKey];

  const totalDuration = workout.exercises.reduce(
    (sum, ex) => sum + ex.duration,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex flex-col">
      
      {/* Back arrow */}
      <button
        onClick={onBack}
        className="self-start mb-4 text-white hover:text-gray-400 transition"
      >
        &#8592; Back
      </button>

      {/* Workout title */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        {workout.title}
      </h1>

      {/* Exercise list */}
      <div className="flex flex-col gap-2 mb-6">
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-gray-700 py-2 text-sm sm:text-base"
          >
            <span>{index + 1}. {exercise.name}</span>
            <span>{exercise.duration}s</span>
          </div>
        ))}
      </div>

      {/* Total duration */}
      <p className="text-gray-400 mb-6">
        Total Duration: {totalDuration}s
      </p>

      <button
        onClick={onStart}
        className="border border-white py-3 rounded-lg hover:bg-white hover:text-black transition"
      >
        Start Workout
      </button>

    </div>
  );
};

export default WorkoutSessionSummary;
