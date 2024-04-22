import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
      <div style={{height:'300px'}} className='container-fluid mt-5 w-100 shadow p-4'>
     <div className="footer-content align-items-center d-flex justify-content-between">
        <div style={{width:'400px'}} className="media">
          <h5><i class="fa-brands fa-docker text-light"></i>PROJECT FAIR</h5>
          <p>Designed and built with all the love in the world byt the Bootstrap team with the help of our contributers</p>
          <span>Code licensed MIT,docs CC BY 3.0.</span>
          <span>Currently v5.3.2</span>
        </div>
        <div className="links d-flex flex-column">
            <h5>Links</h5>
            <Link to='/' style={{textDecoration:'none', color:'white'}} >Landing Page</Link>
            <Link to='/home' style={{textDecoration:'none', color:'white'}} >Home</Link>
            <Link to='/watch' style={{textDecoration:'none', color:'white'}} >Watch</Link>
        </div>
        <div className="guides d-flex flex-column">
        <h5>Guides</h5>
            <a href='https://react.dev/' target='_blank'  style={{textDecoration:'none', color:'white'}} >React JS</a>
            <a href='https://react-bootstrap.github.io/' target='_blank' style={{textDecoration:'none', color:'white'}} >React Bootstrap</a>
            <a href='https://www.w3schools.com/react/react_router.asp' target='_blank' style={{textDecoration:'none', color:'white'}} >React Routing</a>
        </div>
        <div className="contact">
            <h5>Contact Us</h5>
            <div className="d-flex">
                <input type="text" className="form-control" />
                <button className='btn btn-info ms-1'><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div className="icons d-flex justify-content-between mt-3">
                <a style={{textDecoration:'none', color:'white'}} href="https://twitter.com/?lang=en" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
                <a style={{textDecoration:'none', color:'white'}} href="https://www.instagram.com/" target='_blank'><i className="fa-brands fa-instagram"></i></a>
                <a style={{textDecoration:'none', color:'white'}} href="https://www.facebook.com/" target='_blank'><i className="fa-brands fa-facebook"></i></a>
                <a style={{textDecoration:'none', color:'white'}} href="https://github.com/" target='_blank'><i className="fa-brands fa-github"></i></a>
                <a style={{textDecoration:'none', color:'white'}} href="" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
            </div>
           
        </div>
        
     </div>
     <p className='text-center mt-3'>copyright &copy; 2024 PROJECT FAIR, Built with React</p>
        </div>
    </>
  )
}

export default Footer