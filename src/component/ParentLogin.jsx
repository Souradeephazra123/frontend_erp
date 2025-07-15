import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ParentLogin = () => {
  const [value, setValue] = useState({
    studentId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleParentLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Mock parent login validation - replace with actual API call
      const mockParentCredentials = [
        {
          studentId: "2024001",
          password: "parent123",
          studentName: "John Doe",
        },
        {
          studentId: "2024002",
          password: "parent456",
          studentName: "Jane Smith",
        },
        {
          studentId: "2024003",
          password: "parent789",
          studentName: "Mike Johnson",
        },
      ];

      const parentAccount = mockParentCredentials.find(
        (account) =>
          account.studentId === value.studentId &&
          account.password === value.password
      );

      if (parentAccount) {
        // Set parent session data
        localStorage.setItem("authToken", "parent_token_" + value.studentId);
        localStorage.setItem("User Type", "parent");
        localStorage.setItem("parentStudentId", value.studentId);
        localStorage.setItem("parentStudentName", parentAccount.studentName);

        console.log(
          "Parent login successful for student:",
          parentAccount.studentName
        );
        navigate("/parent"); // Redirect to parent dashboard
      } else {
        setError("Invalid Student ID or Password");
      }
    } catch (error) {
      console.error("Error during parent login:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Parent Portal
          </h1>
          <p className="text-gray-600">
            Access your child's school information
          </p>
        </div>

        <form onSubmit={handleParentLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID / Admission Number
            </label>
            <input
              type="text"
              placeholder="Enter Student ID"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value.studentId}
              onChange={(e) =>
                setValue({ ...value, studentId: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Login to Parent Portal
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Staff Login?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Click here
            </button>
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Parent Portal Features:
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• View and download attendance reports</li>
            <li>• Check fee details and payment history</li>
            <li>• Access and download certificates</li>
            <li>• View student profile information</li>
          </ul>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-xs text-yellow-700">
            <strong>Demo Credentials:</strong>
            <br />
            Student ID: 2024001, Password: parent123
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
