import React from "react"
import styles from "./About.module.css"
import * as constants from "../../constants/constants"
import Apply from "../Apply/Apply"

const About = (props) => {

    return (
        <div className={styles['about-container']}>
            <h2>
                {constants.TEACHER.ABOUT.HEADER}
            </h2>
            <article>
                {constants.TEACHER.ABOUT.ARTICLE}
            </article>
            {/* <Apply/> */}
        </div>
    )
}

export default About
