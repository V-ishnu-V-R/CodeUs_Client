import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL });
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
