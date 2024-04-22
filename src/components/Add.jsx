import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from "../assets/upload.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allAPI';
import { addResponseContext } from '../context/ContextAPI';

function Add() {
  
  const {addResponse,setAddResponse}=  useContext(addResponseContext)
 
  const [previewImage,setPreviewImage]=useState("")
  const [imageFileStatus,setImageFileStatus]=useState(false)
const [projectDetails,setProjectDetails]=useState({
  title:"",language:"",overview:"",github:"",website:"",projectImage:""
})
console.log(projectDetails);
  const [show, setShow] = useState(false);

  const handleClose = () =>{
     setShow(false);
    setProjectDetails({title:"",language:"",overview:"",github:"",website:"",projectImage:""})
    }
  const handleShow = () => setShow(true);
const handleUpload=async()=>{
  const {title,language,overview,github,website,projectImage}= projectDetails

  if(title && language && overview && github && website && projectImage){
    //api call
    // as we are uploading a file server cant manage it as a normal object,
    //so we create a formdata object
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImage",projectImage)

   const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try{
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          // toast.success(`${result.data.title} added succesfully`)
          setAddResponse(result)
          handleClose()
        }else{
          toast.warning(result.response.data)
          handleClose()
        }

      }catch(err){
        console.log(err);
      }
    }
  }else{
    toast.warning("Please fill the form completely")
  }

}
  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg" ){
      setImageFileStatus(true)
      setPreviewImage(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setPreviewImage(uploadImg)
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
      
    }
  },[projectDetails.projectImage])
  return (
    <>
       <button onClick={handleShow} className='btn'><i className="fa-solid fa-plus"></i>Add New</button>

       <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className="row">
        <div className="col-lg-4 " >
          <label  >
            <input type="file" style={{display:"none"}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
            <img height={"200px"} style={{cursor:"pointer"}} className='img-fluid' src={previewImage} alt="" />
          </label> 
          {!imageFileStatus && <div className="text-warning mt-2 mb-2">*Upload only jpg,jpeg,png files!!!</div>}
        </div>
        <div className="col-lg-8">
          <input value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className='form-control mb-1' placeholder='Project Title' />
          <input value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" className='form-control mb-1' placeholder='Languages used' />
          <input value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" className='form-control mb-1' placeholder='Project GitHub link' />
          <input value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className='form-control mb-1' placeholder='Project Website link' />
          
        </div>
        <input value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className='form-control mb-1' placeholder='Project overview' />
       </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose="3000" />

    </>
  )
}

export default Add