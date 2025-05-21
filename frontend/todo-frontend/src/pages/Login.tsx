// frontend/src/pages/Login.tsx
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: chamar API de login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {" "}
      {/* A */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {" "}
        {/* B */}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>{" "}
        {/* C */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {" "}
          {/* D */}
          <label className="mb-2 text-gray-700">Email</label>
          <input
            type="email"
            className="border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:border-blue-500"
            placeholder="you@mail.com"
            required
          />
          <label className="mb-2 text-gray-700">Password</label>
          <input
            type="password"
            className="border border-gray-300 p-2 mb-6 rounded focus:outline-none focus:border-blue-500"
            placeholder="********"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {" "}
          {/* E */}
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
