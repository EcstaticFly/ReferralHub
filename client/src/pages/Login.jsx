import { useState } from "react";
import { authStore } from "../store/authStore.js";
import { EyeOff, MessageSquare, Eye, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const { login, isLoggingIn } = authStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <MessageSquare className="size-6 text-gray-600 dark:text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Login to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            {/* <label className="block text-gray-700 dark:text-gray-300">Email</label> */}
            <input
              type="email"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
          </div>

          <div>
            {/* <label className="block text-gray-700 dark:text-gray-300">Password</label> */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader className="size-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
