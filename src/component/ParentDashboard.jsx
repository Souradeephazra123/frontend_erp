import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../dashboard/Header";

const ParentDashboard = () => {
  const [userType, setUserType] = useState("");
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in as parent
    const currentUserType = localStorage.getItem("User Type");
    const parentStudentName = localStorage.getItem("parentStudentName");

    if (currentUserType !== "parent") {
      // Redirect non-parent users to main login
      navigate("/");
      return;
    }

    setUserType(currentUserType);
    setStudentName(parentStudentName || "Student");
  }, [navigate]);

  const parentSections = [
    {
      title: "Attendance Reports",
      description: "View and download your child's attendance records",
      icon: "📅",
      path: "/parent/attendance",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Fee Details",
      description: "Check fee status, payment history, and download receipts",
      icon: "💰",
      path: "/parent/fees",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Certificates",
      description: "Request and download academic certificates",
      icon: "📜",
      path: "/parent/certificates",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Student Profile",
      description: "View your child's academic profile and information",
      icon: "👤",
      path: "/parent/profile",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("User Type");
    localStorage.removeItem("parentStudentId");
    localStorage.removeItem("parentStudentName");
    navigate("/parent-login");
  };

  if (userType !== "parent") {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-6">
          {/* Welcome Header */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome to Parent Portal
                </h1>
                <p className="text-gray-600">
                  Access your child's academic information:{" "}
                  <strong>{studentName}</strong>
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📊</div>
                <div>
                  <p className="text-sm text-gray-600">Access Level</p>
                  <p className="text-lg font-semibold">Parent</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🎓</div>
                <div>
                  <p className="text-sm text-gray-600">Student</p>
                  <p className="text-lg font-semibold">{studentName}</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🔒</div>
                <div>
                  <p className="text-sm text-gray-600">Security</p>
                  <p className="text-lg font-semibold">Protected</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📱</div>
                <div>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                  <p className="text-lg font-semibold">Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parentSections.map((section, index) => (
              <div
                key={index}
                onClick={() => navigate(section.path)}
                className={`${section.color} text-white rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="text-4xl mb-4">{section.icon}</div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-sm opacity-90">{section.description}</p>
                <div className="mt-4 flex items-center text-sm">
                  <span>Click to access</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Information Panel */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Parent Portal Information
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Access real-time attendance data and generate reports
                    </li>
                    <li>View detailed fee breakdown and payment history</li>
                    <li>Download certificates and academic documents</li>
                    <li>
                      All data is secure and only accessible to authorized
                      parents
                    </li>
                    <li>
                      For technical support, contact the school administration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity (Optional Enhancement) */}
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Access Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/parent/attendance")}
                className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-lg mb-1">📊 Latest Attendance</div>
                <div className="text-sm text-gray-600">
                  View recent attendance records
                </div>
              </button>
              <button
                onClick={() => navigate("/parent/fees")}
                className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-lg mb-1">💸 Outstanding Fees</div>
                <div className="text-sm text-gray-600">
                  Check pending payments
                </div>
              </button>
              <button
                onClick={() => navigate("/parent/certificates")}
                className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-lg mb-1">📄 Recent Certificates</div>
                <div className="text-sm text-gray-600">
                  Download available documents
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;
