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


// project api 
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
  return API.patch(`/projects/update/?id=${projectId}`,formData)
  
}
export const createNewProject = ({formData})=>{
  return API.post(`/projects`,formData)
}
export const deleteProject = ({projectId})=>{
  return API.delete(`/blue/projects/${projectId}`)
}
export const filterProject = ({searchText})=>{
  
  return API.get(`/blue/projects?where={"name":{"contains":"${searchText}"}}`)
}
export const changePassword = ({email : email , password : password , newPassword : newPassword})=>{
  return API.patch(`/users/changeInfo`,{email : email , password : password , newPassword : newPassword})
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
export const updateIssue = ({id , formData})=>{
  
  return API.patch(`blue/issues/${id}`,formData)
  
}
export const deleteIssues = ({issueId , project_id})=>{
  return API.delete(`/issues?issue_id=${issueId}&project_id=${project_id}`)
}









// search issues from summarry , description
export const searchIssuesFromSummaryOrDescription = (searchText , projectId) =>{
  return API.get(`/blue/issues?where={"and":[{"or":[{"title":{"contains":"${searchText}"}},{"description":{"contains":"${searchText}"}}]},{"project_id":"${projectId}"}]}`)
}
export const filterIssuesFromKaban = ({searchText , userIds , limit , isCurrent , projectId})=>{ /// isCurrent is 'true' or ...
  return API.get(`/issues/filter?searchText=${searchText}&userIds=${userIds}&limit=${limit}&isCurrent=${isCurrent}&projectId=${projectId}`)
}





// users
export const getUserInforFromListUserId = (listUserId)=>{
  return API.get(`/blue/users?where={"id":{"in":${JSON.stringify(listUserId)}}}`)
}

//comments 
export const createComment = ({formData})=>{
  return API.post(`/blue/comments`,formData)

} 
export const getComment = ({limit = '5',issueId})=>{

  return API.get(`/blue/comments?sort=createdAt DESC&limit=${limit}&issueId=${issueId}`)

}
export const deleteComment =({id})=>{
  return API.delete(`/blue/comments?id=${id}`)

}


// reports
export const filterReport = ({searchText})=>{
  return API.get(`/blue/reports?where={"or":[{"title":{"contains":"${searchText}"}},{"content":{"contains":"${searchText}"}}]}`)
}
export const createReport = ({formData})=>{
  return API.post(`/blue/reports`,formData)
}
export const updateReport = ({id , formData})=>{
  return API.patch(`/blue/reports/${id}`,formData)
}
export const deleteReport = ({id})=>{
  return API.delete(`blue/reports/${id}`)

}




// dynamic api to CRUD database 

export const filterData = ({searchText , databaseName})=>{
  return API.get(`/blue/${databaseName}?where={"or":[{"title":{"contains":"${searchText}"}},{"content":{"contains":"${searchText}"}}]}`)
}
export const createData = ({formData , databaseName})=>{
  return API.post(`/blue/${databaseName}`,formData)
}
export const updateData = ({id , formData , databaseName})=>{
  return API.patch(`/blue/${databaseName}/${id}`,formData)
}
export const deleteData = ({id , databaseName})=>{
  return API.delete(`blue/${databaseName}/${id}`)

}
