import React from "react"
import styles from "./About.module.css"
import * as constants from "../../constants/constants"
import { NavLink } from "react-router-dom"

const About = (props) => {

    return (
        <div className={styles['about-container']}>
            <div className={styles['article-container']}>
                <p className={styles["header"]}>
                    {constants.JOB.ARTICLE.HEADING}
                </p>
                <article>
                    <p>
                        {constants.JOB.ARTICLE.PARA_1}
                        <br/>
                        {constants.JOB.ARTICLE.PARA_2}
                    </p>
                    <p>
                        {constants.JOB.ARTICLE.PARA_3}
                    </p>
                    <p>
                        {constants.JOB.ARTICLE.PARA_4}
                    </p>
                </article>
            </div>
            <div className={styles["register"]}>
                    <h3>
                    Get Assessed
                </h3>
                <h3>
                    Register now and call back
                </h3>
                <div>
                    <NavLink to="/teacher-sign-up">
                        Register now
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default About
