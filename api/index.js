import axios from "axios";
// root url api
const url = "http://localhost:1337";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchProjects = ()=>{
    return API.get('/projects')

}
