import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState(1);
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    // Fetch students on component mount
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/st`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const attendanceData = {
      studentId: selectedStudent,
      date,
      period,
      status,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/att`, attendanceData)
      .then(() => alert("Attendance marked successfully"))
      .catch((error) => console.error("Error marking attendance:", error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Mark Attendance</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Select Student:
            </label>
            <select
              onChange={(e) => setSelectedStudent(e.target.value)}
              value={selectedStudent}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select a student
              </option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName + " " + student.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Select Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Select Period:
            </label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Status:</label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Attendance;
