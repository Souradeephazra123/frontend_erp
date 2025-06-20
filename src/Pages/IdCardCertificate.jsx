import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Aid from "./Aid";

function IdCardCertificate() {
  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    dob: "",
    phoneNumber: "",
    studentId: "",
    address: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("preview-content");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("student_id_card_details.pdf");
    });
  };

  return (
    <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Student ID Card Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div className="flex justify-center items-center mt-20">
        {!profileImg ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white bg-[#FFFFFF] p-4 w-32 h-32 rounded cursor-pointer"
          />
        ) : (
          <img
            src={profileImg}
            alt="Profile"
            className="w-32 h-32 rounded"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <div className="mt-8 md:mt-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          <div className="px-2">
            <label className="text-white mb-2">Student's Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="px-2">
            <label className="text-white mb-2">Father's Name</label>
            <input
              type="text"
              name="fathersName"
              placeholder="Enter Father's Name"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.fathersName}
              onChange={handleChange}
            />
          </div>
          <div className="px-2">
            <label className="text-white mb-2">Date of Birth</label>
            <input
              type="text"
              name="dob"
              placeholder="Enter Date of Birth"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="px-2">
            <label className="text-white mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="px-2">
            <label className="text-white mb-2">Student ID</label>
            <input
              type="text"
              name="studentId"
              placeholder="Enter Student ID"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.studentId}
              onChange={handleChange}
            />
          </div>
          <div className="px-2">
            <label className="text-white mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-12">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        {showPreview && (
          <div className="flex justify-center items-center mt-12">
            <div id="preview-content">
              <Aid
                fullName={formData.fullName}
                fathersName={formData.fathersName}
                dob={formData.dob}
                phoneNumber={formData.phoneNumber}
                studentId={formData.studentId}
                address={formData.address}
                profileImg={profileImg}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdCardCertificate;
