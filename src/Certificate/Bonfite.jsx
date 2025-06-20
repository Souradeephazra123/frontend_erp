import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import BonafideCertificatePreview from "./BonfitePreview";
import { useParams } from "react-router-dom";

function Bonafite() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
    schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
    udiseNo: "27160301903",
    affiliationNo: "1131230",
    schoolCode: "31217",
    logoLeft: "",
    logoRight: "",
    studentName: "",
    studying: "",
    date: "",
    birthDate: "",
    birthDateInWords: "",
    birthPlace: "",
    caste: "",
    reason: "",
    certificateNo: "",
    regdNo: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("preview-content");
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bonafide_Certificate.pdf");
    });
  };
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/newstudent/${id}`
        );
        const data = response.data.student;

        console.log(data); // Debugging

        // Map API data to form fields
        setFormData({
          ...formData,
          studentName: `${data.firstName} ${
            data.middleName
          } ${data.lastName.trim()}`,
          birthDate: new Date(data.dob).toLocaleDateString(), // Convert date to readable format
          birthPlace: data.dobPlace,
          caste: data.category,
          regdNo: data.regdNo,
          lastClass: data.class,
          studying: data.class,
          date: new Date().toLocaleDateString(), // Get current date
          birthDateInWords: new Date(data.dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchStudent();
  }, [id]);

  return (
    <div className="text-black bg-[#6f9ff98a]  min-h-screen font-[roboto]">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="text-white bg-[#00307D] hover:bg-[#112b55] h-8 mt-24  px-6 rounded-md text-sm items-center mr-10 relative right-[20rem] "
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="pt-20">
          <h2 className="text-3xl font-semibold text-center">
            Bonafide Certificate Details
          </h2>
          <p className="text-center">
            Enter the required information for the certificate
          </p>
        </div>
      </div>

      <div className="mt-8 md:mt-16  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((key) => (
            <div key={key} className="px-2">
              <label className="text-black mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {key === "logoLeft" || key === "logoRight" ? (
                <input
                  type="file"
                  name={key}
                  accept="image/*"
                  className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center p-8 text-white mt-20">
        <button
          className="bg-[#00307D] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
          onClick={handlePreview}
        >
          Preview
        </button>
        {showPreview && (
          <button
            className="bg-[#00307D] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        )}
      </div>

      <h3 className="text-xl mt-12 text-center font-semibold mb-4">Preview</h3>

      <div className="pb-32">
        {showPreview && <BonafideCertificatePreview formData={formData} />}
      </div>
    </div>
  );
}

export default Bonafite;
