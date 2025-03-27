import Navbar from "./components/navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { authStore } from "./store/authStore.js";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import HomePage from "./pages/Home.jsx";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";

function App() {
  const { user, checkAuth, isLoading } = authStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user, "user");

  if (isLoading && !user) {
    return (
      <div className="bg-gray-800  flex flex-col items-center justify-center h-screen">
        <LoaderCircle className="size-12 mb-3 animate-spin text-white" />
        <h1 className="font-extralight tracking-wider text-white">
          Please Wait...
        </h1>
      </div>
    );
  }
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="*"
          element={
            <h1 className="text-5xl font-extrabold mt-52">
              Oops!...Page Not found.
            </h1>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
