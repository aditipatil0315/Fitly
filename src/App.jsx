import { useState } from "react";
import Home from "./pages/Home";
import WorkoutSessionSummary from "./pages/WorkoutSessionSummary";
import WorkoutPlayer from "./pages/WorkoutPlayer";
import WorkoutSummary from "./pages/WorkoutSummary";

function App() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleFinish = (summaryData) => {
    setSummary(summaryData);
    setIsWorkoutStarted(false);
  };

  const handleReset = () => {
    setSelectedWorkout(null);
    setSummary(null);
  };

  return (
    <>
      {!selectedWorkout && !summary && (
        <Home onSelectWorkout={setSelectedWorkout} />
      )}

      {selectedWorkout && !isWorkoutStarted && !summary && (
        <WorkoutSessionSummary
          workoutKey={selectedWorkout}
          onBack={() => setSelectedWorkout(null)}
          onStart={() => setIsWorkoutStarted(true)}
        />
      )}

      {selectedWorkout && isWorkoutStarted && (
        <WorkoutPlayer
          workoutKey={selectedWorkout}
          onFinish={handleFinish}
        />
      )}

      {summary && (
        <WorkoutSummary summary={summary} onBack={handleReset} />
      )}
    </>
  );
}

export default App;
