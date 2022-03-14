import React, { useState } from "react"
import styles from "./HomeHeader.module.css"
import NavBar from "./NavBar/NavBar"
import {useHistory} from "react-router"
import Mobilenv from "./Mobilenav/Mobilenav"

const HomeHeader  = (props) => {
    let history = useHistory()
    const [isMobileNav, setIsMobileNav] = useState(false)
    
    const toggleNav = () => {
        setIsMobileNav(true)
    }   

    return (
        <div className={styles["header-container"]}>
            <div className={styles["toggle-container"]} onClick={() => {toggleNav()}}>
                <div style={{height: "60px", width: "60px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <span className={styles["toggle-blocks"]}/>
                    <span className={styles["toggle-blocks"]}/>
                    <span className={styles["toggle-blocks"]}/>
                </div>
            </div>
            <div className={styles["logo-container"]} style={{cursor: "pointer"}} onClick={() => {history.push("/homepage")}}>
                <img src={require("../../../assets/cf-logo.png")}/>
            </div>
            <div className={styles["navbar-container"]}>
                <NavBar/>
            </div>{
            isMobileNav ? <div onClick={() => {setIsMobileNav(false)}} className={styles["backdrop"]}/> : null  
            }
            <Mobilenv
            setIsMobileNav={setIsMobileNav} 
            isMobileNav={isMobileNav}/>
        </div>
    )
}

export default HomeHeader
