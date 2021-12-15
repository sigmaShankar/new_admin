import React, { useEffect, useState } from "react"
import styles from "./ExistingSchool.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../../../JobComponent/SubJob/Buttons/Buttons"

const ExistingSchool = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    

    const [isOpen, setIsOpen] = useState([false, false, false, false])
    const para_list = [{"header": constants.SCHOOL.EXISTING_SCHOOL.HEADER_1, 
                      "paras": [constants.SCHOOL.EXISTING_SCHOOL.PARA_6]},
                      {"header": constants.SCHOOL.EXISTING_SCHOOL.HEADER_2, 
                      "paras": [constants.SCHOOL.EXISTING_SCHOOL.PARA_2]}, 
                      {"header": constants.SCHOOL.EXISTING_SCHOOL.HEADER_3, 
                      "paras": [constants.SCHOOL.EXISTING_SCHOOL.PARA_3, constants.SCHOOL.EXISTING_SCHOOL.PARA_4]}, 
                      {"header": constants.SCHOOL.EXISTING_SCHOOL.HEADER_4, 
                      "paras": [constants.SCHOOL.EXISTING_SCHOOL.PARA_5]}]

    const toggle = (i) => {
        let dummyArray = [false, false, false, false]
        dummyArray[i] = !isOpen[i]
        setIsOpen(dummyArray)
    }
    
    let elemet = para_list.map((el, j) => {
        let programList = j === 1 ? (<ul>
                                        {constants.SCHOOL.EXISTING_SCHOOL.PROGRAMME.map((el) => {
                                            return (
                                                <li>
                                                    {el}
                                                </li>
                                            )
                                        })}
                                    </ul>) : null
    let programHeader = j === 1 ? <h3 style={{marginBottom: "1.5rem"}}> The Whole School Program </h3> : null

        return (
        <>
            <div className={[styles["toggle-bar"], isOpen[j] ? styles["toggle-open"] : null].join(" ")}>
                <h3>{el.header}</h3>
                <div className={styles["toggler"]}
                 onClick={() => {toggle(j)}}>
                    <p style={{textAlign: "center", marginBottom: 0, color: !isOpen[j] ? "#E7E4CC" :  "#A7A551", fontWeight: "bold"}}>
                        {!isOpen[j] ?  "+" : "-"}
                    </p>
                </div>
            </div>
            <div className={[styles["content"], isOpen[j] ? styles["expand"] : null].join(" ")}>
                <div style={{padding: "2rem"}}>
                {el.paras.map((para, i) => {
                    // //console.log(i)
                   return (
                       <>
                        <p>
                            {para}
                        </p>
                        {programHeader}
                        {programList}
                        </>
                   )
                })}
                </div>
            </div>
        </>
        )
    })

    return (
        <div className={styles['existing-schools']}>
            <p>
                {constants.SCHOOL.EXISTING_SCHOOL.PARA_1}
            </p>
            <h3 className={styles["support"]}>
                Support offered for Existing School
            </h3>
            <div className={styles["toggle-main"]}>
                {elemet}
            </div>
            <div style={{height: "auto", marginTop: "3rem", marginBottom: 0}}>
                <Buttons
                links={["/institution-sign-up", "/institution-sign-up", "/institution-sign-up" ]} 
                buttons={["GET ASSESSED", "REGISTER PROGRAMS", "TEACHER RECRUITMENT"]}/>
            </div>
        </div>
    )
}

export default ExistingSchool
