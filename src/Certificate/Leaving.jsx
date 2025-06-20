import React, { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logoLeft from "../img/WhatsApp Image 2024-07-19 at 15.45.41_45d14541.jpg";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

function Leaving() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    AdmissionSerialNo: "",
    StudentId: "",
    GrNo: "",
    FullName: "",
    FathersName: "",
    MothersName: "",
    AadhaarCardNo: "",
    Caste: "",
    Religion: "",
    ParentsOccupation: "",
    MotherTongue: "",
    DateOfAdmission: "",
    DateOfBirth: "",
    DateOfBirthWords: "",
    PlaceOfBirth: "",
    StdAdmitted: "",
    LastSchoolAttended: "",
    StdStudying: "",
    Progress: "",
    ClassLeaving: "",
    DateLeaving: "",
    ReasonLeaving: "",
    Identification: "",
    AdmissionOfficerSignature: "",
    RegistrationOfficerSignature: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("preview-content");
    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("student_leaving_certificate.pdf");
    });
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/newstudent/${id}`,
        );
        const data = response.data.student;

        console.log(data); // Debugging

        // Map API data to form fields
        setFormData({
          ...formData,
          studentName: `${data.firstName} ${
            data.middleName
          } ${data.lastName.trim()}`,
          DateOfBirth: new Date(data.dob).toLocaleDateString(), // Convert date to readable format
          birthPlace: data.dobPlace,
          caste: data.category,
          regdNo: data.regdNo,
          lastClass: data.class,
          studying: data.class,
          date: new Date().toLocaleDateString(), // Get current date
          DateOfBirthWords: new Date(data.dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          admissionSerialNo: data.admNo,
          StudentId: data.id,
          GrNo: data.grNo,
          FullName: `${data.firstName} ${
            data.middleName
          } ${data.lastName.trim()}`,
          FathersName: data.fatherName,
          MothersName: data.motherName,
          AadhaarCardNo: data.uidNo,
          Caste: data.category,
          Religion: data.religion,
        });
        // Fetch admission officer and registration officer signatures
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchStudent();
  }, [id]);

  return (
    <div className="text-black bg-[#6f9ff98a] min-h-screen font-[roboto]">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="text-white bg-[#00307D] hover:bg-[#112b55] h-8 mt-24  px-6 rounded-md text-sm items-center mr-10 relative right-[18rem] "
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <div className="pt-20">
          <h2 className="text-3xl font-semibold text-center">
            Student Leaving Certificate Details
          </h2>
          <p className="text-center">
            Enter the required information for the certificate
          </p>
        </div>
      </div>

      <div className="mt-8 md:mt-16 lg:mt-32 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((field) => (
            <div className="px-2" key={field}>
              <label className="text-black mb-2">
                {field.split(/(?=[A-Z])/).join(" ")}
              </label>
              <input
                type={
                  field === "dob" ||
                  field === "dateOfAdmission" ||
                  field === "dateLeaving"
                    ? "date"
                    : "text"
                }
                name={field}
                placeholder={`Enter ${field.split(/(?=[A-Z])/).join(" ")}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={formData[field]}
                onChange={handleFormChange}
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex pb-20 justify-center items-center text-white mt-20">
            <button
              className="bg-[#00307D] hover:bg-[#112b55] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
              onClick={handlePreview}
            >
              Preview
            </button>
            <button
              className="bg-[#00307D] hover:bg-[#112b55] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
          {showPreview && (
            <div
              id="preview-content"
              className="mt-8 p-4 border border-gray-300 bg-white text-black"
            >
              <div className="bg-white p-4">
                <div className="m-12 p-12 border-4 border-black">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-44 h-44  relative  ">
                      <img
                        src={logoLeft}
                        alt="error"
                        loading="lazy"
                        title="logoLeft"
                      />
                    </div>
                    <div className="mb-12">
                      <h2 className="text-center text-red-700 mb-2 font-bold text-3xl">
                        INDURA ENGLISH SCHOOL (CBSE)
                      </h2>
                      <p className="text-center font-semibold">
                        Enjangaon (East), Tq, Basmath Dist Hingoli
                      </p>
                      <p className="text-center font-semibold">
                        UDISE No.: 27160301903 Affiliation No.: 1131230 School
                        Code: 31217
                      </p>
                      <div className="text-center font-semibold">
                        <a
                          href="http://www.induraenglishschool.in"
                          className="mx-4"
                        >
                          Website : www.induraenglishschool.in
                        </a>
                        <a
                          href="mailto:induraenglishschool@gmail.com"
                          className="mx-4"
                        >
                          Email : induraenglishschool@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="w-40 h-40 relative">
                      <img
                        src={logoRight}
                        alt="error"
                        loading="lazy"
                        title="logoRight"
                      />
                    </div>
                  </div>

                  <div className="mt-20 mb-12">
                    <div className="overflow-x-auto">
                      <table className="w-full max-w-[800px] border-collapse border border-gray-300 mx-auto">
                        <tbody>
                          {Object.keys(formData).map((field) => (
                            <tr key={field} className="border border-gray-300">
                              <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                                {field.split(/(?=[A-Z])/).join(" ")}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                <input
                                  type={
                                    field === "dob" ||
                                    field === "dateOfAdmission" ||
                                    field === "dateLeaving"
                                      ? "date"
                                      : "text"
                                  }
                                  name={field}
                                  value={formData[field]}
                                  onChange={handleFormChange}
                                  className="w-full text-black rounded focus:outline-none"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h4 className="px-12 mt-6">DATE:</h4>

                  <div className="flex justify-between items-center pt-2 px-12">
                    <p>PLACE : IES, Barmath</p>
                    <p>CLERK’S SIGN </p>
                    <p>PRINCIPAL’S SIGNATURE</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaving;
