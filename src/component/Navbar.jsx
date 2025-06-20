import React, { useState } from "react";
// import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  return (
    <div className="flex justify-between items-center p-4 bg-[#FFFFFF] shadow-md">
      {/* Left */}
      <div className="flex items-center gap-4 ml-12 flex-1">
        {/* <CgProfile className="w-8 h-8" /> */}
        <p className=" w-8 h-8 bg-gray-200 rounded-full"></p>
        <h1 className=" font-[roboto] text-2xl font-semibold t">ERP</h1>
        
      </div>
      {/* Right */}
      <div className="hidden md:flex gap-24  text-xl font-[roboto]   flex-1 justify-center">
        <h2 className="hover:text-[#412249] cursor-pointer">Home</h2>
        <h2 className="hover:text-[#412249] cursor-pointer">  Certificates</h2>
        <h2 className="hover:text-[#412249] cursor-pointer">Fees</h2>
        <h2 className="hover:text-[#412249] cursor-pointer">Profile</h2>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-[#8614a2] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 font-[roboto] font-semibold  left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-6 ">
          <h2 className="hover:text-[#412249] cursor-pointer">Home</h2>
          <h2 className="hover:text-[#412249] cursor-pointer">Certificates</h2>
          <h2 className="hover:text-[#412249] cursor-pointer">Fees</h2>
          <h2 className="hover:text-[#412249] cursor-pointer">Profile</h2>
        </div>
      )}
    </div>
  );
}

export default Navbar;




















// import React, { useState } from "react";
// import { CgProfile } from "react-icons/cg";

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="flex justify-around pt-8 bg-[#FFFFFF]">
//       {/* left */}
//       <div className="flex gap-8 items-center">
//         {/* <img src="" alt="" /> */}
//         <CgProfile className="w-8 h-8" />
//         <h1 className="font-[Roboto] text-2xl font-semibold">ERP</h1>
//       </div>
//       {/* right */}
//       <div className="flex justify-between gap-12 relative">
//         <h2 className="hover:text-[#412249] cursor-pointer">Home</h2>
//         <div className="relative">
//           <h2 className="hover:text-[#412249] cursor-pointer" onClick={toggleDropdown}>
//             Certificates
//           </h2>
//           {isDropdownOpen && (
//             <div className="absolute top-full mt-2 w-48 bg-white border rounded shadow-lg">
//               <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
//                 Certificate 1
//               </a>
//               <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
//                 Certificate 2
//               </a>
//               <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
//                 Certificate 3
//               </a>
//             </div>
//           )}
//         </div>
//         <h2 className="hover:text-[#412249] cursor-pointer">Fees</h2>
//         <h2 className="hover:text-[#412249] cursor-pointer">Profile</h2>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
