import { useEffect, useState, useContext, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, type TaskDto, deleteTask, updateTask } from "../api/tasks";
import { TaskForm } from "../components/TaskForm";
import { AuthContext } from "../contexts/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    description: string;
    dueDate: string;
    status: "PENDING" | "DONE";
  }>({ title: "", description: "", dueDate: "", status: "PENDING" });

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditClick = (task: TaskDto) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status as "PENDING" | "DONE",
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // submete a edição
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    try {
      const updated = await updateTask(editingId, editData);
      setTasks((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
      setEditingId(null);
    } catch {
      setError("Update failed");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
      <TaskForm onCreated={handleCreated} />
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 bg-white shadow rounded">
            {editingId === task.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div>
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="dueDate"
                    value={editData.dueDate}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  />
                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleEditCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
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
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
