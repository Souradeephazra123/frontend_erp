import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Header from "../dashboard/Header";

const StudentCounts = () => {
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [filterType, setFilterType] = useState("gender");
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  // Fetch Classes
  useEffect(() => {
    const fetchClasses = async () => {
      const id = localStorage.getItem("selectedSchool");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to load classes");
      }
    };

    fetchClasses();
  }, []);

  // Fetch Divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${selectedClass}`
          );
          setDivisions(response.data);
        } catch (error) {
          console.error("Error fetching divisions:", error);
          setError("Failed to load divisions");
        }
      }
    };

    fetchDivisions();
  }, [selectedClass]);

  // Fetch Data Based on Filter
  const fetchCounts = async () => {
    if (!selectedClass || !selectedDivision) {
      setError("Please select both class and division.");
      return;
    }

    let endpoint;
    if (filterType === "gender") {
      endpoint = `/count/student/gender/${selectedClass}/${selectedDivision}`;
    } else if (filterType === "category") {
      endpoint = `/count/student/category/${selectedClass}/${selectedDivision}`;
    } else if (filterType === "hostel") {
      endpoint = `/count/student/hostel/${selectedClass}/${selectedDivision}`;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}${endpoint}`
      );
      setData(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching counts:", error);
      setError("Failed to load data.");
    }
  };

  // Download Data as Excel
  const downloadExcel = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    saveAs(
      blob,
      `${filterType}-counts-${selectedClass}-${selectedDivision}.json`
    );
  };

  // Render Table Rows
  const renderRows = () => {
    if (!data || Object.keys(data).length === 0) return null;

    let rows = [];
    if (data.genderCounts) {
      Object.entries(data.genderCounts).forEach(([gender, count]) => {
        rows.push(
          <tr key={gender}>
            <td className="p-4 border">Total {gender} students</td>
            <td className="p-4 border">{count}</td>
          </tr>
        );
      });
    }

    if (data.categoryCounts) {
      Object.entries(data.categoryCounts).forEach(([category, count]) => {
        rows.push(
          <tr key={category}>
            <td className="p-4 border">
              Total students in {category} category
            </td>
            <td className="p-4 border">{count}</td>
          </tr>
        );
      });
    }

    if (data.hostelTypeCounts) {
      Object.entries(data.hostelTypeCounts).forEach(([hostelType, count]) => {
        rows.push(
          <tr key={hostelType}>
            <td className="p-4 border">
              Total students in {hostelType} hostel
            </td>
            <td className="p-4 border">{count}</td>
          </tr>
        );
      });
    }

    return rows;
  };

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Student Count Filter</h1>

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
        <div className="mb-4">
          <label className="block mb-2">Select Filter</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="gender">Gender</option>
            <option value="category">Category</option>
            <option value="hostel">Hostel Type</option>
          </select>
        </div>

        {/* Fetch Data Button */}
        <button
          onClick={fetchCounts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Counts
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Display Results in Table */}
        {Object.keys(data).length > 0 && (
          <div className="mt-6 p-4 border rounded bg-gray-100">
            <h2 className="text-lg font-bold mb-2">Results:</h2>
            <table className="table-auto w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border">Description</th>
                  <th className="p-4 border">Count</th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
            <button
              onClick={downloadExcel}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download as Excel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentCounts;
