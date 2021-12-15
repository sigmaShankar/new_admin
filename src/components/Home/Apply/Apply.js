import React from "react"
import styles from "./Apply.module.css"
import * as constants from "../constants/constants"
import { NavLink, useHistory } from "react-router-dom"

const Apply = (props) => {
    let painter = props.index % 2 === 0 ? styles["even-colour"] : styles["odd-colour"]
    let history = useHistory()

    return (
        <div className={[styles['apply-container'], painter].join(" ")} onClick={() => {history.push(props.link)}}>
            <NavLink to={props.link}>
                {props.title}
            </NavLink>
        </div>
    )
}

export default Apply
