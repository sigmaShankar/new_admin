import React from "react"
import styles from "./Job.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import About from "./About/About"
import Apply from "../Apply/Apply"
import {useHistory} from "react-router"

const Job = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    let history = useHistory()
    let linkTypes = ['jobs/primary-teacher', 
                     'jobs/secondary-teacher',
                     'jobs/senior-secondary-teacher',
                     'jobs/other-jobs',
                     'jobs/administrative']
    let registerList = constants.JOB.REGISTER.TYPES.map((title, i) => {
        return (
            <Apply
            link={linkTypes[i]}
            key={i}
            index={i}
            title={title} />
        )
    }) 

    let buttons =  constants.JOB.REGISTER.LINK.map((title, i) => {

        let backGround = i % 2 === 0 ? styles["even-colour"] : styles["odd-colour"]
        return (
            <button
            key={i}
            onClick={() => {history.push('/teacher-sign-up')}}
            className={[styles["buttons"], backGround].join(" ")}>
                {title}
            </button>
            
        )
    })

    return (
        <div className={styles['job-container']}>
            <CommonHeader 
            img="assets/Banner2.jpg" />
            <About/>
            <div className={styles["register-container"]}>
                {registerList}
            </div>
            <div className={styles["button-list"]}>
                {buttons}
            </div>
        </div>
    )
}

export default Job
