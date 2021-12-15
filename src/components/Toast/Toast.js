import React, {useState, useEffect} from "react"
import Toast from 'react-bootstrap/Toast'
import {Row, Col, Button} from 'react-bootstrap'

const Alert = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(true)
          setTimeout(() => {
              setShow(false)
          }, 3000)

    }, [])
    
  
    return (
          <Toast
          style={{position: "fixed"}} 
          onClose={() => setShow(false)}
          show={show} 
          // delay={3000} 
          // autohide
          style={{minHeight: "40px", height: "auto", width: "200px", display: show ? "flex" : "none", alignItems: "center", justifyContent: "center", backgroundColor: props.color  ? props.color: "green",  position: "fixed", top: 60, zIndex: 10000, right: 5, color: "white"}}>
            {/* <Toast.Header style={{height: "25px", display: "flex", justifyContent: "flex-end", backgroundColor: "green"}}>
            </Toast.Header> */}
            <Toast.Body style={{color: "white", textAlign: "center"}}>{props.message}</Toast.Body>
          </Toast>
    );
  }
  
export default Alert
