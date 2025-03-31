import { useState } from "react";
import { authStore } from "../store/authStore";
import { EyeOff, MessageSquare, Eye, Loader, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  businessType: "",
};

const businessTypes = [
  "Retail", "E-commerce", "Healthcare", "Finance", "Education",
  "Technology", "Real Estate", "Hospitality", "Manufacturing", "Consulting"
];

export default function RegisterPage() {
  const { register, isRegistering } = authStore();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    if (!validateEmailDomain(formData.email)) {
      toast.error("Only Gmail, Yahoo, and iiitranchi emails allowed");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 relative">
        <div className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 rounded-xl bg-gray-700 flex items-center justify-center">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-gray-400">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Business Name"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
              value={formData.fullName}
              autoFocus="true"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="relative">
            <div
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 cursor-pointer flex justify-between items-center focus:outline-none focus:border-blue-400"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {formData.businessType || "Select Business Type"}
              <ChevronDown className="size-5 text-gray-400" />
            </div>
            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full bg-gray-700 border border-gray-600 rounded-lg mt-1 z-10 max-h-48 overflow-auto shadow-lg">
                {businessTypes.map((type) => (
                  <div
                    key={type}
                    className="px-4 py-3 hover:bg-gray-600 cursor-pointer"
                    onClick={() => {
                      setFormData({ ...formData, businessType: type });
                      setDropdownOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
              value={formData.password}
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader className="size-6 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
