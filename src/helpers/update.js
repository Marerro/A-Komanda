import axios from "axios";

const url = "http://localhost:5000/data"

export const updateOne = async (id, data) => {
  await axios.put(`${url}/${id}`, data);
}