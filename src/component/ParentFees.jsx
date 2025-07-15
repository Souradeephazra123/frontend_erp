import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

const ParentFees = () => {
  const [feeData, setFeeData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState({});

  useEffect(() => {
    // Get student ID from parent login
    const parentStudentId = localStorage.getItem("parentStudentId") || "1";
    fetchStudentInfo(parentStudentId);
    fetchFeeData(parentStudentId);
    fetchPaymentHistory(parentStudentId);
  }, [selectedYear]);

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
        admissionNumber: "ADM2024001",
      };
      setStudentInfo(mockStudentInfo);
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  const fetchFeeData = async (studentId) => {
    setLoading(true);
    try {
      // Mock fee data - replace with actual API call
      const mockFeeData = [
        {
          id: 1,
          category: "Tuition Fee",
          subcategory: "Monthly Fee",
          totalAmount: 5000,
          paidAmount: 3000,
          dueAmount: 2000,
          dueDate: "2024-01-31",
          status: "Partial",
        },
        {
          id: 2,
          category: "Library Fee",
          subcategory: "Annual Fee",
          totalAmount: 500,
          paidAmount: 500,
          dueAmount: 0,
          dueDate: "2024-01-15",
          status: "Paid",
        },
        {
          id: 3,
          category: "Sports Fee",
          subcategory: "Annual Fee",
          totalAmount: 800,
          paidAmount: 0,
          dueAmount: 800,
          dueDate: "2024-02-15",
          status: "Pending",
        },
        {
          id: 4,
          category: "Examination Fee",
          subcategory: "Half Yearly",
          totalAmount: 300,
          paidAmount: 300,
          dueAmount: 0,
          dueDate: "2024-01-10",
          status: "Paid",
        },
      ];
      setFeeData(mockFeeData);
      calculateSummaryStats(mockFeeData);
    } catch (error) {
      console.error("Error fetching fee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async (studentId) => {
    try {
      // Mock payment history - replace with actual API call
      const mockPaymentHistory = [
        {
          id: 1,
          date: "2024-01-15",
          amount: 3000,
          feeCategory: "Tuition Fee",
          paymentMethod: "Online",
          transactionId: "TXN123456789",
          receiptNumber: "RCP001",
        },
        {
          id: 2,
          date: "2024-01-10",
          amount: 500,
          feeCategory: "Library Fee",
          paymentMethod: "Cash",
          transactionId: "TXN123456790",
          receiptNumber: "RCP002",
        },
        {
          id: 3,
          date: "2024-01-08",
          amount: 300,
          feeCategory: "Examination Fee",
          paymentMethod: "Online",
          transactionId: "TXN123456791",
          receiptNumber: "RCP003",
        },
      ];
      setPaymentHistory(mockPaymentHistory);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const calculateSummaryStats = (feeData) => {
    const totalFeeAmount = feeData.reduce(
      (sum, fee) => sum + fee.totalAmount,
      0
    );
    const totalPaidAmount = feeData.reduce(
      (sum, fee) => sum + fee.paidAmount,
      0
    );
    const totalDueAmount = feeData.reduce((sum, fee) => sum + fee.dueAmount, 0);
    const paymentPercentage =
      totalFeeAmount > 0 ? (totalPaidAmount / totalFeeAmount) * 100 : 0;

    setSummaryStats({
      totalFeeAmount,
      totalPaidAmount,
      totalDueAmount,
      paymentPercentage,
      totalCategories: feeData.length,
      paidCategories: feeData.filter((fee) => fee.status === "Paid").length,
    });
  };

  const downloadFeeExcel = () => {
    if (feeData.length === 0) {
      alert("No fee data to download.");
      return;
    }

    // Fee Details Sheet
    const feeDetailsData = feeData.map((fee, index) => ({
      "S.No": index + 1,
      Category: fee.category,
      Subcategory: fee.subcategory,
      "Total Amount (₹)": fee.totalAmount,
      "Paid Amount (₹)": fee.paidAmount,
      "Due Amount (₹)": fee.dueAmount,
      "Due Date": new Date(fee.dueDate).toLocaleDateString("en-IN"),
      Status: fee.status,
    }));

    // Payment History Sheet
    const paymentHistoryData = paymentHistory.map((payment, index) => ({
      "S.No": index + 1,
      Date: new Date(payment.date).toLocaleDateString("en-IN"),
      "Amount (₹)": payment.amount,
      "Fee Category": payment.feeCategory,
      "Payment Method": payment.paymentMethod,
      "Transaction ID": payment.transactionId,
      "Receipt Number": payment.receiptNumber,
    }));

    // Summary Sheet
    const summaryData = [
      { Metric: "Student Name", Value: studentInfo?.name || "N/A" },
      { Metric: "Class", Value: studentInfo?.class || "N/A" },
      {
        Metric: "Admission Number",
        Value: studentInfo?.admissionNumber || "N/A",
      },
      { Metric: "Total Fee Amount", Value: `₹${summaryStats.totalFeeAmount}` },
      {
        Metric: "Total Paid Amount",
        Value: `₹${summaryStats.totalPaidAmount}`,
      },
      { Metric: "Total Due Amount", Value: `₹${summaryStats.totalDueAmount}` },
      {
        Metric: "Payment Percentage",
        Value: `${summaryStats.paymentPercentage.toFixed(1)}%`,
      },
      { Metric: "Total Fee Categories", Value: summaryStats.totalCategories },
      { Metric: "Paid Categories", Value: summaryStats.paidCategories },
    ];

    const workbook = XLSX.utils.book_new();

    const feeDetailsSheet = XLSX.utils.json_to_sheet(feeDetailsData);
    XLSX.utils.book_append_sheet(workbook, feeDetailsSheet, "Fee Details");

    const paymentHistorySheet = XLSX.utils.json_to_sheet(paymentHistoryData);
    XLSX.utils.book_append_sheet(
      workbook,
      paymentHistorySheet,
      "Payment History"
    );

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const fileName = `${studentInfo?.name || "Student"}_Fee_Report_${selectedYear}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadFeePDF = async () => {
    try {
      const feeReport = {
        reportType: "Student Fee Report",
        studentName: studentInfo?.name || "Student",
        class: studentInfo?.class || "N/A",
        admissionNumber: studentInfo?.admissionNumber || "N/A",
        academicYear: selectedYear,
        generatedDate: new Date().toLocaleDateString(),
        totalAmount: summaryStats.totalFeeAmount,
        totalPaid: summaryStats.totalPaidAmount,
        totalDue: summaryStats.totalDueAmount,
        paymentPercentage: summaryStats.paymentPercentage.toFixed(1),
        data: feeData,
      };

      await generateInvoicePDF(feeReport, "fee_report");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF report. Please try again.");
    }
  };

  const downloadReceipt = async (payment) => {
    try {
      const receiptData = {
        invoiceNumber: payment.receiptNumber,
        studentName: studentInfo?.name || "Student",
        class: studentInfo?.class || "N/A",
        admissionNumber: studentInfo?.admissionNumber || "N/A",
        paymentDate: payment.date,
        feeCategory: payment.feeCategory,
        paymentMethod: payment.paymentMethod,
        amount: payment.amount,
        transactionId: payment.transactionId,
      };

      await generateInvoicePDF(receiptData, "fee");
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Error generating receipt. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Fee Details & Payment History
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
                  <strong>Admission Number:</strong>{" "}
                  {studentInfo.admissionNumber}
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
                  <strong>Academic Year:</strong> {selectedYear}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Total Fee</h3>
            <p className="text-2xl font-bold">
              ₹{summaryStats.totalFeeAmount || 0}
            </p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Paid Amount</h3>
            <p className="text-2xl font-bold">
              ₹{summaryStats.totalPaidAmount || 0}
            </p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Due Amount</h3>
            <p className="text-2xl font-bold">
              ₹{summaryStats.totalDueAmount || 0}
            </p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Payment %</h3>
            <p className="text-2xl font-bold">
              {summaryStats.paymentPercentage?.toFixed(1) || 0}%
            </p>
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
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

            <div className="flex gap-2">
              <button
                onClick={downloadFeeExcel}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📊 Download Excel
              </button>
              <button
                onClick={downloadFeePDF}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Fee Details Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Fee Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subcategory
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : feeData.length > 0 ? (
                  feeData.map((fee, index) => (
                    <tr
                      key={fee.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fee.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fee.subcategory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{fee.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        ₹{fee.paidAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                        ₹{fee.dueAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(fee.dueDate).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            fee.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : fee.status === "Partial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No fee data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment, index) => (
                    <tr
                      key={payment.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        ₹{payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.feeCategory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.receiptNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => downloadReceipt(payment)}
                          className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          📄 Download Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No payment history available.
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

export default ParentFees;
