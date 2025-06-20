import React from 'react';
import { CgProfile } from "react-icons/cg";

function TeacherProf() {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-4 mb-32 bg-[#CBE4FD] rounded-lg shadow-lg space-y-8">
      {/* Profile Header */}
      <div className="flex justify-between items-center space-x-4">
       
        <div  className='flex space-x-4'>
        <CgProfile className="text-6xl text-gray-500" />
         <div className=' mt-2'>
         <p className="text-xl font-semibold">Bhanu</p>
         <p className="text-sm text-gray-600">Mathematics Teacher</p>
         </div>
        </div>
        <button className="ml-auto bg-white text-black px-6 py-2 rounded-full 0">Edit</button>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <h1 className="text-md font-semibold  pb-2">Contact Information</h1>
        <div className="">
          <div  className=' mb-4'>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className=' mb-4'>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input type="tel" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="space-y-4">
        <h1 className="text-md font-semibold  pb-2">Qualifications</h1>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" placeholder="Bachelor's Degree" className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Master's Degree" className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="PhD" className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
      </div>

      {/* Department and Subject */}
      <div className="space-y-4">
        <h1 className="text-md font-semibold  pb-2">Department</h1>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />

        <h1 className="text-md font-semibold  pb-2">Subject Handle</h1>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>
           {/* Department and Subject */}
           <div className="space-y-4">
        <h1 className="text-md font-semibold  pb-2">Date</h1>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />

        <h1 className="text-md font-semibold  pb-2">Salary</h1>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" />
      </div>

    
      {/* Save/Cancel Buttons */}
      <div className="flex justify-center space-x-4">
        <button className=" border-black text-black font-semibold px-24 border-2 py-2 rounded-lg ">Cancel</button>
        <button className="bg-[#284766C4] text-white px-24 py-2 rounded-lg border-2 p-4 ">Save</button>
      </div>
    </div>
  );
}

export default TeacherProf;

