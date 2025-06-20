import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../dashboard/Header";

function StudentProfile() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/newstudent/${id}`,
        );
        const data = response.data;
        console.log(data);
        setStudentData(data.student); // Save the student data to state
      } catch (error) {
        console.error("There was an error fetching the student data!", error);
      }
    };

    fetchStudentData();
  }, [id]);

  if (!studentData) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  // Destructuring necessary student data fields with fallback values
  const {
    firstName = "-",
    lastName = "-",
    class_id = "-",
    division_id = "-",
    busRoute = "-",
    identificationMark1 = "-",
    identificationMark2 = "-",
    dobPlace = "-",
    religion = "-",
    emailId = "-",
    mobileNo = "-",
    nationality = "-",
    address = {},
    admDate = "-",
    fatherName = "-",
    motherName = "-",
    alternateMobileNo = "-",
    uidNo = "-",
    regdNo = "-",
    category = "-",
    bloodGrp = "-",
    father_aadhar = "-",
    mother_aadhar = "-",
  } = studentData;

  // Destructuring the nested address object and handling missing fields
  const {
    presentAddress = "-",
    permanentAddress = "-",
    city = "-",
    district = "-",
    state = "-",
    pincode = "-",
    country = "-",
    taluka = "-",
  } = address || {};

  return (
    <>
      <Header />
      <div className="p-6 sm:p-12 bg-[#412249] text-white flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-0">
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h2 className="font-semibold text-xl sm:text-2xl">{`${firstName} ${lastName}`}</h2>
            <button
              className="mt-2 mb-2 p-4 bg-[#D9D9D9] text-[#412249] text-center rounded-lg py-1"
              onClick={() => window.location.replace(`/studenteditable/${id}`)}
            >
              Edit Student details
            </button>

            <p>Class: {class_id}</p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-16 mx-4 sm:mx-12 bg-[#412249] p-2 sm:p-4 text-center">
        <h2 className="text-white text-2xl font-semibold">Student Profile</h2>
      </div>

      {/* Profile Details Section */}
      <div className="mt-8 mb-8 px-4 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Name</h3>
            <p>{`${firstName} ${lastName}`}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Registration No.</h3>
            <p>{regdNo}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Admission Date</h3>
            <p>{new Date(admDate).toLocaleDateString() || "-"}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Class</h3>
            <p>{class_id}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Section</h3>
            <p>{division_id}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Bus Route</h3>
            <p>{busRoute}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Date of Birth</h3>
            <p>{new Date(studentData.dob).toLocaleDateString() || "-"}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Date of Birth Place</h3>
            <p>{dobPlace}</p>
          </div>

          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Identification Mark 1</h3>
            <p>{identificationMark1 || "-"}</p> {/* Show "-" if empty */}
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Identification Mark 2</h3>
            <p>{identificationMark2 || "-"}</p> {/* Show "-" if empty */}
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Religion</h3>
            <p>{religion}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Email</h3>
            <p>{emailId}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Mobile No.</h3>
            <p>{mobileNo}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Alternate Mobile No.</h3>
            <p>{alternateMobileNo}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Nationality</h3>
            <p>{nationality}</p>
          </div>
          {/* Address Section */}
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Address</h3>
            <p>
              <strong>Present Address:</strong> {presentAddress}, {city},{" "}
              {district}, {state}, {country}, {pincode}
            </p>
            <p>
              <strong>Permanent Address:</strong> {permanentAddress}
            </p>
            <p>
              <strong>Taluka:</strong> {taluka}
            </p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Father's Name</h3>
            <p>{fatherName}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Mother's Name</h3>
            <p>{motherName}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Aadhar number</h3>
            <p>{uidNo}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Father Aadhar number</h3>
            <p>{father_aadhar}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Mother Aadhar number</h3>
            <p>{mother_aadhar}</p>
          </div>
          <div className="border-2 border-gray-300 rounded-md p-4 shadow-md">
            <h3 className="font-semibold">Blood Group</h3>
            <p>{bloodGrp}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
