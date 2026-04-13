import axios from "axios";

export default axios.create({
  baseURL: "http://YOUR_PC_IP:5000/api",
});
