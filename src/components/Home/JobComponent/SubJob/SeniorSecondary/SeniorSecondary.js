import React from "react"
import styles from "./SeniorSecondary.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../Buttons/Buttons"

const SeniorSecondary = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <Title title="SENIOR SECONDARY TEACHER"/>
            <div className={styles['senior-secondary-teacher']} style={{paddingTop: 0}}>
                <p >
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_1}<br/>
                </p>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.HEADER_1}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_2}<br/>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_3}
                </p>
                {
                    constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.SUBJECT.map((subject, i) => {
                        return (
                            <p key={i} className={styles["subject"]}>
                                {subject}
                            </p>
                        )
                    })
                }
                <p style={{marginTop: "10px"}}>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_4}<br/>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_5}
                </p>
                <p  className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.HEADER_2}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_6}<br/>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_7}<br/>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_8}<br/>
                    {constants.JOB.SUB_JOBS.SENIOR_SECONDARY_TEACHER.PARA_9}<br/>
                </p>
            </div>
            <Buttons
            links={["/teacher-sign-up", "/teacher-sign-up", "/teacher-sign-up"]} 
            buttons={["REGISTER FOR JOBS", "REGISTER FOR TRAINING", "REGISTER FOR EXAMS"]}/>
        </>
    )
}

export default SeniorSecondary
