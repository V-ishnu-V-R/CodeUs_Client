import axios from "axios"
const API =axios.create({baseURL:process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL})
export const uploadImage=(data)=>API.post("/upload/",data)
export const uploadPost=(data)=>API.post("/post",data)