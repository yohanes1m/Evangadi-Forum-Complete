import axios from "axios";
const axiosBase = axios.create({
  baseURL: "https://evangadi-forum-group4-team2-1.onrender.com/api/",
});
export default axiosBase; 