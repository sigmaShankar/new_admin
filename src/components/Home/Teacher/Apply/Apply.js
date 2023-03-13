import React from "react"
import styles from "./Apply.module.css"
import * as constants from "../../constants/constants"
import { useHistory } from "react-router-dom";


const Apply = (props) => {
    const history = useHistory();
    const signupPage = (link) =>{
        history.push(link)
    };
    let link = ["/teachers/currently-employed", "/teachers/fresh-graduates", "/teachers/finishing-school-for-teachers",
                "/teachers/montessori", "/for-exams", "/for-jobs"]
    let apllyNows = constants.TEACHER.APPLY_NOW.SITUATION.map((el, i) => {

        let oddColor = i % 2 !== 0 ? styles["odd-color"] : null;
        return (
        <div
        key={i} 
        className={[styles["apply-now"], oddColor].join(" ")}>
            <p>
                {el}
            </p>
            <button onClick = { () => {signupPage(link[i])}}>
                Apply Now
            </button>
        </div>
        )
    })

    return (
        <div className={styles['apply-container']}>
            <p style={{fontSize: "1.2rem"}}>
                {constants.TEACHER.APPLY_NOW.HEADER}
            </p>
            <div className={styles["apply-now-container"]}>
                {apllyNows}  
            </div>
            <p>
                {constants.TEACHER.APPLY_NOW.FOOTER}
            </p>
        </div>
    )
}

export default Apply
