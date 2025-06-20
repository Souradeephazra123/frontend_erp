


// import React, { useState } from 'react';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// function NigramCertificate() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     fathersName: '',
//     dob: '',
//     phoneNumber: '',
//     studentId: '',
//     address: '',
//   });

//   const [profileImg, setProfileImg] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfileImg(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handlePreview = () => {
//     setShowPreview(true);
//   };

//   const handleDownload = () => {
//     const input = document.getElementById('preview-content');
//     html2canvas(input, { scale: 1 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgProps = pdf.getImageProperties(imgData);
//       const imgWidth = pdfWidth;
//       const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save('student_id_card_details.pdf');
//     });
//   };






//  // Define the options
//  const options = [
//     { id: '1', name: 'Option 1' },
//     { id: '2', name: 'Option 2' },
//     { id: '3', name: 'Option 3' },
//   ];

//   // State to keep track of the selected option
//   const [selectedOption, setSelectedOption] = useState(null);

//   // Handler for when a radio button is selected
//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };








//   return (
//     <div className='text-white bg-[#412249] min-h-screen font-[roboto]'>
//       <div className='pt-20'>
//         <h2 className='text-3xl font-semibold text-center'>Student Nirgam Certificate Details</h2>
//         <p className='text-center'>Enter the required information for the certificate</p>
//       </div>

//       <div className='flex justify-center items-center mt-20'>
//         {!profileImg ? (
//           <input
//             type='file'
//             accept='image/*'
//             onChange={handleImageUpload}
//             className='text-white bg-[#FFFFFF] p-4 w-32 h-32  rounded cursor-pointer'
//           />
//         ) : (
//           <img
//             src={profileImg}
//             alt='Profile'
//             className='w-32 h-32 rounded'
//             style={{ objectFit: 'cover' }}
//           />
//         )}
//       </div>

//       <div className='mt-8 md:mt-16 container mx-auto'>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg lg:max-w-3xl mx-auto'>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Student's Full Name</label>
//             <input
//               type='text'
//               name='fullName'
//               placeholder='Enter Full Name'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.fullName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Father's Name</label>
//             <input
//               type='text'
//               name='fathersName'
//               placeholder="Enter Father's Name"
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.fathersName}
//               onChange={handleChange}
//             />
//           </div>



//           <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Select an Option</h2>
//       <div className="space-y-2">
//         {options.map((option) => (
//           <label key={option.id} className="block">
//             <input
//               type="radio"
//               name="options"
//               value={option.id}
//               checked={selectedOption === option.id}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             {option.name}
//           </label>
//         ))}
//       </div>
//       <div className="mt-4">
//         <p className="text-lg">Selected Option: {selectedOption ? options.find(opt => opt.id === selectedOption).name : 'None'}</p>
//       </div>
//     </div>








//           <div className='px-2'>
//             <label className='text-white mb-2'>Date of Birth</label>
//             <input
//               type='text'
//               name='dob'
//               placeholder='Enter Date of Birth'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.dob}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Phone Number</label>
//             <input
//               type='text'
//               name='phoneNumber'
//               placeholder='Enter Phone Number'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.phoneNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Student ID</label>
//             <input
//               type='text'
//               name='studentId'
//               placeholder='Enter Student ID'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.studentId}
//               onChange={handleChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Address</label>
//             <input
//               type='text'
//               name='address'
//               placeholder='Enter Address'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>

//       <div className='flex flex-col md:flex-row justify-center p-8 text-white mt-20'>
//         <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handlePreview}>
//           Preview
//         </button>
//         <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handleDownload}>
//           Download
//         </button>
//       </div>
      
//       <h3 className='text-xl mt-12 text-center font-semibold mb-4'>Preview</h3>

