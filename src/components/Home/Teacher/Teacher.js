import React, {useEffect} from "react"
import styles from "./Teacher.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import About from "./About/About"
import Apply from "./Apply/Apply"

const Teacher = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles['teacher-container']}>
            <CommonHeader 
             img="assets/Banner4.jpg"/>
            <About/>
            <Apply/>
        </div>
    )
}

export default Teacher
