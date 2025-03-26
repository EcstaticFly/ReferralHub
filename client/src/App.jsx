import Navbar from "./components/navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { authStore } from "./store/authStore.js";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import HomePage from "./pages/Home.jsx";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfilePage from "./pages/Profile.jsx";

function App() {
  const { user, checkAuth, isLoading } = authStore();
  useEffect(() => {
     checkAuth();
  }, [checkAuth]);

  // console.log(user, "user");

  if (isLoading && !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LoaderCircle className="size-10 mb-3 animate-spin" />
        <h1 className="font-extralight tracking-wider">Please Wait...</h1>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/register" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/register" />}
        />
        <Route path="*" element={<h1 className="text-5xl font-extrabold mt-52">Oops!...Page Not found.</h1>} />
      </Routes>
    </div>
  );
}
export default App;
