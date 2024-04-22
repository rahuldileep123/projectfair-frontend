import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import userImg from "../assets/user.jpg"
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectApi, editUserApi } from '../services/allAPI';
function Profile() {
  const [open, setOpen] = useState(false);
  const [preview,setPreview]=useState("")
  const [existingImg,setExistingImg]=useState("")
const [userdetails,setUserdetails]=useState({
  username:"",email:"",password:"",github:"",linkdin:"",profileImage:""
})
useEffect(()=>{
if(sessionStorage.getItem("existingUser")){
  const existingUserdetails =JSON.parse(sessionStorage.getItem("existingUser"))
  setUserdetails({...userdetails,
  username:existingUserdetails.username,email:existingUserdetails.email,password:existingUserdetails.password,github:existingUserdetails.github,linkdin:existingUserdetails.linkdin
  })
  setExistingImg(existingUserdetails.profile)
  console.log(existingImg);
}
},[open])
  
useEffect(()=>{
if(userdetails.profileImage){
  setPreview(URL.createObjectURL(userdetails.profileImage))
}else{
  setPreview("")
}
},[userdetails.profileImage])

const handleUserProfile=async()=>{
  const {username,email,password,github,linkdin,profileImage}=userdetails
  if(!github && !linkdin){
    toast.warning("please fill the form completely")
  }else{
    const reqBody =new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkdin",linkdin)
   preview? reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
   const token = sessionStorage.getItem('token')
   console.log(token);
    if(token){
      const reqHeader={
        "Content-Type": preview?"multipart/form-data": "application/json",
        "Authorization": `Bearer ${token}`
      }
 try{
  const result = await editUserApi(reqBody,reqHeader)
  if(result.status==200){
    setOpen(!open)
    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
  }else{
    console.log(result);
  }
 }catch(err){
  console.log(err);
 }
  }

}}
  return (
    <>
    <div className="d-flex justify-content-center">
<h3 className='text-warning'> User Profile</h3>
<button onClick={()=>setOpen(!open)} className='btn text-warning'><i class="fa-solid fa-angle-down"></i> </button>

    </div>

    <Collapse in={open}>
        <div   id="example-collapse-text">
     <div className='border shadow d-flex flex-column justify-content-around align-items-center p-2'>
          <label  >
              <input onChange={e=>setUserdetails({...userdetails,profileImage:e.target.files[0]})} type="file" style={{display:"none"}} />
            { existingImg ==""?
             <img height={"150px"} width={"150px"} style={{cursor:"pointer"}} className='img-fluid' src={preview?preview:userImg} alt="" />
            :
            <img height={"150px"} width={"150px"} style={{cursor:"pointer"}} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
            }
            </label> 
            <input value={userdetails.github} onChange={e=>setUserdetails({...userdetails,github:e.target.value})} type="text" className='form-control mt-2' placeholder='GitHub URL' />
            <input value={userdetails.linkdin} onChange={e=>setUserdetails({...userdetails,linkdin:e.target.value})} type="text" className='form-control mt-2' placeholder='Linkdin URL' />
            <div className="d-grid mt-2">
              <button onClick={handleUserProfile} className='btn btn-warning'>Update Profile</button>
            </div>
          </div>
     </div>
      </Collapse>
      <ToastContainer position='top-center' theme='colored' autoClose="3000" />
    </>
  )
}

export default Profile