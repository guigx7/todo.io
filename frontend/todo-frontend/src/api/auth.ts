import axios from "axios";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export async function signup(req: SignupRequest): Promise<void> {
  await axios.post("/api/auth/signup", req);
}

export async function login(req: LoginRequest): Promise<string> {
  const res = await axios.post<{ token: string }>("/api/auth/login", req);
  return res.data.token;
}
