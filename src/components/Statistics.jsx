function Statistics({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks =
    totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="p-6 rounded-2xl shadow-lg mt-8 w-full max-w-md bg-blue-500 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Statistics
      </h2>

      <p>Total Tasks: {totalTasks}</p>
      <p>Completed: {completedTasks}</p>
      <p>Remaining: {remainingTasks}</p>
      <p>Completion Rate: {completionRate}%</p>
    </div>
  );
}

export default Statistics;