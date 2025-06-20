// // import React from "react";
// // import logoLeft from "../img/1000077337-removebg-preview.png";
// // import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

// // function BonafideCertificatePreview({ formData }) {
// //   return (
// //     <div id="preview-content"  className="font-[roboto] m-12 p-8  text-black  bg-white mx-56 py-4 border-[8px] relative">
     
     
// //      <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
// //         <div className="w-52 h-52">
// //           <img src={logoLeft} alt="School Logo" loading="lazy" title="School Logo" className="object-contain h-full w-full" />
// //         </div>
// //         <div className="text-center mb-12">
// //           <h2 className="text-red-700 mb-2 font-bold text-3xl">INDURA ENGLISH SCHOOL (CBSE)</h2>
// //           <p className="font-semibold">Enjangaon (East), Tq, Basmath Dist Hingoli</p>
// //           <p className="font-semibold">UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217</p>
// //           <div className="font-semibold">
// //             <a href="http://www.induraenglishschool.in" className="mx-4">Website: www.induraenglishschool.in</a>
// //             <a href="mailto:induraenglishschool@gmail.com" className="mx-4">Email: induraenglishschool@gmail.com</a>
// //           </div>
// //         </div>
// //         <div className="w-40 h-40  mb-12">
// //           <img src={logoRight} alt="CBSE Logo" loading="lazy" title="CBSE Logo" className="object-contain h-full w-full" />
// //         </div>
// //       </div>



// //       <div>
// //         <h2 className="text-center font-semibold text-4xl">
// //           BONAFIDE CERTIFICATE
// //         </h2>
// //       </div>
// //       <div className="flex justify-between items-center m-4 font-semibold">
// //         <p>Certificate No.: {formData.certificateNo}</p>
// //         <p className="mr-12">Regd. No: {formData.regdNo}</p>
// //       </div>
// //       <div className="relative mt-12">
// //         <div className="absolute inset-0 flex justify-center items-center">
// //           <div
// //             className="w-[500px] h-[450px]"
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
// //         <div className="relative z-10 mt-6 ml-32 text-xl">
// //           <p className="m-4 text-center">
// //             <strong> This is to clarify that </strong>
// //             <span>{formData.studentName}</span>
// //             <strong> is a BONAFIDE </strong>
// //             Student of our School,
// //           </p>
// //           <p className="m-4">
// //             Studying in <span>{formData.studying}</span> Year: <span>{formData.date}</span>.
// //             His Birthdate as recorded in our General Register is
// //             <span>{formData.birthDate}</span>
// //           </p>
// //           <p className="m-4">
// //             (in Words <span>{formData.birthDateInWords}</span>). His/her
// //             birth place is <span>{formData.birthPlace}</span> and belongs
// //           </p>

// //           <p className="m-2">
// //             to <span>{formData.caste}</span> caste. To the best of my knowledge, He
// //             bears a good moral character as well as he has shown
// //           </p>
// //           <p className="m-2"> good progress.</p>
// //           <p className="mt-4 m-2">Reason: <span>{formData.reason}</span></p>
// //         </div>
// //       </div>
// //       <div className="mt-12">
// //         <h4 className="px-12 mt-6 text-lg font-semibold">PLACE: </h4>
// //       </div>
// //       <div className="flex pb-4 text-lg font-semibold justify-between items-center pt-2 px-12">
// //         <p> DATE: </p>
// //         <p>CLERK’S SIGN </p>
// //         <p>PRINCIPAL’S SIGN </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BonafideCertificatePreview;













































// // import React, { useState } from "react";
// // import logoLeft from "../img/1000077337-removebg-preview.png";
// // import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

// // function BonafideCertificatePreview({ formData }) {
// //   const [editableContent, setEditableContent] = useState({
// //     schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
// //     schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
// //     udiseNo: "27160301903",
// //     affiliationNo: "1131230",
// //     schoolCode: "31217",
// //     website: "www.induraenglishschool.in",
// //     email: "induraenglishschool@gmail.com"
// //   });

// //   const handleContentChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditableContent({ ...editableContent, [name]: value });
// //   };

// //   return (
// //     <div id="preview-content" className="font-[roboto] m-12 p-8 text-black bg-white mx-56 py-4 border-[8px] relative">
// //       <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
// //         <div className="w-52 h-52">
// //           <img src={logoLeft} alt="School Logo" loading="lazy" title="School Logo" className="object-contain h-full w-full" />
// //         </div>
// //         <div className="text-center mb-12">
// //           <input
// //             type="text"
// //             name="schoolName"
// //             value={editableContent.schoolName}
// //             onChange={handleContentChange}
// //             className="text-red-700 mb-2 font-bold text-3xl text-center"
// //           />
// //           <input
// //             type="text"
// //             name="schoolAddress"
// //             value={editableContent.schoolAddress}
// //             onChange={handleContentChange}
// //             className="font-semibold text-center"
// //           />
// //           <input
// //             type="text"
// //             name="udiseNo"
// //             value={editableContent.udiseNo}
// //             onChange={handleContentChange}
// //             className="font-semibold text-center"
// //           />
// //           <input
// //             type="text"
// //             name="affiliationNo"
// //             value={editableContent.affiliationNo}
// //             onChange={handleContentChange}
// //             className="font-semibold text-center"
// //           />
// //           <input
// //             type="text"
// //             name="schoolCode"
// //             value={editableContent.schoolCode}
// //             onChange={handleContentChange}
// //             className="font-semibold text-center"
// //           />
// //           <div className="font-semibold">
// //             <input
// //               type="text"
// //               name="website"
// //               value={editableContent.website}
// //               onChange={handleContentChange}
// //               className="mx-4 text-center"
// //             />
// //             <input
// //               type="text"
// //               name="email"
// //               value={editableContent.email}
// //               onChange={handleContentChange}
// //               className="mx-4 text-center"
// //             />
// //           </div>
// //         </div>
// //         <div className="w-40 h-40 mb-12">
// //           <img src={logoRight} alt="CBSE Logo" loading="lazy" title="CBSE Logo" className="object-contain h-full w-full" />
// //         </div>
// //       </div>

