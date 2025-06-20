import React from "react";

function History() {
  // Sample data for the table
  const data = [
    {
      month: "May",
      absent: "3 days",
      present: "7 days",
      workingDays: "15 days",
    },
    {
      month: "June",
      absent: "15 days",
      present: "7 days",
      workingDays: "15 days",
    },
    {
      month: "July",
      absent: "2 days",
      present: "15 days",
      workingDays: "15 days",
    },
    {
      month: "August",
      absent: "4 days",
      present: "15 days",
      workingDays: "15 days",
    },
    {
      month: "September",
      absent: "3 days",
      present: "7 days",
      workingDays: "15 days",
    },
  ];

  return (
    <div className="p-4 bg-[#CBE4FD] rounded-lg shadow-md">
      <table className="min-w-full bg-[#CBE4FD] rounded-md">
        <thead>
          <tr className="bg-white">
            <th className="py-2 px-4 border-b bg-white">Month</th>
            <th className="py-2 px-4 border-b bg-white">Absent</th>
            <th className="py-2 px-4 border-b bg-white">Present</th>
            <th className="py-2 px-4 border-b bg-white">Working Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#CBE4FD]" : "bg-[#CBE4FD]"}
            >
              <td className="py-2 px-4 border-b bg-white">{row.month}</td>
              <td className="py-2 px-4 border-b bg-white">{row.absent}</td>
              <td className="py-2 px-4 border-b bg-white">{row.present}</td>
              <td className="py-2 px-4 border-b bg-white">{row.workingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
