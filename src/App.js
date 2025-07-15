import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StudentTable from "./component/StudentTable";
import StudentDetails from "./component/StudentDetails";
import IdCard from "./Certificate/IdCard";
import TransferForm from "./Certificate/TransferForm";
import Bonafide from "./Certificate/Bonfite";
import Leaving from "./Certificate/Leaving";
import PaymentDetails from "./component/PaymentDetails";
import StudentProfile from "./component/StudentProfile";
import StudentForm from "./component/StudentForm";
import Login from "./component/Login";
import File from "./Certificate/Upload";
import FeeCategoryComponent from "./Certificate/Category";
import FeeSubCategoryComponent from "./Certificate/SubCategory";
import FeeDetails from "./Certificate/FeeDetails";
import BookForm from "./component/BookForm";
import IssueBookForm from "./component/IssueBookForm";
import BookList from "./component/BookList";
import StudentBookList from "./component/StudentBookList";
import Pass from "./component/Pass";
import ExpenditureManagement from "./component/ExpenditureManagement";
import Dashboard from "./dashboard/dashboard";
import Attendance from "./dashboard/Attendance";
import StudentAttendance from "./dashboard/StudentAttendance";
import TEacher from "./dashboard/TEacher";
import TeacherProf from "./dashboard/TeacherProf";
import StaffHome from "./dashboard/StaffHome";
import TAx from "./Pages/TAx";
import History from "./Pages/History";
import TeacherAdd from "./Pages/TeacherAdd";
import StudentF from "../src/component/StudentF";
import BookPage from "../src/Pages/BookPage";
import Header from "./dashboard/Header";
import TeacherFrom from "../src/component/TeacherForm";
import Att from "./dashboard/Att";
import AttList from "./dashboard/AttList";
import Approval from "../src/component/Approval";
import CertificateRequests from "./component/Cerificaterequest";
import ReportRevenue from "../src/component/ReportRevenue";
import SchoolSelection from "./component/SchoolSelection";
import FileUpload from "../src/Certificate/FileUpload";
import StudentEditDetails from "../src/component/StudentEditDetails";
import StudentFilter from "../src/component/FilterStudent";
import BusFee from "../src/component/BusFee";
import AddBusFee from "../src/component/Addbusfee";
import SubmitBusFee from "../src/component/BusFeeSubmit";
import BusFeeDetails from "../src/component/ShowBusFee";
import FeeReports from "../src/component/FeeReports";

const CategoryForFee = () => (
  <div className="flex-col gap-14">
    <Header />
    <FeeCategoryComponent />
    <FeeSubCategoryComponent />
  </div>
);

const Book = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="container mx-auto">
        <button
          onClick={() => navigate("/bookpage")}
          className="text-blue-500 mb-4 flex hover:text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M12 5l-7 7 7 7"
            />
          </svg>
          Go Back
        </button>

        <BookForm onBookAdded={() => {}} />
        <BookList />
      </div>
    </>
  );
};

const Issue = () => (
  <>
    <Header />
    <div className="container mx-auto">
      <IssueBookForm onBookIssued={() => {}} />
      <StudentBookList />
    </div>
  </>
);

const Rand = () => (
  <>
    <div className="App">
      <Att />
      <AttList />
    </div>
  </>
);

// Utility function to check access rights
const hasAccess = (restrictedTypes) => {
  const userType = localStorage.getItem("User Type");
  return userType === "Super Admin" || !restrictedTypes.includes(userType);
};

// Component wrapper to protect routes based on access
const ProtectedRoute = ({ restrictedTypes, children }) => {
  return hasAccess(restrictedTypes) ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staffHome" element={<StaffHome />} />
        <Route path="/studentTable" element={<StudentTable />} />

        {/* Attendance Routes - restricted for Admin 1 */}
        <Route
          element={
            <ProtectedRoute restrictedTypes={["Admin 1"]}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/studentAttendance" element={<StudentAttendance />} />
        </Route>

        <Route path="/teacher" element={<TEacher />} />
        <Route path="/teacherProf" element={<TeacherProf />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/student-details/:id" element={<StudentProfile />} />
        <Route path="/pass" element={<Pass />} />
        <Route path="/revenue" element={<ReportRevenue />} />
        <Route path="bus-fee" element={<BusFee />} />
        <Route path="/add-bus-fee" element={<AddBusFee />} />
        <Route path="/submit-bus-fee" element={<SubmitBusFee />} />
        <Route path="/bus-fee-details" element={<BusFeeDetails />} />
        {/* Payment and Expense Routes - restricted for Admin 2 */}
        <Route
          element={
            <ProtectedRoute restrictedTypes={["Admin 2"]}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/fee-details/:id" element={<FeeDetails />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/expense" element={<ExpenditureManagement />} />
          <Route path="/fee-reports" element={<FeeReports />} />
        </Route>

        <Route path="/id-card/:id" element={<IdCard />} />
        <Route path="/transfer-certificate/:id" element={<TransferForm />} />
        <Route path="/bonafide-certificate/:id" element={<Bonafide />} />
        <Route path="/nirgam-certificate/:id" element={<Leaving />} />
        <Route path="/test" element={<File />} />
        <Route path="/category-for-fee" element={<CategoryForFee />} />

        <Route path="/his" element={<History />} />
        <Route path="/bookpage" element={<BookPage />} />
        <Route path="/bookdetails" element={<Book />} />
        <Route path="/issue-book" element={<Issue />} />
        <Route path="/tax" element={<TAx />} />
        <Route path="/studentF" element={<StudentF />} />
        <Route path="/yash" element={<Header />} />
        <Route path="/teacherr" element={<TeacherFrom />} />
        <Route path="/user-profile" element={<StudentTable />} />
        <Route path="/att" element={<Rand />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/request" element={<CertificateRequests />} />
        <Route path="/school" element={<SchoolSelection />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/studenteditable/:id" element={<StudentEditDetails />} />
        <Route path="/filter" element={<StudentFilter />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
