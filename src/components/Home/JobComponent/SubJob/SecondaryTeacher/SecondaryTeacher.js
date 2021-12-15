import React from "react"
import styles from "./SecondaryTeacher.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../Buttons/Buttons"

const SecondaryTeacher = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <Title title="SECONDARY TEACHER"/>
            <div className={styles['secondary-teacher']}>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.HEADER_1}<br/>
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.PARA_1}
                </p>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.HEADER_2}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.PARA_2}
                </p>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.HEADER_3}
                </p>
                <div className={styles["skill"]}>
                    <ul>
                    {
                        constants.JOB.SUB_JOBS.SECONDARY_TEACHER.SKILL.map((skill, i) => {
                            return (
                                <li key={i}>
                                    {skill}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SECONDARY_TEACHER.HEADER_4}
                </p>
                <div className={styles["skill"]}>
                    <ul>
                    {
                        constants.JOB.SUB_JOBS.SECONDARY_TEACHER.PRIORITY.map((priority, i) => {
                            return (
                                <li key={i}>
                                    {priority}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
            <Buttons
            links={["/teacher-sign-up", "/teacher-sign-up", "/teacher-sign-up"]} 
            buttons={["REGISTER FOR JOBS", "REGISTER FOR TRAINING", "REGISTER FOR EXAMS"]}/>
        </>
    )
}

export default SecondaryTeacher
