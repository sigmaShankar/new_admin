import React from "react"
import styles from "./About.module.css"
import * as constants from "../../constants/constants"
import Syllabus from "./Syllabus/Syllabus"
import { NavLink } from "react-router-dom"

const About = (props) => {

    let syllabus = constants.EXAM.PAPERS.TYPES.map((el, i) => {
        return (
            <Syllabus
            key={i}
            index={i}
            title={el.TITLE}
            brief={el.BRIEF}/>
        )
    })

    let links =  ["APPLY NOW", "CHECK ELIGIBILITY", "GET UPDATES"].map((title, i) => {

        let painter = i % 2 !== 0 ? styles["odd-colour"] : styles["even-colour"]
        return (
            <div
            key={i} 
            className={[styles["links"], painter].join(" ")}>
                <NavLink to="/teacher-sign-up">
                    {title}
                </NavLink>
            </div>
        )
    })
    
    let standards =  constants.EXAM.ARTICLE_11.STANDARDS.map((el, i) => {
            return(
                <li key={i}>
                    {el}
                </li>
            )
        })
    

    return (
        <div className={styles["about-container"]}>
            <div className={styles["article-1-container"]}>
                <article>
                    <h5>
                        {constants.EXAM.ARTICLE_1.HEADER}
                    </h5>
                    <p>
                        {constants.EXAM.ARTICLE_1.PARA}
                    </p>
                    <div className={styles["preparation-link"]}>
                        <NavLink to="/teacher-sign-up">
                            Start Your CTET Preparation Now !  
                        </NavLink>
                    </div>
                </article>
            </div>
            <div className={styles["article-2-container"]}>
                <p>
                    {constants.EXAM.ARTICLE_2.PARA_1}
                </p>
                <p>
                    {constants.EXAM.ARTICLE_2.PARA_2}
                </p>
                <p>
                    {constants.EXAM.ARTICLE_2.PARA_2}
                </p>
            </div>
            <div className={styles["article-3-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_3.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_3.PARA_1}
                </p>
                <p>
                    {constants.EXAM.ARTICLE_3.PARA_2}
                </p>
            </div>
            <div className={styles["article-4-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_4.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_4.PARA_1}
                </p>
            </div>
            <div className={styles["syllabus-container"]}>
                {syllabus}
                <div className={styles["button-list"]}>
                    {links}
                </div>
            </div>
            <div className={styles["article-5-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_5.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_5.PARA_1}
                </p>
            </div>
            <div className={styles["article-6-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_6.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_6.PARA_1}
                </p>
            </div>
            <div className={styles["article-7-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_7.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_7.PARA_1}
                </p>
                
                <p>
                    {constants.EXAM.ARTICLE_7.PARA_2}
                </p>
                
                <p>
                    {constants.EXAM.ARTICLE_7.PARA_3}
                </p>
            </div>
            <div className={styles["article-8-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_8.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_8.PARA_1}
                </p>
            </div>
            
            <div className={styles["article-9-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_9.HEADER}
                </h5>
                <p>
                    {constants.EXAM.ARTICLE_9.PARA_1}
                </p>
                
                <p>
                    {constants.EXAM.ARTICLE_9.PARA_2}
                </p>
                
                <p>
                    {constants.EXAM.ARTICLE_9.PARA_3}
                </p>
            </div>
            
            <div className={styles["article-10-container"]}>
                <h5>
                    {constants.EXAM.ARTICLE_10.HEADER}
                </h5>
                <p style={{fontSize: "0.8rem", fontWeight: 400, marginBottom: "0.3rem"}}>
                    {constants.EXAM.ARTICLE_10.PARA_1}
                </p>
                <p style={{fontSize: "0.8rem", fontWeight: 400}}>
                    {constants.EXAM.ARTICLE_10.PARA_1_1}
                </p>
                <div className={styles["article-10-appendix-container"]}>
                    <div className={styles["article-10-appendix"]}>
                        <p>
                        {constants.EXAM.ARTICLE_10.PARA_2}
                        </p>
                        <p>
                        30MCQs
                        </p>
                    </div>
                    <div className={styles["article-10-appendix"]}>
                        <p>
                        {constants.EXAM.ARTICLE_10.PARA_3}
                        </p>
                        <p>
                        30MCQs
                        </p>
                    </div>
                    <div className={styles["article-10-appendix"]}>
                        <p>
                        {constants.EXAM.ARTICLE_10.PARA_4}
                        </p>
                        <p>
                            30MCQs
                        </p>
                    </div>
                    <div className={styles["article-10-appendix"]}>
                        <p>
                        {constants.EXAM.ARTICLE_10.PARA_5}
                        </p>
                        <p>
                            30MCQs
                        </p>
                    </div>
                    <div className={styles["article-10-appendix"]}>
                        <p>
                        {constants.EXAM.ARTICLE_10.PARA_6}
                        </p>
                        <p>
                            30MCQs
                        </p>
                    </div>
                </div>
                <div className={styles["article-11-container"]}>
                    <h5>
                        {constants.EXAM.ARTICLE_11.HEADER}
                    </h5>
                    <p>
                        {constants.EXAM.ARTICLE_11.PARA_1}
                    </p>
                    <ul>
                       {standards}
                    </ul>
                </div>
            </div> 
            
        </div>
    )
    
}

export default About
