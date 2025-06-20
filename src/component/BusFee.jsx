import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../dashboard/Header";

const BusFee = () => {
  const navigate = useNavigate();
  const [busRoutes, setBusRoutes] = useState([]);

  // Fetch all bus routes
  useEffect(() => {
    const fetchBusRoutes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}/api/bus-routes`,
        );
        const data = await response.json();
        setBusRoutes(data);
      } catch (error) {
        console.error("Error fetching bus routes:", error);
      }
    };

    fetchBusRoutes();
  }, []);

  return (
    <>
      <Headers />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Bus Fee Management
          </h1>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <div>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
                onClick={() => navigate("/add-bus-fee")}
              >
                Add Bus Route
              </button>
            </div>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
              onClick={() => navigate("/submit-bus-fee")}
            >
              Fee Payment
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
              onClick={() => navigate("/bus-fee-details")}
            >
              Show Fee Details
            </button>
          </div>

          {/* Bus Route Fee Table */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              All Bus Routes and Fees
            </h2>

            {busRoutes.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Route ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Route Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Yearly Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {busRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {route.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {route.route_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{route.yearly_fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center">No bus routes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusFee;
