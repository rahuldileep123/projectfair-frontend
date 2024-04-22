import React, { useContext, useEffect, useState } from 'react'
import Edit from './Edit'
import Add from './Add'
import { getUserProjectsApi, removeProjectApi } from '../services/allAPI'
import { addResponseContext, editResponsecontext } from '../context/ContextAPI'



function View() {
  const {editResponse,setEditResponse}=useContext(editResponsecontext)
  const {addResponse,setAddResponse}=  useContext(addResponseContext)


  const [userProjects,setuserProjects]=useState([])
console.log(userProjects);
  const getUserProjects=async()=>{
    const token =sessionStorage.getItem('token')
    const reqHeader={ 
      "Authorization": `Bearer ${token}`
  }
  try{
    const result=await getUserProjectsApi(reqHeader)
    console.log(result);
    if(result.status==200){
      setuserProjects(result.data)
    }
  }catch(err){
    console.log(err);
  }
  }
  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

const handleDelete=async(projectId)=>{
  const token =sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  }
  //api call
  const result = await removeProjectApi(projectId,reqHeader)
  if(result.status==200){
    getUserProjects()
  }else{
    console.log(result);
  }
}}
  return (
    <>
      <div className="d-flex justify-content-between w-100">
        <h2 className='text-warning'>All Projects</h2>
         <Add/>
      </div>

 
       
       {userProjects?.length>0 ?
       userProjects.map(project=>(
        <div key={project} className="d-flex justify-content-between align-items-center border rounded  p-1">
        <h3>{project?.title}</h3>
          <div className="d-flex ">
            <button className="btn"><Edit project={project}/></button>
            <button className="btn"><a href={project.github} target='_blank'><i className="fa-brands fa-github"></i></a></button>
            <button onClick={()=>handleDelete(project?._id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
          </div>
          </div>
       ))
     
          :
          <div className="text-center text-danger fw-bolder">No projects uploaded</div>
          }

       
      

    </>
  )
}

export default View