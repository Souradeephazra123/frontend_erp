// CertificateRequests.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../dashboard/Header";

const CertificateRequests = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "Pending",
    student_id: localStorage.getItem("userId"),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all certificate requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://erp.api.mindgrowthacademy.com/api/certificates"
        );
        setRequests(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post(
        "https://erp.api.mindgrowthacademy.com/api/certificates",
        formData
      );
      setRequests([...requests, response.data.data]);
      setFormData({
        name: "",
        status: "Pending",
        student_id: localStorage.getItem("userId"),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Certificate Requests
        </h2>

        {/* Add New Certificate Request Form */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Cerificate Requested
          </h3>
        </div>

        {/* Display Existing Certificate Requests */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            All Certificate Requests
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-gray-600 font-semibold">ID</th>
                  <th className="py-2 px-4 text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="py-2 px-4 text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="py-2 px-4 text-gray-600 font-semibold">
                    Student ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="py-2 px-4 text-gray-700">{request.id}</td>
                    <td className="py-2 px-4 text-gray-700">{request.name}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {request.status}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {request.student_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CertificateRequests;
