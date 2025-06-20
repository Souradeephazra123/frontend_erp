import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const { id } = useParams();

  const [studentDetails, setStudentDetails] = useState(null);
  const [originalStudentDetails, setOriginalStudentDetails] = useState(null); // Track original data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/newStudent/${id}`
      );
      setStudentDetails(response.data.student);
      setOriginalStudentDetails(response.data.student); // Store the original data
    } catch (err) {
      setError("Failed to fetch student details.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setStudentDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [fieldName]: value,
        },
      }));
    } else {
      setStudentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(studentDetails);

    // Create an object with only the updated fields
    const updatedFields = {};

    // Compare fields and only add the updated ones
    Object.keys(studentDetails).forEach((key) => {
      // Skip address fields temporarily to handle them separately
      if (
        key !== "address" &&
        studentDetails[key] !== originalStudentDetails[key]
      ) {
        updatedFields[key] = studentDetails[key];
      }
    });

    // Now handle the address fields
    if (studentDetails.address) {
      Object.keys(studentDetails.address).forEach((key) => {
        if (
          studentDetails.address[key] !== originalStudentDetails.address[key]
        ) {
          updatedFields[key] = studentDetails.address[key];
        }
      });
    }

    // Add the ID to the updated fields
    updatedFields.id = id;

    // Send only the updated fields
    try {
      const response = await axios.post(
        "https://erp.api.mindgrowthacademy.com/updateStudent",
        updatedFields
      );
      alert(response.data.message);
    } catch (err) {
      setError("Failed to update student details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );

  const editableFields = [
    { label: "First Name", name: "firstName" },
    { label: "Middle Name", name: "middleName" },
    { label: "Last Name", name: "lastName" },
    { label: "UID Number", name: "uidNo" },
    { label: "Blood Group", name: "bloodGrp" },
    { label: "Father Name", name: "fatherName" },
    { label: "Mother Name", name: "motherName" },
    { label: "Mobile Number", name: "mobileNo" },
    { label: "Alternate Mobile Number", name: "alternateMobileNo" },
    { label: "Email ID", name: "emailId" },
    { label: "Present Address", name: "address.presentAddress" },
    { label: "Permanent Address", name: "address.permanentAddress" },
    { label: "City", name: "address.city" },
    { label: "District", name: "address.district" },
    { label: "State", name: "address.state" },
    { label: "Pincode", name: "address.pincode" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-blue-700 text-center mb-6">
          Student Details
        </h1>

        <button
          onClick={() => window.location.replace(`/student-details/${id}`)}
          className="mb-4 inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back
        </button>

        {studentDetails ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {editableFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={
                    field.name.startsWith("address.")
                      ? studentDetails.address?.[field.name.split(".")[1]] || ""
                      : studentDetails[field.name] || ""
                  }
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update Details
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-500">No details available.</div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
