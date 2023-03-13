import React from "react"
import styles from "./Montessori.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import { NavLink } from "react-router-dom" 
import style from "react-syntax-highlighter/dist/esm/styles/hljs/agate"


const Montessori = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    let freshGraduates = props.match.url.search("fresh")

    return (
        <div className={styles['montessori']}>
            <Title title={"KG, MONTESSORI PROGRAMME"}/>
            <div className={styles['montessori-container']}>
                <div className={styles["article-container"]}>
                    <p className={styles["main-header"]}>
                        {constants.TEACHER.SUB_TEACHER.MONTESSORI.HEADER_1}
                    </p>
                    <strong>
                        Online Programmes - Face to Face Programme
                    </strong>
                    <p>
                        {constants.TEACHER.SUB_TEACHER.MONTESSORI.PARA_1}
                    </p>
                    <strong>
                        {constants.TEACHER.SUB_TEACHER.MONTESSORI.HEADER_2}
                    </strong>
                    <p style={{fontSize: "0.9rem"}}>
                        This is for those who are:
                    </p>
                    <ul className={styles["who"]}>
                    {
                        constants.TEACHER.SUB_TEACHER.MONTESSORI.WHO.map((who, i) => {
                            return (
                                <li key={i}>
                                    {who}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div className={styles["topics-container"]}>
                    <div>
                    <p className={styles["header"]}>
                        {constants.TEACHER.SUB_TEACHER.MONTESSORI.HEADER_3}
                    </p>
                    <div>
                        <ul className={styles["topics"]}>
                            {
                                constants.TEACHER.SUB_TEACHER.MONTESSORI.TOPICS.map((who, i) => {
                                    return (
                                        <li key={i}>
                                            {who}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p style={{marginTop: "3rem"}}>
                        {constants.TEACHER.SUB_TEACHER.MONTESSORI.PARA_3}
                    </p>
                    </div>
                </div>
            </div>
            <div className={styles["trainer"]}>
                <p className={styles["main-header"]} style={{marginBottom: "0.5rem", marginTop: 0}}>
                    {constants.TEACHER.SUB_TEACHER.MONTESSORI.HEADER_4}
                </p>
                <p className={styles["header"]} style={{margin: 0}}>
                    Join our team and develop your career!
                </p>
                <p style={{fontSize: "0.9rem", margin: 0}}>
                    {constants.TEACHER.SUB_TEACHER.MONTESSORI.HEADER_5}
                </p>
                <p style={{fontSize: "0.9rem", fontWeight: 300, marginBottom: 0}}>
                    {constants.TEACHER.SUB_TEACHER.MONTESSORI.PARA_2}
                </p>
            </div>
        </div>
    )
}

export default Montessori
