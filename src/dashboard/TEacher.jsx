import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import * as XLSX from "xlsx";

const Teacher = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Date state

  // Fetch Teachers Function (with Date in Body)
  const fetchTeachers = async () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    try {
      const response = await axios.post(
        "https://erp.api.mindgrowthacademy.com/api/attendance/staff",
        {
          date: selectedDate,
        }
      );
      console.log(response);
      setAttendanceData(response.data.attendance || []);
    } catch (error) {
      console.error(
        "Failed to fetch teachers:",
        error.response?.data || error.message
      );
    }
  };

  // Handle Attendance Status Toggle
  const handleStatusToggle = async (teacherId) => {
    try {
      const response = await axios.post(
        "https://erp.api.mindgrowthacademy.com/api/attendance/markstaffattendance",
        {
          staff_id: teacherId,
          date: selectedDate || new Date().toISOString().split("T")[0], // Include selected date
        }
      );

      // Update local state with new attendance status
      setAttendanceData((prevData) =>
        prevData.map((teacher) =>
          teacher.id === teacherId
            ? {
                ...teacher,
                status: teacher.status === "present" ? "absent" : "present",
              }
            : teacher
        )
      );
    } catch (error) {
      console.error(
        "Error updating attendance status:",
        error.response?.data || error.message
      );
      alert("Failed to update attendance. Please try again.");
    }
  };

  // Filter teachers based on search input
  const filteredData = attendanceData.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No teacher to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

    // Save the file
    XLSX.writeFile(workbook, `TEACHER_attendance.xlsx`);
  };
  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          Teacher Attendance Management
        </h1>

        {/* Date Picker and Search Bar */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label htmlFor="date" className="text-gray-700 font-semibold">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex-1 ml-4">
              <label htmlFor="search" className="text-gray-700 font-semibold">
                Search by Teacher Name
              </label>
              <input
                type="text"
                id="search"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={fetchTeachers}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
        <button
          onClick={downloadExcel}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download as Excel
        </button>

        {/* Attendance Table */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-medium">Teacher ID</th>
                <th className="py-3 px-6 text-left font-medium">
                  Teacher Name
                </th>
                <th className="py-3 px-6 text-left font-medium">
                  Attendance Status
                </th>
                <th className="py-3 px-6 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 border">{row.id}</td>
                    <td className="py-4 px-6 border">{row.name}</td>
                    <td className="py-4 px-6 border">{row.status}</td>
                    <td className="py-4 px-6 border">
                      <button
                        className={`py-2 px-5 rounded-lg text-white font-semibold ${
                          row.status === "present"
                            ? "bg-red-500 hover:bg-red-400"
                            : "bg-green-500 hover:bg-green-400"
                        } transition duration-300`}
                        onClick={() => handleStatusToggle(row.id)}
                      >
                        {row.status === "present"
                          ? "Mark Absent"
                          : "Mark Present"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No teachers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Attendance Summary */}
        <div className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-lg p-6 flex justify-between">
          <div className="text-lg font-semibold text-gray-700">
            Total Teachers:{" "}
            <span className="text-indigo-600">{attendanceData.length}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Present Teachers:{" "}
            <span className="text-indigo-600">
              {
                attendanceData.filter((teacher) => teacher.status === "present")
                  .length
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
