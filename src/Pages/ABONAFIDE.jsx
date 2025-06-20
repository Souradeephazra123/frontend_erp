// // import React from "react";
// // import logoLeft from "../img/1000077337-removebg-preview.png";
// // import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

// // function ABONAFIDE() {
// //   return (
// //     <div className="font-[roboto] m-12 mx-56 py-4 border-[4px] relative">
// //       <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
// //         <div className="w-52 h-52">
// //           <img
// //             src={logoLeft}
// //             alt="School Logo"
// //             loading="lazy"
// //             title="School Logo"
// //             className="object-contain h-full w-full"
// //           />
// //         </div>
// //         <div className="text-center mb-12">
// //           <h2 className="text-red-700 mb-2 font-bold text-3xl">
// //             INDURA ENGLISH SCHOOL (CBSE)
// //           </h2>
// //           <p className="font-semibold">
// //             Enjangaon (East), Tq, Basmath Dist Hingoli
// //           </p>
// //           <p className="font-semibold">
// //             UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217
// //           </p>
// //         </div>
// //         <div className="w-40 h-40 mb-6">
// //           <img
// //             src={logoRight}
// //             alt="CBSE Logo"
// //             loading="lazy"
// //             title="CBSE Logo"
// //             className="object-contain h-full w-full"
// //           />
// //         </div>
// //       </div>
// //       <div className="flex justify-between items-center">
// //         <a href="http://www.induraenglishschool.in" className="mx-4">
// //           Website: <br /> www.induraenglishschool.in
// //         </a>
// //         <a href="mailto:induraenglishschool@gmail.com" className="mx-4">
// //           Email: <br /> induraenglishschool@gmail.com
// //         </a>
// //       </div>
// //       <div>
// //         <h2 className="text-center font-semibold text-4xl">
// //           BONAFIDE CERTIFICATE
// //         </h2>
// //       </div>
// //       <div className="flex justify-between items-center m-4 font-semibold">
// //         <p>Certificate No.</p>
// //         <p className=" mr-24">Regd. No</p>
// //       </div>
// //       <div className="relative mt-12">
// //         <div className="absolute inset-0 flex justify-center items-center">
// //           <div
// //             className="w-[500px] h-[450px] "
// //             style={{
// //               backgroundImage: `url(${logoLeft})`,
// //               backgroundSize: "contain",
// //               backgroundPosition: "center",
// //               backgroundRepeat: "no-repeat",
// //               opacity: 0.4,
// //               zIndex: -1,
// //             }}
// //           ></div>
// //         </div>
// //         <div className="relative z-10 mt-6 ml-32  text-xl">

// //           <p className="  m-4">
// //             <strong> This is to clarify that The</strong>
// //             <span>____________________</span> <strong>is a BONAFIDE </strong>
// //             Student of our School,
// //           </p>
// //           <p className="  m-4">
// //             Studying in <span>__________</span> Year: <span>__________</span>.
// //             His Birthdate as recorded in our General Register is
// //             <span>_____________</span>
// //           </p>
// //           <p className="  m-4">
// //             (in Words <span>_______________________________</span>). His/her
// //             birth place is <span>_____________</span> and belongs
// //           </p>

// //           <p className="  m-2">
// //             to <span>____________</span> caste. To the best of my knowledge, He
// //             bears a good moral character as well as he has shown
// //           </p>
// //           <p className="  m-2"> good progress.</p>
// //           <p className=" mt-4  m-2">Reason :  <span>____________________</span></p>
// //         </div>
// //       </div>
// //      <div className=" mt-12">
// //      <h4 className='px-12 mt-6 text-lg  font-semibold'>PLACE </h4>

// //      </div>
// // <div className='flex text-lg font-semibold justify-between items-center pt-2 px-12'>
// //   <p> DATE:</p>
// //   <p>CLERK’S SIGN </p>
// //   <p>PRINCIPAL’S SIGN </p>
// // </div>
// //     </div>
// //   );
// // }

// // export default ABONAFIDE;

// import React, { useState } from 'react';
// import logoLeft from "../img/1000077337-removebg-preview.png";
// import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