//       <div className='pb-32'>
//         {showPreview && (
//           <div id='preview-content' className='p-6 bg-[#4b2b5e] rounded-lg mx-auto mt-10 max-w-lg lg:max-w-3xl'>
//             <div className='flex justify-center items-center mb-4'>
//               {profileImg && <img src={profileImg} alt='Profile' className='mb-4 w-32 h-32 rounded' />}
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pb-6 text-white'>
//               <div className='px-2'>
//                 <p><strong>Full Name:</strong> {formData.fullName}</p>
//               </div>
//               <div className='px-2'>
//                 <p><strong>Father's Name:</strong> {formData.fathersName}</p>
//               </div>
//               <div className='px-2'>
//                 <p><strong>Date of Birth:</strong> {formData.dob}</p>
//               </div>
//               <div className='px-2'>
//                 <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
//               </div>
//               <div className='px-2'>
//                 <p><strong>Student ID:</strong> {formData.studentId}</p>
//               </div>
//               <div className='px-2'>
//                 <p><strong>Address:</strong> {formData.address}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NigramCertificate;



















// import React, { useState } from 'react';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// function NigramCertificate() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     fathersName: '',
//     mothersName: '',
//     dob: '',
//     phoneNumber: '',
//     studentId: '',
//     address: '',
//     aadhaarCardNo: '',
//     place: '',
//     grNo: '',
//     stdAdmitted: '',
//     lastSchoolAttended: '',
//     stdStudying: '',
//     classLeaving: '',
//     dateLeaving: '',
//     reasonLeaving: '',
//     identification: '',
//     progress: '',
//   });

//   const [showPreview, setShowPreview] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOption2, setSelectedOption2] = useState(null);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePreview = () => {
//     setShowPreview(true);
//   };

//   const handleDownload = () => {
//     const input = document.getElementById('preview-content');
//     html2canvas(input, { scale: 1 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgProps = pdf.getImageProperties(imgData);
//       const imgWidth = pdfWidth;
//       const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save('student_id_card_details.pdf');
//     });
//   };

//   // Define the options
//   const options = [
//     { id: '1', name: 'Hindu' },
//     { id: '2', name: 'Muslim' },
//     { id: '3', name: 'Christian' },
//     { id: '4', name: 'Others' },
//   ];

//   // Handler for when a radio button is selected
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   // Define the caste options
//   const caste = [
//     { id: '1', name: 'SC' },
//     { id: '2', name: 'ST' },
//     { id: '3', name: 'OBC' },
//     { id: '4', name: 'General' },
//   ];

//   // Handler for when a caste radio button is selected
//   const handleOptionChange2 = (event) => {
//     setSelectedOption2(event.target.value);
//   };

//   return (
//     <div className='text-white bg-[#412249] min-h-screen font-[roboto]'>
//       <div className='pt-20'>
//         <h2 className='text-3xl font-semibold text-center'>Student Nirgam Certificate Details</h2>
//         <p className='text-center'>Enter the required information for the certificate</p>
//       </div>

