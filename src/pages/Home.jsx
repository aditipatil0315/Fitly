import { workouts } from "../data/workouts";

const Home = ({ onSelectWorkout }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Welcome
        </h1>

        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          Choose a workout to get started
        </p>

        <div className="flex flex-col gap-4">
          {Object.keys(workouts).map((key) => (
            <button
              key={key}
              onClick={() => onSelectWorkout(key)}
              className="border border-white py-3 rounded-lg text-sm sm:text-base
                         hover:bg-white hover:text-black transition"
            >
              {workouts[key].title}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
