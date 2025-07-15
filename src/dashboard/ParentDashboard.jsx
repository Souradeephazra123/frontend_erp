import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaMoneyBillAlt,
  FaCertificate,
  FaCalendarCheck,
  FaDownload,
  FaEye,
} from "react-icons/fa";
import Header from "./Header";

const ParentDashboard = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // Fetch user role from localStorage on component mount
  useEffect(() => {
    const role = localStorage.getItem("User Type");
    setUserRole(role);

    // Redirect if not a parent
    if (role !== "parent") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Parent-specific sections
  const parentSections = [
    {
      name: "Student Attendance",
      path: "/parent/attendance",
      icon: <FaCalendarCheck size={60} />,
      description: "View your child's attendance records",
      color: "bg-blue-500",
    },
    {
      name: "Fee Details",
      path: "/parent/fees",
      icon: <FaMoneyBillAlt size={60} />,
      description: "View and download fee statements",
      color: "bg-green-500",
    },
    {
      name: "Certificates",
      path: "/parent/certificates",
      icon: <FaCertificate size={60} />,
      description: "View and download certificates",
      color: "bg-purple-500",
    },
    {
      name: "Student Profile",
      path: "/parent/profile",
      icon: <FaUser size={60} />,
      description: "View your child's profile information",
      color: "bg-orange-500",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Parent Portal
            </h1>
            <p className="text-lg text-gray-600">
              Access your child's attendance, fee details, and certificates
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <FaEye className="mx-auto text-4xl text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                View Only Access
              </h3>
              <p className="text-gray-600">
                Secure read-only access to your child's data
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <FaDownload className="mx-auto text-4xl text-green-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Download Reports
              </h3>
              <p className="text-gray-600">
                Download attendance, fee receipts and certificates
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <FaCertificate className="mx-auto text-4xl text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Official Documents
              </h3>
              <p className="text-gray-600">
                Access all official school documents
              </p>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentSections.map((section, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(section.path)}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden"
              >
                <div className={`${section.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {section.name}
                      </h3>
                      <p className="text-white/90">{section.description}</p>
                    </div>
                    <div className="text-white/80 group-hover:text-white transition-colors">
                      {section.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Click to access</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
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
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Important Information
            </h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              <li>
                You have view-only access to your child's academic information
              </li>
              <li>All documents can be downloaded for your records</li>
              <li>
                For any queries or concerns, please contact the school
                administration
              </li>
              <li>
                Your login credentials are confidential - do not share with
                others
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;
