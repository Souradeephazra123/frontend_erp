// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentDetails = () => {
//   const location = useLocation();
//   const { studentId, studentName } = location.state || {};

//   if (!studentId || !studentName) return <div className="text-center text-lg font-semibold">Loading...</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Payment Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="font-medium text-gray-700"><strong>Student ID:</strong> {studentId}</p>
//             <p className="font-medium text-gray-700"><strong>Student Name:</strong> {studentName}</p>
//             <p className="font-medium text-gray-700"><strong>Amount:</strong> $1000</p>
//             <p className="font-medium text-gray-700"><strong>Payment Mode:</strong> Credit Card</p>
//             <p className="font-medium text-gray-700"><strong>Reference No:</strong> 123456789</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
  const location = useLocation();
  const { studentId, studentName } = location.state || {};

  // State to hold the values of the editable fields
  const [amount, setAmount] = useState("$1000");
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [referenceNo, setReferenceNo] = useState("123456789");

  if (!studentId || !studentName)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Payment Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-700">
              <strong>Student ID:</strong> {studentId}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Student Name:</strong> {studentName}
            </p>

            <div className="font-medium text-gray-700">
              <strong>Amount:</strong>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 ml-2"
              />
            </div>

            <div className="font-medium text-gray-700 mt-4">
              <strong>Payment Mode:</strong>
              <input
                type="text"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 ml-2"
              />
            </div>

            <div className="font-medium text-gray-700 mt-4">
              <strong>Reference No:</strong>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
