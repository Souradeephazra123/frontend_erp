import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateInvoicePDF = async (invoiceData, type = "fee") => {
  try {
    // Create a temporary div element for the invoice
    const invoiceElement = document.createElement("div");
    invoiceElement.style.position = "absolute";
    invoiceElement.style.left = "-9999px";
    invoiceElement.style.width = "800px";
    invoiceElement.style.backgroundColor = "white";
    invoiceElement.style.padding = "40px";
    invoiceElement.style.fontFamily = "Arial, sans-serif";

    // Set invoice content based on type
    invoiceElement.innerHTML = createInvoiceHTML(invoiceData, type);

    // Append to body temporarily
    document.body.appendChild(invoiceElement);

    // Generate canvas from the element
    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    // Remove the temporary element
    document.body.removeChild(invoiceElement);

    // Create PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = `${type}_invoice_${invoiceData.invoiceNumber || timestamp}.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    alert("Error generating invoice. Please try again.");
  }
};

const createInvoiceHTML = (data, type) => {
  const currentDate = new Date().toLocaleDateString("en-IN");

  return `
    <div style="max-width: 800px; margin: 0 auto; background: white; color: black;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
          <div style="width: 60px; height: 60px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
            <span style="color: white; font-weight: bold; font-size: 20px;">ERP</span>
          </div>
          <div>
            <h1 style="font-size: 28px; font-weight: bold; color: #1e40af; margin: 0;">ERP Mind Growth Academy</h1>
            <p style="font-size: 14px; color: #666; margin: 5px 0 0 0;">Excellence in Education</p>
          </div>
        </div>
        <h2 style="font-size: 24px; font-weight: bold; color: #374151; margin: 10px 0; background: #f3f4f6; padding: 10px; border-radius: 5px;">
          ${getInvoiceTitle(type)} INVOICE
        </h2>
      </div>

      <!-- Invoice Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h3 style="font-size: 16px; font-weight: bold; color: #374151; margin-bottom: 10px;">Invoice Details:</h3>
          <p style="margin: 5px 0;"><strong>Invoice No:</strong> ${data.invoiceNumber || generateInvoiceNumber()}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${currentDate}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${getInvoiceTitle(type)}</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: bold; color: #374151; margin-bottom: 10px;">Bill To:</h3>
          <p style="margin: 5px 0;"><strong>Student:</strong> ${data.studentName || "N/A"}</p>
          <p style="margin: 5px 0;"><strong>Class:</strong> ${data.class || "N/A"}</p>
          <p style="margin: 5px 0;"><strong>Section:</strong> ${data.section || "N/A"}</p>
          ${data.route ? `<p style="margin: 5px 0;"><strong>Bus Route:</strong> ${data.route}</p>` : ""}
        </div>
      </div>

      ${getInvoiceContent(data, type)}

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="text-align: center;">
            <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
            <p style="font-weight: bold; color: #374151;">Authorized Signature</p>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
            <p style="font-weight: bold; color: #374151;">Parent/Guardian Signature</p>
          </div>
        </div>
        
        <div style="text-align: center; background: #dbeafe; padding: 15px; border-radius: 8px;">
          <p style="font-size: 12px; color: #1e40af; margin: 0; font-weight: 600;">
            📧 Email: accounts@erpmindgrowth.edu | 📞 Phone: +91-XXXXXXXXXX | 🌐 Website: www.erpmindgrowth.edu
          </p>
        </div>
      </div>
    </div>
  `;
};

const getInvoiceTitle = (type) => {
  switch (type) {
    case "bus_fee":
      return "BUS FEE";
    case "expenditure":
      return "EXPENDITURE";
    case "fee_report":
      return "FEE REPORT";
    case "fee":
    default:
      return "SCHOOL FEE";
  }
};

