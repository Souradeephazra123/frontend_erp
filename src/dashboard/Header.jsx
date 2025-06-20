import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserGraduate,
  FaMoneyCheckAlt,
  FaCalendarCheck,
  FaCheckSquare,
  FaFileInvoiceDollar,
} from "react-icons/fa";
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
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../img/checklogo.jpeg";
import profileImage from "../img/Rectangle 65.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("User Type");

    setUserRole(role);
  }, []);

  const sections = [
    { name: "Home", path: "/dashboard", icon: <FaUserGraduate /> },
    { name: "Add Student", path: "/add-student", icon: <FaUserGraduate /> },
    {
      name: "Fee Category",
      path: "/category-for-fee",
      icon: <FaMoneyCheckAlt />,
    },
    { name: "View Data", path: "/filter", icon: <FaBook /> },
    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [{ name: "Update Fees", path: "/studentF", icon: <FaEdit /> }]
      : []),
    ...(userRole === "Super Admin" || userRole === "Admin 2"
      ? [{ name: "Attendance", path: "/attendance", icon: <FaCalendarCheck /> }]
      : []),
    { name: "Library", path: "/bookpage", icon: <FaBook /> },
    { name: "Revenue", path: "/revenue", icon: <FaBook /> },
    { name: "Promote", path: "/pass", icon: <FaBook /> },

    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [{ name: "Expense", path: "/expense", icon: <FaFileInvoiceDollar /> }]
      : []),
    { name: "Staff", path: "/staffHome", icon: <FaUsers /> },
    ...(userRole === "Super Admin" || userRole === "Admin 1"
      ? [{ name: "Approved Fee", path: "/approval", icon: <FaCheckSquare /> }]
      : []),
    { name: "Certificate", path: "/studentTable", icon: <FaCertificate /> },
    {
      name: "Certificate Request",
      path: "/request",
      icon: <FaClipboardCheck />,
    },
    { name: "PF & PTax Report", path: "/tax", icon: <FaCertificate /> },
    { name: "User Profile", path: "/user-profile", icon: <FaUserGraduate /> },
    { name: "Log Out", path: "/" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-[#1C61B8BA] text-black pt-1 px-2 pb-2">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className="hover:bg-[#1C61B8BA] p-2 rounded transition-colors duration-300 flex items-center space-x-2 text-white"
            >
              {section.icon}
              <span>{section.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar for smaller screens */}
      {isOpen && (
        <div className="md:hidden bg-[#1C61B8BA] text-black space-y-2 p-4">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              onClick={() => setIsOpen(false)}
              className="block hover:bg-[#7fb4e840] p-2 rounded transition-colors duration-300 flex items-center space-x-2"
            >
              {section.icon}
              <span>{section.name}</span>
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <IoMdArrowDropdown className="text-black" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={() => alert("Logout clicked")}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
