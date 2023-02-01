import axios from "axios"
const API =axios.create({baseURL: process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL})
export const getTimelinePosts=(id)=>API.get(`/post/${id}/timeline`)
export const likePost=(id, userId)=>API.put(`/post/${id}/like`,{userId:userId})