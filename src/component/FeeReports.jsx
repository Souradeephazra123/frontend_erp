import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";
import FeeReportService from "../services/feeReportService";

const FeeReports = () => {
  const [reportType, setReportType] = useState("student"); // student or class
  const [filterType, setFilterType] = useState("yearly"); // yearly, monthly, dateRange
  const [studentId, setStudentId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [academicYear, setAcademicYear] = useState([]);

  useEffect(() => {
    fetchAcademicYears();
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/academic-year`);
      setAcademicYear(response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const classes = await FeeReportService.getClasses();
      setClasses(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const students = await FeeReportService.getStudents();
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchSections = async (classId) => {
    try {
      const sections = await FeeReportService.getSections(classId);
      setSections(sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      let params = {};
      let result;

      // Add filter parameters
      if (filterType === "yearly") {
        params.year = selectedYear;
      } else if (filterType === "monthly") {
        params.year = selectedYear;
        params.month = selectedMonth;
      } else if (filterType === "dateRange") {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      if (reportType === "student") {
        params.studentId = studentId;
        result = await FeeReportService.generateStudentReport(params);
      } else {
        params.class = selectedClass;
        if (selectedSection) params.section = selectedSection;
        result = await FeeReportService.generateClassReport(params);
      }

      setReportData(result.details || []);
      setSummaryData(result.summary || {});
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error generating report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcelReport = () => {
    if (reportData.length === 0) {
      alert("No data to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Report");

    const filename = `Fee_Report_${reportType}_${filterType}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const generateReportPDF = async () => {
    try {
      const reportInfo = {
        reportType: reportType === "student" ? "Student Fee Report" : "Class Fee Report",
        filterType: filterType,
        period: getPeriodText(),
        generatedDate: new Date().toLocaleDateString(),
        totalStudents: reportData.length,
        totalAmount: summaryData.totalAmount || 0,
        totalPaid: summaryData.totalPaid || 0,
        totalDue: summaryData.totalDue || 0,
        data: reportData
      };

      await generateInvoicePDF(reportInfo, "fee_report");
    } catch (error) {
      console.error("Error generating PDF report:", error);
      alert("Error generating PDF report. Please try again.");
    }
  };

  const getPeriodText = () => {
    if (filterType === "yearly") return `Year: ${selectedYear}`;
    if (filterType === "monthly") return `${selectedMonth} ${selectedYear}`;
    if (filterType === "dateRange") return `${startDate} to ${endDate}`;
    return "";
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Fee Reports & Analytics
        </h1>

        {/* Report Configuration */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Report Configuration</h2>
          
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="student">Individual Student Report</option>
                <option value="class">Class-wise Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="yearly">Yearly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="dateRange">Date Range Report</option>
              </select>
            </div>
          </div>

          {/* Student Selection (if student report) */}
          {reportType === "student" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.class} ({student.studentId})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Class Selection (if class report) */}
          {reportType === "class" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    if (e.target.value) fetchSections(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Section (Optional)</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Sections</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Time Period Selection */}
          {filterType === "yearly" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {academicYear.map((year) => (
                  <option key={year.id} value={year.year}>
                    {year.year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {filterType === "monthly" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {academicYear.map((year) => (
                    <option key={year.id} value={year.year}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {filterType === "dateRange" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Generate Report Button */}
          <div className="flex gap-4">
            <button
              onClick={generateReport}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {Object.keys(summaryData).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-2xl font-bold">{summaryData.totalStudents || 0}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Amount</h3>
              <p className="text-2xl font-bold">₹{summaryData.totalAmount || 0}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Amount Paid</h3>
              <p className="text-2xl font-bold">₹{summaryData.totalPaid || 0}</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Amount Due</h3>
              <p className="text-2xl font-bold">₹{summaryData.totalDue || 0}</p>
            </div>
          </div>
        )}

        {/* Report Results */}
        {reportData.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Report Results - {getPeriodText()}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={downloadExcelReport}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  📊 Download Excel
                </button>
                <button
                  onClick={generateReportPDF}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  📄 Download PDF
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Student ID</th>
                    <th className="py-3 px-6 text-left">Student Name</th>
                    <th className="py-3 px-6 text-left">Class</th>
                    <th className="py-3 px-6 text-left">Fee Category</th>
                    <th className="py-3 px-6 text-left">Fee Amount</th>
                    <th className="py-3 px-6 text-left">Amount Paid</th>
                    <th className="py-3 px-6 text-left">Amount Due</th>
                    <th className="py-3 px-6 text-left">Payment Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {reportData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{row.studentId}</td>
                      <td className="py-3 px-6 text-left">{row.studentName}</td>
                      <td className="py-3 px-6 text-left">{row.class}</td>
                      <td className="py-3 px-6 text-left">{row.feeCategory}</td>
                      <td className="py-3 px-6 text-left">₹{row.feeAmount}</td>
                      <td className="py-3 px-6 text-left">₹{row.amountPaid}</td>
                      <td className="py-3 px-6 text-left">₹{row.amountDue}</td>
                      <td className="py-3 px-6 text-left">
                        {row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span className={`px-2 py-1 rounded text-xs ${
                          row.amountDue === 0 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {row.amountDue === 0 ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportData.length === 0 && !loading && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-center">
            No data found for the selected criteria. Please adjust your filters and try again.
          </div>
        )}
      </div>
    </>
  );
};

export default FeeReports;
