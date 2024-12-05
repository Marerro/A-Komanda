import axios from "axios";

const url = "http://localhost:5000/items"

export const updateOne = async (id, data) => {
  await axios.put(`${url}/${id}`, data);
}