// //       <div>
// //         <h2 className="text-center font-semibold text-4xl">BONAFIDE CERTIFICATE</h2>
// //       </div>
// //       <div className="flex justify-between items-center m-4 font-semibold">
// //         <p>Certificate No.: {formData.certificateNo}</p>
// //         <p className="mr-12">Regd. No: {formData.regdNo}</p>
// //       </div>
// //       <div className="relative mt-12">
// //         <div className="absolute inset-0 flex justify-center items-center">
// //           <div
// //             className="w-[500px] h-[450px]"
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
// //         <div className="relative z-10 mt-6 ml-32 text-xl">
// //           <p className="m-4 text-center">
// //             <strong>This is to clarify that </strong>
// //             <span>{formData.studentName}</span>
// //             <strong> is a BONAFIDE </strong>
// //             Student of our School,
// //           </p>
// //           <p className="m-4">
// //             Studying in <span>{formData.studying}</span> Year: <span>{formData.date}</span>.
// //             His Birthdate as recorded in our General Register is
// //             <span>{formData.birthDate}</span>
// //           </p>
// //           <p className="m-4">
// //             (in Words <span>{formData.birthDateInWords}</span>). His/her
// //             birth place is <span>{formData.birthPlace}</span> and belongs
// //           </p>

// //           <p className="m-2">
// //             to <span>{formData.caste}</span> caste. To the best of my knowledge, He
// //             bears a good moral character as well as he has shown
// //           </p>
// //           <p className="m-2"> good progress.</p>
// //           <p className="mt-4 m-2">Reason: <span>{formData.reason}</span></p>
// //         </div>
// //       </div>
// //       <div className="mt-12">
// //         <h4 className="px-12 mt-6 text-lg font-semibold">PLACE: </h4>
// //       </div>
// //       <div className="flex pb-4 text-lg font-semibold justify-between items-center pt-2 px-12">
// //         <p> DATE: </p>
// //         <p>CLERK’S SIGN </p>
// //         <p>PRINCIPAL’S SIGN </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BonafideCertificatePreview;



















// import React from "react";

// function BonafideCertificatePreview({ formData }) {
//   return (
//     <div id="preview-content" className="font-[roboto] m-12 p-8 text-black bg-white mx-56 py-4 border-[8px] relative">
//       <div className="flex flex-col sm:flex-row py-4 items-center justify-center relative z-10">
//         <div className="w-52 h-52">
//           <img src={formData.logoLeft} alt="School Logo" loading="lazy" title="School Logo" className="object-contain h-full w-full" />
//         </div>
//         <div className="text-center mb-12">
//           <h2 className="text-red-700 mb-2 font-bold text-3xl">{formData.schoolName}</h2>
//           <p className="font-semibold">{formData.schoolAddress}</p>
//           <p className="font-semibold">UDISE No.: {formData.udiseNo} Affiliation No.: {formData.affiliationNo} School Code: {formData.schoolCode}</p>
//         </div>
//         <div className="w-40 h-40 mb-12 ml-12">
//           <img src={formData.logoRight} alt="CBSE Logo" loading="lazy" title="CBSE Logo" className="object-contain h-full w-full" />
//         </div>
//       </div>

//       <div>
//         <h2 className="text-center font-semibold text-4xl">BONAFIDE CERTIFICATE</h2>
//       </div>
//       <div className="flex justify-between items-center m-4 font-semibold">
//         <p>Certificate No.: {formData.certificateNo}</p>
//         <p className="mr-12">Regd. No: {formData.regdNo}</p>
//       </div>
//       <div className="relative mt-12">
//         <div className="absolute inset-0 flex justify-center items-center">
//           <div
//             className="w-[500px] h-[450px]"
//             style={{
//               backgroundImage: `url(${formData.logoLeft})`,
//               backgroundSize: "contain",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               opacity: 0.4,
//               zIndex: -1,
//             }}
//           ></div>
//         </div>
//         <div className="relative z-10 mt-6 ml-32 text-xl">
//           <p className="m-4 text-center">
//             <strong>This is to clarify that </strong>
//             <span>{formData.studentName}</span>
//             <strong> is a BONAFIDE </strong>
//             Student of our School,
//           </p>
//           <p className="m-4">
//             Studying in <span>{formData.studying}</span> Year: <span>{formData.date}</span>.
//             His Birthdate as recorded in our General Register is
//             <span>{formData.birthDate}</span>
//           </p>
//           <p className="m-4">
//             (in Words <span>{formData.birthDateInWords}</span>). His/her
//             birth place is <span>{formData.birthPlace}</span> and belongs
//           </p>

//           <p className="m-2">
//             to <span>{formData.caste}</span> caste. To the best of my knowledge, He
//             bears a good moral character as well as he has shown
//           </p>
//           <p className="m-2"> good progress.</p>
//           <p className="mt-4 m-2">Reason: <span>{formData.reason}</span></p>
//         </div>
//       </div>
//       <div className="mt-12">
//         <h4 className="px-12 mt-6 text-lg font-semibold">PLACE: </h4>
//       </div>
//       <div className="flex pb-4 text-lg font-semibold justify-between items-center pt-2 px-12">
//         <p> DATE: </p>
//         <p>CLERK’S SIGN </p>
//         <p>PRINCIPAL’S SIGN </p>
//       </div>
//     </div>
//   );
// }

// export default BonafideCertificatePreview;