//       <div className='mt-8 md:mt-16 lg:mt-32 container mx-auto'>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto'>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Student's Full Name</label>
//             <input
//               type='text'
//               name='fullName'
//               placeholder='Enter Full Name'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.fullName}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Father's Name</label>
//             <input
//               type='text'
//               name='fathersName'
//               placeholder="Enter Father's Name"
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.fathersName}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Mother's Name</label>
//             <input
//               type='text'
//               name='mothersName'
//               placeholder="Enter Mother's Name"
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.mothersName}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <h2 className='text-white mb-2'>Religion</h2>
//             <div className='flex justify-between items-center'>
//               {options.map((option) => (
//                 <label
//                   key={option.id}
//                   className={`block p-1 px-4 rounded cursor-pointer ${selectedOption === option.id ? 'bg-[#823898] text-white' : 'bg-[#744881] text-black'}`}
//                   style={{ transition: 'background-color 0.3s' }}
//                 >
//                   <input
//                     type='radio'
//                     name='religion'
//                     value={option.id}
//                     checked={selectedOption === option.id}
//                     onChange={handleOptionChange}
//                     className='hidden'
//                   />
//                   {option.name}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className='px-2'>
//             <h2 className='text-white mb-2'>Caste</h2>
//             <div className='flex justify-between items-center'>
//               {caste.map((cast) => (
//                 <label
//                   key={cast.id}
//                   className={`block p-1 px-4 rounded cursor-pointer ${selectedOption2 === cast.id ? 'bg-[#823898] text-white' : 'bg-[#744881] text-black'}`}
//                   style={{ transition: 'background-color 0.3s' }}
//                 >
//                   <input
//                     type='radio'
//                     name='caste'
//                     value={cast.id}
//                     checked={selectedOption2 === cast.id}
//                     onChange={handleOptionChange2}
//                     className='hidden'
//                   />
//                   {cast.name}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Date of Admission</label>
//             <input
//               type='date'
//               name='dateOfAdmission'
//               placeholder='DD/MM/YYYY'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.dateOfAdmission}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Date of Birth (In figure)</label>
//             <input
//               type='date'
//               name='dob'
//               placeholder='DD/MM/YYYY'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.dob}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Parent’s Occupation</label>
//             <input
//               type='text'
//               name='phoneNumber'
//               placeholder='Enter Parent’s Occupation'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.phoneNumber}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Aadhaar Card no.</label>
//             <input
//               type='text'
//               name='aadhaarCardNo'
//               placeholder='Enter Aadhaar Card no.'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.aadhaarCardNo}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Address</label>
//             <textarea
//               name='address'
//               placeholder='Enter Address'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.address}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Place</label>
//             <input
//               type='text'
//               name='place'
//               placeholder='Enter Place'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.place}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>GR No.</label>
//             <input
//               type='text'
//               name='grNo'
//               placeholder='Enter GR No.'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.grNo}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Standard Admitted</label>
//             <input
//               type='text'
//               name='stdAdmitted'
//               placeholder='Enter Standard Admitted'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.stdAdmitted}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Last School Attended</label>
//             <input
//               type='text'
//               name='lastSchoolAttended'
//               placeholder='Enter Last School Attended'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.lastSchoolAttended}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Standard Studying</label>
//             <input
//               type='text'
//               name='stdStudying'
//               placeholder='Enter Standard Studying'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.stdStudying}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Class Leaving</label>
//             <input
//               type='text'
//               name='classLeaving'
//               placeholder='Enter Class Leaving'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.classLeaving}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Date of Leaving</label>
//             <input
//               type='date'
//               name='dateLeaving'
//               placeholder='Enter Date of Leaving'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.dateLeaving}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Reason for Leaving</label>
//             <input
//               type='text'
//               name='reasonLeaving'
//               placeholder='Enter Reason for Leaving'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.reasonLeaving}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Identification</label>
//             <input
//               type='text'
//               name='identification'
//               placeholder='Enter Identification'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.identification}
//               onChange={handleFormChange}
//             />
//           </div>
//           <div className='px-2'>
//             <label className='text-white mb-2'>Progress</label>
//             <input
//               type='text'
//               name='progress'
//               placeholder='Enter Progress'
//               className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
//               value={formData.progress}
//               onChange={handleFormChange}
//             />
//           </div>
//         </div>

//         <div className='mt-8 flex justify-center'>
//           <button onClick={handlePreview} className='bg-[#b0a5a0] p-3 rounded text-black font-semibold hover:bg-[#823898]'>
//             Preview
//           </button>
//           {showPreview && (
//             <div id='preview-content' className='mt-8 p-4 border border-gray-300 bg-white text-black'>
//               <h2 className='text-xl font-bold'>Student Nirgam Certificate</h2>
//               <div>
//                 <p><strong>Name:</strong> {formData.fullName}</p>
//                 <p><strong>Father's Name:</strong> {formData.fathersName}</p>
//                 <p><strong>Mother's Name:</strong> {formData.mothersName}</p>
//                 <p><strong>Date of Birth:</strong> {formData.dob}</p>
//                 <p><strong>Address:</strong> {formData.address}</p>
//                 <p><strong>Place:</strong> {formData.place}</p>
//                 <p><strong>GR No.:</strong> {formData.grNo}</p>
//                 <p><strong>Standard Admitted:</strong> {formData.stdAdmitted}</p>
//                 <p><strong>Last School Attended:</strong> {formData.lastSchoolAttended}</p>
//                 <p><strong>Standard Studying:</strong> {formData.stdStudying}</p>
//                 <p><strong>Class Leaving:</strong> {formData.classLeaving}</p>
//                 <p><strong>Date of Leaving:</strong> {formData.dateLeaving}</p>
//                 <p><strong>Reason for Leaving:</strong> {formData.reasonLeaving}</p>
//                 <p><strong>Identification:</strong> {formData.identification}</p>
//                 <p><strong>Progress:</strong> {formData.progress}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className='flex justify-center mt-8'>
//           <button onClick={handleDownload} className='bg-[#b0a5a0] p-3 rounded text-black font-semibold hover:bg-[#823898]'>
//             Download
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NigramCertificate;










































































