import { type FormEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, type LoginRequest } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: doLogin } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(form);
      doLogin(token);
      navigate("/tasks");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
          <label className="mb-2 text-gray-700">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            className="border border-gray-300 p-2 mb-6 rounded focus:outline-none focus:border-blue-500"
            placeholder="********"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