// function ABONAFIDE() {
//   const [formData, setFormData] = useState({
//     name: '',
//     year: '',
//     birthDate: '',
//     birthDateWords: '',
//     birthPlace: '',
//     caste: '',
//     progress: '',
//     reason: '',
//     place: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="font-[roboto] m-12 mx-56 py-4 border-[4px] relative">
//       <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
//         <div className="w-52 h-52">
//           <img
//             src={logoLeft}
//             alt="School Logo"
//             loading="lazy"
//             title="School Logo"
//             className="object-contain h-full w-full"
//           />
//         </div>
//         <div className="text-center mb-12">
//           <h2 className="text-red-700 mb-2 font-bold text-3xl">
//             INDURA ENGLISH SCHOOL (CBSE)
//           </h2>
//           <p className="font-semibold">
//             Enjangaon (East), Tq, Basmath Dist Hingoli
//           </p>
//           <p className="font-semibold">
//             UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217
//           </p>
//         </div>
//         <div className="w-40 h-40 mb-6">
//           <img
//             src={logoRight}
//             alt="CBSE Logo"
//             loading="lazy"
//             title="CBSE Logo"
//             className="object-contain h-full w-full"
//           />
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <a href="http://www.induraenglishschool.in" className="mx-4">
//           Website: <br /> www.induraenglishschool.in
//         </a>
//         <a href="mailto:induraenglishschool@gmail.com" className="mx-4">
//           Email: <br /> induraenglishschool@gmail.com
//         </a>
//       </div>
//       <div>
//         <h2 className="text-center font-semibold text-4xl">
//           BONAFIDE CERTIFICATE
//         </h2>
//       </div>
//       <div className="flex justify-between items-center m-4 font-semibold">
//         <p>Certificate No.</p>
//         <p className=" mr-24">Regd. No</p>
//       </div>
//       <div className="relative mt-12">
//         <div className="absolute inset-0 flex justify-center items-center">
//           <div
//             className="w-[500px] h-[450px] "
//             style={{
//               backgroundImage: `url(${logoLeft})`,
//               backgroundSize: "contain",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               opacity: 0.4,
//               zIndex: -1,
//             }}
//           ></div>
//         </div>
//         <div className="relative z-10 mt-6 ml-32 text-xl">
//           <p className="m-4">
//             <strong>This is to clarify that The</strong>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Name"
//             />{" "}
//             <strong>is a BONAFIDE</strong> Student of our School,
//           </p>
//           <p className="m-4">
//             Studying in{" "}
//             <input
//               type="text"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Year"
//             />{" "}
//             Year:{" "}
//             <input
//               type="text"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Year"
//             />.
//             His Birthdate as recorded in our General Register is{" "}
//             <input
//               type="text"
//               name="birthDate"
//               value={formData.birthDate}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Date"
//             />
//           </p>
//           <p className="m-4">
//             (in Words{" "}
//             <input
//               type="text"
//               name="birthDateWords"
//               value={formData.birthDateWords}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Date in Words"
//             />
//             ). His/her birth place is{" "}
//             <input
//               type="text"
//               name="birthPlace"
//               value={formData.birthPlace}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Birth Place"
//             />{" "}
//             and belongs
//           </p>

//           <p className="m-2">
//             to{" "}
//             <input
//               type="text"
//               name="caste"
//               value={formData.caste}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Caste"
//             />{" "}
//             caste. To the best of my knowledge, he bears a good moral character as well as he has shown
//           </p>
//           <p className="m-2">good progress.</p>
//           <p className="mt-4 m-2">
//             Reason :{" "}
//             <input
//               type="text"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//               placeholder="Reason"
//             />
//           </p>
//         </div>
//       </div>
//       <div className="mt-12">
//         <h4 className="px-12 mt-6 text-lg font-semibold">PLACE </h4>
//         <input
//           type="text"
//           name="place"
//           value={formData.place}
//           onChange={handleChange}
//           className="border-b-2 border-gray-700 bg-transparent focus:outline-none px-12 mt-2 text-lg font-semibold"
//           placeholder="Place"
//         />
//       </div>
//       <div className="flex text-lg font-semibold justify-between items-center pt-2 px-12">
//         <p>DATE:</p>
//         <input
//           type="text"
//           name="date"
//           className="border-b-2 border-gray-700 bg-transparent focus:outline-none"
//           placeholder="Date"
//         />
//         <p>CLERK’S SIGN </p>
//         <p>PRINCIPAL’S SIGN </p>
//       </div>
//     </div>
//   );
// }

// export default ABONAFIDE;

import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BonafideCertificatePreview from "./AB";

function BonafideCertificateForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    studyingYear: "",
    date: "",
    birthDate: "",
    birthDateInWords: "",
    birthPlace: "",
    caste: "",
    reason: "",
    certificateNo: "",
    regdNo: "",
    // place: ''
    // date: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      pdf.save("Bonafide_Certificate.pdf");
    });
  };

  return (
    <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Bonafide Certificate Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div className="mt-8 md:mt-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((key) => (
            <div key={key} className="px-2">
              <label className="text-white mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type="text"
                name={key}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center p-8 text-white mt-20">
        <button
          className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
          onClick={handlePreview}
        >
          Preview
        </button>
        {showPreview && (
          <button
            className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        )}
      </div>

      <h3 className="text-xl mt-12 text-center font-semibold mb-4">Preview</h3>

      <div className="pb-32">
        {showPreview && <BonafideCertificatePreview formData={formData} />}
      </div>
    </div>
  );
}

export default BonafideCertificateForm;
