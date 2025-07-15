import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

const ExpenditureManagement = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [newExpenditure, setNewExpenditure] = useState({
    expenditureType: "",
    description: "",
    amount: "",
    date: "",
    Name: "",
  });
  const [editingExpenditure, setEditingExpenditure] = useState(null);

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const fetchExpenditures = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/expenditure`
      );
      setExpenditures(response.data);
    } catch (error) {
      console.error("Error fetching expenditures", error);
    }
  };

  const handleAddOrEditExpenditure = async () => {
    if (editingExpenditure) {
      // Edit existing expenditure
      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_API_URL}/api/expenditure/${editingExpenditure.id}`,
          newExpenditure
        );
        fetchExpenditures();
        resetForm();
      } catch (error) {
        console.error("Error editing expenditure", error);
      }
    } else {
      // Add new expenditure
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/api/expenditure`,
          newExpenditure
        );
        fetchExpenditures();
        resetForm();
      } catch (error) {
        console.error("Error adding expenditure", error);
      }
    }
  };

  const handleEditExpenditure = (expenditure) => {
    setEditingExpenditure(expenditure);
    setNewExpenditure({
      expenditureType: expenditure.expenditureType,
      description: expenditure.description,
      amount: expenditure.amount,
      date: expenditure.date,
      Name: expenditure.Name,
    });
  };

  const handleDeleteExpenditure = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/api/expenditure/${id}`
      );
      fetchExpenditures();
    } catch (error) {
      console.error("Error deleting expenditure", error);
    }
  };

  const resetForm = () => {
    setNewExpenditure({
      expenditureType: "",
      description: "",
      amount: "",
      date: "",
      Name: "",
    });
    setEditingExpenditure(null);
  };
  const downloadExcel = () => {
    if (expenditures.length === 0) {
      alert("No expenditures to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(expenditures);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Save the file
    XLSX.writeFile(workbook, `expenditures.xlsx`);
  };

  const generateExpenditureInvoice = async (expenditure) => {
    const invoiceData = {
      invoiceNumber: `EXP${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${expenditure.id}`,
      expenditureType: expenditure.expenditureType,
      description: expenditure.description,
      Name: expenditure.Name,
      amount: expenditure.amount,
      date: expenditure.date,
    };

    await generateInvoicePDF(invoiceData, "expenditure");
  };
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Expenditure Management
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editingExpenditure ? "Edit Expenditure" : "Add New Expenditure"}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              placeholder="Name"
              value={newExpenditure.Name}
              onChange={(e) =>
                setNewExpenditure({ ...newExpenditure, Name: e.target.value })
              }
            />
            <input
              type="text"
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              placeholder="Expenditure Type"
              value={newExpenditure.expenditureType}
              onChange={(e) =>
                setNewExpenditure({
                  ...newExpenditure,
                  expenditureType: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              placeholder="Description"
              value={newExpenditure.description}
              onChange={(e) =>
                setNewExpenditure({
                  ...newExpenditure,
                  description: e.target.value,
                })
              }
            />
            <input
              type="number"
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              placeholder="Amount"
              value={newExpenditure.amount}
              onChange={(e) =>
                setNewExpenditure({ ...newExpenditure, amount: e.target.value })
              }
            />
            <input
              type="date"
              className="p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              value={newExpenditure.date}
              onChange={(e) =>
                setNewExpenditure({ ...newExpenditure, date: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleAddOrEditExpenditure}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editingExpenditure ? "Update Expenditure" : "Add Expenditure"}
          </button>

          {editingExpenditure && (
            <button
              onClick={resetForm}
              className="mt-4 ml-2 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Expenditure List
          </h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={downloadExcel}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              📊 Download Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Expenditure Type</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenditures.map((expenditure) => (
                  <tr key={expenditure.id} className="border-b">
                    <td className="p-2">{expenditure.id}</td>
                    <td className="p-2">{expenditure.Name}</td>
                    <td className="p-2">{expenditure.expenditureType}</td>
                    <td className="p-2">{expenditure.description}</td>
                    <td className="p-2">₹{expenditure.amount}</td>
                    <td className="p-2">{expenditure.date}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditExpenditure(expenditure)}
                          className="text-blue-500 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteExpenditure(expenditure.id)
                          }
                          className="text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded text-sm"
                        >
                          🗑️ Delete
                        </button>
                        <button
                          onClick={() =>
                            generateExpenditureInvoice(expenditure)
                          }
                          className="text-green-500 hover:text-green-700 bg-green-100 px-2 py-1 rounded text-sm"
                          title="Download Invoice PDF"
                        >
                          📄 Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenditureManagement;
