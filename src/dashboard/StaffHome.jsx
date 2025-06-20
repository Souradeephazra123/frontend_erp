import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoAddCircleSharp } from "react-icons/io5";
import Header from "./Header";

const StaffHome = () => {
  const [staffList, setStaffList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/attendance/stafflist`,
        );
        setStaffList(response.data);
      } catch (error) {
        console.error("Error fetching staff list:", error);
      }
    };

    fetchStaffList();
  }, []);

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Staff List</h1>
          <Link
            to="/teacherr"
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            <IoAddCircleSharp className="text-2xl mr-2" />
            Add Staff
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full max-w-lg p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="ml-3 text-2xl text-blue-600 hover:text-blue-700">
            <CiSearch />
          </button>
        </div>

        {/* Staff List */}
        {filteredStaff.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No staff found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <CgProfile className="text-5xl text-gray-500" />
                  <div>
                    <p className="text-xl font-semibold">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.designation}</p>
                  </div>
                </div>

                <div className="mt-4 text-gray-700">
                  <p>
                    <strong>Gender:</strong> {staff.gender}
                  </p>
                  <p>
                    <strong>Hire Date:</strong> {staff.hire_date}
                  </p>
                  <p>
                    <strong>EPF Number:</strong> {staff.epf_number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffHome;
