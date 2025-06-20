import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SchoolSelection = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  // Fetch schools from the API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(
          "https://erp.api.mindgrowthacademy.com/api/school"
        );
        setSchools(response.data);
        setFilteredSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  // Handle school selection
  const handleSchoolSelect = (schoolId) => {
    setSelectedSchool(schoolId);
    localStorage.setItem("selectedSchool", schoolId);
    nav("/dashboard");
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = schools.filter((school) =>
      school.Name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSchools(filtered);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Select Your School
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for your school..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* School Cards */}
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                onClick={() => handleSchoolSelect(school.id)}
                className={`cursor-pointer p-6 rounded-xl shadow-md flex flex-col items-center transition transform hover:scale-105 
                  ${
                    selectedSchool === school.id
                      ? "bg-gradient-to-br from-green-400 to-blue-500 text-white"
                      : "bg-white hover:bg-blue-50"
                  }`}
              >
                <div className="mb-4">
                  <svg
                    className={`h-16 w-16 ${
                      selectedSchool === school.id
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">{school.Name}</h2>
                {selectedSchool === school.id && (
                  <FaCheckCircle className="text-2xl mt-2" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No schools found.</p>
        )}

        {/* Selected School Display */}
        {selectedSchool && (
          <div className="mt-6 text-center">
            <p className="text-lg">
              Selected School ID:{" "}
              <span className="font-semibold text-blue-600">
                {selectedSchool}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolSelection;
