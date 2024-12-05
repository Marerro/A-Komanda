import axios from "axios";

const url = "http://localhost:5000/data";

export const post = async (data) => {
  const response = await axios.post(url, data);

  return response.data;
}