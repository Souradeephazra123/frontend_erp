import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for back navigation

const FeePayment = () => {
  const [routes, setRoutes] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [month, setMonth] = useState(""); // Added month for fee payment
  const [message, setMessage] = useState("");
  const [noStudentsMessage, setNoStudentsMessage] = useState(""); // To store message for no students

  const history = useNavigate(); // Hook for back navigation

  // Fetch available routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/bus-routes`
        );
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  // Fetch students for the selected route
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedRoute) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/students?route_id=${selectedRoute}`
        );
        const data = await response.json();
        if (data.length === 0) {
          setNoStudentsMessage("No students found for the selected route.");
          setStudents([]); // Clear previous students
        } else {
          setStudents(data);
          setNoStudentsMessage(""); // Clear any no-student message
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoute || !selectedStudent || !paidAmount || !month) {
      setMessage("Please fill in all fields.");
      return;
    }
    const monthName = new Date(`${month}-01`).toLocaleString("default", {
      month: "long",
    });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-collection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route_id: selectedRoute,
            student_id: selectedStudent,
            paid_amount: paidAmount,
            payment_month: monthName, // Sending month with the fee payment
          }),
        }
      );

      if (response.ok) {
        setMessage("Fee payment successful!");
        setSelectedRoute("");
        setSelectedStudent("");
        setPaidAmount("");
        setMonth("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to process payment.");
      }
    } catch (error) {
      console.error("Error submitting fee payment:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Fee Payment</h1>

          {/* Back Button */}
          <button
            onClick={() => history("/bus-fee")} // Navigate back to previous page
            className="text-blue-500 mb-4 flex items-center"
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

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Select Route */}
            <div className="mb-4">
              <label
                htmlFor="route"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Route
              </label>
              <select
                id="route"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Select Route --</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.route_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Student */}
            <div className="mb-4">
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
                disabled={!selectedRoute}
              >
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
              {noStudentsMessage && (
                <p className="text-red-600 text-sm mt-2">{noStudentsMessage}</p>
              )}
            </div>

            {/* Paid Amount */}
            <div className="mb-4">
              <label
                htmlFor="paidAmount"
                className="block text-gray-700 font-medium mb-2"
              >
                Paid Amount
              </label>
              <input
                type="number"
                id="paidAmount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter paid amount"
              />
            </div>

            {/* Select Month */}
            <div className="mb-4">
              <label
                htmlFor="month"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Month
              </label>
              <input
                type="month"
                id="month"
                value={month}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedMonth =
                    new Date(selectedValue + "-01").getMonth() + 1; // Get month (1-12)

                  if (selectedMonth === 4 || selectedMonth === 5) {
                    // April = 4, May = 5
                    setMessage(
                      "April and May are not available for fee collection. Please select another month."
                    );
                    return;
                  }

                  console.log(selectedValue);
                  setMonth(selectedValue);
                  setMessage(""); // Clear any previous error message
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Submit Payment
            </button>
          </form>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FeePayment;
