import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";

const DailyReportTable = () => {
  const [reports, setReports] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/revenue`,
        );
        setReports(response.data);
      } catch (err) {
        setError("Failed to fetch reports.");
      }
    };
    fetchReports();
  }, []);

  // Filter reports by month when selectedMonth changes
  useEffect(() => {
    if (selectedMonth) {
      const filtered = reports.filter((report) =>
        new Date(report.date).toISOString().startsWith(selectedMonth),
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedMonth, reports]);

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const downloadExcel = () => {
    if (paginatedReports.length === 0) {
      alert("No Pagination to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(paginatedReports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pagination");

    // Save the file
    XLSX.writeFile(workbook, `Revneu.xlsx`);
  };

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Daily Financial Reports
          </h1>

          {/* Error Handling */}
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
              {error}
            </div>
          )}

          {/* Month Filter */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
            <label
              htmlFor="month"
              className="block text-lg font-semibold text-gray-700 mb-2 md:mb-0"
            >
              Filter by Month:
            </label>
            <input
              type="month"
              id="month"
              className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={handleMonthChange}
              value={selectedMonth}
            />
          </div>
          <button
            onClick={downloadExcel}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download as Excel
          </button>
          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-6 py-3 text-left font-semibold text-sm uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Expenditure
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((report, index) => (
                    <tr
                      key={report.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        ₹{parseFloat(report.expenditure).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        ₹{parseFloat(report.revenue).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No data available for the selected month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-white ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyReportTable;
