import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [value, setValue] = useState({
    userName: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/login`,
        value
      );
      console.log("Login response:", res);

      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.accessToken);
        localStorage.setItem("User Type", res.data.userType);
        console.log("Token saved:", localStorage.getItem("authToken")); // Debugging
        navigate("/school"); // Redirect to dashboard
      } else {
        setError(res.data.Message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error); // Debugging

      setError("Invalid Id and Password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setValue({ ...value, userName: e.target.value })}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Dynamic type
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setValue({ ...value, userPassword: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"} {/* Eye icon */}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Parent Portal?{" "}
            <Link
              to="/parent-login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
