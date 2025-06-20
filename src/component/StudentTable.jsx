import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import Header from "../dashboard/Header";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedFilterType, setSelectedFilterType] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter options
  const categoryOptions = ["General", "OBC", "SC", "ST"];
  const genderOptions = ["Male", "Female", "Other"];
  const hostelOptions = [
    "Day scholars",
    "Local residential",
    "Nalco residential",
    "Anwesha",
  ];

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      const id = localStorage.getItem("selectedSchool");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`,
        );
        setClasses(response.data);
      } catch (error) {
        setError("Failed to load classes");
      }
    };
    fetchClasses();
  }, []);

  // Fetch divisions when class changes
  useEffect(() => {
    const fetchDivisions = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${selectedClass}`,
          );
          setDivisions(response.data);
        } catch (error) {
          setError("Failed to load divisions");
        }
      }
    };
    fetchDivisions();
  }, [selectedClass]);

  // Fetch students when class, division, or filter changes
  console.log(selectedFilterValue);
  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedDivision && selectedFilterValue) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/students/${selectedClass}/${selectedDivision}/${selectedFilterValue}`,
          );
          let studentData = response.data;

          // Apply additional filter if selected
          if (selectedFilterType && selectedFilterValue) {
            studentData = studentData.filter((student) => {
              if (selectedFilterType === "gender") {
                return student.gender === selectedFilterValue;
              } else if (selectedFilterType === "category") {
                return student.category === selectedFilterValue;
              } else if (selectedFilterType === "hostel") {
                return student.hostelType === selectedFilterValue;
              }
              return true;
            });
          }

          setStudents(studentData);
        } catch (error) {
          setError("Failed to load students");
        }
      }
    };
    fetchStudents();
  }, [
    selectedClass,
    selectedDivision,
    selectedFilterType,
    selectedFilterValue,
  ]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Class Selection */}
        <div className="mb-4">
          <label className="block mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name}
              </option>
            ))}
          </select>
        </div>

        {/* Division Selection */}
        {selectedClass && (
          <div className="mb-4">
            <label className="block mb-2">Select Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.division_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filter Selection */}
        {selectedClass && selectedDivision && (
          <div className="mb-4">
            <label className="block mb-2">Select Filter</label>
            <select
              value={selectedFilterType}
              onChange={(e) => {
                setSelectedFilterType(e.target.value);
                setSelectedFilterValue(""); // Reset value when type changes
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Filter</option>
              <option value="gender">Gender</option>
              <option value="category">Category</option>
              <option value="hostel">Hostel Type</option>
            </select>
          </div>
        )}

        {/* Dynamic Filter Value Selection */}
        {selectedFilterType && (
          <div className="mb-4">
            <label className="block mb-2">
              Select{" "}
              {selectedFilterType.charAt(0).toUpperCase() +
                selectedFilterType.slice(1)}
            </label>
            <select
              value={selectedFilterValue}
              onChange={(e) => setSelectedFilterValue(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select {selectedFilterType}</option>
              {selectedFilterType === "gender" &&
                genderOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              {selectedFilterType === "category" &&
                categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              {selectedFilterType === "hostel" &&
                hostelOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
            </select>
          </div>
        )}

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Photo</th>
                <th className="py-2 px-4 border-b">Registration No.</th>
                <th className="py-2 px-4 border-b">Class</th>
                <th className="py-2 px-4 border-b">Mobile No</th>
                <th className="py-2 px-4 border-b">Email ID</th>
                <th className="py-2 px-4 border-b">Actions</th>
                <th className="py-2 px-4 border-b">Certificate Type</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b">
                      <div className="w-20 h-20 sm:w-44 sm:h-44 p-4">
                        <img
                          src={`${process.env.REACT_APP_BASE_API_URL}${student.photo}`}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{student.regdNo}</td>
                    <td className="py-2 px-4 border-b">{student.class_id}</td>
                    <td className="py-2 px-4 border-b">{student.mobileNo}</td>
                    <td className="py-2 px-4 border-b">{student.emailId}</td>
                    <td className="py-2 px-4 border-b">
                      {/* <button
                        onClick={() => handleViewDetails(student)}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        View Details
                      </button> */}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={student.certificateType}
                        // onChange={(e) =>
                        //   handleCertificateTypeChange(
                        //     student.id,
                        //     e.target.value
                        //   )
                        // }
                        className="border rounded py-1 px-2"
                      >
                        <option value="Select Certificate Type">
                          Select Certificate Type
                        </option>
                        <option value="Type1">Id_Card Certificate</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 border-b text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentTable;
