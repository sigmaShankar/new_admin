import React from "react"
import styles from "./CurrentlyEmployed.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import { NavLink, useHistory } from "react-router-dom" 


const CurrentlyEmployed = (props) => {
    let history = useHistory()

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const freshGraduates = props.match.url.search("fresh")
    let modules = constants.TEACHER.SUB_TEACHER.CURRENTY_EMPLOYED.MODULES
    let content = constants.TEACHER.SUB_TEACHER.CURRENTY_EMPLOYED.PARA_1

    if(freshGraduates != -1) {
        modules = [...modules, "Qualities & Role of teacher" , "Teacher’s responsibilities", "Lesson Plan"]
        content = (<>At Campus Field, we aim to open the window of opportunities for all the 
        teaching professionals enrolling with us having 0-3 years of 
        experience by understanding their individual strength & weakness 
        in depth.<br/><br/>The training sessions are planned in such a way to enhance the hidden skills and at the same time to sharpen the dominant ones, enable self confidence which will self motivate and in turn induces 
        a high level of positivity which will enable each participant to set their own path for a fruitful career.</>)
    }

    return (
        <div className={styles['currently-employed']}>
            <Title title={freshGraduates !== -1 ? "FRESH GRADUATES" : "CURRENTLY EMPLOYED"}/>
            <div className={styles['currently-employed-container']}>
                <div className={styles["article-container"]}>
                    <strong className={styles["header"]} style={{fontSize: "1.2rem"}}>
                        Online Programmes - Face to Face Programme
                    </strong>
                    <p style={{marginTop: "10px", fontSize: "0.95rem", fontWeight: 300}}>
                        {content}
                    </p>
                    <strong className={styles["header"]}>
                        Modules ascertained by our team – If you are currently a {freshGraduates !== -1 ? "FRESH GRADUATE" : "CURRENTLY EMPLOYED"}
                    </strong>
                    <div className={styles["modules"]}>
                        <ul>
                            {
                                modules.map((module, i) => {
                                    return (
                                        <li key={i}>
                                            {module}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles["apply"]}>
                    <div>
                        <p>
                            <b>How to Apply</b>
                        </p>
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

export default CurrentlyEmployed
