

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logoLeft from '../img/WhatsApp Image 2024-07-19 at 15.45.41_45d14541.jpg'
import logoRight from '../img/cbse-logo-46D5A6B556-seeklogo.com.png'

function LeavingCertificate() {
  const [formData, setFormData] = useState({
    admissionSerialNo: '',
    studentId: '',
    grNo: '',
    fullName: '',
    fathersName: '',
    mothersName: '',
    aadhaarCardNo: '',
    caste: '',
    religion: '',
    parentsOccupation: '',
    motherTongue: '',
    dateOfAdmission: '',
    dob: '',
    dobWords: '',
    placeOfBirth: '',
    stdAdmitted: '',
    lastSchoolAttended: '',
    stdStudying: '',
    progress: '',
    classLeaving: '',
    dateLeaving: '',
    reasonLeaving: '',
    identification: '',
    admissionOfficerSignature: '',
    registrationOfficerSignature: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');

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

  return (
    <div className='text-white bg-[#412249] min-h-screen font-[roboto]'>
      <div className='pt-20'>
        <h2 className='text-3xl font-semibold text-center'>Student Leaving Certificate Details</h2>
        <p className='text-center'>Enter the required information for the certificate</p>
      </div>

      <div className='mt-8 md:mt-16 lg:mt-32 container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto'>
          {Object.keys(formData).map((field) => (
            <div className='px-2' key={field}>
              <label className='text-white mb-2'>
                {field.split(/(?=[A-Z])/).join(' ')}
              </label>
              <input
                type={field === 'dob' || field === 'dateOfAdmission' || field === 'dateLeaving' ? 'date' : 'text'}
                name={field}
                placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ')}`}
                className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
                value={formData[field]}
                onChange={handleFormChange}
              />
            </div>
          ))}
        </div>

        <div className='mt-8 '>
          <div className='flex pb-20 justify-center items-center text-white mt-20'>
            <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handlePreview}>
              Preview
            </button>
            <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handleDownload}>
              Download
            </button>
          </div>
          {showPreview && (
            <div id='preview-content' className='mt-8 p-4 border border-gray-300 bg-white text-black'>
              <div className='bg-white p-4'>
                <div className='m-12 p-12 border-4 border-black'>
                  <div className='flex items-center justify-center space-x-2'>
                   <div className='w-44 h-44'>
                   <img  src={logoLeft} alt="error" loading='lazy' title='logoLeft' />
                    
                   </div>
                    <div className='mb-12'>
                      <h2 className='text-center text-red-700 mb-2 font-bold text-3xl'>INDURA ENGLISH SCHOOL (CBSE)</h2>
                      <p className='text-center font-semibold'>Enjangaon (East), Tq, Basmath Dist Hingoli</p>
                      <p className='text-center font-semibold'>UDISE No.: 27160301903 AffiliaƟon No.: 1131230 School Code: 31217</p>
                      <div className='text-center font-semibold'>
                        <a href="/www.induraenglishschool.in" className='mx-4'>Website : www.induraenglishschool.in</a>
                        <a href="/induraenglishschool@gmail.com" className='mx-4'>Email : induraenglishschool@gmail.com</a>
                      </div>
                    </div>
                   <div className='w-40 h-40'>
                   <img  src={logoRight} alt="error" loading='lazy' title='logoRight' />
                    
                   </div>
                  </div>

                  <div className='flex justify-center font-semibold text-[0.8rem] items-center mt-4'>
                    <div className="vertical-table-container">
                      <div className="vertical-table-header">
                        {Object.keys(formData).map((field) => (
                          <div key={field} className="vertical-header-item">{field.split(/(?=[A-Z])/).join(' ').toUpperCase()}</div>
                        ))}
                      </div>

                      <div className="vertical-table-body">
                        {Object.values(formData).map((value, index) => (
                          <div key={index} className="vertical-header-item">
                            <p>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h4 className='px-12 mt-6'>DATE:</h4>

                  <div className='flex justify-between items-center pt-2 px-12'>
                    <p>PLACE : IES, Barmath</p>
                    <p>CLERK’S SIGN </p>
                    <p>PRINCIPAL’S SIGN </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeavingCertificate;





























// import React, { useState } from 'react';
// import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
// import logoLeft from '../img/WhatsApp Image 2024-07-19 at 15.45.41_45d14541.jpg';
// import logoRight from '../img/cbse-logo-46D5A6B556-seeklogo.com.png';

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: '#ffffff',
//     padding: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
//   title: {
//     textAlign: 'center',
//     color: 'red',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontSize: 12,
//     marginVertical: 2,
//   },
//   tableContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginVertical: 20,
//   },
//   tableHeader: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     flexWrap: 'nowrap',
//   },
//   headerItem: {
//     writingMode: 'vertical-lr',
//     textAlign: 'center',
//     border: '1px solid #000',
//     padding: 5,
//     height: 250,
//     width: 40,
//     overflowWrap: 'break-word',
//     wordBreak: 'break-all',
//     transform: 'rotate(180deg)',
//   },
//   tableBody: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   bodyItem: {
//     writingMode: 'vertical-lr',
//     textAlign: 'center',
//     border: '1px solid #000',
//     padding: 5,
//     height: 250,
//     width: 40,
//     overflowWrap: 'break-word',
//     wordBreak: 'break-all',
//     transform: 'rotate(180deg)',
//     margin: 0,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 20,
//   },
// });

// const LeavingCertificatePDF = ({ formData }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Image style={styles.logo} src={logoLeft} />
//         <View>
//           <Text style={styles.title}>INDURA ENGLISH SCHOOL (CBSE)</Text>
//           <Text style={styles.subtitle}>Enjangaon (East), Tq, Basmath Dist Hingoli</Text>
//           <Text style={styles.subtitle}>UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217</Text>
//           <Text style={styles.subtitle}>
//             <Text>Website: www.induraenglishschool.in</Text>
//             <Text>Email: induraenglishschool@gmail.com</Text>
//           </Text>
//         </View>
//         <Image style={styles.logo} src={logoRight} />
//       </View>

//       <View style={styles.tableContainer}>
//         <View style={styles.tableHeader}>
//           {Object.keys(formData).map((field) => (
//             <Text key={field} style={styles.headerItem}>
//               {field.split(/(?=[A-Z])/).join(' ').toUpperCase()}
//             </Text>
//           ))}
//         </View>

//         <View style={styles.tableBody}>
//           {Object.values(formData).map((value, index) => (
//             <Text key={index} style={styles.bodyItem}>
//               {value}
//             </Text>
//           ))}
//         </View>
//       </View>

//       <Text style={{ marginTop: 20 }}>DATE:</Text>

//       <View style={styles.footer}>
//         <Text>PLACE: IES, Barmath</Text>
//         <Text>CLERK’S SIGN</Text>
//         <Text>PRINCIPAL’S SIGN</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const LeavingCertificate = () => {
//   const [formData, setFormData] = useState({
//     admissionSerialNo: '',
//     studentId: '',
//     grNo: '',
//     fullName: '',
//     fathersName: '',
//     mothersName: '',
//     aadhaarCardNo: '',
//     caste: '',
//     religion: '',
//     parentsOccupation: '',
//     motherTongue: '',
//     dateOfAdmission: '',
//     dob: '',
//     dobWords: '',
//     placeOfBirth: '',
//     stdAdmitted: '',
//     lastSchoolAttended: '',
//     stdStudying: '',
//     progress: '',
//     classLeaving: '',
//     dateLeaving: '',
//     reasonLeaving: '',
//     identification: '',
//     admissionOfficerSignature: '',
//     registrationOfficerSignature: '',
//   });

//   const [showPreview, setShowPreview] = useState(false);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePreview = () => {
//     setShowPreview(true);
//   };

//   return (
//     <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
//       <div className="pt-20">
//         <h2 className="text-3xl font-semibold text-center">Student Leaving Certificate Details</h2>
//         <p className="text-center">Enter the required information for the certificate</p>
//       </div>

//       <div className="mt-8 md:mt-16 lg:mt-32 container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
//           {Object.keys(formData).map((field) => (
//             <div className="px-2" key={field}>
//               <label className="text-white mb-2">
//                 {field.split(/(?=[A-Z])/).join(' ')}
//               </label>
//               <input
//                 type={field === 'dob' || field === 'dateOfAdmission' || field === 'dateLeaving' ? 'date' : 'text'}
//                 name={field}
//                 placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ')}`}
//                 className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
//                 value={formData[field]}
//                 onChange={handleFormChange}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="mt-8">
//           <div className="flex pb-20 justify-center items-center text-white mt-20">
//             <button className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0" onClick={handlePreview}>
//               Preview
//             </button>
//           </div>
//           {showPreview && (
//             <PDFViewer width="100%" height="600">
//               <LeavingCertificatePDF formData={formData} />
//             </PDFViewer>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeavingCertificate;