const getInvoiceContent = (data, type) => {
  switch (type) {
    case "bus_fee":
      return `
        <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #f59e0b; color: white; padding: 15px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">BUS FEE DETAILS</h3>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Description</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">Month</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">Bus Transportation Fee</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">${data.month || "N/A"}</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold;">₹${data.amount || "0"}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style="background: #f59e0b; color: white;">
                  <td colspan="2" style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">TOTAL AMOUNT</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold; font-size: 16px;">₹${data.amount || "0"}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      `;

    case "expenditure":
      return `
        <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #dc2626; color: white; padding: 15px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">EXPENDITURE DETAILS</h3>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold; background: #f9fafb;">Expenditure Type:</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">${data.expenditureType || "N/A"}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold; background: #f9fafb;">Description:</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">${data.description || "N/A"}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold; background: #f9fafb;">Person Name:</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">${data.Name || "N/A"}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold; background: #f9fafb;">Date:</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">${data.date || "N/A"}</td>
                </tr>
                <tr style="background: #dc2626; color: white;">
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">TOTAL AMOUNT:</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold; font-size: 16px;">₹${data.amount || "0"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

    case "fee_report":
      return `
        <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #6366f1; color: white; padding: 15px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">FEE REPORT SUMMARY</h3>
          </div>
          <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">Report Information</h4>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tbody>
                  <tr>
                    <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold; background: #f9fafb;">Report Type:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px;">${data.reportType || "N/A"}</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold; background: #f9fafb;">Period:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px;">${data.period || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold; background: #f9fafb;">Generated Date:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px;">${data.generatedDate || "N/A"}</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold; background: #f9fafb;">Total Students:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 10px;">${data.totalStudents || "0"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="margin-bottom: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">Financial Summary</h4>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tbody>
                  <tr style="background: #f3f4f6;">
                    <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">Total Fee Amount:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold; color: #059669;">₹${data.totalAmount || "0"}</td>
                  </tr>
                  <tr style="background: #f3f4f6;">
                    <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">Total Amount Paid:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold; color: #0891b2;">₹${data.totalPaid || "0"}</td>
                  </tr>
                  <tr style="background: #f3f4f6;">
                    <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">Total Amount Due:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold; color: #dc2626;">₹${data.totalDue || "0"}</td>
                  </tr>
                  <tr style="background: #6366f1; color: white;">
                    <td style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">Collection Percentage:</td>
                    <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold;">${data.totalAmount > 0 ? ((data.totalPaid / data.totalAmount) * 100).toFixed(1) : "0"}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            ${
              data.data && data.data.length > 0
                ? `
            <div>
              <h4 style="margin: 0 0 10px 0; color: #374151;">Detailed Report (First 20 Records)</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead>
                  <tr style="background: #6366f1; color: white;">
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Student ID</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Name</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Class</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Fee Amount</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Paid</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Due</th>
                    <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: center;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.data
                    .slice(0, 20)
                    .map(
                      (row, index) => `
                    <tr style="background: ${index % 2 === 0 ? "#f9fafb" : "white"};">
                      <td style="border: 1px solid #e5e7eb; padding: 8px;">${row.studentId || "N/A"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px;">${row.studentName || "N/A"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px;">${row.class || "N/A"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">₹${row.feeAmount || "0"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">₹${row.amountPaid || "0"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">₹${row.amountDue || "0"}</td>
                      <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: center;">
                        <span style="padding: 2px 6px; border-radius: 3px; color: white; background: ${row.amountDue === 0 ? "#059669" : "#dc2626"};">
                          ${row.amountDue === 0 ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              ${data.data.length > 20 ? `<p style="text-align: center; color: #6b7280; margin: 10px 0;">Showing first 20 records out of ${data.data.length} total records</p>` : ""}
            </div>
            `
                : ""
            }
          </div>
        </div>
      `;

    case "fee":
    default:
      return `
        <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #059669; color: white; padding: 15px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">SCHOOL FEE DETAILS</h3>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Description</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">Period</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 12px;">${data.feeType || "Tuition Fee"}</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">${data.period || "N/A"}</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold;">₹${data.amount || "0"}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style="background: #059669; color: white;">
                  <td colspan="2" style="border: 1px solid #e5e7eb; padding: 12px; font-weight: bold;">TOTAL AMOUNT</td>
                  <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right; font-weight: bold; font-size: 16px;">₹${data.amount || "0"}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      `;
  }
};

const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `INV${year}${month}${day}${random}`;
};

const invoiceUtils = { generateInvoicePDF };

export default invoiceUtils;
