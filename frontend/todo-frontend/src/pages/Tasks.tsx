import { useEffect, useState } from "react";
import { getTasks, type TaskDto, deleteTask } from "../api/tasks";
import { TaskForm } from "../components/TaskForm";

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks"));
  }, []);

  const handleDelete = (id: number) => {
    deleteTask(id)
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch(() => setError("Delete failed"));
  };

  const handleCreated = (newTask: TaskDto) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
      <TaskForm onCreated={handleCreated} />
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-start p-4 bg-white shadow rounded"
          >
            <div>
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              <p className="mt-1">
                Status:{" "}
                <span
                  className={
                    task.status === "DONE"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {task.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
