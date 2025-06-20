import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

import Header from "../dashboard/Header";

const StudentForm = () => {
  const nav = useNavigate();
  const [checkCountry, setShowCountry] = useState();
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
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        const countries = response.data.map((country) => ({
          value: country.name,
          label: country.name,
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
        "https://erp.api.mindgrowthacademy.com/newstudent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      alert("Form submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Fill all the required fields!");
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

        <div className="mt-12 p-4   text-xl flex justify-center items-center   text-white  ">
          <button
            type="submit"
            className=" w-1/3 bg-[#00307D] font-[roboto]    py-2 px-4 rounded-md "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
