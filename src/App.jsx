import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import Statistics from "./components/Statistics";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "white" : "black",
      }}
      className="min-h-screen flex flex-col items-center justify-center transition-all duration-300"
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 bg-blue-500 px-4 py-2 rounded-lg text-white"
      >
        {darkMode ? "Light Mode ☀" : "Dark Mode 🌙"}
      </button>

      <h1
        style={{
          color: darkMode ? "white" : "black",
        }}
        className="text-5xl font-bold mb-8"
      >
        Pomodoro App
      </h1>

      <Timer darkMode={darkMode} />

      <Statistics tasks={tasks} />

      <TaskList
        darkMode={darkMode}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;