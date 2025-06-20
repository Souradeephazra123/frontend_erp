import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Header from "./Header";
function Attendance() {
  const navigate = useNavigate();

  // Navigation options with paths and corresponding icons
  const sections = [
    {
      name: " Student Attendance",
      path: "/studentAttendance",
      icon: <PiStudentBold size={60} />,
    },
    {
      name: "Teacher Attendance",
      path: "/teacher",
      icon: <FaChalkboardTeacher size={60} />,
    },
  ];

  // Function to handle navigation on click
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Back Button and Title */}
      <div className="flex mb-12 border-b-2 pb-4 items-center space-x-4 bg-white shadow-sm p-4">
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <MdKeyboardArrowLeft className="text-3xl" />
        </Link>
        <h2 className="text-3xl font-bold text-gray-800">Attendance</h2>
      </div>

      {/* Navigation Cards */}
      <Box className=" mx-auto p-4">
        <Grid
          container
          spacing={6}
          justifyContent="center"
          className=" space-x-32"
        >
          {" "}
          {/* Increased spacing here */}
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                className="h-64 w-full p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center border-t-4 border-gray-200 hover:border-blue-500"
                onClick={() => handleNavigate(section.path)}
              >
                <Typography
                  variant="h5"
                  className="text-gray-700 mb-4 text-center font-semibold"
                >
                  {section.name}
                </Typography>
                <Box className="text-blue-500">{section.icon}</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Attendance;
