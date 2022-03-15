import React, {useState} from "react"
import styles from "./HomeContent.module.css"
import * as constants from "../constants/constants"
import { NavLink } from "react-router-dom"
import Banner from "./Banner/Banner"
import About from "./About/About"
import FieldOffer from "./FieldOffer/FieldOffer"
import Advantage from "./Advantage/Advantage"

const HomeContent = (props) => {

    const [isPopup, setIsPopup] = useState(false)

    React.useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsPopup(true)
        }, 750)

    }, [])

    return (
        <>
            <Banner/>
            {/* {
                isPopup ? 
                <div
                className={styles['backdrop']}>
                    <div className={styles['popup']}>
                        <i
                        onClick={() => {setIsPopup(false)}}
                        style={{cursor: "pointer",position: "absolute", top: "-5%", right: "-4%", color: "lightgray", fontSize: "20px"}} 
                        className="fa fa-close"/>
                        <div style={{height: "90%", width: "100%"}}>
                            <img
                            style={{height: "100%", width: "100%"}} 
                            src={require('../../../assets/popup-banner.jpg')}/>
                        </div>
                        <div
                        style={{width: "100%", justifyContent: "center", display: "flex"}}
                        >
                        <a
                        style={{textAlign: "center", marginTop: "1rem"}} 
                        href="https://us02web.zoom.us/j/89252930713?pwd=L3JTZmVOMTFCcjk3SUMrd0F4U2ZXZz09">
                            Click here to join the webinar
                        </a>
                        </div>
                    </div>
                </div> : null
            } */}
            {/* <div
            className={styles['image']} 
            >   
                <a
                style={{height: "100%", width: "100%"}}  
                href="https://us02web.zoom.us/j/89252930713?pwd=L3JTZmVOMTFCcjk3SUMrd0F4U2ZXZz09">
                <img
                style={{height: "100%", width: "100%"}} 
                src={require('../../../assets/campusfield.jpg')}/>
                </a>
            </div> */}
            {/* <div
                        style={{width: "100%", justifyContent: "center", backgroundColor: "lightgray",display: "flex"}}
                        >
                        <a
                        style={{textAlign: "center", marginTop: "1rem"}} 
                        href="https://us02web.zoom.us/j/89252930713?pwd=L3JTZmVOMTFCcjk3SUMrd0F4U2ZXZz09">
                            Click here to join the webinar
                        </a>
                        </div> */}
            <About/>
            <FieldOffer/>
            <Advantage/>
        </>
    )
    
}

export default HomeContent
