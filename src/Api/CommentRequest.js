import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });
  
export const createComment = (postId, comment) => {
  return API.post(`/comment/${postId}`, { comment });
};
export const getComment = (postId) => API.get(`/comment/${postId}`);
