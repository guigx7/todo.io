import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, type SignupRequest } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState<SignupRequest>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
            placeholder="Your Name"
            required
          />
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
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
