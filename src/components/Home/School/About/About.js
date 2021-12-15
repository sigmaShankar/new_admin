import React from "react"
import styles from "./About.module.css"
import * as constants from "../../constants/constants"

const About = (props) => {

    return (
        <div className={styles['about-container']}>
            <h2>
                {constants.SCHOOL.ARTICLE.HEADER}
            </h2>
            <article>
                {constants.SCHOOL.ARTICLE.PARA_1}
            </article>
            <article style={{marginTop: 0, paddingTop: 0}}>
                {constants.SCHOOL.ARTICLE.PARA_2}
            </article>
        </div>
    )
}

export default About
