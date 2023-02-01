import axios from "axios"
const API =axios.create({baseURL: process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL})
export const getMessages=(id)=>API.get(`/message/${id}`)
export const addMessage=(data)=>API.post('/message/',data)