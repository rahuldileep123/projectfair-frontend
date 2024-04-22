import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { SERVER_URL } from '../services/serverUrl';

function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card onClick={handleShow} className='shadow  btn' style={{ width: '25rem' }}>
      <Card.Img height={"200px"} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`}  />
      <Card.Body className="text-center">
        <Card.Title>{displayData?.title}</Card.Title>
        <Card.Text>
        
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
          <div className="col-lg-6">
             <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt="" />
          </div>
          <div className="col-lg-6">
            <h3>project title</h3>
            <h6><span className='fw-bolder'>Languages used:</span>{displayData?.language}</h6>
            <p style={{textAlign:"justify"}}> <span className='fw-bold'>Description:</span>{displayData?.overview}</p>
          </div>
         </div>
         <div className='float-start mt-2'>
            <a href={displayData?.github} target='_blank' className="btn btn-secondary me-2">
            <i class="fa-brands fa-github"></i>
            </a>
            <a href={displayData?.website} target='_blank' className="btn btn-secondary"><i class="fa-solid fa-link"></i></a>
        </div>
        </Modal.Body>
        
   
        
      </Modal>
    </>
  )
}

export default ProjectCard