import axios from "axios";

const AxiosHelper = axios.create({
  baseURL: "https://real-time-chat-app-t1s1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosHelper;