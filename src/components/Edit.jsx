import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from "../assets/upload.jpg"
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectApi } from '../services/allAPI';
import { editResponsecontext } from '../context/ContextAPI';
function Edit({project}) {
  const {editResponse,setEditResponse}=useContext(editResponsecontext)
  console.log(project);
const [projectData,setProjectData]= useState({
  id:project?._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""
})

const[preview,setPreview]=useState("")
useEffect(()=>{
  if(projectData.projectImage){
    setPreview(URL.createObjectURL(projectData.projectImage))
  }else{
    setPreview("")
  }
},[projectData.projectImage])
  const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false);
    setProjectData({id:project?._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""})
    setPreview("")
  }
  const handleShow = () =>{
     setShow(true);
     setProjectData({id:project?._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""})
    }

  //upload project
  const handleUpdateProject=async()=>{
    const {title,language,overview,github,website,projectImage}=projectData
    if(!title || !language || !overview || !github || !website){
       toast.warning("please fill the form completely")
    }else{
      //proceeed api call
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview? reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    const token = sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type": preview?"multipart/form-data": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try{
        const result =await editProjectApi(projectData.id,reqBody,reqHeader)
      if(result.status==200){
        handleClose()
        //pass response to view
        setEditResponse(result)
      }else{
        console.log(result.response);
      }
      
      }catch(err){
        console.log(err);
      }
    }
    }
  }
  return (
    <>
       <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>

       <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className="row">
        <div className="col-lg-4 " >
          <label  >
            <input onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} type="file" style={{display:"none"}} />
            <img height={"200px"} style={{cursor:"pointer"}} className='img-fluid' src={preview? preview : `${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
          </label> 
        </div>
        <div className="col-lg-8">
          <input value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} type="text" className='form-control mb-1' placeholder='Project Title' />
          <input value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})} type="text" className='form-control mb-1' placeholder='Languages used' />
          <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} type="text" className='form-control mb-1' placeholder='Project GitHub link' />
          <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} type="text" className='form-control mb-1' placeholder='Project Website link' />
          
        </div>
        <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} type="text" className='form-control mb-1' placeholder='Project overview' />
       </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose="3000" />

    </>
  )
}

export default Edit