import React, { useState, useEffect } from "react";
import Header from "../dashboard/Header";
import * as XLSX from "xlsx";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

const ParentCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get student ID from parent login
    const parentStudentId = localStorage.getItem("parentStudentId") || "1";
    fetchStudentInfo(parentStudentId);
    fetchCertificates(parentStudentId);
  }, []);

  const fetchStudentInfo = async (studentId) => {
    try {
      // Mock student info - replace with actual API call
      const mockStudentInfo = {
        id: studentId,
        name: "John Doe",
        class: "10th Grade",
        section: "A",
        rollNumber: "2024001",
        fatherName: "Mr. Smith Doe",
        admissionNumber: "ADM2024001",
        dateOfBirth: "2008-05-15",
        admissionDate: "2019-04-01",
      };
      setStudentInfo(mockStudentInfo);
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  const fetchCertificates = async (studentId) => {
    setLoading(true);
    try {
      // Mock certificate data - replace with actual API call
      const mockCertificates = [
        {
          id: 1,
          type: "Bonafide Certificate",
          purpose: "Bank Account Opening",
          requestDate: "2024-01-15",
          issueDate: "2024-01-17",
          status: "Issued",
          certificateNumber: "BON2024001",
          issuedBy: "Principal",
          downloadUrl: "#",
        },
        {
          id: 2,
          type: "Transfer Certificate",
          purpose: "School Transfer",
          requestDate: "2024-02-01",
          issueDate: null,
          status: "Pending",
          certificateNumber: null,
          issuedBy: null,
          downloadUrl: null,
        },
        {
          id: 3,
          type: "Character Certificate",
          purpose: "Scholarship Application",
          requestDate: "2024-01-10",
          issueDate: "2024-01-12",
          status: "Issued",
          certificateNumber: "CHAR2024001",
          issuedBy: "Principal",
          downloadUrl: "#",
        },
        {
          id: 4,
          type: "Study Certificate",
          purpose: "Passport Application",
          requestDate: "2024-01-20",
          issueDate: "2024-01-22",
          status: "Issued",
          certificateNumber: "STU2024001",
          issuedBy: "Principal",
          downloadUrl: "#",
        },
        {
          id: 5,
          type: "Leaving Certificate",
          purpose: "Higher Studies",
          requestDate: "2024-02-05",
          issueDate: null,
          status: "Under Review",
          certificateNumber: null,
          issuedBy: null,
          downloadUrl: null,
        },
      ];
      setCertificates(mockCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCertificates = certificates.filter((cert) => {
    const statusMatch =
      filterStatus === "all" ||
      cert.status.toLowerCase() === filterStatus.toLowerCase();
    const typeMatch =
      filterType === "all" ||
      cert.type.toLowerCase().includes(filterType.toLowerCase());
    return statusMatch && typeMatch;
  });

  const downloadCertificatesExcel = () => {
    if (certificates.length === 0) {
      alert("No certificate data to download.");
      return;
    }

    const certificateData = certificates.map((cert, index) => ({
      "S.No": index + 1,
      "Certificate Type": cert.type,
      Purpose: cert.purpose,
      "Request Date": new Date(cert.requestDate).toLocaleDateString("en-IN"),
      "Issue Date": cert.issueDate
        ? new Date(cert.issueDate).toLocaleDateString("en-IN")
        : "Not Issued",
      Status: cert.status,
      "Certificate Number": cert.certificateNumber || "Not Assigned",
      "Issued By": cert.issuedBy || "Not Assigned",
    }));

    const summaryData = [
      { Metric: "Student Name", Value: studentInfo?.name || "N/A" },
      { Metric: "Class", Value: studentInfo?.class || "N/A" },
      {
        Metric: "Admission Number",
        Value: studentInfo?.admissionNumber || "N/A",
      },
      { Metric: "Total Certificates Requested", Value: certificates.length },
      {
        Metric: "Issued Certificates",
        Value: certificates.filter((c) => c.status === "Issued").length,
      },
      {
        Metric: "Pending Certificates",
        Value: certificates.filter((c) => c.status === "Pending").length,
      },
      {
        Metric: "Under Review",
        Value: certificates.filter((c) => c.status === "Under Review").length,
      },
      {
        Metric: "Report Generated",
        Value: new Date().toLocaleDateString("en-IN"),
      },
    ];

    const workbook = XLSX.utils.book_new();

    const certificateSheet = XLSX.utils.json_to_sheet(certificateData);
    XLSX.utils.book_append_sheet(workbook, certificateSheet, "Certificates");

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const fileName = `${studentInfo?.name || "Student"}_Certificates_${new Date().getFullYear()}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadCertificatesPDF = async () => {
    try {
      const certificateReport = {
        reportType: "Student Certificates Report",
        studentName: studentInfo?.name || "Student",
        class: studentInfo?.class || "N/A",
        admissionNumber: studentInfo?.admissionNumber || "N/A",
        rollNumber: studentInfo?.rollNumber || "N/A",
        generatedDate: new Date().toLocaleDateString(),
        totalRequested: certificates.length,
        totalIssued: certificates.filter((c) => c.status === "Issued").length,
        totalPending: certificates.filter((c) => c.status === "Pending").length,
        data: certificates,
      };

      await generateInvoicePDF(certificateReport, "certificate_report");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF report. Please try again.");
    }
  };

  const downloadIndividualCertificate = async (certificate) => {
    try {
      const certificateData = {
        certificateType: certificate.type,
        studentName: studentInfo?.name || "Student",
        class: studentInfo?.class || "N/A",
        section: studentInfo?.section || "N/A",
        admissionNumber: studentInfo?.admissionNumber || "N/A",
        rollNumber: studentInfo?.rollNumber || "N/A",
        fatherName: studentInfo?.fatherName || "N/A",
        dateOfBirth: studentInfo?.dateOfBirth || "N/A",
        admissionDate: studentInfo?.admissionDate || "N/A",
        purpose: certificate.purpose,
        issueDate: certificate.issueDate,
        certificateNumber: certificate.certificateNumber,
        issuedBy: certificate.issuedBy,
      };

      await generateInvoicePDF(certificateData, "certificate");
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Error generating certificate. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "issued":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under review":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Certificates & Documents
        </h1>

        {/* Student Info Card */}
        {studentInfo && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p>
                  <strong>Name:</strong> {studentInfo.name}
                </p>
                <p>
                  <strong>Class:</strong> {studentInfo.class}
                </p>
                <p>
                  <strong>Section:</strong> {studentInfo.section}
                </p>
              </div>
              <div>
                <p>
                  <strong>Admission Number:</strong>{" "}
                  {studentInfo.admissionNumber}
                </p>
                <p>
                  <strong>Roll Number:</strong> {studentInfo.rollNumber}
                </p>
                <p>
                  <strong>Father's Name:</strong> {studentInfo.fatherName}
                </p>
              </div>
              <div>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(studentInfo.dateOfBirth).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
                <p>
                  <strong>Admission Date:</strong>{" "}
                  {new Date(studentInfo.admissionDate).toLocaleDateString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Total Requested</h3>
            <p className="text-2xl font-bold">{certificates.length}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Issued</h3>
            <p className="text-2xl font-bold">
              {certificates.filter((c) => c.status === "Issued").length}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Pending</h3>
            <p className="text-2xl font-bold">
              {certificates.filter((c) => c.status === "Pending").length}
            </p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Under Review</h3>
            <p className="text-2xl font-bold">
              {certificates.filter((c) => c.status === "Under Review").length}
            </p>
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="issued">Issued</option>
                  <option value="pending">Pending</option>
                  <option value="under review">Under Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="bonafide">Bonafide Certificate</option>
                  <option value="transfer">Transfer Certificate</option>
                  <option value="character">Character Certificate</option>
                  <option value="study">Study Certificate</option>
                  <option value="leaving">Leaving Certificate</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadCertificatesExcel}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📊 Download Excel
              </button>
              <button
                onClick={downloadCertificatesPDF}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Certificate History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filteredCertificates.length > 0 ? (
                  filteredCertificates.map((certificate, index) => (
                    <tr
                      key={certificate.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {certificate.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {certificate.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(certificate.requestDate).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {certificate.issueDate
                          ? new Date(certificate.issueDate).toLocaleDateString(
                              "en-IN"
                            )
                          : "Not Issued"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(certificate.status)}`}
                        >
                          {certificate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {certificate.certificateNumber || "Not Assigned"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {certificate.status === "Issued" ? (
                          <button
                            onClick={() =>
                              downloadIndividualCertificate(certificate)
                            }
                            className="text-blue-500 hover:text-blue-700 font-semibold mr-3"
                          >
                            📄 Download
                          </button>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No certificates found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Only issued certificates can be
                downloaded. For pending certificates, please contact the school
                office. Certificate processing typically takes 2-3 working days
                from the request date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentCertificates;
