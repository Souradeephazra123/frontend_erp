import React from "react";
import down from "../img/down.png";

function IdForm({
  fullName,
  fatherName,
  dob,
  mobileNo,
  studentId,
  address,
  profileImg,
  schoolName,
  schoolAddress,
  udiseNo,
  affiliationNo,
  schoolCode,
  logoLeft,
}) {
  return (
    <div className="mx-28 mt-10">
      <div className="border-[4px] bg-white text-black font-[roboto] rounded border-blue-900">
        <div>
          <div className="flex items-center justify-center pb-2 bg-gradient-to-r from-blue-200 via-blue-600 to-blue-800">
            <div className="w-24 h-20 p-1.5">
              {logoLeft && (
                <img
                  src={logoLeft}
                  alt="School Logo"
                  loading="lazy"
                  title="School Logo"
                />
              )}
            </div>
            <div className="mb-4.5 mr-4.5">
              <h2 className="text-center text-red-700 mb-0.75 font-bold text-lg">
                {schoolName}
              </h2>
              <p className="text-center font-semibold text-[14px]">
                {schoolAddress}
              </p>
              <p className="text-center font-semibold text-xs">
                UDISE No.: {udiseNo} Affiliation No.: {affiliationNo} School
                Code: {schoolCode}
              </p>
              <div className="text-center font-semibold text-xs">
                <a href="http://www.induraenglishschool.in" className="mx-1.5">
                  Website: www.induraenglishschool.in
                </a>
                <a
                  href="mailto:induraenglishschool@gmail.com"
                  className="mx-1.5"
                >
                  Email: induraenglishschool@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-4.5">
            <div className="text-center w-36 mt-4 text-lg text-white bg-blue-700 rounded-tr-xl">
              <h2 className="">STUDENT</h2>
            </div>
            <div className="flex mt-4.5 m-2.25">
              <div className="mx-0.75 w-28 m-4 h-32 rounded-xl border-2 border-blue-600 flex items-center justify-center">
                {profileImg && (
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full rounded-xl"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-0 mt-0.75 font-[roboto] text-black text-sm mx-10">
                <p className="flex items-center">
                  <span className="w-25.6"> Name</span>
                  <span>:- {fullName}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-25.6">Date of Birth</span>
                  <span>:- {dob}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-25.6">Parent's Name</span>
                  <span>:- {fatherName}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-25.6">Phone No.</span>
                  <span>:- {mobileNo}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-25.6">Address</span>
                  <span>:- {address}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-25.6">Student ID</span>
                  <span>:- {studentId}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-6 mt-4">
            <img
              src={down}
              className="w-full h-full object-cover brightness-75"
              alt="Background"
              loading="lazy"
              title="Background"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdForm;
