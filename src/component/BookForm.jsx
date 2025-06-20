import { useState } from "react";
import { addBook } from "../services/bookService";

const BookForm = ({ onBookAdded }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationYear: "",
    category: "",
    numberofbooks: "", // Add numberofbooks to the state
  });

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = await addBook(bookData);
      onBookAdded(newBook);
      window.location.reload();
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          name="title"
          placeholder="Title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded"
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={bookData.publisher}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="publicationYear"
          placeholder="Publication Year"
          value={bookData.publicationYear}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="category"
          placeholder="Book Category"
          value={bookData.category}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="number" // Set the input type to number for number of books
          name="numberofbooks"
          placeholder="Number of Books"
          value={bookData.numberofbooks}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
