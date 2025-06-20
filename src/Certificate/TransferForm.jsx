import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TransferCertificatePreview from "./TransferCertificatePreview";
import axios from "axios";
import { useParams } from "react-router-dom";

function TransferForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
    schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
    udiseNo: "27160301903",
    affiliationNo: "1131230",
    schoolCode: "31217",
    logoLeft: "",
    logoRight: "",
    SlNo: "",
    StudentID: "",
    UIDNo: "",
    AdmissionNo: "",
    NationalCode: "",
    studentName: "",
    mothersName: "",
    fathersName: "",
    dateOfBirth: "",
    birthPlace: "",
    taluka: "",
    district: "",
    nationality: "",
    caste: "",
    admissionDate: "",
    lastClass: "",
    inWords: "",
    lastExam: "",
    failed: "",
    subjects: ["", "", "", "", "", ""],
    workingDays: "",
    presence: "",
    duesPaid: "",
    promotion: "",
    govtCategory: "",
    extracurricular: "",
    progress: "",
    conduct: "",
    reasonForLeaving: "",
    applicationDate: "",
    struckOffDate: "",
    issueDate: "",
    remarks: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/newstudent/${id}`
        );
        const data = response.data;

        // Mapping API data to form data
        setFormData({
          ...formData,
          studentName: `${
            data.student.firstName
          } ${data.student.lastName.trim()}`,
          fathersName: data.student.fatherName,
          dateOfBirth: new Date(data.student.dob).toLocaleDateString(),
          birthPlace: data.student.dobPlace,
          nationality: data.student.nationality,
          caste: data.student.category,
          admissionDate: new Date(data.student.admDate).toLocaleDateString(),
          presentAddress: data.student.address.presentAddress,
          permanentAddress: data.student.address.permanentAddress,
          taluka: data.student.address.taluka,
          district: data.student.address.district,
          pincode: data.student.address.pincode,
          AdmissionNo: data.student.admNo,
          StudentID: data.student.id,
          UIDNo: data.student.uidNo,
          mothersName: data.student.motherName,
          lastClass: data.student.class,
        });
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetch();
  }, [id]);

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

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({ ...formData, subjects: newSubjects });
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
      pdf.save("Transfer_Certificate.pdf");
    });
  };

  return (
    <div className="text-black bg-[#6f9ff98a]  min-h-screen font-[roboto]">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className=" text-white bg-[#00307D] hover:bg-[#112b55] h-8 mt-24  px-6 rounded-md text-sm items-center mr-10 relative right-[20rem] "
          onClick={() => window.history.back()}
        >
          Back
        </button>

        <div className="pt-20">
          <h2 className="text-3xl font-semibold text-center">
            Transfer Certificate Details
          </h2>
          <p className="text-center">
            Enter the required information for the certificate
          </p>
        </div>
      </div>
      <div className="mt-8 md:mt-16  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map(
            (key) =>
              key !== "subjects" &&
              key !== "promotion" &&
              key !== "govtCategory" &&
              key !== "extracurricular" && (
                <div key={key} className="px-2">
                  <label className="text-black mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
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
                      placeholder={`Enter ${key
                        .replace(/([A-Z])/g, " $1")
                        .trim()}`}
                      className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              )
          )}
          {formData.subjects.map((subject, index) => (
            <div key={index} className="px-2">
              <label className="text-black mb-2">{`Subject ${
                index + 1
              }:`}</label>
              <input
                type="text"
                placeholder={`Enter Subject ${index + 1}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={subject}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
              />
            </div>
          ))}

          <div className="px-2">
            <label className="text-black mb-2">
              Qualified for promotion to the higher class:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="promotion"
                value="YES"
                checked={formData.promotion === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="promotion"
                value="NO"
                checked={formData.promotion === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-2">
            <label className="text-black mb-2">
              Whether school is under Govt./ Minority / Independent Category:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="govtCategory"
                value="YES"
                checked={formData.govtCategory === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="govtCategory"
                value="NO"
                checked={formData.govtCategory === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-2">
            <label className="text-black mb-2">
              Games played or extra curricular activities:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="extracurricular"
                value="YES"
                checked={formData.extracurricular === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="extracurricular"
                value="NO"
                checked={formData.extracurricular === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-2">
            <label className="text-black mb-2">Progress and Conduct:</label>
            <textarea
              name="progress"
              placeholder="Enter Progress and Conduct"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.progress}
              onChange={handleChange}
            />
          </div>

          <div className="px-2">
            <label className="text-black mb-2">Remarks:</label>
            <textarea
              name="remarks"
              placeholder="Enter Remarks"
              className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          onClick={handlePreview}
          className="px-4 py-2  text-white rounded bg-[#00307D] hover:bg-[#112b55] "
        >
          Preview
        </button>
      </div>

      {showPreview && (
        <div className="mt-8">
          <TransferCertificatePreview formData={formData} />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-white rounded bg-[#00307D] hover:bg-[#112b55]"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferForm;
