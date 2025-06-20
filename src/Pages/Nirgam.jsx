import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navbar from "../component/Navbar";

function Dropdown({ label, options }) {
  return (
    <Menu as="div" className="relative w-full">
      <MenuButton className="w-full p-2 rounded text-gray-500 bg-white focus:outline-none inline-flex justify-between items-center">
        {label}
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
      </MenuButton>
      <MenuItems className="absolute w-full mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {options.map((option, index) => (
          <MenuItem key={index}>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
              >
                {option}
              </a>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

function NirgamCertificate() {
  return (
    <div>
      <Navbar />
      {/* start */}
      <div className=" bg-[#E0C9E9] font-[roboto] min-h-screen">
        <div className=" pt-28  justify-between  items-center p-12 lg:p-52 flex">
          <div>
            <h2 className=" text-2xl lg:text-6xl  font-semibold">
              {" "}
              Nirgam Certificate
            </h2>
            <p className=" mt-4 text-lg">
              Easily access and manage student certificates
            </p>
          </div>
          <div>
            <p className="bg-[#412249] rounded  lg:w-[350px] lg:h-[200px] p-12 px-20"></p>
          </div>
        </div>

        {/*2nd form  */}

        <div className="p-12 mt-12  container mx-auto">
          <div className="flex flex-col md:flex-row lg:mb-16 mt-10 justify-between items-center">
            <div className="mb-12 w-full md:w-[45%]">
              <label className="text-black">Student's Registration No.</label>
              <Dropdown
                label="Enter Registration No."
                options={["Option 1", "Option 2", "Option 3"]}
              />
            </div>
            <div className="mb-12 w-full md:w-[45%]">
              <label className="text-black">Academic Session</label>
              <Dropdown
                label="Select Academic Session"
                options={["2021-2022", "2022-2023", "2023-2024"]}
              />
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-12 w-full md:w-[45%]">
              <label className="text-black">GR ID</label>
              <Dropdown
                label="Enter GR ID"
                options={["Option 1", "Option 2", "Option 3"]}
              />
            </div>
            <div className="mb-12 w-full md:w-[45%]">
              <label className="text-black">GR ID</label>
              <Dropdown
                label="Enter GR ID"
                options={["Option 1", "Option 2", "Option 3"]}
              />
            </div>
          </div>
        </div>
        {/* last */}
        <div className="flex justify-center pb-16 p-2 text-white">
          <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">
            Submit
          </button>
          <button className="bg-[#744881] px-16 p-2 rounded-md mx-12">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default NirgamCertificate;
