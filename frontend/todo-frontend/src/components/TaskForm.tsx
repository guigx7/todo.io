import { useState, type FormEvent } from "react";
import { createTask, type TaskDto } from "../api/tasks";

interface Props {
  onCreated: (task: TaskDto) => void;
}

export function TaskForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"PENDING" | "DONE">("PENDING");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const dto = { title, description, dueDate, status };
      const newTask = await createTask(dto);
      onCreated(newTask);
      // limpa o form
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("PENDING");
      setError(null);
    } catch {
      setError("Could not create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded">
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="PENDING">PENDING</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
