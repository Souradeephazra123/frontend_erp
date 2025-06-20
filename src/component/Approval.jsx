import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../dashboard/Header";

const PaymentApprovalList = () => {
  const [paymentApprovals, setPaymentApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentApprovals = async () => {
      try {
        const response = await axios.get(
          "https://erp.api.mindgrowthacademy.com/api/paymentapproval"
        );
        if (
          response.data.message ===
          "No payment approval details found for the student."
        )
          setPaymentApprovals([]);
        else setPaymentApprovals(response.data);
      } catch (err) {
        setError("Failed to fetch payment approvals");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentApprovals();
  }, []);

  const updatePaymentStatus = async (id, status, sub_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/paymentapproval/${id}`,
        {
          status: status,
          subcategory_id: sub_id, // Replace with the actual subcategory_id if needed
        }
      );
      // Optionally, you can refresh the payment approvals after an update
      setPaymentApprovals((prev) =>
        prev.map((approval) =>
          approval.payment_approval_id === id
            ? { ...approval, payment_status: status }
            : approval
        )
      );
      alert(`Payment status updated to ${status}`);
    } catch (error) {
      alert("Failed to update payment status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Payment Approval List
        </h1>
        <div className="overflow-hidden border rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Payment ID</th>
                <th className="py-3 px-4 text-left">Student Name</th>
                <th className="py-3 px-4 text-left">Fee ID</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Payment Date</th>
                <th className="py-3 px-4 text-left">Method</th>
                <th className="py-3 px-4 text-left">Month</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentApprovals.map((approval) => (
                <tr
                  key={approval.payment_approval_id}
                  className="hover:bg-gray-100"
                >
                  <td className="border py-2 px-4">
                    {approval.payment_approval_id}
                  </td>
                  <td className="border py-2 px-4">{approval.student_name}</td>
                  <td className="border py-2 px-4">{approval.fee_id}</td>
                  <td className="border py-2 px-4">
                    {approval.payment_amount}
                  </td>
                  <td className="border py-2 px-4">
                    {new Date(approval.payment_date).toLocaleDateString()}
                  </td>
                  <td className="border py-2 px-4">
                    {approval.payment_method}
                  </td>
                  <td className="border py-2 px-4">{approval.payment_month}</td>
                  <td className="border py-2 px-4">
                    {approval.payment_status}
                  </td>
                  <td className="border py-2 px-4">
                    <button
                      onClick={() =>
                        updatePaymentStatus(
                          approval.payment_approval_id,
                          "Approved",
                          approval.sub_id
                        )
                      }
                      className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updatePaymentStatus(
                          approval.payment_approval_id,
                          "Rejected",
                          approval.sub_id
                        )
                      }
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentApprovalList;
