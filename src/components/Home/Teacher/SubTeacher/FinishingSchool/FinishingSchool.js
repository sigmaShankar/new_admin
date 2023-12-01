import React from "react"
import styles from "./FinishingSchool.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import { NavLink, useHistory } from "react-router-dom" 


const FinishingSchool = (props) => {
    let history = useHistory()
    let freshGraduates = props.match.url.search("fresh")

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['finishing-school']}>
            <Title title={"FINISHING SCHOOL FOR TEACHERS"}/>
            <div className={styles['finishing-school-container']}>
                <div className={styles["article-container"]}>
                    {/* <p className={styles["header"]}>
                        Online Prgrammes - Face to Face Prgramme
                    </p>
                    <p>
                        {constants.TEACHER.SUB_TEACHER.FINISHING_SCHOOL.PARA_1}
                    </p> */} 
                    <strong className={styles["header"]}>
                        What is Finishing School?
                    </strong>
                    <p style={{marginTop: "10px", fontSize: "0.95rem", fontWeight: 300}}>
                        {constants.TEACHER.SUB_TEACHER.FINISHING_SCHOOL.PARA_2}
                    </p>
                    <strong className={styles["header"]}>
                        What is Finishing School?
                    </strong>
                    <p style={{marginTop: "10px", fontSize: "0.95rem", fontWeight: 300}}>
                        {constants.TEACHER.SUB_TEACHER.FINISHING_SCHOOL.PARA_3}
                    </p>
                </div>
                <div className={styles["apply"]}>
                    <div>
                        <p style={{fontSize: "1.2rem"}}>
                            <b>Courses Offered</b>
                        </p>
                        {
                            constants.TEACHER.SUB_TEACHER.FINISHING_SCHOOL.COURSES_OFFERED.map((course, i) => {
                                return (<li key={i}>
                                            {course}
                                        </li>
                                )
                            })
                        }
                        <p>
                            Register now and get a call back
                        </p>
                        <div className={styles["link"]} onClick={() => {history.push('/teacher-sign-up')}}>
                            <NavLink to="/teacher-sign-up">
                                REGISTER NOW
                            </NavLink>
                        </div>
                    </div>
                    <div style={{backgroundColor: "#A6A54F"}}>
                        <p>
                            <b>How Can I Help You</b>
                        </p>
                        <p>
                            Get in touch with us if you require any of our service
                        </p>
                        <div className={styles["link"]} onClick={() => {history.push('/contact-us')}}>
                            <NavLink to="/contact-us">
                                GET IN TOUCH
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinishingSchool
