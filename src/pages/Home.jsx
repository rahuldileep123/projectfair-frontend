import React, { useEffect, useState } from 'react'
import LandingImg from "../assets/admin.webp"
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsApi } from '../services/allAPI'

function Home() {
  const [homeProjects,sethomeprojects]=useState([])
  const navigate = useNavigate()
  const [loginStatus,setLoginStatus]=useState(false)
console.log(homeProjects);
  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  },[])

  const handleProjects=()=>{
    if(loginStatus){
      navigate("/projects")
    }else{
      toast.warning("please login to get full access")
    }
  }
//get home projects from database

const getHomeProjects=async()=>{
  try{
     const result =await getHomeProjectsApi()
     if(result.status==200){
      sethomeprojects(result.data)
     }
  }catch(err){
    console.log(err);
  }
}

  return (
    
    <>
    <div style={{width:"100%",minHeight:"100vh"}} className="d-flex justify-content-center align-items-center shadow">
    <div className="row align-items-center">
        <div className="col-lg-6 p-3">
            <h1 style={{fontSize:"60px"}}><i class="fa-brands fa-docker text-light"></i>PROJECT FAIR</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptatem quod quis. Distinctio cum ullam unde dolorum est. Est, tempore quod incidunt recusandae eum sunt exercitationem maiores totam provident quo.</p>
       { loginStatus?
       <Link to={"/dashboard"}><button className='btn btn-warning'>Manage your projects</button></Link>
       :
         <Link to={"/login"}><button className='btn btn-warning'>Start to explore</button></Link>}
        </div>
        <div className="col-lg-6">
<img className='img-fluid' src={LandingImg} alt="" />
        </div>
    </div>
    </div>

    <div className="mt-5 mb-5 d-flex flex-column align-items-center">
        <h1 className='text-center mb-4'>EXPLORE THE PROJECTS</h1>
        <marquee behavior="" direction="">
            <div className="d-flex">
                {homeProjects?.length>0 &&
                homeProjects.map(project=>(
                  <div key={project} className="me-5">
                  <ProjectCard displayData={project}/>
              </div>
                ))
                }
            </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-3'>view more projects</button>
    </div>

    <div className="mt-4">
      <h1 className='text-center'>CLIENT REVIEWS</h1>
      <div className="row d-flex justify-content-evenly">
       
        <Card className='shadow p-1 text-center' style={{ width: '18rem' }}>
      
     
      <Card.Body  className=' text-center'>
      <img width={"60px"} height={"60px"} src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710460800&semt=sph" alt="" />
        <Card.Title>James Antony</Card.Title>
        <Card.Text>
         <div className="d-flex justify-content-center align-items-center w-100">
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         </div>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
       
      </Card.Body>
    </Card>
        
   
        <Card className='shadow p-1 text-center' style={{ width: '18rem' }}>
      
     
      <Card.Body  className=' text-center'>
      <img width={"60px"} height={"60px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp=CAU" alt="" />
        <Card.Title>Max Miller</Card.Title>
        <Card.Text>
         <div className="d-flex justify-content-center align-items-center w-100">
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         </div>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
       
      </Card.Body>
    </Card>
        
  
        <Card className='shadow p-1 text-center' style={{ width: '18rem' }}>
      
     
      <Card.Body  className=' text-center'>
      <img width={"60px"} height={"60px"} src="https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_960_720.png" alt="" />
        <Card.Title>Ann Frank</Card.Title>
        <Card.Text>
         <div className="d-flex justify-content-center align-items-center w-100">
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-solid fa-star text-warning me-2"></i>
         <i class="fa-regular fa-star text-light me-2"></i>
         <i class="fa-regular fa-star text-light me-2"></i>
         </div>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
       
      </Card.Body>
    </Card>
        
      </div>

    </div>
    <Footer/>
    <ToastContainer position='top-center' theme='colored' autoClose="3000" />
    </>
  )
}

export default Home