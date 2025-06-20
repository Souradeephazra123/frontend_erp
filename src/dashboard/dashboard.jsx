import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaTags,
  FaEdit,
  FaClipboardCheck,
  FaCertificate,
  FaUsers,
  FaBook,
  FaMoneyBillAlt,
} from "react-icons/fa";
import Header from "./Header";
import logoLeft from "../img/1000077337-removebg-preview.png";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch user role from localStorage on component mount
  useEffect(() => {
    const role = localStorage.getItem("User Type");
    setUserRole(role);
  }, []);

  // Sections with role-based access control
  const sections = [
    {
      name: "Add Student",
      path: "/add-student",
      icon: <FaUserPlus size={60} />,
    },
    {
      name: "Fee Category",
      path: "/category-for-fee",
      icon: <FaTags size={60} />,
    },
    {
      name: "View Data",
      path: "/filter",
      icon: <FaMoneyBillAlt size={60} />,
    },
    {
      name: "Bus Fee",
      path: "/bus-fee",
      icon: <FaMoneyBillAlt size={60} />,
    },
    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [
          {
            name: "Update Fees",
            path: "/studentF",
            icon: <FaEdit size={60} />,
          },
        ]
      : []),
    ...(userRole === "Super Admin" || userRole === "Admin 2"
      ? [
          {
            name: "Attendance",
            path: "/attendance",
            icon: <FaClipboardCheck size={60} />,
          },
        ]
      : []),
    {
      name: "Library",
      path: "/bookpage",
      icon: <FaBook size={60} />,
    },
    {
      name: "Revenue",
      path: "/revenue",
      icon: <FaBook size={60} />,
    },
    {
      name: "Promote Student",
      path: "/pass",
      icon: <FaBook size={60} />,
    },
    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [
          {
            name: "Expense",
            path: "/expense",
            icon: <FaMoneyBillAlt size={60} />,
          },
        ]
      : []),
    { name: "Staff", path: "/staffHome", icon: <FaUsers size={60} /> },
    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [
          {
            name: "Approved Fee",
            path: "/approval",
            icon: <FaBook size={60} />,
          },
        ]
      : []),
    {
      name: "Certificate",
      path: "/studentTable",
      icon: <FaCertificate size={60} />,
    },
    {
      name: "Certificate Request",
      path: "/request",
      icon: <FaClipboardCheck size={60} />,
    },
    {
      name: "PF & PTax Report",
      path: "/tax",
      icon: <FaClipboardCheck size={60} />,
    },
    {
      name: "User Profile",
      path: "/user-profile",
      icon: <FaUserPlus size={60} />,
    },
  ];

  const gradients = [
    "bg-gradient-to-r from-blue-500 to-purple-500",
    "bg-gradient-to-r from-green-500 to-teal-500",
    "bg-gradient-to-r from-red-500 to-orange-500",
    "bg-gradient-to-r from-yellow-500 to-pink-500",
    "bg-gradient-to-r from-indigo-500 to-blue-400",
    "bg-gradient-to-r from-gray-500 to-gray-400",
    "bg-gradient-to-r from-pink-500 to-purple-600",
    "bg-gradient-to-r from-teal-600 to-lime-500",
    "bg-gradient-to-r from-blue-500 to-purple-500",
    "bg-gradient-to-r from-pink-500 to-purple-600",
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };
  const handlelogout = () => {
    navigate("/school");
  };
  return (
    <div>
      <Box className="p-4 font-serif bg-gray-100 min-h-screen">
        <div className="text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
            onClick={handlelogout}
          >
            School Page
          </button>
        </div>

        <Grid container spacing={2} justifyContent="center">
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                className={`h-[200px] w-full ${
                  gradients[index % gradients.length]
                } p-6 shadow-lg rounded-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-between border-2 border-transparent hover:border-white hover:scale-105`}
                onClick={() => handleNavigate(section.path)}
              >
                <Typography variant="h5" className="text-white text-center">
                  {section.name}
                </Typography>
                <Box className="text-white">{section.icon}</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
