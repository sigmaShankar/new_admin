import React from "react"
import styles from "./Apply.module.css"
import * as constants from "../../constants/constants"
import CommonApply from "../../Apply/Apply"

const Apply = (props) => {

    let links = ["/exams/about-ctet", "/exams/about-tet", "for-exams", "for-exams" ]
    let examTypes = constants.EXAM.APPLY.map((title, i) => {
        return <CommonApply
        link={links[i]}
        title={title}
        key={i}
        index={i}/>
    })

    return (
        <div className={styles["apply-container"]}>
            {examTypes}
        </div>
    )
    
}

export default Apply
