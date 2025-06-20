import React, { useState } from "react";
import Header from "../dashboard/Header";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "../../sampleFile.xlsx";
    link.download = "sampleFile.xlsx";
    link.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    const id = localStorage.getItem("selectedSchool");
    if (!id) {
      alert("No school selected in localStorage.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", id);

    try {
      const response = await fetch(
        "https://erp.api.mindgrowthacademy.com/students/mass-upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully.");
        window.location.reload();
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            Upload XLS File
          </h1>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            onClick={handleDownload}
          >
            Download Sample XLS
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-600 font-medium mb-2"
              >
                Select XLS File:
              </label>
              <input
                type="file"
                id="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                className="block w-full text-gray-700 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit File
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
