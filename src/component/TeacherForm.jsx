import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Header from "../dashboard/Header";

const StaffForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    designation: "",
    hire_date: "",
    epf_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the API endpoint to the correct one
      const response = await axios.post(
        "https://erp.api.mindgrowthacademy.com/api/attendance/addsinglestaff",
        formData
      );
      // Check if response is successful and show alert
      if (response.status === 200) {
        alert("Staff added successfully!");
        setFormData({
          name: "",
          gender: "",
          designation: "",
          hire_date: "",
          epf_number: "",
        });
      }
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="bg-[#f4f7fc] font-[Roboto] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-12">
        <h2 className="text-3xl font-semibold text-[#2d3d66] mb-8 text-center">
          Staff Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-[#4a4a4a] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-[#4a4a4a] mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#4a4a4a] mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Designation"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-[#4a4a4a] mb-2">
                EPF Number
              </label>
              <input
                type="text"
                name="epf_number"
                value={formData.epf_number}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="EPF Number"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-[#4a4a4a] mb-2">
                Hire Date
              </label>
              <input
                type="date"
                name="hire_date"
                value={formData.hire_date}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/3 bg-[#00307D] py-3 text-white rounded-lg font-medium text-lg shadow-md hover:bg-[#002a5d] transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
