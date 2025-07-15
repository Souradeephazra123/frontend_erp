import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

const ParentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState({});

  useEffect(() => {
    // Get student ID from parent login (you'll need to implement this)
    const parentStudentId = localStorage.getItem("parentStudentId") || "1"; // Mock for now
    fetchStudentInfo(parentStudentId);
    fetchAttendanceData(parentStudentId);
  }, [selectedMonth, selectedYear]);

  const fetchStudentInfo = async (studentId) => {
    try {
      // Mock student info - replace with actual API call
      const mockStudentInfo = {
        id: studentId,
        name: "John Doe",
        class: "10th Grade",
        section: "A",
        rollNumber: "2024001",
        fatherName: "Mr. Smith Doe",
        motherName: "Mrs. Jane Doe",
      };
      setStudentInfo(mockStudentInfo);
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  const fetchAttendanceData = async (studentId) => {
    setLoading(true);
    try {
      // Mock attendance data - replace with actual API call
      const mockAttendance = generateMockAttendanceData(studentId);
      setAttendanceData(mockAttendance);
      calculateSummaryStats(mockAttendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockAttendanceData = (studentId) => {
    const data = [];
    const today = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const isPresent = Math.random() > 0.15; // 85% attendance rate

      data.push({
        id: i + 1,
        date: date.toISOString().split("T")[0],
        status: isPresent ? "Present" : "Absent",
        checkInTime: isPresent ? "08:30 AM" : null,
        checkOutTime: isPresent ? "03:30 PM" : null,
        remarks: isPresent ? "Regular" : "Absent",
      });
    }
    return data;
  };

  const calculateSummaryStats = (data) => {
    const totalDays = data.length;
    const presentDays = data.filter(
      (record) => record.status === "Present"
    ).length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage =
      totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    setSummaryStats({
      totalDays,
      presentDays,
      absentDays,
      attendancePercentage,
    });
  };

  const downloadAttendanceExcel = () => {
    if (attendanceData.length === 0) {
      alert("No attendance data to download.");
      return;
    }

    const excelData = attendanceData.map((record, index) => ({
      "S.No": index + 1,
      Date: new Date(record.date).toLocaleDateString("en-IN"),
      Day: new Date(record.date).toLocaleDateString("en-IN", {
        weekday: "long",
      }),
      Status: record.status,
      "Check In": record.checkInTime || "N/A",
      "Check Out": record.checkOutTime || "N/A",
      Remarks: record.remarks,
    }));

    // Add summary sheet
    const summaryData = [
      { Metric: "Student Name", Value: studentInfo?.name || "N/A" },
      { Metric: "Class", Value: studentInfo?.class || "N/A" },
      { Metric: "Roll Number", Value: studentInfo?.rollNumber || "N/A" },
      { Metric: "Total School Days", Value: summaryStats.totalDays },
      { Metric: "Days Present", Value: summaryStats.presentDays },
      { Metric: "Days Absent", Value: summaryStats.absentDays },
      {
        Metric: "Attendance Percentage",
        Value: `${summaryStats.attendancePercentage.toFixed(1)}%`,
      },
    ];

    const workbook = XLSX.utils.book_new();

    const attendanceSheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(
      workbook,
      attendanceSheet,
      "Attendance Details"
    );

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const fileName = `${studentInfo?.name || "Student"}_Attendance_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadAttendancePDF = async () => {
    try {
      const attendanceReport = {
        reportType: "Student Attendance Report",
        studentName: studentInfo?.name || "Student",
        class: studentInfo?.class || "N/A",
        rollNumber: studentInfo?.rollNumber || "N/A",
        period: `${selectedMonth || "All Time"} ${selectedYear}`,
        generatedDate: new Date().toLocaleDateString(),
        totalDays: summaryStats.totalDays,
        presentDays: summaryStats.presentDays,
        absentDays: summaryStats.absentDays,
        attendancePercentage: summaryStats.attendancePercentage.toFixed(1),
        data: attendanceData.slice(0, 15), // First 15 records for PDF
      };

      await generateInvoicePDF(attendanceReport, "attendance_report");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF report. Please try again.");
    }
  };

  const filteredData = attendanceData.filter((record) => {
    const recordDate = new Date(record.date);
    if (selectedMonth) {
      const [year, month] = selectedMonth.split("-");
      return (
        recordDate.getFullYear() === parseInt(year) &&
        recordDate.getMonth() === parseInt(month) - 1
      );
    }
    if (selectedYear) {
      return recordDate.getFullYear() === selectedYear;
    }
    return true;
  });

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Attendance Report
        </h1>

        {/* Student Info Card */}
        {studentInfo && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p>
                  <strong>Name:</strong> {studentInfo.name}
                </p>
                <p>
                  <strong>Class:</strong> {studentInfo.class}
                </p>
              </div>
              <div>
                <p>
                  <strong>Roll Number:</strong> {studentInfo.rollNumber}
                </p>
                <p>
                  <strong>Section:</strong> {studentInfo.section}
                </p>
              </div>
              <div>
                <p>
                  <strong>Father's Name:</strong> {studentInfo.fatherName}
                </p>
                <p>
                  <strong>Mother's Name:</strong> {studentInfo.motherName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Total Days</h3>
            <p className="text-2xl font-bold">{summaryStats.totalDays || 0}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Present</h3>
            <p className="text-2xl font-bold">
              {summaryStats.presentDays || 0}
            </p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Absent</h3>
            <p className="text-2xl font-bold">{summaryStats.absentDays || 0}</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Attendance %</h3>
            <p className="text-2xl font-bold">
              {summaryStats.attendancePercentage?.toFixed(1) || 0}%
            </p>
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from(
                    { length: 5 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadAttendanceExcel}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📊 Download Excel
              </button>
              <button
                onClick={downloadAttendancePDF}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr
                      key={record.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString("en-IN", {
                          weekday: "long",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            record.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.checkInTime || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.checkOutTime || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.remarks}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No attendance data available for the selected period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentAttendance;
