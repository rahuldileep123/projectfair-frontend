import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from "../assets/login.avif"
import { FloatingLabel, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../services/allAPI';
import { tokenAuthContext } from '../context/TokenAuth';

function Auth({ insideRegister }) {
 const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)

  const navigate=useNavigate()
  const [userInput, setUserInput] = useState({
    username: "", email: "", password: ""
  })
  console.log(userInput);

  const handleRegister =async (e) => {
    e.preventDefault()
    if (userInput.username && userInput.email && userInput.password) {
       
       try{
        const result=await registerApi(userInput)
        console.log(result);
        if(result.status==200){
          toast.success(`Welcome ${result.data.username}`)
          setUserInput({username:"",email:"",password:""})
          console.log(userInput);
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }else{
          toast.error(result.response.data)
          setUserInput({username:"",email:"",password:""})
        }
       }catch(err){
             console.log(err);
       }
    } else {
      toast.info("Please fill the form completly")
    }
  }

  //login
  const handleLogin =async(e)=>{
    e.preventDefault()
    if(userInput.email && userInput.password) {
       try{
        const result= await loginApi(userInput)
        if(result.status==200){
          //store existingUser and token
sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
sessionStorage.setItem("token",result.data.token)
           setIsAuthorised(true)
          toast.success(`Welcome ${result.data.existingUser.username}`)
          setUserInput({username:"",email:"",password:""})
          console.log(userInput);
          setTimeout(()=>{
            navigate('/')
          },2000)
        }else{
          toast.error(result.response.data)
          
        }

       }catch(err){
        console.log(err);
  }

    }else{
      toast.warning("Please fill the form completely")
    }
  }
  return (
    <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <Link to={'/'} style={{ textDecoration: "none" }} className='fw-bolder' > <i className="fa-solid fa-arrow-left"></i> Back To Home</Link>
        <div className="card shadow p-5">
          <div className='row'>
            <div className="col-lg-6">
              <img className='w-100' src={loginImg} alt="" />
            </div>
            <div className="col-lg-6">
              <h2 className='fw-bolder mt-2'>
                <i class="fa-brands fa-docker text-light"></i>PROJECT FAIR
              </h2>
              <h5>
                Sign {insideRegister ? "up" : "in"} to your account
              </h5>
              <Form>
                {insideRegister &&
                  <FloatingLabel
                    controlId="floatingInputname"
                    label="username"
                    className="mb-3"
                  >
                    <Form.Control type="text" value={userInput.username} onChange={(e) => setUserInput({ ...userInput, username: e.target.value })} placeholder="username" />
                  </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInputmail"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control value={userInput.email} onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel  controlId="floatingPassword" label="Password">
                  <Form.Control value={userInput.password}  onChange={(e) => setUserInput({ ...userInput, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>
                {insideRegister ?
                  <div>
                    <button onClick={(e) => handleRegister(e)} className='btn btn-primary mt-3 mb-1'>Register</button>
                    <p>Already have an account?click here to <Link to={"/login"}>login</Link></p>
                  </div>
                  :
                  <div>
                    <button onClick={(e)=>handleLogin(e)} className='btn btn-primary mt-3 mb-1'>Login</button>
                    <p>New User?click here to <Link to={"/register"}>Register</Link></p>
                  </div>

                }
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose="3000" />
    </div >
  )
}

export default Auth