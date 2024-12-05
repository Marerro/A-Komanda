import axios from "axios";

const url = "http://localhost:5000/items"

export const deleteOne = async (id) => {
  await axios.delete(`${url}/${id}`);
}