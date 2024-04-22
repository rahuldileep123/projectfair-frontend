import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { getAllProjectsApi } from '../services/allAPI'

function Projects() {
  const [searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])
console.log(allProjects);
  const getAllProjects=async()=>{
    const token=sessionStorage.getItem('token')
    const reqHeader={ 
        "Authorization": `Bearer ${token}`
    }
    try{
     const result= await getAllProjectsApi(searchKey,reqHeader)
     console.log(result);
     if(result.status==200){
        setAllProjects(result.data)
     }
    }catch(err){
      console.log(err);

    }
  }
useEffect(()=>{
  getAllProjects()
},[searchKey])

  return (
    <>
    <Header/>
    <div style={{marginTop:"150px"}} className="container-fluid">
      <div className="d-flex justify-content-between">
        <h1>All Projects</h1>
        <input onChange={(e)=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search products by Language'/>
      </div>
      <div className="row mt-3">
        { allProjects?.length>0 ?
        allProjects.map(project=>(
          <div className="col-lg-4 mt-3">
          <ProjectCard displayData={project}/>
        </div>
        ))
        
        :
        <div className="text-center fw-bolder text-danger">
          Project not found
        </div>
        }
        
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Projects