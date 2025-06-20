import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";

const FeeSubCategoryComponent = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]); // New state for classes
  const [subcategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [academicId, setAcademicId] = useState("");
  const [classId, setClassId] = useState(""); // New state for class_id
  const [feeAmount, setFeeAmount] = useState(""); // New state for fee_amount
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);

  // Fetch subcategories
  const fetchSubCategories = async () => {
    const id = localStorage.getItem("selectedSchool");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-subcategories/school/${id}`,
      );
      console.log(response.data);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };
  const [academicYear, setAcademicYear] = useState([]);
  useEffect(() => {
    // Fetch class and division options from an API
    const id = localStorage.getItem("selectedSchool");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/academic-year`)
      .then((response) => {
        setAcademicYear(response.data);
      })
      .catch((error) =>
        console.error("Error fetching class and division options:", error),
      );
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-categories`,
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Fetch classes
  const fetchClasses = async () => {
    const id = localStorage.getItem("selectedSchool");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`,
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  // Create or update subcategory
  const handleFormSubmit = async () => {
    const subcategoryData = {
      subcategory_name: subcategoryName,
      category_id: categoryId,
      class_id: classId,
      fee_amount: feeAmount,
      year_session: academicId,
    };

    if (editSubCategoryId) {
      await updateSubCategory(editSubCategoryId, subcategoryData);
    } else {
      await createSubCategory(subcategoryData);
    }
  };

  // Create subcategory
  const createSubCategory = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-subcategories`,
        data,
      );
      setSubCategories([...subcategories, response.data]);
      setSubCategoryName("");
      setCategoryId("");
      setClassId("");
      setFeeAmount("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating subcategory", error);
    }
  };

  // Update subcategory
  const updateSubCategory = async (subcategoryId, data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-subcategories/${subcategoryId}`,
        data,
      );
      setSubCategories(
        subcategories.map((subcategory) =>
          subcategory.subcategory_id === subcategoryId
            ? response.data
            : subcategory,
        ),
      );
      setEditSubCategoryId(null);
      setSubCategoryName("");
      setCategoryId("");
      setClassId("");
      setFeeAmount("");
    } catch (error) {
      console.error("Error updating subcategory", error);
    }
  };

  // Start editing a subcategory
  const handleEditClick = (subcategory) => {
    setSubCategoryName(subcategory.subcategory_name);
    setCategoryId(subcategory.category_id);
    setClassId(subcategory.class_id);
    setFeeAmount(subcategory.fee_amount);
    setEditSubCategoryId(subcategory.subcategory_id);
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories();
    fetchClasses(); // Fetch classes when component mounts
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#00307D] text-white p-4 rounded-lg shadow-lg text-center w-full sm:w-2/3">
          <h2 className="text-2xl font-semibold">Fee Sub Categories</h2>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
          type="text"
          value={subcategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          placeholder="Enter subcategory name"
        />
        <select
          className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
          value={academicId}
          onChange={(e) => setAcademicId(e.target.value)}
        >
          <option value="">Select Academic Year</option>
          {academicYear.map((category) => (
            <option key={category.id} value={category.id}>
              {category.year}
            </option>
          ))}
        </select>
        <select
          className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>

        <select
          className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.d} value={cls.id}>
              {cls.class_name}
            </option>
          ))}
        </select>

        <input
          className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
          type="number"
          value={feeAmount}
          onChange={(e) => setFeeAmount(e.target.value)}
          placeholder="Enter fee amount"
        />

        <button
          className="btn bg-[#00307D] text-white px-5 py-3 rounded-md shadow hover:bg-[#002b6d] transition-all"
          onClick={handleFormSubmit}
        >
          {editSubCategoryId ? "Update Subcategory" : "Add Subcategory"}
        </button>
      </div>

      {/* List of Subcategories */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subcategories.map((subcategory) => (
          <li key={subcategory.subcategory_id} className="p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium">
                {subcategory.subcategory_name}
              </h3>
              <p>Category: {subcategory.category_name}</p>
              <p>Class: {subcategory.class_name}</p>
              <p>Fee: {subcategory.fee_amount}</p>
              <p>Session: {subcategory.year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeeSubCategoryComponent;
