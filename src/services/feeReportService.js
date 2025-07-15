import axios from "axios";

// Fee Report Service - handles all fee reporting functionality
class FeeReportService {
  // Generate student-specific fee report
  static async generateStudentReport(params) {
    try {
      // If backend endpoint exists, use it
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-reports/student`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.warn(
        "Backend endpoint not available, using mock data:",
        error.message
      );
      // Fallback to mock data if backend not available
      return this.getMockStudentReport(params);
    }
  }

  // Generate class-wise fee report
  static async generateClassReport(params) {
    try {
      // If backend endpoint exists, use it
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/fee-reports/class`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.warn(
        "Backend endpoint not available, using mock data:",
        error.message
      );
      // Fallback to mock data if backend not available
      return this.getMockClassReport(params);
    }
  }

  // Mock data for student report (when backend is not available)
  static getMockStudentReport(params) {
    const mockData = {
      details: [
        {
          studentId: params.studentId || "STU001",
          studentName: "John Doe",
          class: "10th Grade",
          feeCategory: "Tuition Fee",
          feeAmount: 5000,
          amountPaid: 3000,
          amountDue: 2000,
          paymentDate: "2024-01-15",
          month: "January",
        },
        {
          studentId: params.studentId || "STU001",
          studentName: "John Doe",
          class: "10th Grade",
          feeCategory: "Library Fee",
          feeAmount: 500,
          amountPaid: 500,
          amountDue: 0,
          paymentDate: "2024-01-10",
          month: "January",
        },
      ],
      summary: {
        totalStudents: 1,
        totalAmount: 5500,
        totalPaid: 3500,
        totalDue: 2000,
      },
    };

    // Filter by date if dateRange filter is applied
    if (params.startDate && params.endDate) {
      mockData.details = mockData.details.filter((record) => {
        const paymentDate = new Date(record.paymentDate);
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
    }

    // Filter by month if monthly filter is applied
    if (params.month && params.year) {
      mockData.details = mockData.details.filter((record) => {
        const recordDate = new Date(record.paymentDate);
        const recordMonth = recordDate.toLocaleString("default", {
          month: "long",
        });
        const recordYear = recordDate.getFullYear();
        return recordMonth === params.month && recordYear == params.year;
      });
    }

    // Filter by year if yearly filter is applied
    if (params.year && !params.month) {
      mockData.details = mockData.details.filter((record) => {
        const recordDate = new Date(record.paymentDate);
        const recordYear = recordDate.getFullYear();
        return recordYear == params.year;
      });
    }

    return mockData;
  }

  // Mock data for class report (when backend is not available)
  static getMockClassReport(params) {
    const mockStudents = [
      {
        id: "STU001",
        name: "John Doe",
        class: params.class || "10th Grade",
        section: params.section || "A",
      },
      {
        id: "STU002",
        name: "Jane Smith",
        class: params.class || "10th Grade",
        section: params.section || "A",
      },
      {
        id: "STU003",
        name: "Mike Johnson",
        class: params.class || "10th Grade",
        section: params.section || "A",
      },
      {
        id: "STU004",
        name: "Sarah Wilson",
        class: params.class || "10th Grade",
        section: params.section || "A",
      },
      {
        id: "STU005",
        name: "David Brown",
        class: params.class || "10th Grade",
        section: params.section || "A",
      },
    ];

    const mockData = {
      details: [],
      summary: {
        totalStudents: mockStudents.length,
        totalAmount: 0,
        totalPaid: 0,
        totalDue: 0,
      },
    };

    // Generate mock fee records for each student
    mockStudents.forEach((student, index) => {
      const tuitionFee = 5000 + index * 100; // Vary fees slightly
      const libraryFee = 500;
      const busFee = 1200;

      const tuitionPaid = Math.floor(tuitionFee * (0.6 + index * 0.1)); // Different payment statuses
      const libraryPaid = index % 2 === 0 ? libraryFee : 0; // Some students haven't paid library fee
      const busPaid = index < 3 ? busFee : Math.floor(busFee * 0.5); // Some partial bus fee payments

      // Tuition Fee Record
      mockData.details.push({
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        section: student.section,
        feeCategory: "Tuition Fee",
        feeAmount: tuitionFee,
        amountPaid: tuitionPaid,
        amountDue: tuitionFee - tuitionPaid,
        paymentDate: tuitionPaid > 0 ? "2024-01-15" : null,
        month: "January",
      });

      // Library Fee Record
      mockData.details.push({
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        section: student.section,
        feeCategory: "Library Fee",
        feeAmount: libraryFee,
        amountPaid: libraryPaid,
        amountDue: libraryFee - libraryPaid,
        paymentDate: libraryPaid > 0 ? "2024-01-10" : null,
        month: "January",
      });

      // Bus Fee Record
      mockData.details.push({
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        section: student.section,
        feeCategory: "Bus Fee",
        feeAmount: busFee,
        amountPaid: busPaid,
        amountDue: busFee - busPaid,
        paymentDate: busPaid > 0 ? "2024-01-12" : null,
        month: "January",
      });

      // Update summary
      mockData.summary.totalAmount += tuitionFee + libraryFee + busFee;
      mockData.summary.totalPaid += tuitionPaid + libraryPaid + busPaid;
      mockData.summary.totalDue +=
        tuitionFee -
        tuitionPaid +
        (libraryFee - libraryPaid) +
        (busFee - busPaid);
    });

    // Apply filters similar to student report
    if (params.startDate && params.endDate) {
      mockData.details = mockData.details.filter((record) => {
        if (!record.paymentDate) return false;
        const paymentDate = new Date(record.paymentDate);
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
    }

    if (params.month && params.year) {
      mockData.details = mockData.details.filter((record) => {
        if (!record.paymentDate) return false;
        const recordDate = new Date(record.paymentDate);
        const recordMonth = recordDate.toLocaleString("default", {
          month: "long",
        });
        const recordYear = recordDate.getFullYear();
        return recordMonth === params.month && recordYear == params.year;
      });
    }

    if (params.year && !params.month) {
      mockData.details = mockData.details.filter((record) => {
        if (!record.paymentDate) return false;
        const recordDate = new Date(record.paymentDate);
        const recordYear = recordDate.getFullYear();
        return recordYear == params.year;
      });
    }

    return mockData;
  }

  // Get available classes (mock data)
  static async getClasses() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/classes`
      );
      return response.data;
    } catch (error) {
      console.warn(
        "Backend endpoint not available, using mock classes:",
        error.message
      );
      return [
        { id: 1, name: "1st Grade" },
        { id: 2, name: "2nd Grade" },
        { id: 3, name: "3rd Grade" },
        { id: 4, name: "4th Grade" },
        { id: 5, name: "5th Grade" },
        { id: 6, name: "6th Grade" },
        { id: 7, name: "7th Grade" },
        { id: 8, name: "8th Grade" },
        { id: 9, name: "9th Grade" },
        { id: 10, name: "10th Grade" },
        { id: 11, name: "11th Grade" },
        { id: 12, name: "12th Grade" },
      ];
    }
  }

  // Get available sections for a class (mock data)
  static async getSections(classId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/sections/${classId}`
      );
      return response.data;
    } catch (error) {
      console.warn(
        "Backend endpoint not available, using mock sections:",
        error.message
      );
      return [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ];
    }
  }

  // Get available students (mock data)
  static async getStudents() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/students`
      );
      return response.data;
    } catch (error) {
      console.warn(
        "Backend endpoint not available, using mock students:",
        error.message
      );
      return [
        {
          id: "STU001",
          name: "John Doe",
          class: "10th Grade",
          studentId: "STU001",
        },
        {
          id: "STU002",
          name: "Jane Smith",
          class: "10th Grade",
          studentId: "STU002",
        },
        {
          id: "STU003",
          name: "Mike Johnson",
          class: "9th Grade",
          studentId: "STU003",
        },
        {
          id: "STU004",
          name: "Sarah Wilson",
          class: "9th Grade",
          studentId: "STU004",
        },
        {
          id: "STU005",
          name: "David Brown",
          class: "8th Grade",
          studentId: "STU005",
        },
        {
          id: "STU006",
          name: "Emily Davis",
          class: "8th Grade",
          studentId: "STU006",
        },
        {
          id: "STU007",
          name: "Chris Miller",
          class: "7th Grade",
          studentId: "STU007",
        },
        {
          id: "STU008",
          name: "Lisa Anderson",
          class: "7th Grade",
          studentId: "STU008",
        },
      ];
    }
  }
}

export default FeeReportService;
