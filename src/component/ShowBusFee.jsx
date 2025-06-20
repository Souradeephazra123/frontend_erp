import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const BusFeeTracker = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [message, setMessage] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("selectedSchool");

      try {
        const [routesResponse, classesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/bus-routes`),
          axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`,
          ),
        ]);

        setRoutes(routesResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedRoute) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/students?route_id=${selectedRoute}`,
        );
        const data = await response.json();
        if (data.length === 0) {
          setStudents([]);
          setMessage("No students found for the selected route.");
        } else {
          setStudents(data);
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedRoute]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedStudent) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/transactions?student_id=${selectedStudent}`,
        );
        const data = await response.json();
        if (data.length === 0) {
          setTransactions([]);
          setMessage("No transactions found for the selected student.");
        } else {
          setTransactions(data);
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedStudent]);

  const downloadExcel = () => {
    if (transactions.length === 0) {
      alert("No transactions to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Save the file
    XLSX.writeFile(workbook, `Transactions_${selectedStudent}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Bus Fee Submission Tracker
        </h1>

        <button
          onClick={() => navigate("/bus-fee")}
          className="text-blue-500 mb-4 flex hover:text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M12 5l-7 7 7 7"
            />
          </svg>
          Go Back
        </button>

        {/* Select Route */}
        <div className="mb-6">
          <label
            htmlFor="route"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Route
          </label>
          <select
            id="route"
            value={selectedRoute}
            onChange={(e) => {
              setSelectedRoute(e.target.value);
              setSelectedStudent("");
              setTransactions([]);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Select Route --</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.route_info}
              </option>
            ))}
          </select>
        </div>

        {/* Select Student */}
        {selectedRoute && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select Class:
              </label>
              <select className="w-full p-2 border rounded">
                <option value="">-- Select Class --</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.class_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="student"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Student
              </label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={students.length === 0}
              >
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
              {students.length === 0 && (
                <p className="text-red-600 text-sm mt-2">{message}</p>
              )}
            </div>
          </>
        )}

        {/* Display Transactions */}
        {selectedStudent && transactions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Fee Transactions for Student
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">S.No.</th>
                    <th className="border border-gray-300 px-4 py-2">Month</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Paid Amount
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Payment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={transaction.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {transaction.payment_month}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        ₹{transaction.paid_amount}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(
                          transaction.payment_date,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadExcel}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Download as Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusFeeTracker;
