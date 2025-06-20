import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../dashboard/Header";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      const id = localStorage.getItem("selectedSchool");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`,
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to load classes");
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchDivisions = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${selectedClass}`,
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

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedDivision) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/students/${selectedClass}/${selectedDivision}`,
          );
          console.log(selectedClass, selectedDivision);
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students data:", error);
          setError("Failed to load students data");
        }
      }
    };

    fetchStudents();
  }, [selectedClass, selectedDivision]);
  const handleFileUpload = (event, studentId) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("id", studentId); // Add the student ID to the form data

      fetch(`${process.env.REACT_APP_BASE_API_URL}/api/upload-photo`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully", data);
          window.location.reload();
          // Optionally update the student's photo or perform other actions
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="mb-4 flex gap-4">
          <div>
            <label className="block mb-1 font-medium">Select Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select Class --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Select Division:</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={!selectedClass}
            >
              <option value="">-- Select Division --</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.division_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Photo</th>
                <th className="py-2 px-4 border-b">Registration No.</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Class</th>
                <th className="py-2 px-4 border-b">Mobile No</th>
                <th className="py-2 px-4 border-b">Email ID</th>
                <th className="py-2 px-4 border-b">Actions</th>
                <th className="py-2 px-4 border-b">Fee Details</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b">
                      {student.photo ? (
                        <img
                          src={`${process.env.REACT_APP_BASE_API_URL}${student.photo}`}
                          alt="Student"
                          className="w-[10rem] h-[10rem] object-contain"
                        />
                      ) : (
                        <button
                          onClick={() =>
                            document.getElementById("fileUpload").click()
                          }
                          className="w-20 h-20 bg-gray-200 text-center flex items-center justify-center text-sm text-gray-500 rounded-md border border-gray-300"
                        >
                          Upload Photo
                          <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              handleFileUpload(event, student.id)
                            } // Pass student ID here
                            className="hidden"
                          />
                        </button>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{student.regdNo}</td>
                    <td className="py-2 px-4 border-b">
                      {student.firstName} {student.middleName}{" "}
                      {student.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">{student.class_id}</td>
                    <td className="py-2 px-4 border-b">{student.mobileNo}</td>
                    <td className="py-2 px-4 border-b">{student.emailId}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() =>
                          navigate(`/student-details/${student.id}`)
                        }
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        // onClick={() => navigate(/fee-details/${student.id})}
                        onClick={() => navigate(`/fee-details/${student.id}`)}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                      >
                        Fee Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center">
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
