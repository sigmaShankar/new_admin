import React from "react"
import styles from "./AdministrativeJobs.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import {NavLink, useHistory} from "react-router-dom"
import Buttons from "../Buttons/Buttons"

const AdministrativeJobs = (props) => {

    let history = useHistory()

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
        <div className={styles["administrative"]}>
            <div className={styles["article-container"]}>
            <Title title="PRINCIPAL"/>
            <div className={styles['principal']}>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.HEADER_1}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_1}
                </p>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.HEADER_2}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_2}
                </p>
            </div>
            <Title title="VICE PRINCIPAL"/>
            <div className={styles['principal']}>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_3}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_4}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_5}
                </p>
            </div>
            <Title title="ADMINISTRATOR"/>
            <div className={styles['principal']}>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.HEADER_1}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_6}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_7}
                </p>
                <p className={styles["header"]}>
                    SKILL AND EXPERIENCE
                </p>
                <div className={styles["skill"]}>
                    <ul>
                        {
                            constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.SKILLS.map((skill, i) => {
                                return (
                                    <li key={i}>
                                        {skill}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <Title title="HEAD TEACHER"/>
            <div className={styles['principal']}>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.HEADER_1}
                </p>
                <p>
                    {constants.JOB.SUB_JOBS.ADMINSTRATIVE_JOBS.PARA_8}
                </p>
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
            </div>           
        </div>
        <Buttons
        links={["/teacher-sign-up"]} 
        buttons={["Register"]}/>
        </>
    )
}

export default AdministrativeJobs
