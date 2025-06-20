import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/api/studentbook`;

export const getStudentBooks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const issueBook = async (studentBookData) => {
  console.log(studentBookData);
  const response = await axios.post(`${BASE_URL}/issue`, studentBookData);
  return response.data;
};

export const returnBook = async (id, returnData) => {
  console.log(id, returnData);

  const response = await axios.post(`${BASE_URL}/return`, returnData);
  return response.data;
};
