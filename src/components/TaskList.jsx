import { useState, useEffect } from "react";

function TaskList({ darkMode }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg mt-8 w-full max-w-md ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        Tasks
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg outline-none text-black"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`px-4 py-2 rounded-lg flex justify-between items-center ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span
  className={`${
    task.completed
      ? "line-through opacity-50"
      : ""
  } ${
    darkMode ? "text-white" : "text-black"
  }`}
>
                {task.text}
              </span>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 px-3 py-1 rounded-lg text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;