import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function NigramCertificate() {
  const [formData, setFormData] = useState({
    fullName: '',
    fathersName: '',
    mothersName: '',
    dob: '',
    phoneNumber: '',
    studentId: '',
    address: '',
    aadhaarCardNo: '',
    place: '',
    grNo: '',
    stdAdmitted: '',
    lastSchoolAttended: '',
    stdStudying: '',
    classLeaving: '',
    dateLeaving: '',
    reasonLeaving: '',
    identification: '',
    progress: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById('preview-content');
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('student_id_card_details.pdf');
    });
  };
  
  // Define the options
  const options = [
    { id: '1', name: 'Hindu' },
    { id: '2', name: 'Muslim' },
    { id: '3', name: 'Christian' },
    { id: '4', name: 'Others' },
  ];

  // Handler for when a radio button is selected
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Define the caste options
  const caste = [
    { id: '1', name: 'SC' },
    { id: '2', name: 'ST' },
    { id: '3', name: 'OBC' },
    { id: '4', name: 'General' },
  ];

  // Handler for when a caste radio button is selected
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div className='text-white bg-[#412249] min-h-screen font-[roboto]'>
      <div className='pt-20'>
        <h2 className='text-3xl font-semibold text-center'>Student Nirgam Certificate Details</h2>
        <p className='text-center'>Enter the required information for the certificate</p>
      </div>

      <div className='mt-8 md:mt-16 lg:mt-32 container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto'>
          <div className='px-2'>
            <label className='text-white mb-2'>Student's Full Name</label>
            <input
              type='text'
              name='fullName'
              placeholder='Enter Full Name'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.fullName}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Father's Name</label>
            <input
              type='text'
              name='fathersName'
              placeholder="Enter Father's Name"
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.fathersName}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Mother's Name</label>
            <input
              type='text'
              name='mothersName'
              placeholder="Enter Mother's Name"
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.mothersName}
              onChange={handleFormChange}
            />
          </div>
         


<div className='px-2'>
<h2 className='text-white mb-2'>Religion</h2>
<div className='flex justify-between items-center'>
  {options.map((option) => (
    <label
      key={option.id}
      className={`block p-1 px-4 rounded cursor-pointer ${selectedOption === option.id ? 'bg-[#823898] text-white' : 'bg-[#744881] text-black'}`}
      style={{ transition: 'background-color 0.3s' }}
    >
      <input
        type='radio'
        name='religion'
        value={option.id}
        checked={selectedOption === option.id}
        onChange={handleOptionChange}
        className='hidden'
      />
      {option.name}
    </label>
  ))}
</div>
</div>
<div className='px-2'>
<h2 className='text-white mb-2'>Caste</h2>
<div className='flex justify-between items-center'>
  {caste.map((cast) => (
    <label
      key={cast.id}
      className={`block p-1 px-4 rounded cursor-pointer ${selectedOption2 === cast.id ? 'bg-[#823898] text-white' : 'bg-[#744881] text-black'}`}
      style={{ transition: 'background-color 0.3s' }}
    >
      <input
        type='radio'
        name='caste'
        value={cast.id}
        checked={selectedOption2 === cast.id}
        onChange={handleOptionChange2}
        className='hidden'
      />
      {cast.name}
    </label>
  ))}
