import axios from "axios";

const url = "http://localhost:5000/data"

export const deleteOne = async (id) => {
  await axios.delete(`${url}/${id}`);
}