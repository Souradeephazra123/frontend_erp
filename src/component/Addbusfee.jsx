import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const AddBusRoute = () => {
  const [routeName, setRouteName] = useState("");
  const [yearlyFee, setYearlyFee] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!routeName || !yearlyFee) {
      setMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://erp.api.mindgrowthacademy.com/api/bus-routes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route_name: routeName,
            yearly_fee: yearlyFee,
          }),
        }
      );

      if (response.ok) {
        setMessage("Bus route added successfully!");
        setRouteName("");
        setYearlyFee("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add bus route.");
      }
    } catch (error) {
      console.error("Error adding bus route:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Bus Route</h1>

        {/* Back Button */}
        <button
          onClick={() => navigate("/bus-fee")}
          className="text-blue-500 mb-4 hover:text-blue-700 transition"
        >
          &lt; Back to Bus Fee
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="routeName"
              className="block text-gray-700 font-medium mb-2"
            >
              Route Name
            </label>
            <input
              type="text"
              id="routeName"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter route name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="yearlyFee"
              className="block text-gray-700 font-medium mb-2"
            >
              Yearly Fee
            </label>
            <input
              type="number"
              id="yearlyFee"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={yearlyFee}
              onChange={(e) => setYearlyFee(e.target.value)}
              placeholder="Enter yearly fee"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Add Route
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddBusRoute;
