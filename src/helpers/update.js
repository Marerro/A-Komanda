import axios from "axios";

const url = "http://localhost:5000/data"

export const updateOne = async (id, data) => {
  await axios.put(`${url}/${id}`, data);
};


export const patchData = async (id, data) => {
  const response = await axios.patch(`${url}/${id}`, data);
  return response.data;
};