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
export const getListUserFind = (searchText)=>{
  return API.get(`/users/filter/${searchText}`)
}
export const addUserToProject = (data)=>{
  return API.patch(`/projects/addUser`,data)
}
export const updateProjectData = ({projectId , formData})=>{
  return API.patch(`http://localhost:1337/projects/update/?id=${projectId}`,formData)
  
}




// GET data from issues table
export const getIssues = (query)=>{
  return API.get(`/blue/issues/query`)
}
export const getDetailIssue = (issueId)=>{
  return API.get(`/blue/issues/${issueId}`)
}
export const createNewIssue = ({projectId , formData})=>{
  return API.post(`/issues/create/${projectId}`,formData)
}

// search issues from summarry , description
export const searchIssuesFromSummaryOrDescription = (searchText , projectId) =>{
  return API.get(`/blue/issues?where={"and":[{"or":[{"title":{"contains":"${searchText}"}},{"description":{"contains":"${searchText}"}}]},{"project_id":"${projectId}"}]}&select=title,id,type`)
}





// users
export const getUserInforFromListUserId = (listUserId)=>{
  return API.get(`/blue/users/?where={"id": {"$in": ${JSON.stringify(listUserId)}}}&select=id,name,avatarUrl`)
}


