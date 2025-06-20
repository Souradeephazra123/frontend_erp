import axios from "axios";

const BASE_URL = "https://erp.api.mindgrowthacademy.com/api/book";

export const getBooks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getBook = async () => {
  const response = await axios.get(`${BASE_URL}/book`);
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await axios.post(BASE_URL, bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  await axios.put(`${BASE_URL}/${id}`, bookData);
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
