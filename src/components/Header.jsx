import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../context/TokenAuth';

function Header({insideDashboard}) {
  const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate =useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate("/")
  }
  return (
    <>
        <Navbar style={{zIndex:"1"}} className="card border shadow top-0 position-fixed w-100">
        <Container>
          <Navbar.Brand >
          <Link to={"/"} style={{textDecoration:"none"}}><i class="fa-brands fa-docker text-light"></i>PROJECT FAIR</Link>
          </Navbar.Brand>
       { insideDashboard &&  <div className="ms-auto">
            <button onClick={logout} className='btn btn-link'>Log Out</button>
          </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header