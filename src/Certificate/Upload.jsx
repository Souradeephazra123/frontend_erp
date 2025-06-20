import React, { useState } from "react";
import readXlsxFile from "read-excel-file";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      // Parse Excel file
      const rows = await readXlsxFile(file);
      const formData = new FormData();

      console.log("Excel rows:", rows);

      // Ensure we have valid rows and skip empty rows
      rows.forEach((row, index) => {
        // Skip header row and invalid rows

        const [name, className, image] = row;
        console.log(name, className, image);
        // Check if the row has all required fields before appending to formData
        if (name && className) {
          formData.append("name[]", name);
          formData.append("class[]", className);
          formData.append("image[]", image); // This will append the image reference
        }
      });

      console.log("FormData before upload:", formData);

      // Send data to Node.js server
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Upload success", response.data);
    } catch (error) {
      console.error("Error during file processing or upload", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