</div>
</div>
          <div className='px-2'>
            <label className='text-white mb-2'>Date of Admission</label>
            <input
              type='date'
              name='dateOfAdmission'
              placeholder='DD/MM/YYYY'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.dateOfAdmission}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Date of Birth (In figure)</label>
            <input
              type='date'
              name='dob'
              placeholder='DD/MM/YYYY'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.dob}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Parent’s Occupation</label>
            <input
              type='text'
              name='phoneNumber'
              placeholder='Enter Parent’s Occupation'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.phoneNumber}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Aadhaar Card no.</label>
            <input
              type='text'
              name='aadhaarCardNo'
              placeholder='Enter Aadhaar Card no.'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.aadhaarCardNo}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Address</label>
            <textarea
              name='address'
              placeholder='Enter Address'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.address}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Place</label>
            <input
              type='text'
              name='place'
              placeholder='Enter Place'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.place}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>GR No.</label>
            <input
              type='text'
              name='grNo'
              placeholder='Enter GR No.'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.grNo}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Standard Admitted</label>
            <input
              type='text'
              name='stdAdmitted'
              placeholder='Enter Standard Admitted'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.stdAdmitted}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Last School Attended</label>
            <input
              type='text'
              name='lastSchoolAttended'
              placeholder='Enter Last School Attended'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.lastSchoolAttended}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Standard Studying</label>
            <input
              type='text'
              name='stdStudying'
              placeholder='Enter Standard Studying'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.stdStudying}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Class Leaving</label>
            <input
              type='text'
              name='classLeaving'
              placeholder='Enter Class Leaving'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.classLeaving}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Date of Leaving</label>
            <input
              type='date'
              name='dateLeaving'
              placeholder='Enter Date of Leaving'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.dateLeaving}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Reason for Leaving</label>
            <input
              type='text'
              name='reasonLeaving'
              placeholder='Enter Reason for Leaving'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.reasonLeaving}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Identification</label>
            <input
              type='text'
              name='identification'
              placeholder='Enter Identification'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.identification}
              onChange={handleFormChange}
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Progress</label>
            <input
              type='text'
              name='progress'
              placeholder='Enter Progress'
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
              value={formData.progress}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className='mt-8 '>
         
        <div className='flex  justify-center items-center text-white mt-20'>
        <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handlePreview}>
          Preview
        </button>
        <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handleDownload}>
          Download
        </button>
      </div>


          {showPreview && (
  <div id='preview-content' className='mt-8 p-4 border border-gray-300 bg-white text-black'>
    <h2 className='text-xl font-bold'>Student Nirgam Certificate</h2>
    <div>
      <p><strong>Name:</strong> {formData.fullName}</p>
      <p><strong>Father's Name:</strong> {formData.fathersName}</p>
      <p><strong>Mother's Name:</strong> {formData.mothersName}</p>
      <p><strong>Date of Birth:</strong> {formData.dob}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>Place:</strong> {formData.place}</p>
      <p><strong>GR No.:</strong> {formData.grNo}</p>
      <p><strong>Standard Admitted:</strong> {formData.stdAdmitted}</p>
      <p><strong>Last School Attended:</strong> {formData.lastSchoolAttended}</p>
      <p><strong>Standard Studying:</strong> {formData.stdStudying}</p>
      <p><strong>Class Leaving:</strong> {formData.classLeaving}</p>
      <p><strong>Date of Leaving:</strong> {formData.dateLeaving}</p>
      <p><strong>Reason for Leaving:</strong> {formData.reasonLeaving}</p>
      <p><strong>Identification:</strong> {formData.identification}</p>
      <p><strong>Progress:</strong> {formData.progress}</p>
      <p><strong>Religion:</strong> {options.find(option => option.id === selectedOption)?.name || 'N/A'}</p>
      <p><strong>Caste:</strong> {caste.find(cast => cast.id === selectedOption2)?.name || 'N/A'}</p>
    </div>
  </div>
)}

        </div>

     
      </div>
    </div>
  );
}

export default NigramCertificate;






























