import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";

const PromoteStudents = () => {
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [students, setStudents] = useState([]);
  const [feeSubcategories, setFeeSubcategories] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [newClassId, setNewClassId] = useState("");
  const [newDivisions, setNewDivisions] = useState([]);
  const [newDivisionId, setNewDivisionId] = useState("");
  const [fees, setFees] = useState([]);

  // Fetch all classes
  useEffect(() => {
    const id = localStorage.getItem("selectedSchool");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`)
      .then((response) => {
        setClasses(response.data);
      });
  }, []);

  // Fetch divisions based on selected class
  useEffect(() => {
    if (selectedClass) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${selectedClass}`,
        )
        .then((response) => {
          setDivisions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching divisions:", error);
          alert("Error fetching divisions:");
        });
    }
  }, [selectedClass]);

  // Fetch divisions for the new class
  useEffect(() => {
    if (newClassId) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${newClassId}`,
        )
        .then((response) => {
          setNewDivisions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching new divisions:", error);
          alert("Error fetching new divisions:");
        });
    }
  }, [newClassId]);

  // Fetch students based on class and division
  useEffect(() => {
    if (selectedClass && selectedDivision) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/api/class/students/${selectedClass}/${selectedDivision}`,
        )
        .then((response) => {
          setStudents(response.data);
        })
        .catch((e) => {
          alert("No student found.");
          window.location.reload();
        });
    }
  }, [selectedClass, selectedDivision]);

  // Fetch fee subcategories based on new class
  useEffect(() => {
    if (newClassId) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/feesubcategories/${newClassId}`,
        )
        .then((response) => {
          setFeeSubcategories(response.data);

          // Preserve previous fee amounts if already set
          setFees((prevFees) =>
            response.data.map((sub) => {
              const existingFee = prevFees.find(
                (fee) => fee.subcategory_id === sub.subcategory_id,
              );
              return (
                existingFee || {
                  subcategory_id: sub.subcategory_id,
                  fee_amount: sub.fee_amount,
                }
              );
            }),
          );
        });
    }
  }, [newClassId]);

  // Handle student selection
  const handleStudentSelection = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  // Handle fee selection
  const handleFeeSelection = (subcategoryId, amount) => {
    setFees((prev) =>
      prev.some((fee) => fee.subcategory_id === subcategoryId)
        ? prev.filter((fee) => fee.subcategory_id !== subcategoryId)
        : [...prev, { subcategory_id: subcategoryId, fee_amount: amount }],
    );
  };

  // Handle fee amount change
  const handleFeeChange = (subcategoryId, value) => {
    setFees((prev) =>
      prev.map((fee) =>
        fee.subcategory_id === subcategoryId
          ? { ...fee, fee_amount: value }
          : fee,
      ),
    );
  };

  // Submit data
  const handleSubmit = async () => {
    if (
      !newClassId ||
      !newDivisionId ||
      selectedStudents.length === 0 ||
      fees.length === 0
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const requestBody = {
      newClassId,
      newDivisionId,
      studentIds: selectedStudents,
      fees,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/promote`,
        requestBody,
      );
      alert("Students promoted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error promoting students:", error);
      alert("Failed to promote students.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 bg-gray-100 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Promote Students
        </h1>

        {/* Class Selection */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-600 mb-2">
            Select Class:
          </label>
          <select
            className="w-full border p-2 rounded"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
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
          <div className="mb-6">
            <label className="block font-semibold text-gray-600 mb-2">
              Select Division:
            </label>
            <select
              className="w-full border p-2 rounded"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
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

        {/* Students Selection */}
        {selectedDivision && students.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-600 mb-2">
              Select Students:
            </h3>
            {students.map((student) => (
              <div key={student.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={student.id}
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleStudentSelection(student.id)}
                />
                {student.firstName} {student.lastName}
              </div>
            ))}
          </div>
        )}

        {/* New Class Selection */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-600 mb-2">
            Select New Class:
          </label>
          <select
            className="w-full border p-2 rounded"
            value={newClassId}
            onChange={(e) => setNewClassId(e.target.value)}
          >
            <option value="">Select New Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name}
              </option>
            ))}
          </select>
        </div>

        {/* New Division Selection */}
        {newClassId && (
          <div className="mb-6">
            <label className="block font-semibold text-gray-600 mb-2">
              Select New Division:
            </label>
            <select
              className="w-full border p-2 rounded"
              value={newDivisionId}
              onChange={(e) => setNewDivisionId(e.target.value)}
            >
              <option value="">Select New Division</option>
              {newDivisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.division_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Fee Subcategories */}
        {newClassId && feeSubcategories.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-600 mb-2">Fee Details:</h3>
            {feeSubcategories.map((sub) => (
              <div key={sub.subcategory_id} className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={fees.some(
                    (fee) => fee.subcategory_id === sub.subcategory_id,
                  )}
                  onChange={() =>
                    handleFeeSelection(sub.subcategory_id, sub.fee_amount)
                  }
                />
                <label className="w-1/3">{sub.subcategory_name}:</label>
                <input
                  type="number"
                  className="border p-2 w-2/3"
                  value={sub.fee_amount}
                  onChange={(e) =>
                    handleFeeChange(sub.subcategory_id, e.target.value)
                  }
                  disabled
                />
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Promote Students
        </button>
      </div>
    </>
  );
};

export default PromoteStudents;
