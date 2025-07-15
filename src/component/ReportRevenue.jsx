import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";

const DailyReportTable = () => {
  const [reports, setReports] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredReports, setFilteredReports] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("month"); // month, year, dateRange
  const rowsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/revenue`
        );
        setReports(response.data);
      } catch (err) {
        setError("Failed to fetch reports.");
        // Mock data for demonstration if API fails
        const mockData = generateMockRevenueData();
        setReports(mockData);
      }
    };
    fetchReports();
  }, []);

  // Generate mock revenue data for demonstration
  const generateMockRevenueData = () => {
    const mockData = [];
    const today = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const revenue = Math.floor(Math.random() * 50000) + 10000; // 10k-60k
      const expenditure = Math.floor(Math.random() * 20000) + 5000; // 5k-25k

      mockData.push({
        id: i + 1,
        date: date.toISOString().split("T")[0],
        revenue: revenue,
        expenditure: expenditure,
        profit: revenue - expenditure,
      });
    }
    return mockData;
  };

  // Calculate summary data
  const calculateSummary = (data) => {
    const summary = {
      totalRevenue: 0,
      totalExpenditure: 0,
      totalProfit: 0,
      averageRevenue: 0,
      averageExpenditure: 0,
      averageProfit: 0,
      totalDays: data.length,
      profitableDays: 0,
      highestRevenue: 0,
      lowestRevenue: Infinity,
      highestExpenditure: 0,
      lowestExpenditure: Infinity,
    };

    data.forEach((report) => {
      const revenue = parseFloat(report.revenue) || 0;
      const expenditure = parseFloat(report.expenditure) || 0;
      const profit = revenue - expenditure;

      summary.totalRevenue += revenue;
      summary.totalExpenditure += expenditure;
      summary.totalProfit += profit;

      if (profit > 0) summary.profitableDays++;
      if (revenue > summary.highestRevenue) summary.highestRevenue = revenue;
      if (revenue < summary.lowestRevenue) summary.lowestRevenue = revenue;
      if (expenditure > summary.highestExpenditure)
        summary.highestExpenditure = expenditure;
      if (expenditure < summary.lowestExpenditure)
        summary.lowestExpenditure = expenditure;
    });

    if (data.length > 0) {
      summary.averageRevenue = summary.totalRevenue / data.length;
      summary.averageExpenditure = summary.totalExpenditure / data.length;
      summary.averageProfit = summary.totalProfit / data.length;
      if (summary.lowestRevenue === Infinity) summary.lowestRevenue = 0;
      if (summary.lowestExpenditure === Infinity) summary.lowestExpenditure = 0;
    }

    return summary;
  };

  // Filter reports by month when selectedMonth changes
  useEffect(() => {
    let filtered = [...reports];

    if (filterType === "month" && selectedMonth) {
      filtered = reports.filter((report) =>
        new Date(report.date).toISOString().startsWith(selectedMonth)
      );
    } else if (filterType === "year" && selectedYear) {
      filtered = reports.filter(
        (report) => new Date(report.date).getFullYear() === selectedYear
      );
    } else if (filterType === "dateRange" && dateRange.start && dateRange.end) {
      filtered = reports.filter((report) => {
        const reportDate = new Date(report.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return reportDate >= startDate && reportDate <= endDate;
      });
    }

    setFilteredReports(filtered);
    setSummaryData(calculateSummary(filtered));
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedMonth, selectedYear, dateRange, filterType, reports]);

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  // Enhanced Excel download with comprehensive revenue report
  const downloadExcel = () => {
    if (filteredReports.length === 0) {
      alert("No data to download.");
      return;
    }

    // Prepare detailed data with profit calculations
    const detailedData = filteredReports.map((report, index) => ({
      "S.No": index + 1,
      Date: new Date(report.date).toLocaleDateString("en-IN"),
      "Revenue (₹)": parseFloat(report.revenue).toFixed(2),
      "Expenditure (₹)": parseFloat(report.expenditure).toFixed(2),
      "Profit/Loss (₹)": (
        parseFloat(report.revenue) - parseFloat(report.expenditure)
      ).toFixed(2),
      "Profit Margin (%)": (
        ((parseFloat(report.revenue) - parseFloat(report.expenditure)) /
          parseFloat(report.revenue)) *
        100
      ).toFixed(2),
      Status:
        parseFloat(report.revenue) - parseFloat(report.expenditure) > 0
          ? "Profit"
          : "Loss",
    }));

    // Prepare summary data
    const summary = calculateSummary(filteredReports);
    const summaryData = [
      { Metric: "Total Revenue", Value: `₹${summary.totalRevenue.toFixed(2)}` },
      {
        Metric: "Total Expenditure",
        Value: `₹${summary.totalExpenditure.toFixed(2)}`,
      },
      {
        Metric: "Total Profit/Loss",
        Value: `₹${summary.totalProfit.toFixed(2)}`,
      },
      {
        Metric: "Average Daily Revenue",
        Value: `₹${summary.averageRevenue.toFixed(2)}`,
      },
      {
        Metric: "Average Daily Expenditure",
        Value: `₹${summary.averageExpenditure.toFixed(2)}`,
      },
      {
        Metric: "Average Daily Profit",
        Value: `₹${summary.averageProfit.toFixed(2)}`,
      },
      { Metric: "Total Days", Value: summary.totalDays },
      { Metric: "Profitable Days", Value: summary.profitableDays },
      {
        Metric: "Loss Days",
        Value: summary.totalDays - summary.profitableDays,
      },
      {
        Metric: "Success Rate",
        Value: `${((summary.profitableDays / summary.totalDays) * 100).toFixed(1)}%`,
      },
      {
        Metric: "Highest Revenue Day",
        Value: `₹${summary.highestRevenue.toFixed(2)}`,
      },
      {
        Metric: "Lowest Revenue Day",
        Value: `₹${summary.lowestRevenue.toFixed(2)}`,
      },
      {
        Metric: "Highest Expenditure Day",
        Value: `₹${summary.highestExpenditure.toFixed(2)}`,
      },
      {
        Metric: "Lowest Expenditure Day",
        Value: `₹${summary.lowestExpenditure.toFixed(2)}`,
      },
    ];

    // Monthly breakdown if filtering by year
    let monthlyData = [];
    if (filterType === "year") {
      const monthlyBreakdown = {};
      filteredReports.forEach((report) => {
        const month = new Date(report.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!monthlyBreakdown[month]) {
          monthlyBreakdown[month] = { revenue: 0, expenditure: 0, days: 0 };
        }
        monthlyBreakdown[month].revenue += parseFloat(report.revenue);
        monthlyBreakdown[month].expenditure += parseFloat(report.expenditure);
        monthlyBreakdown[month].days += 1;
      });

      monthlyData = Object.entries(monthlyBreakdown).map(([month, data]) => ({
        Month: month,
        "Total Revenue (₹)": data.revenue.toFixed(2),
        "Total Expenditure (₹)": data.expenditure.toFixed(2),
        "Net Profit (₹)": (data.revenue - data.expenditure).toFixed(2),
        Days: data.days,
        "Avg Daily Revenue (₹)": (data.revenue / data.days).toFixed(2),
        "Avg Daily Expenditure (₹)": (data.expenditure / data.days).toFixed(2),
      }));
    }

    // Create workbook with multiple sheets
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Detailed Daily Report
    const detailedSheet = XLSX.utils.json_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(workbook, detailedSheet, "Daily Details");

    // Sheet 2: Summary Report
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Sheet 3: Monthly Breakdown (if applicable)
    if (monthlyData.length > 0) {
      const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
      XLSX.utils.book_append_sheet(workbook, monthlySheet, "Monthly Breakdown");
    }

    // Sheet 4: Charts Data (for easy chart creation)
    const chartData = filteredReports.map((report) => ({
      Date: new Date(report.date).toLocaleDateString("en-IN"),
      Revenue: parseFloat(report.revenue),
      Expenditure: parseFloat(report.expenditure),
      Profit: parseFloat(report.revenue) - parseFloat(report.expenditure),
    }));
    const chartSheet = XLSX.utils.json_to_sheet(chartData);
    XLSX.utils.book_append_sheet(workbook, chartSheet, "Chart Data");

    // Generate filename with current date and filter info
    const currentDate = new Date().toISOString().split("T")[0];
    let filterInfo = "";
    if (filterType === "month" && selectedMonth) {
      filterInfo = `_${selectedMonth}`;
    } else if (filterType === "year") {
      filterInfo = `_${selectedYear}`;
    } else if (filterType === "dateRange" && dateRange.start && dateRange.end) {
      filterInfo = `_${dateRange.start}_to_${dateRange.end}`;
    }

    const fileName = `Revenue_Report${filterInfo}_${currentDate}.xlsx`;

    // Save the file
    XLSX.writeFile(workbook, fileName);
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

          {/* Enhanced Filter Section */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Report Filters
            </h3>

            {/* Filter Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="month">By Month</option>
                  <option value="year">By Year</option>
                  <option value="dateRange">Date Range</option>
                </select>
              </div>

              {/* Conditional Filter Inputs */}
              {filterType === "month" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Month
                  </label>
                  <input
                    type="month"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onChange={handleMonthChange}
                    value={selectedMonth}
                  />
                </div>
              )}

              {filterType === "year" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              )}

              {filterType === "dateRange" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          start: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          end: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <button
                onClick={downloadExcel}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <span>📊</span>
                Download Comprehensive Excel Report
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          {Object.keys(summaryData).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <h3 className="text-sm font-medium">Total Revenue</h3>
                <p className="text-2xl font-bold">
                  ₹{summaryData.totalRevenue?.toFixed(2) || "0.00"}
                </p>
                <p className="text-sm opacity-90">
                  Avg: ₹{summaryData.averageRevenue?.toFixed(2) || "0.00"}/day
                </p>
              </div>

              <div className="bg-red-500 text-white p-4 rounded-lg">
                <h3 className="text-sm font-medium">Total Expenditure</h3>
                <p className="text-2xl font-bold">
                  ₹{summaryData.totalExpenditure?.toFixed(2) || "0.00"}
                </p>
                <p className="text-sm opacity-90">
                  Avg: ₹{summaryData.averageExpenditure?.toFixed(2) || "0.00"}
                  /day
                </p>
              </div>

              <div
                className={`${summaryData.totalProfit >= 0 ? "bg-blue-500" : "bg-orange-500"} text-white p-4 rounded-lg`}
              >
                <h3 className="text-sm font-medium">Net Profit/Loss</h3>
                <p className="text-2xl font-bold">
                  ₹{summaryData.totalProfit?.toFixed(2) || "0.00"}
                </p>
                <p className="text-sm opacity-90">
                  Avg: ₹{summaryData.averageProfit?.toFixed(2) || "0.00"}/day
                </p>
              </div>

              <div className="bg-purple-500 text-white p-4 rounded-lg">
                <h3 className="text-sm font-medium">Success Rate</h3>
                <p className="text-2xl font-bold">
                  {summaryData.totalDays > 0
                    ? (
                        (summaryData.profitableDays / summaryData.totalDays) *
                        100
                      ).toFixed(1)
                    : "0"}
                  %
                </p>
                <p className="text-sm opacity-90">
                  {summaryData.profitableDays || 0}/{summaryData.totalDays || 0}{" "}
                  profitable days
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Reports Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-6 py-3 text-left font-semibold text-sm uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Expenditure
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Profit/Loss
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Margin %
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((report, index) => {
                    const revenue = parseFloat(report.revenue) || 0;
                    const expenditure = parseFloat(report.expenditure) || 0;
                    const profit = revenue - expenditure;
                    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
                    const isProfit = profit > 0;

                    return (
                      <tr
                        key={report.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } border-b hover:bg-gray-100`}
                      >
                        <td className="px-6 py-4 text-gray-800 font-medium">
                          {new Date(report.date).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-center text-green-600 font-semibold">
                          ₹{revenue.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center text-red-600 font-semibold">
                          ₹{expenditure.toFixed(2)}
                        </td>
                        <td
                          className={`px-6 py-4 text-center font-bold ${
                            isProfit ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ₹{profit.toFixed(2)}
                        </td>
                        <td
                          className={`px-6 py-4 text-center font-semibold ${
                            isProfit ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {margin.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isProfit
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {isProfit ? "Profit" : "Loss"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
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
