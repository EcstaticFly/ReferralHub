import {  useState } from "react";
import { authStore } from "../store/authStore";
import { EyeOff, MessageSquare, Eye, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'


const initialState = {
  fullName: "",
  email: "",
  password: "",
};
export default function RegisterPage() {
  const { register, isRegistering } = authStore();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  function validateEmailDomain(email) {

    const gmailRegex = /^[^@]+@gmail\.com$/;

    const yahooRegex = /^[^@]+@yahoo\.com$/;

    const iiitRanchiRegex = /^[^@]+@iiitranchi\.ac\.in$/;

    return gmailRegex.test(email) || yahooRegex.test(email) || iiitRanchiRegex.test(email);

}

  const isFormValid = async () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return false;
    }
    if (formData.password.trim().length < 6) {
      toast.error("Password must have at least 6 characters");
      return false;
    }
    if(!validateEmailDomain(formData.email)){
      toast.error("Only Gmail, yahoo and iiitranchi emails allowed");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await isFormValid();
    if (isValid) {
      await register(formData);
    }
  };

  // console.log(formData, "formData");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 ">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-7">
            <label className="border-2 rounded-lg p-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow p-1 outline-none"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(event) => {
                  setFormData({ ...formData, fullName: event.target.value });
                }}
              />
            </label>
            <label className="border-2 rounded-lg p-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow p-1 outline-none"
                placeholder="Email"
                value={formData.email}
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                }}
              />
            </label>
            <label className="border-2 rounded-lg p-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="grow p-1 outline-none"
                placeholder="Password"
                value={formData.password}
                onChange={(event) => {
                  setFormData({ ...formData, password: event.target.value });
                }}
              />
              <button
                type="button"
                className="h-4 w-4 mr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </label>
            <button
              className="flex flex-row gap-1.5 items-center justify-center bg-gradient-to-b from-black/85 to-black/55 text-white rounded-full p-2 cursor-pointer  w-full"
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader className="size-6 animate-spin" />
                  <span className="font-semibold">Registering...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
