import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";


//REGISTER API - called by component Auth
export const registerApi=async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

///login api
export const loginApi=async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//addproject
export const addProjectApi=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//get all projects
export const getAllProjectsApi=async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,"",reqHeader)
}

//user project
export const getUserProjectsApi=async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-project`,"",reqHeader)
}

//home project
export const getHomeProjectsApi=async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,"")
}

//editproject
export const editProjectApi=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-project/${projectId}`,reqBody,reqHeader)
}

//remove project

export const removeProjectApi=async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}

//update user
export const editUserApi=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}