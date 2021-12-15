import React from "react"
import styles from "./Exam.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import Apply from "./Apply/Apply"
import About from "./About/About"

const Exam = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['exam-container']}>
            <CommonHeader 
            img="assets/Banner3.jpg" />
            <Apply/>
            <About/>
        </div>
    )
}

export default Exam
