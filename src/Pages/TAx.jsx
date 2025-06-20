import React, { useEffect, useState } from "react";
import Header from "../dashboard/Header";

function TAx() {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    // Fetch staff data from API
    fetch("https://erp.api.mindgrowthacademy.com/api/class/staff")
      .then((response) => response.json())
      .then((data) => {
        setStaffData(data);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-[#CBE4FD] rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Teacher PF and P Tax</h2>
        <table className="min-w-full bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 border-b">Teacher Name</th>
              <th className="py-2 px-4 border-b">PF</th>
              <th className="py-2 px-4 border-b">P TAX</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {staffData.length > 0 ? (
              staffData.map((staff, index) => {
                // Calculate PF (EPF) and P Tax for each staff
                const pf = (
                  (parseFloat(staff.monthly_salary) *
                    parseFloat(staff.epf_employee_percentage)) /
                  100
                ).toFixed(2);
                const pTax = (parseFloat(staff.daily_salary) * 10).toFixed(2); // Example P Tax calculation
                const total = (parseFloat(pf) + parseFloat(pTax)).toFixed(2);

                return (
                  <tr
                    key={index}
                    className={`hover:bg-blue-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-4 border-b text-center">
                      {staff.name}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{pf}</td>
                    <td className="py-2 px-4 border-b text-center">{pTax}</td>
                    <td className="py-2 px-4 border-b text-center">{total}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No staff data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TAx;
