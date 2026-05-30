import { useState } from "react";

function TaskList({ darkMode, tasks, setTasks }) {
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      completedPomodoros: 0,
      targetPomodoros: 4,
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

  const incrementPomodoro = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCount = Math.min(
            task.completedPomodoros + 1,
            task.targetPomodoros
          );

          return {
            ...task,
            completedPomodoros: newCount,
            completed:
              newCount === task.targetPomodoros
                ? true
                : task.completed,
          };
        }

        return task;
      })
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

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1"
              />

              <div className="flex-1">
                <p
                  className={
                    task.completed
                      ? "line-through opacity-50"
                      : ""
                  }
                >
                  {task.text}
                </p>

                <div className="mt-2">
                  <p className="text-sm">
                    🍅 {task.completedPomodoros} /{" "}
                    {task.targetPomodoros}

                    {task.completedPomodoros ===
                      task.targetPomodoros && (
                      <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        ✅ Goal Reached
                      </span>
                    )}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-400 rounded-full h-4 mt-2">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        task.completedPomodoros ===
                        task.targetPomodoros
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${
                          (task.completedPomodoros /
                            task.targetPomodoros) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      incrementPomodoro(task.id)
                    }
                    className="bg-green-500 px-3 py-1 rounded text-white"
                  >
                    +1 🍅
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;