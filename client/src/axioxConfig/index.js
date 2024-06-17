import axios from "axios";

const api = axios.create({
  baseURL: "https://pcd-1-todo-backend.onrender.com/api/v1",
});

export default api;
