import React, { useState, useEffect } from "react";
import Header from "./Header";
import Modal from "react-modal";
import * as XLSX from "xlsx";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch classes from the API
  const getUniqueMonths = (attendance) => {
    const months = attendance.map((record) =>
      new Date(record.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    );
    return [...new Set(months)]; // Get unique months
  };
  const filteredAttendanceByMonth = attendanceDetails
    ? attendanceDetails.attendance.filter((record) => {
        if (!selectedMonth) return true; // Show all if no month selected
        const recordMonth = new Date(record.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        return recordMonth === selectedMonth;
      })
    : [];

  useEffect(() => {
    const fetchClasses = async () => {
      const id = localStorage.getItem("selectedSchool");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`
        );
        const data = await response.json();

        setClasses(data); // Assuming the response is the array of classes
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch divisions when the class is selected
  useEffect(() => {
    const fetchDivisions = async () => {
      if (selectedClass) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${selectedClass}`
          );
          const data = await response.json();

          setDivisions(data); // Assuming the response is the array of divisions
        } catch (error) {
          console.error("Error fetching divisions:", error);
        }
      }
    };
    fetchDivisions();
  }, [selectedClass]);

  // Fetch students when both class and division are selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection && date) {
        // Ensure date is included
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API_URL}/api/attendance/markattendance/student`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                classid: selectedClass,
                divisionid: selectedSection,
                date: date, // Include the date in the request
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();

          if (data && Array.isArray(data.data)) {
            setAttendanceData(data.data);
          } else {
            console.error("Unexpected data structure:", data);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection, date]); // Add date as a dependency

  // Toggle attendance status
  const handleStatusToggle = async (studentId) => {
    const currentStudent = attendanceData.find(
      (student) => student.student_id === studentId
    );

    if (currentStudent) {
      const updatedStatus =
        currentStudent.status === "Present" ? "Absent" : "Present";

      // Prepare the data for the API call
      const requestData = {
        classId: selectedClass, // Use the selected class
        divisionId: selectedSection, // Use the selected division
        student_id: studentId, // The ID of the student whose status is being toggled

        date: date, // Include the date
      };

      try {
        const response = await fetch(
          "https://erp.api.mindgrowthacademy.com/api/attendance/markattendance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Update the attendanceData state
        setAttendanceData((prevData) =>
          prevData.map((student) =>
            student.student_id === studentId
              ? { ...student, status: updatedStatus }
              : student
          )
        );
      } catch (error) {
        console.error("Error updating attendance status:", error);
      }
    }
  };

  // Filter attendance data based on the search term
  const filteredAttendanceData = attendanceData.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAttendanceDetails = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/api/attendance/getattendance/${id}`
      );
      const data = await response.json();
      console.log(data);
      setAttendanceDetails(data); // Set the details to show in the modal
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setAttendanceDetails(null); // Clear the details when modal closes
  };
  const calculatePresentDays = (attendance) => {
    return attendance.filter((record) => record.status === "Present").length;
  };

  const calculateAbsentDays = (attendance) => {
    return attendance.filter((record) => record.status === "Absent").length;
  };

  const calculateAttendancePercentage = (attendance) => {
    const totalDays = attendance.length;
    const presentDays = calculatePresentDays(attendance);
    return totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
  };
  const groupAttendanceByMonth = (attendance) => {
    return attendance.reduce((acc, record) => {
      const month = new Date(record.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) acc[month] = [];
      acc[month].push(record);
      return acc;
    }, {});
  };
  const downloadExcel = () => {
    if (filteredAttendanceData.length === 0) {
      alert("No Student to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredAttendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

    // Save the file
    XLSX.writeFile(workbook, `Students.xlsx`);
  };
  const downloadExcels = () => {
    if (filteredAttendanceByMonth.length === 0) {
      alert("No Student to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredAttendanceByMonth);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

    // Save the file
    XLSX.writeFile(workbook, `Student_attendance.xlsx`);
  };
  return (
    <>
      <Header />
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-8 text-indigo-700">
          Students Attendance
        </h1>

        {/* Class and Section Dropdown */}
        <div className="flex justify-center space-x-8 mb-6">
          {/* Class Dropdown */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700">
              Class
            </label>
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>
          {/* Section (Division) Dropdown */}
          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700">
              Section
            </label>
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.division_name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Search and All Present Button */}
        <div className="flex justify-between items-center mb-6">
          {/* Search Input Field */}
          <div className="w-3/5">
            <input
              type="text"
              className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={downloadExcel}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download as Excel
        </button>

        {/* Attendance Table */}
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="py-3 px-6 text-left font-semibold border">
                  Registration Number
                </th>
                <th className="py-3 px-6 text-left font-semibold border">
                  Student Name
                </th>
                <th className="py-3 px-6 text-left font-semibold border">
                  Attendance Status
                </th>
                <th className="py-3 px-6 text-left font-semibold border">
                  Action
                </th>
                <th className="py-3 px-6 text-left font-semibold border">
                  attendance details
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredAttendanceData.length > 0 ? (
                filteredAttendanceData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 border">{row.regdNo}</td>
                    <td className="py-4 px-6 border">{row.fullName}</td>
                    <td className="py-4 px-6 border">{row.status}</td>
                    <td className="py-4 px-6 border">
                      <button
                        className={`py-1 px-4 rounded-md text-white font-semibold ${
                          row.status === "Present"
                            ? "bg-red-500 hover:bg-red-400"
                            : "bg-green-500 hover:bg-green-400"
                        }`}
                        onClick={() => handleStatusToggle(row.student_id)}
                      >
                        {row.status === "Present"
                          ? "Mark Absent"
                          : "Mark Present"}
                      </button>
                    </td>
                    <td className="py-4 px-6 border">
                      <button
                        className="py-1 px-4 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-400"
                        onClick={() => handleAttendanceDetails(row.student_id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Attendance Details"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">
              Attendance Details
            </h2>
            {attendanceDetails ? (
              <>
                {/* Month Filter Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Filter by Month
                  </label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">All Months</option>
                    {getUniqueMonths(attendanceDetails.attendance).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Filtered Attendance Table */}
                {/* Filtered Attendance Table */}
                {selectedMonth && (
                  <table className="min-w-full border-collapse mt-4">
                    <thead>
                      <tr className="bg-indigo-100 text-indigo-700">
                        <th className="py-2 px-4 border">Date</th>
                        <th className="py-2 px-4 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendanceByMonth.length > 0 ? (
                        filteredAttendanceByMonth.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border">{record.date}</td>
                            <td className="py-2 px-4 border">
                              {record.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="2"
                            className="text-center py-4 text-gray-500"
                          >
                            No records found for the selected month.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {/* Attendance Summary */}
                <button
                  onClick={downloadExcels}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Download as Excel
                </button>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    Summary for {selectedMonth || "All Months"}
                  </h3>
                  <p>
                    <strong>Total Days:</strong>{" "}
                    {filteredAttendanceByMonth.length}
                  </p>
                  <p>
                    <strong>Total Days Present:</strong>{" "}
                    {calculatePresentDays(filteredAttendanceByMonth)}
                  </p>
                  <p>
                    <strong>Total Days Absent:</strong>{" "}
                    {calculateAbsentDays(filteredAttendanceByMonth)}
                  </p>
                  <p>
                    <strong>Attendance Percentage:</strong>{" "}
                    {calculateAttendancePercentage(filteredAttendanceByMonth)}%
                  </p>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}

            <button
              className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>

        {/* Attendance Summary */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-lg shadow-md p-32 font-semibold text-gray-700">
            Total Students:{" "}
            <span className="text-indigo-600">{attendanceData.length}</span>
          </div>
          <div className="text-lg shadow-md p-32 font-semibold text-gray-700">
            Present Students:{" "}
            <span className="text-indigo-600">
              {
                filteredAttendanceData.filter(
                  (student) => student.status === "Present"
                ).length
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
