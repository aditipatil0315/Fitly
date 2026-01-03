const WorkoutSummary = ({ summary, onBack }) => {
  const { total, completed, skipped, percentage } = summary;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">

        <h1 className="text-2xl sm:text-3xl font-semibold">
          Workout Summary
        </h1>

        <div className="text-gray-400 space-y-1">
          <p>Total exercises: {total}</p>
          <p>Completed: {completed}</p>
          <p>Skipped: {skipped}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-lg font-semibold">
          {percentage}% completed
        </p>

        <button
          onClick={onBack}
          className="border border-white px-8 py-3 rounded-lg
                     hover:bg-white hover:text-black transition"
        >
          Back to Home
        </button>

      </div>
    </div>
  );
};

export default WorkoutSummary;
