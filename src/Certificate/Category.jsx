import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";

const FeeCategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://erp.api.mindgrowthacademy.com/api/fee-categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Create a new category
  const createCategory = async () => {
    try {
      const response = await axios.post(
        `https://erp.api.mindgrowthacademy.com/api/fee-categories`,
        { category_name: categoryName }
      );
      setCategories([...categories, response.data]);
      setCategoryName("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  // Update a category
  const updateCategory = async (categoryId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-categories/${categoryId}`,
        { category_name: categoryName }
      );
      setCategories(
        categories.map((category) =>
          category.category_id === categoryId ? response.data : category
        )
      );
      setEditCategoryId(null); // Clear editing state
      setCategoryName(""); // Reset input field
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  // Handle form submission (Create or Update)
  const handleFormSubmit = () => {
    if (editCategoryId) {
      updateCategory(editCategoryId); // Update category if edit mode
    } else {
      createCategory(); // Create new category otherwise
    }
  };

  // Start editing a category
  const handleEditClick = (category) => {
    setCategoryName(category.category_name);
    setEditCategoryId(category.category_id); // Set the ID of the category being edited
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#00307D] text-white p-4 rounded-lg shadow-lg text-center w-full sm:w-2/3">
          <h2 className="text-2xl font-semibold">Fee Categories</h2>
        </div>
      </div>

      {/* Input section */}
      <div className="input-section flex flex-col sm:flex-row sm:space-x-4 items-center mb-6">
        <input
          className="border py-3 px-4 rounded w-full sm:w-2/3 mb-4 sm:mb-0"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <button
          className="bg-[#00307D] text-white py-3 px-6 rounded-lg hover:bg-[#002766] transition-all"
          onClick={handleFormSubmit}
        >
          {editCategoryId ? "Update Category" : "Create Category"}
        </button>
      </div>

      {/* Category list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li key={category.category_id} className="p-4">
            <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
              <span className="block text-lg font-medium">
                {category.category_name}
              </span>
              <button
                className="text-[#2B75EB] p-2 hover:text-[#1f5fb5] transition-all"
                onClick={() => handleEditClick(category)}
              >
                <FaRegEdit size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeeCategoryComponent;
