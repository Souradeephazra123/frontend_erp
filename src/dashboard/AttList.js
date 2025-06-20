import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState(1);

  const fetchAttendance = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/att/${date}/${period}`)
      .then((response) => setAttendance(response.data))
      .catch((error) => console.error("Error fetching attendance:", error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Attendance Records
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Select Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
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
            />
          </div>

          <button
            onClick={fetchAttendance}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Fetch Attendance
          </button>

          <ul className="mt-6 space-y-2">
            {attendance.map((record) => (
              <li
                key={record.id}
                className="p-4 border rounded-md shadow-sm bg-gray-50 flex justify-between"
              >
                <span>Student ID: {record.studentId}</span>
                <span>Status: {record.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
