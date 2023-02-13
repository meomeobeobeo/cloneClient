import axios from "axios";
// root url api
const url = "http://localhost:1337";

const API = axios.create({ baseURL: url  });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).token
    }`;
  }
  return req;
});
export const fetchProjects = ()=>{
    return API.get('/projects')

}
// auth
export const signUp = (data)=>{
  return API.post('/auth/signUp',data)
}
export const signIn = (data)=>{
  return API.post('/auth/signIn',data)
}
// get project infor 
export const getListProjects = (currentUserId)=>{
  return API.get(`/projects/${currentUserId}`)
}
export const getDetailProject = (projectId)=>{
  return API.get(`/projects/detail/${projectId}`)
}
