import { useState, useEffect } from "react";
import { issueBook } from "../services/studentBookService";
import { getBook } from "../services/bookService"; // Import your book service
import axios from "axios"; // Assuming you're using axios for the fetch

const IssueBookForm = ({ onBookIssued }) => {
  const [formData, setFormData] = useState({
    student_id: "",
    book_id: "",
    issuedAt: "",
  });

  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://erp.api.mindgrowthacademy.com/allstudents"
        );
        console.log(response.data.student);
        setStudents(response.data.student); // Assuming your API returns a list of students
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };

    // Fetch books
    const fetchBooks = async () => {
      try {
        const data = await getBook();
        console.log(data); // Use the getBooks service
        setBooks(data); // Assuming getBooks returns an array of books
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchStudents();
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const issuedBook = await issueBook(formData);
      window.location.reload();
      onBookIssued(issuedBook);
    } catch (error) {
      console.error("Error issuing book:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Issue a Book</h2>

      <select
        className="border p-2 rounded w-full mb-2"
        name="student_id"
        value={formData.student_id}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Choose a student
        </option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.firstName}
          </option>
        ))}
      </select>
      {/* Book selection dropdown */}
      <select
        className="border p-2 rounded w-full mb-2"
        name="book_id"
        value={formData.book_id}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Choose a book
        </option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
      {/* Date input */}
      <input
        className="border p-2 rounded w-full mb-2"
        type="date"
        name="issuedAt"
        value={formData.issuedAt}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Issue Book
      </button>
    </form>
  );
};

export default IssueBookForm;
