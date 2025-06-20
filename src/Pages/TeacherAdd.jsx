import React from "react";

function TeacherAdd() {
  return (
    <div>
      <h1 className="text-lg text-center p-6 bg-[#CBE4FD] font-semibold text-gray-700">
        Teacher Attendance
      </h1>

      <div className="max-w-full mx-auto p-6 bg-white  space-y-6">
        {/* Department and Subject Section */}
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">Attendance id</h1>
          <input
            type="text"
            placeholder="Enter Department"
            className="w-full p-3 border  bg-[#CBE4FD] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <h1 className="text-lg font-semibold text-gray-700">Teacher id</h1>
          <input
            type="text"
            placeholder="Enter Subject"
            className="w-full p-3 border  bg-[#CBE4FD] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date and Salary Section */}
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">Date</h1>
          <input
            type="date"
            className="w-full p-3  bg-[#CBE4FD] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Time In/Out Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className=" p-6  text-center">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Time Out
            </h3>
            <p className=" p-2 bg-[#CBE4FD] rounded font-semibold text-gray-900">
              05:00 PM
            </p>
          </div>
          <div className=" p-6  text-center">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Time Out
            </h3>
            <p className=" p-2 bg-[#CBE4FD] rounded font-semibold text-gray-900">
              05:00 PM
            </p>
          </div>
        </div>

        {/* Attendance Section */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            Attendance status
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#CBE4FD] p-8 rounded-lg shadow text-center">
              <p className="text-lg font-semibold text-gray-900">Present</p>
            </div>
            <div className="bg-[#CBE4FD] p-8 rounded-lg shadow text-center">
              <p className="text-lg font-semibold text-gray-900">Absent</p>
            </div>
            <div className="bg-[#CBE4FD] p-8 rounded-lg shadow text-center">
              <p className="text-lg font-semibold text-gray-900">late</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAdd;
