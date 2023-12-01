import React from "react"
import styles from "./About.module.css"
import * as constants from "../../constants/constants"

const About = (props) => {

    return (
        <div className={styles['about-container']}>
            <h2 style={{marginTop: "20px"}}>
                {constants.HOME.ABOUT.HEADER_1}
            </h2>
            {/* <h2>
                {constants.HOME.ABOUT.HEADER_2}
            </h2> */}
            <div className={styles["under-line"]}>
                </div>
            <article>
                {constants.HOME.ABOUT.CONTENT_1}
            </article>
            <article className={styles['last-article']}>
                {constants.HOME.ABOUT.CONTENT_2}
            </article>
        </div>
    )
    
}

export default About
