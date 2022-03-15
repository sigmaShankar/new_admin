import React, {useState, useEffect} from "react"
import Toast from 'react-bootstrap/Toast'
import {Row, Col, Button} from 'react-bootstrap'

const Exams = (props) => {

    useEffect(() => {
    }, [])
    
  
    return (
        <div style={{height: '100vh', 
                     width: '100%', 
                     display: "flex", 
                     alignItems: "center", 
                     justifyContent: "center", 
                     flexDirection: "column"}}>
            <img
            style={{height: "200px", width: "200px"}} 
            src={require('../../assets/coming_soon.webp')}/>
        </div>   
              
    );
  }
  
export default Exams
