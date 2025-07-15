import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Header from "../dashboard/Header";

const StudentForm = () => {
  const nav = useNavigate();
  const [checkCountry, setShowCountry] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const previewRef = useRef();
  const [formData, setFormData] = useState({
    file: "",
    academic_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    student_type: "",
    class_id: "",
    division_id: "",
    uid_no: "",
    regdNo: "",
    dob: "",
    dob_place: "",
    blood_grp: "",
    identification_mark_1: "",
    identification_mark_2: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    religion: "",
    category: "",
    nationality: "",
    present_address: "",
    permanent_address: "",
    taluka: "",
    district: "",
    country: "",
    state: "",
    city: "",
    countries: [],
    states: [],
    cities: [],
    pincode: "",
    bus_route: "",
    mobile_no: "",
    alternate_mobile_no: "",
    email_id: "",
    gender: "",
    hostelType: "",
    father_aadhar: "",
    mother_aadhar: "",
    isAddressSame: false,
    showBusRoute: false,
  });

  const [classOptions, setClassOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const bloodGroupOptions = [
    "Select Blood Group",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];
  const categoryOptions = [
    "Select Category",
    "General",
    "OBC",
    "SC",
    "ST",
    "SEBC",
  ];
  const genderOptions = ["Select Gender", "Male", "Female", "Other"];
  const HostelType = ["NA"];
  const busRouteOptions = ["Route 1", "Route 2", "Route 3"];

  useEffect(() => {
    // Fetch class and division options from an API
    const id = localStorage.getItem("selectedSchool");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/class/classes/${id}`)
      .then((response) => {
        const classes = response.data.map((className) => ({
          value: className.id,
          label: className.class_name,
        }));
        setClassOptions(classes);
      })
      .catch((error) =>
        console.error("Error fetching class and division options:", error)
      );
  }, []);
  const [busRoutes, setBusRoutes] = useState([]);
  useEffect(() => {
    // Fetch class and division options from an API
    const id = localStorage.getItem("selectedSchool");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/bus-route`)
      .then((response) => {
        setBusRoutes(response.data);
      })
      .catch((error) =>
        console.error("Error fetching class and division options:", error)
      );
  }, []);
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
        console.error("Error fetching class and division options:", error)
      );
  }, []);
  // Fetch divisions when the class is selected
  useEffect(() => {
    const fetchDivisions = async () => {
      if (formData.class_id) {
        console.log(formData.class_id);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API_URL}/api/class/divisions/${formData.class_id}`
          );
          const data = await response.json();
          console.log(data);
          const divisions = data.map((division) => ({
            value: division.id,
            label: division.division_name,
          }));
          setDivisionOptions(divisions);
        } catch (error) {
          console.error("Error fetching divisions:", error);
        }
      }
    };
    fetchDivisions();
  }, [formData.class_id]);
  useEffect(() => {
    // Fetch countries
    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => {
        const countries = response.data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setFormData((prevData) => ({ ...prevData, countries }));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, [checkCountry]);
  const handleCountryChange = (selectedOption) => {
    console.log(selectedOption.value);
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption,
      state: "",
      city: "",
    }));
  };
  const handleStateChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedOption,
      city: "",
    }));
  };

  const handleCityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log(name, value, type, checked);
    if (type === "checkbox") {
      if (name === "isAddressSame") {
        setFormData({
          ...formData,
          isAddressSame: checked,
          permanent_address: checked ? formData.present_address : "",
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/newstudent`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitted(true);
      alert("Form submitted successfully!");

      // Clear form data after successful submission
      setFormData({
        photo: "",
        academic_year: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        student_type: "new",
        class_id: "",
        division_id: "",
        uid_no: "",
        regdNo: "",
        dob: "",
        dob_place: "",
        blood_grp: "",
        identification_mark_1: "",
        identification_mark_2: "",
        father_name: "",
        mother_name: "",
        guardian_name: "",
        religion: "",
        category: "",
        nationality: "",
        present_address: "",
        permanent_address: "",
        father_aadhar: "",
        mother_aadhar: "",
        taluka: "",
        district: "",
        country: "",
        state: "",
        city: "",
        countries: [],
        states: [],
        cities: [],
        pincode: "",
        bus_route: "",
        mobile_no: "",
        alternate_mobile_no: "",
        email_id: "",
        gender: "",
        hostelType: "",
        isAddressSame: false,
        showBusRoute: false,
      });
      setImagePreview(null);
      setShowCountry(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Fill all the required fields!");
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const generatePDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Increased scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save with better filename
      const fileName = `${formData.first_name || "Student"}_${formData.last_name || "Admission"}_Form_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="bg-[#7CA9FF8A] font-[roboto]">
      <Header />
      {console.log(formData)}
      <form
        onSubmit={handleSubmit}
        className="max-w-full font-[roboto] mx-auto p-6 bg-[#6f9ff98a]"
      >
        <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Student Registration Form
        </h2>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => nav("/file-upload")}
        >
          Bulk Upload
        </button>

        <div className="flex mt-4 justify-normal items-center mb-8">
          <div className="flex items-center space-x-4 space-y-6">
            <div className="w-52 h-36 border-2 border-gray-300 shadow-lg rounded-lg p-2 mt-4 bg-white flex justify-center items-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <span className="text-gray-500 text-center">Image Preview</span>
              )}
            </div>
            <label className="block text-lg font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
        </div>

        {/* Other form fields */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-black gap-6 gap-x-36">
          <div>
            <label className="block font-medium text-black">
              Class<span className="text-red-500">*</span>
            </label>
            <select
              value={formData.class_id}
              onChange={(selectedOption) => {
                console.log(selectedOption.target.value);
                setFormData((prevData) => ({
                  ...prevData,
                  class_id: selectedOption.target.value,
                }));
              }}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option value="">Select Class</option>

              {classOptions.map((className) => (
                <option key={className.value} value={className.value}>
                  {className.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">
              Section<span className="text-red-500">*</span>
            </label>
            <Select
              options={divisionOptions}
              value={formData.division}
              onChange={(selectedOption) =>
                setFormData((prevData) => ({
                  ...prevData,
                  division_id: selectedOption.value,
                }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Academic year<span className="text-red-500">*</span>
            </label>
            <select
              value={formData.academic_year}
              onChange={(selectedOption) => {
                console.log(selectedOption.target.value);
                setFormData((prevData) => ({
                  ...prevData,
                  academic_year: selectedOption.target.value,
                }));
              }}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option value="">Select Academic year</option>

              {academicYear.map((className) => (
                <option key={className.id} value={className.id}>
                  {className.year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block  font-medium text-black">Middle Name</label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Middle Name"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Gender<span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {genderOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">Religion</label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Religion"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">Hostel Type</label>
            <select
              name="hostelType"
              value={formData.hostelType}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {HostelType.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">
              Student Type<span className="text-red-500">*</span>
            </label>
            <select
              name="student_type"
              value={formData.student_type}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
            >
              <option value="">Select Student Type</option>
              <option className=" bg-slate-200 hover:bg-gray-200" value="new">
                New
              </option>
              <option value="old">Old</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">
              Admission No.<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="regdNo"
              value={formData.regdNo}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Registration No."
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Aadhar No.<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="uid_no"
              value={formData.uid_no}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="UID No"
              maxLength={12}
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1  p-2 focus:outline-none rounded-md block w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Blood Group</label>
            <select
              name="blood_grp"
              value={formData.blood_grp}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
            >
              {bloodGroupOptions.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-black">
              Place of Birth
            </label>
            <input
              type="text"
              name="dob_place"
              value={formData.dob_place}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Place of Birth"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Identification Mark 1
            </label>
            <input
              type="text"
              name="identification_mark_1"
              value={formData.identification_mark_1}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Identification Mark 1"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Identification Mark 2
            </label>
            <input
              type="text"
              name="identification_mark_2"
              value={formData.identification_mark_2}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Identification Mark 2"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Father's Name
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Father's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Father Aadhar No.
            </label>
            <input
              type="text"
              name="father_aadhar"
              value={formData.father_aadhar}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="UID No"
              maxLength={12}
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className="mt-1 block p-2 focus:outline-none rounded-md w-full"
              placeholder="Mother's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Mother Aadhar No.
            </label>
            <input
              type="text"
              name="mother_aadhar"
              value={formData.mother_aadhar}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="UID No"
              maxLength={12}
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Guardian's Name
            </label>
            <input
              type="text"
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Guardian's Name"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Nationality"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Present Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="present_address"
              value={formData.present_address}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Present Address"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Permanent Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Permanent Address"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Taluka</label>
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Taluka"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Country<span className="text-red-500">*</span>
            </label>
            <Select
              options={formData.countries}
              value={formData.country}
              onChange={handleCountryChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              State<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="State"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              District<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="District"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Pincode<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Pincode"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Bus Route</label>
            <select
              value={formData.bus_route}
              onChange={(selectedOption) => {
                console.log(selectedOption.target.value);
                setFormData((prevData) => ({
                  ...prevData,
                  bus_route: selectedOption.target.value,
                }));
              }}
              className="mt-1 block w-full p-2 border rounded"
            >
              <option value="">Select Bus Route</option>

              {busRoutes.map((className) => (
                <option key={className.id} value={className.id}>
                  {className.route_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-black">
              Mobile No<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Mobile No"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Alternate Mobile No
            </label>
            <input
              type="text"
              name="alternate_mobile_no"
              value={formData.alternate_mobile_no}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none rounded-md block w-full"
              placeholder="Alternate Mobile No"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Email ID<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 focus:outline-none rounded-md"
              placeholder="Email ID"
            />
          </div>
        </div>

        <div className="mt-12 p-4 text-xl flex justify-center items-center gap-4 text-white">
          <button
            type="button"
            onClick={handlePreview}
            className="w-1/4 bg-green-600 font-[roboto] py-2 px-4 rounded-md hover:bg-green-700"
          >
            Preview
          </button>
          <button
            type="submit"
            className="w-1/3 bg-[#00307D] font-[roboto] py-2 px-4 rounded-md hover:bg-blue-800"
          >
            Submit
          </button>
          {isSubmitted && (
            <button
              type="button"
              onClick={generatePDF}
              className="w-1/4 bg-red-600 font-[roboto] py-2 px-4 rounded-md hover:bg-red-700"
            >
              Download PDF
            </button>
          )}
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Preview - Student Admission Form
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div
              ref={previewRef}
              className="bg-white p-12 font-serif text-black max-w-4xl mx-auto"
            >
              {/* School Header with Logo */}
              <div className="text-center mb-8 border-b-4 border-blue-800 pb-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">ERP</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-blue-800 mb-1">
                      ERP Mind Growth Academy
                    </h1>
                    <p className="text-lg text-gray-600">
                      Excellence in Education
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4 bg-gray-100 py-2 px-4 rounded">
                  STUDENT ADMISSION FORM
                </h2>
                <p className="text-base text-gray-700 mt-2 font-semibold">
                  Academic Year:{" "}
                  {academicYear.find(
                    (year) => year.id === formData.academic_year
                  )?.year || "N/A"}
                </p>
              </div>

              {/* Student Basic Information Card */}
              <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 bg-gray-50">
                <div className="flex gap-8">
                  <div className="w-36 h-44 border-2 border-gray-400 bg-white flex justify-center items-center rounded-lg shadow-md">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Student"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">📷</div>
                        <span className="text-sm">Student Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <table className="w-full text-base">
                      <tbody>
                        <tr className="border-b">
                          <td className="font-bold py-2 w-1/3 text-gray-700">
                            Student Name:
                          </td>
                          <td className="py-2 text-gray-900 font-semibold">
                            {formData.first_name} {formData.middle_name}{" "}
                            {formData.last_name}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-bold py-2 text-gray-700">
                            Admission No:
                          </td>
                          <td className="py-2 text-gray-900 font-semibold">
                            {formData.regdNo || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-bold py-2 text-gray-700">
                            Class & Section:
                          </td>
                          <td className="py-2 text-gray-900 font-semibold">
                            {classOptions.find(
                              (cls) => cls.value === formData.class_id
                            )?.label || "N/A"}{" "}
                            -{" "}
                            {divisionOptions.find(
                              (div) => div.value === formData.division_id
                            )?.label || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-bold py-2 text-gray-700">
                            Date of Birth:
                          </td>
                          <td className="py-2 text-gray-900 font-semibold">
                            {formData.dob || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-bold py-2 text-gray-700">
                            Gender:
                          </td>
                          <td className="py-2 text-gray-900 font-semibold">
                            {formData.gender || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white bg-blue-700 py-3 px-4 rounded-t-lg">
                  PERSONAL INFORMATION
                </h3>
                <div className="border-2 border-gray-300 border-t-0 rounded-b-lg p-4 bg-white">
                  <table className="w-full text-base">
                    <tbody>
                      <tr className="border-b">
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Aadhar Number:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.uid_no || "N/A"}
                        </td>
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Blood Group:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.blood_grp || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          Place of Birth:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.dob_place || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Religion:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.religion || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          Category:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.category || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Nationality:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.nationality || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-3 text-gray-700">
                          Student Type:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.student_type || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Hostel Type:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.hostelType || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Family Information Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white bg-green-700 py-3 px-4 rounded-t-lg">
                  FAMILY INFORMATION
                </h3>
                <div className="border-2 border-gray-300 border-t-0 rounded-b-lg p-4 bg-white">
                  <table className="w-full text-base">
                    <tbody>
                      <tr className="border-b">
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Father's Name:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.father_name || "N/A"}
                        </td>
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Father's Aadhar:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.father_aadhar || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          Mother's Name:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.mother_name || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Mother's Aadhar:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.mother_aadhar || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-3 text-gray-700">
                          Guardian's Name:
                        </td>
                        <td
                          className="py-3 text-gray-900 font-medium"
                          colSpan="3"
                        >
                          {formData.guardian_name || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white bg-purple-700 py-3 px-4 rounded-t-lg">
                  ADDRESS INFORMATION
                </h3>
                <div className="border-2 border-gray-300 border-t-0 rounded-b-lg p-4 bg-white">
                  <table className="w-full text-base">
                    <tbody>
                      <tr className="border-b">
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Present Address:
                        </td>
                        <td className="py-3 w-3/4 text-gray-900" colSpan="3">
                          {formData.present_address || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          Permanent Address:
                        </td>
                        <td className="py-3 text-gray-900" colSpan="3">
                          {formData.permanent_address || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          City:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.city || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          District:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.district || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          State:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.state || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Country:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.country?.label || formData.country || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-3 text-gray-700">
                          Pincode:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.pincode || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Taluka:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.taluka || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact & Transportation Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white bg-orange-700 py-3 px-4 rounded-t-lg">
                  CONTACT & TRANSPORTATION
                </h3>
                <div className="border-2 border-gray-300 border-t-0 rounded-b-lg p-4 bg-white">
                  <table className="w-full text-base">
                    <tbody>
                      <tr className="border-b">
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Mobile Number:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.mobile_no || "N/A"}
                        </td>
                        <td className="font-semibold py-3 w-1/4 text-gray-700">
                          Alternate Mobile:
                        </td>
                        <td className="py-3 w-1/4 text-gray-900">
                          {formData.alternate_mobile_no || "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="font-semibold py-3 text-gray-700">
                          Email ID:
                        </td>
                        <td className="py-3 text-gray-900">
                          {formData.email_id || "N/A"}
                        </td>
                        <td className="font-semibold py-3 text-gray-700">
                          Bus Route:
                        </td>
                        <td className="py-3 text-gray-900">
                          {busRoutes.find(
                            (route) => route.id === formData.bus_route
                          )?.route_name || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Identification Marks Section */}
              {(formData.identification_mark_1 ||
                formData.identification_mark_2) && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white bg-red-700 py-3 px-4 rounded-t-lg">
                    IDENTIFICATION MARKS
                  </h3>
                  <div className="border-2 border-gray-300 border-t-0 rounded-b-lg p-4 bg-white">
                    <table className="w-full text-base">
                      <tbody>
                        <tr>
                          <td className="font-semibold py-3 w-1/4 text-gray-700">
                            Mark 1:
                          </td>
                          <td className="py-3 w-1/4 text-gray-900">
                            {formData.identification_mark_1 || "N/A"}
                          </td>
                          <td className="font-semibold py-3 w-1/4 text-gray-700">
                            Mark 2:
                          </td>
                          <td className="py-3 w-1/4 text-gray-900">
                            {formData.identification_mark_2 || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Declaration and Signatures */}
              <div className="mt-12 border-t-2 border-gray-400 pt-6">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">
                    DECLARATION:
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    I hereby declare that the above information is true and
                    correct to the best of my knowledge. I understand that any
                    false information may lead to the cancellation of admission.
                  </p>
                </div>

                <div className="flex justify-between items-end mt-8">
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-700 mb-1">
                      Date: {new Date().toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Application Submitted
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                    <p className="text-base font-semibold text-gray-700">
                      Parent/Guardian Signature
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                    <p className="text-base font-semibold text-gray-700">
                      School Authority Signature
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    📧 For queries: admission@erpmindgrowth.edu | 📞 Contact:
                    +91-XXXXXXXXXX
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={generatePDF}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
