import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    ).token}`;
  }
  return req;
});
export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUsers = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
export const createChat=((data)=>API.post('/chat/',data));
export const searchUser=(query)=>API.get(`/user/search/${query}`)
