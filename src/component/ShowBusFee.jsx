import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

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
            `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`
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
          `${process.env.REACT_APP_BASE_API_URL}/api/students?route_id=${selectedRoute}`
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
          `${process.env.REACT_APP_BASE_API_URL}/api/transactions?student_id=${selectedStudent}`
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

  const generateInvoice = async (transaction) => {
    const selectedStudentData = students.find(
      (s) => s.id.toString() === selectedStudent
    );
    const selectedRouteData = routes.find(
      (r) => r.id.toString() === selectedRoute
    );

    const invoiceData = {
      invoiceNumber: `BUS${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${Math.floor(
        Math.random() * 1000
      )
        .toString()
        .padStart(3, "0")}`,
      studentName: selectedStudentData
        ? `${selectedStudentData.firstName} ${selectedStudentData.lastName}`
        : "N/A",
      class: selectedStudentData?.class || "N/A",
      section: selectedStudentData?.section || "N/A",
      route: selectedRouteData?.route_info || "N/A",
      month: transaction.payment_month,
      amount: transaction.paid_amount,
      paymentDate: new Date(transaction.payment_date).toLocaleDateString(
        "en-IN"
      ),
    };

    await generateInvoicePDF(invoiceData, "bus_fee");
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
                    <th className="border border-gray-300 px-4 py-2">
                      Invoice
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
                          transaction.payment_date
                        ).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => generateInvoice(transaction)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                          title="Download Invoice PDF"
                        >
                          📄 Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Download Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={downloadExcel}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                📊 Download Excel
              </button>
              <button
                onClick={() => {
                  if (transactions.length > 0) {
                    generateInvoice(transactions[0]); // Generate invoice for latest transaction
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                📄 Download Latest Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusFeeTracker;
