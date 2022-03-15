import React from "react"
import styles from "./OtherSubject.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../Buttons/Buttons"

const OtherSubject = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <Title title="OTHER SUBJECTS"/>
            <div className={styles['other-subject']}>
                <p className={styles["header"]}>
                    {constants.JOB.SUB_JOBS.OTHER_SUBJECT.HEADER}
                </p>
                <div>
                    <ul>
                        {
                            constants.JOB.SUB_JOBS.OTHER_SUBJECT.SUBJECT.map((subject, i) => {
                                return (
                                    <li key={i} className={styles["subject"]}>
                                        {subject}
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

export default OtherSubject
