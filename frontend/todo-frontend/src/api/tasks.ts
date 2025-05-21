import axios from "axios";

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export async function getTasks(): Promise<TaskDto[]> {
  const res = await axios.get<TaskDto[]>("/api/tasks");
  return res.data;
}

export async function createTask(dto: Omit<TaskDto, "id">): Promise<TaskDto> {
  const res = await axios.post<TaskDto>("/api/tasks", dto);
  return res.data;
}

export async function updateTask(
  id: number,
  dto: Omit<TaskDto, "id">
): Promise<TaskDto> {
  const res = await axios.put<TaskDto>(`/api/tasks/${id}`, dto);
  return res.data;
}

export async function deleteTask(id: number): Promise<void> {
  await axios.delete(`/api/tasks/${id}`);
}
