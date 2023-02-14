// Axios
import axios from "axios";
// Config
import { server } from "../config";

const axiosInstance = axios.create({
  baseURL: `${server}`,
});

export default axiosInstance;
