// api.js
import axios from "axios";

export const submitUserData = async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/submit-user-data", data);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
