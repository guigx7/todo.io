import axios from "axios";

export async function getHealth(): Promise<string> {
  const response = await axios.get<string>("http://localhost:8080/api/health");
  return response.data;
}
