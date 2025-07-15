import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../dashboard/Header";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

const FeeTableComponent = () => {
  const { id } = useParams();
  const [feeData, setFeeData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ismodalOpen, setisModalOpen] = useState(false);
  const [currentFee, setCurrentFee] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [carryModalOpen, setCarryModalOpen] = useState(false);
  const [carryPaymentDetails, setCarryPaymentDetails] = useState(null);

  const [academicId, setAcademicId] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState({
    subcategory_id: "",
    payment: "",
    amount_paid: "",
    month: "",
    discount_amount: "",
    discount_reason: "",
    student_id: id,
  });
  const [feeId, setFeeId] = useState("");
  const [academicYear, setAcademicYear] = useState([]);
  useEffect(() => {
    // Fetch class and division options from an API
    const id = localStorage.getItem("selectedSchool");
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/academic-year`)
      .then((response) => {
        setAcademicYear(response.data);
      })
      .catch((error) =>
        console.error("Error fetching class and division options:", error)
      );
  }, []);

  const [msg, setMsg] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/fee/${id}?year=${academicId}`)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Success") {
          const filteredData = response.data.data.filter(
            (fee) => fee.fee_id !== 0
          );
          setFeeData(filteredData);
        } else {
          setMsg(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the fee data!", error);
      });
  }, [id, academicId]);

  // Fetch fee categories when modal opens
  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/fee-categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  };

  // Fetch subcategories when a category is selected
  const fetchSubcategories = (categoryId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-subcategories?categoryId=${categoryId}`
      )
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories", error);
      });
  };

  // Open modal and fetch categories for new or existing payment
  const handleModalOpen = (fee = null) => {
    fetchCategories(); // Fetch categories when the modal opens
    setModalOpen(true);
    if (fee) {
      setCurrentFee(fee);
      setFeeId(fee.fee_id);
      setFormData({
        subcategory_id: fee.fee_subcategory_id,
        payment: "",
        amount_paid: "",
        month: "",
        discount_amount: "",
        discount_reason: "",
        student_id: id,
      });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentFee({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const groupByFeeCategory = (data) => {
    const groupedData = {};
    data.forEach((fee) => {
      if (!groupedData[fee.fee_category]) {
        groupedData[fee.fee_category] = [];
      }
      groupedData[fee.fee_category].push(fee);
    });
    return groupedData;
  };

  const groupedFeeData = groupByFeeCategory(feeData);
  const studentInfo = feeData[0];

  const handleView = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/feeHistory/${id}`)
      .then((response) => {
        setPaymentDetails(response.data);
        setisModalOpen(true);
      })
      .catch((err) => {
        console.error("Error fetching fee history", err);
      });
  };

  const handleisModalClose = () => {
    setisModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const data = {
      subcategory_id: parseInt(formData.subcategory_id), // Convert to integer
      payment: formData.payment,
      amount_paid: parseInt(formData.amount_paid), // Convert to integer
      month: formData.month,
      discount_amount: parseInt(formData.discount_amount), // Convert to integer
      discount_reason: formData.discount_reason,
      student_id: parseInt(id), // Convert to integer
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/payment/` + feeId,
        data
      );

      setFormData({
        subcategory_id: "",
        payment: "",
        amount_paid: "",
        month: "",
        discount_amount: "",
        discount_reason: "",
        student_id: id,
      });
      setFeeId("");
      handleModalClose();
      window.location.reload();
      // Close the modal when payment is successful
      // Handle success (e.g., show a message, clear the form, etc.)
    } catch (error) {
      console.error("Error submitting payment:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleFullPayment = async (Id, payment) => {
    try {
      // Prepare the data to be sent in the request body
      const paymentData = {
        student_id: id, // Use the provided ID
        amount_paid: payment, // Full payment amount
        payment: "Cash", // Payment mode
        month: "Full Payment", // Full payment description
      };

      // Make the API call with the data
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/payment/fullpayment/` + Id,
        paymentData
      );

      // Handle success response
      if (response.status === 200) {
        alert("Full payment processed successfully!");
        // Optionally, refresh the fee data to reflect the updated payment status
        window.location.reload();
      }
    } catch (error) {
      console.error("Error processing full payment:", error);
      alert("Failed to process full payment. Please try again.");
    }
  };
  const handleCarryModalClose = () => {
    setCarryModalOpen(false);
    setCarryPaymentDetails(null);
  };
  const handleCarryPayment = async () => {
    try {
      const payload = {
        studentId: id,
        paymentAmount: studentInfo?.carryForwardFee,
      };
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/payCarryForwardFee`,
        payload
      );
      alert("Carry Forward Fee Paid Successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error paying carry forward fee:", error);
    }
  };

  // Generate invoice for fee payment
  const generateFeeInvoice = async (payment) => {
    try {
      const invoiceData = {
        invoiceNumber: `FEE-${payment.id || Date.now()}`,
        studentName: studentInfo?.name || "Student",
        studentId: studentInfo?.studentId || id,
        class: studentInfo?.class || "N/A",
        section: studentInfo?.section || "N/A",
        fatherName: studentInfo?.fatherName || "N/A",
        paymentDate: payment.payment_date,
        month: payment.month,
        paymentMethod: payment.payment_method,
        amount: payment.payment_amount,
        feeCategory: payment.fee_category || "General Fee",
        feeSubcategory: payment.fee_subcategory || "N/A",
      };

      await generateInvoicePDF(invoiceData, "fee");
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice. Please try again.");
    }
  };
  const viewCarryPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/payment/carry/${studentInfo?.carryForwardFee_id}`
      );
      setCarryPaymentDetails(response.data);
      setCarryModalOpen(true);
    } catch (error) {
      console.error("Error fetching carry forward payment details:", error);
    }
  };

  return (
    <>
      <Header />
      {msg ? (
        <div className="mx-auto">{msg}</div>
      ) : (
        <div className=" mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Fee Details</h2>

          {/* Student Info Section */}
          {feeData.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-bold">Student Information</h3>
              <select
                className="input border border-gray-300 p-3 rounded-md w-full md:w-1/3"
                value={academicId}
                onChange={(e) => setAcademicId(e.target.value)}
              >
                <option value="">Select Academic Year</option>
                {academicYear.map((category) => (
                  <option key={category.id} value={category.year}>
                    {category.year}
                  </option>
                ))}
              </select>
              <p>
                <strong>Name:</strong> {studentInfo?.student_name}
              </p>
              <p>
                <strong>Class:</strong> {studentInfo?.student_class}
              </p>
              {(studentInfo?.carryForwardFee > 0 ||
                studentInfo?.carryForwardFee_id) && (
                <p style={{ color: "red" }}>
                  <strong>Carry Over Fee:</strong>{" "}
                  {studentInfo?.carryForwardFee}
                  {studentInfo?.carryForwardFee_id ? (
                    <button
                      onClick={viewCarryPaymentDetails}
                      className="px-2 py-2 ml-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      View Payment Details
                    </button>
                  ) : (
                    studentInfo?.carryForwardFee !== 0 && (
                      <button
                        onClick={handleCarryPayment}
                        className="px-2 py-2 ml-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                      >
                        Make Payment
                      </button>
                    )
                  )}
                </p>
              )}
            </div>
          )}

          {/* Fee Categories and Payments */}
          {feeData.length > 0 &&
            Object.keys(groupedFeeData).map((feeCategory, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{feeCategory} Fees</h3>
                <table className="min-w-full bg-white border border-gray-200 shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Subcategory</th>
                      <th className="py-3 px-6 text-left">Fee Amount</th>
                      <th className="py-3 px-6 text-left">Amount Paid</th>
                      <th className="py-3 px-6 text-left">Discount Amount</th>
                      <th className="py-3 px-6 text-left">Discount Reason</th>
                      <th className="py-3 px-6 text-left">Carry forward fee</th>
                      <th className="py-3 px-6 text-left">Amount Due</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                      <th className="py-3 px-6 text-left"> Transaction </th>
                      <th className="py-3 px-6 text-left">Full Payment</th>
                    </tr>{" "}
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {groupedFeeData[feeCategory].map((fee, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          {fee.fee_subcategory}
                        </td>
                        <td className="py-3 px-6 text-left">
                          ₹{fee.fee_amount}
                        </td>
                        <td className="py-3 px-6 text-left">
                          ₹{fee.amount_paid}
                        </td>
                        <td className="py-3 px-6 text-left">
                          ₹{fee.discount_amount || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {fee.discount_reason || "N/A"}
                        </td>
                        <td className="py-3 px-6 text-left">0.00</td>
                        <td className="py-3 px-6 text-left">
                          ₹{fee.amount_due_after_discount}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {fee.amount_due_after_discount == 0.0 ? (
                            <span className="text-green-600">Fee Paid</span>
                          ) : (
                            <button
                              className="bg-yellow-500 text-white py-1 px-3 rounded"
                              onClick={() => handleModalOpen(fee)}
                            >
                              Monthly Fee
                            </button>
                          )}
                        </td>

                        <td className="py-3 px-6 text-left">
                          <button
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                            onClick={() => handleView(fee.fee_id)}
                          >
                            Transaction
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                            onClick={() =>
                              handleFullPayment(fee.fee_id, fee.fee_amount)
                            }
                            disabled={
                              fee.amount_due_after_discount == 0.0 ||
                              fee.amount_due_after_discount != fee.fee_amount
                            }
                          >
                            Full Payment
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

          {/* Payment Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Monthly Payment</h3>
                <form onSubmit={handleSubmit}>
                  {/* Student ID */}

                  {/* Fee Amount */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Monthly Fee
                    </label>
                    <input
                      type="number"
                      name="fee_amount"
                      value={currentFee.fee_amount / 12 || 0}
                      className="w-full p-2 border border-gray-300 rounded"
                      disabled
                    />
                  </div>

                  {/* Mode of Payment */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Mode of Payment
                    </label>
                    <input
                      type="text"
                      name="payment"
                      value={formData.payment}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g., Cash, Card"
                    />
                  </div>

                  {/* Amount Paid */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      name="amount_paid"
                      value={formData.amount_paid}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter Amount"
                      required
                    />
                  </div>

                  {/* Month */}
                  {/* Month Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Month
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="" disabled>
                        Select Month
                      </option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  {/* Discount Amount */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Discount Amount
                    </label>
                    <input
                      type="number"
                      name="discount_amount"
                      value={formData.discount_amount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter Discount Amount"
                    />
                  </div>

                  {/* Discount Reason */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Discount Reason
                    </label>
                    <input
                      type="text"
                      name="discount_reason"
                      value={formData.discount_reason}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter Reason for Discount"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Payment History Modal */}
          {ismodalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <table className="min-w-full bg-white border border-gray-200 shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Payment</th>
                      <th className="py-3 px-6 text-left">Amount Paid</th>
                      <th className="py-3 px-6 text-left">Month</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {console.log(paymentDetails)}
                    {paymentDetails.map((payment, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {payment.payment_method}
                        </td>
                        <td className="py-3 px-6 text-left">
                          ₹{payment.payment_amount}
                        </td>
                        <td className="py-3 px-6 text-left">{payment.month}</td>
                        <td className="py-3 px-6 text-left">
                          <button
                            onClick={() => generateFeeInvoice(payment)}
                            className="text-green-500 hover:text-green-700 bg-green-100 px-2 py-1 rounded text-sm"
                            title="Download Invoice PDF"
                          >
                            📄 Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={handleisModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {carryModalOpen && carryPaymentDetails && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Carry Payment Details
                </h3>
                <p>
                  <strong>Payment Amount:</strong> ₹
                  {carryPaymentDetails.paymentAmount}
                </p>
                <p>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(
                    carryPaymentDetails.paymentDate
                  ).toLocaleDateString()}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={handleCarryModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeeTableComponent;
