import { useEffect, useState } from "react";
import { getStudentBooks, returnBook } from "../services/studentBookService";

const StudentBookList = () => {
  const [studentBooks, setStudentBooks] = useState([]);

  useEffect(() => {
    fetchStudentBooks();
  }, []);

  const fetchStudentBooks = async () => {
    try {
      const data = await getStudentBooks();
      setStudentBooks(data);
    } catch (error) {
      console.error("Error fetching student books:", error.message);
    }
  };

  const handleReturn = async (id) => {
    try {
      const returnData = {
        id, // Book ID or student-book ID, whichever is relevant
        returnedAt: new Date().toISOString(), // Set returned date as current date
      };
      await returnBook(id, returnData);
      window.location.reload(); // Refresh to reflect changes

      fetchStudentBooks();
    } catch (error) {
      console.error("Error returning book:", error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-6 max-w-7xl mx-auto mt-10 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        Student Issued Books
      </h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase">
              Student Name
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase">
              Book Title
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase">
              Issued At
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold text-sm uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {studentBooks.map((studentBook) => (
            <tr
              key={studentBook.id}
              className="border-t hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <td className="px-6 py-4 text-gray-800">
                {studentBook.student_name}
              </td>
              <td className="px-6 py-4 text-gray-800">
                {studentBook.book_name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {new Date(studentBook.issuedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {studentBook.status === "OUT" ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out"
                    onClick={() => handleReturn(studentBook.id)}
                  >
                    Return Book
                  </button>
                ) : (
                  <span className="text-gray-500 italic">Returned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentBookList;
