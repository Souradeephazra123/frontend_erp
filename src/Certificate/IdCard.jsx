import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import IdForm from "./IdForm";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function IdCard() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
    schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
    udiseNo: "27160301903",
    affiliationNo: "1131230",
    schoolCode: "31217",
    fullName: "",
    fatherName: "",
    dob: "",
    mobileNo: "",
    studentId: "",
    address: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [logoLeft, setLogoLeft] = useState(null);
  // const [logoRight, setLogoRight] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const location = useLocation();
  const { student } = location.state || {};

  useEffect(() => {
    if (student) {
      setFormData({
        ...formData,
        fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
        fatherName: student.fatherName,
        dob: student.dob,
        mobileNo: student.mobileNo,
        studentId: student.id,
        address: student?.address?.presentAddress,
      });

      const encodedImageUrl = encodeURI(
        student.photo.startsWith("/")
          ? `${window.location.origin}${student.photo}`
          : student.photo
      );
      console.log(student.photo);

      setProfileImg("https://erp.api.mindgrowthacademy.com" + student.photo);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("preview-content");
    const images = input.getElementsByTagName("img");
    console.log(images);
    const totalImages = images.length;
    let loadedImages = 0;

    Array.from(images).forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            renderPdf();
          }
        };
        img.onerror = () => {
          console.error("Failed to load image", img.src);
          img.src = "path/to/default/image.png";
        };
      }
    });

    if (loadedImages === totalImages) {
      renderPdf();
    }
  };

  function renderPdf() {
    const input = document.getElementById("preview-content");
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("student_id_card_details.pdf");
    });
  }

  return (
    <div className="text-black bg-[#6f9ff98a] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Student ID Card Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div>
        <div className="flex justify-center items-center gap-x-32">
          <div className="flex justify-center items-center mt-20">
            <button
              type="button"
              className="text-white bg-[#00307D] hover:bg-[#112b55] py-2 px-4 mr-[400px] flex justify-center rounded-md text-sm"
              onClick={() => nav("/studentTable")}
            >
              Back
            </button>
            <div className="text-center">
              <label className="block text-black mb-2">
                Upload Profile Image
              </label>
              {!profileImg ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setProfileImg)}
                  className="text-black bg-[#FFFFFF] p-4 w-32 h-32 rounded cursor-pointer"
                />
              ) : (
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-32 h-32 rounded"
                  style={{ objectFit: "cover" }}
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/default/image.png";
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center items-center mt-20">
            <div className="text-center">
              <label className="block text-black mb-2">Upload Left Logo</label>
              {!logoLeft ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setLogoLeft)}
                  className="text-black bg-[#FFFFFF] p-4 w-32 h-32 rounded cursor-pointer"
                />
              ) : (
                <img
                  src={logoLeft}
                  alt="Logo Left"
                  className="w-32 h-32 rounded"
                  style={{ objectFit: "cover" }}
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/default/image.png";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((key) => (
            <div className="px-2" key={key}>
              <label className="text-black mb-2">
                {key.split(/(?=[A-Z])/).join(" ")}
              </label>
              <input
                type="text"
                name={key}
                placeholder={`Enter ${key.split(/(?=[A-Z])/).join(" ")}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12">
          <button
            className="bg-[#00307D] hover:bg-[#112b55] text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="bg-[#00307D] hover:bg-[#112b55] text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        {showPreview && (
          <div className="flex justify-center items-center mt-12">
            <div id="preview-content">
              <IdForm
                {...formData}
                profileImg={profileImg}
                logoLeft={logoLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdCard;
