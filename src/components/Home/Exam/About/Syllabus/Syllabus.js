import React from "react"
import styles from "./Syllabus.module.css"
import * as constants from "../../../constants/constants"
import { NavLink } from "react-router-dom"

const Syllabus = (props) => {

    let backGround = props.index % 2 === 0 ? styles["even-colour"] : styles["odd-colour"]

    return (
        <div className={[styles["syllabus-container"], backGround].join(" ")}>
            <h5>
                {props.title}
            </h5>
            <p>
                {props.brief}
            </p>
            <div className={styles["link"]}>
                <NavLink to="/exams/about-ctet">
                    {constants.EXAM.PAPERS.LINK}
                </NavLink>
            </div>
        </div>
    )
    
}

export default Syllabus
