import React from "react"
import styles from "./School.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import About from "./About/About"
import Apply from "./Apply/Apply"

const School = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['school-container']}>
            <CommonHeader 
            img="assets/Banner5.jpg" />
            <About/>
            <Apply/>
        </div>
    )
}

export default School
