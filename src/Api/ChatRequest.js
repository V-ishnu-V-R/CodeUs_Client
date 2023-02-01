import axios from 'axios'
const API =axios.create({baseURL: process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL})
export const userChats=(id)=>API.get(`/chat/${id}`)
