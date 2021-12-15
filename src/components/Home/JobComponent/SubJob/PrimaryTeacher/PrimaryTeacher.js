import React from "react"
import styles from "./PrimaryTeacher.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../Buttons/Buttons"

const PrimaryTeacher = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <Title title="PRIMARY TEACHER"/>
            <div className={styles['primary-teacher']}>
                <p>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.PARA_1}<br/>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.PARA_1_1}
                </p>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.HEADER_1}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.PARA_2}
                </p>
                {/* <p>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.PARA_2_1}
                </p> */}
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.HEADER_2}
                </p>
                <div className={styles["skill"]}>
                    <ul>
                    {
                        constants.JOB.SUB_JOBS.PRIMARY_TEACHER.SKILL.map((skill, i) => {
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
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.HEADER_3}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.PRIMARY_TEACHER.PARA_3}
                </p>
            </div>
            <Buttons
            links={["/teacher-sign-up", "/teacher-sign-up", "/teacher-sign-up"]} 
            buttons={["REGISTER FOR JOBS", "REGISTER FOR TRAINING", "REGISTER FOR EXAMS"]}/>
        </>
    )
}

export default PrimaryTeacher
