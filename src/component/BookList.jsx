import { useEffect, useState } from "react";
import { getBooks, deleteBook, updateBook } from "../services/bookService"; // Assuming updateBook is your service

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null); // Holds the book being edited
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationYear: "",
    category: "",
    status: "",
    numberofbooks: "", // Add numberofbooks to the edit form state
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book.id); // Set the book being edited
    setEditForm({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publicationYear: book.publicationYear,
      category: book.category,
      status: book.status,
      numberofbooks: book.numberofbooks, // Set the number of books
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(editingBook, editForm); // Assuming updateBook is a service that handles the API request
      setEditingBook(null); // Reset after editing
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">Books List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Publisher</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Number of Books</th> {/* New column */}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-t">
              {editingBook === book.id ? (
                // Show the edit form if the book is being edited
                <td colSpan={8}>
                  {" "}
                  {/* Updated to colSpan 8 to include new column */}
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      placeholder="Title"
                      className="border px-2 py-1"
                    />
                    <input
                      type="text"
                      name="author"
                      value={editForm.author}
                      onChange={handleEditChange}
                      placeholder="Author"
                      className="border px-2 py-1"
                    />
                    <input
                      type="text"
                      name="publisher"
                      value={editForm.publisher}
                      onChange={handleEditChange}
                      placeholder="Publisher"
                      className="border px-2 py-1"
                    />
                    <input
                      type="number"
                      name="publicationYear"
                      value={editForm.publicationYear}
                      onChange={handleEditChange}
                      placeholder="Year"
                      className="border px-2 py-1"
                    />
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      placeholder="Category"
                      className="border px-2 py-1"
                    />
                    <input
                      type="text"
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      placeholder="Status"
                      className="border px-2 py-1"
                    />
                    <input
                      type="number"
                      name="numberofbooks"
                      value={editForm.numberofbooks} // Include number of books
                      onChange={handleEditChange}
                      placeholder="Number of Books"
                      className="border px-2 py-1"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 ml-2"
                      onClick={() => setEditingBook(null)} // Cancel edit
                    >
                      Cancel
                    </button>
                  </form>
                </td>
              ) : (
                <>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.publisher}</td>
                  <td className="px-4 py-2">{book.publicationYear}</td>
                  <td className="px-4 py-2">{book.category}</td>
                  <td className="px-4 py-2">{book.status}</td>
                  <td className="px-4 py-2">{book.numberofbooks}</td>{" "}
                  {/* Display number of books */}
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
