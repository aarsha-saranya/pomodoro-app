import { useState, useEffect } from "react";

function Timer({ darkMode }) {
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setIsRunning(false);

            if (mode === "focus") {
              setMode("break");
              return 300;
            } else {
              setMode("focus");
              return 1500;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (mode === "focus") {
      setSeconds(1500);
    } else {
      setSeconds(300);
    }

    setIsRunning(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1f2937" : "white",
        color: darkMode ? "white" : "black",
      }}
      className="p-8 rounded-2xl shadow-lg text-center"
    >
      <h2
        style={{
          color: darkMode ? "white" : "black",
        }}
        className="text-2xl mb-4 font-semibold"
      >
        {mode === "focus" ? "Focus Time" : "Break Time"}
      </h2>

      <h1
        style={{
          color: darkMode ? "white" : "black",
        }}
        className="text-6xl font-bold mb-6"
      >
        {minutes}:{remainingSeconds.toString().padStart(2, "0")}
      </h1>

      <div className="space-x-4">
        <button
          onClick={startTimer}
          className="bg-green-500 px-4 py-2 rounded-lg text-white"
        >
          Start
        </button>

        <button
          onClick={stopTimer}
          className="bg-yellow-500 px-4 py-2 rounded-lg text-white"
        >
          Stop
        </button>

        <button
          onClick={resetTimer}
          className="bg-red-500 px-4 py-2 rounded-lg text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;