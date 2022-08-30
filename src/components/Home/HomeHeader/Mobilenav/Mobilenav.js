import React, {useState, useEffect} from "react"
import styles from "./Mobilenav.module.css"
import * as constants from "../../constants/constants"
import {useHistory} from "react-router"
import { NavLink } from "react-router-dom"


const Mobilenav = (props) => {
    let history = useHistory()
    const paraList =  [
    {
        "header": 
            {"text": constants.HOME_NAV_LIST[0], "link": "/homepage"}, 
        "paras": [{title: "Context", to: "/context"}, 
                  {title:"About Us", to:"/about-us"}, 
                  {title:"OUR VISION & MISSIOn", to:"/vision&mission"}, 
                  {title:"TEACHER Annual Conference", to:"teacher-annual-conference"}, 
                  {title:"TEACHERS Awards-IMPACT TEACHERS", to: "campusfield-award"}]},
                  {"header": {"text": constants.HOME_NAV_LIST[1], "link": "#"}, 
    "paras": [{title: "TEACHER", to: "/teacher-training", type: "teacher"}, 
    {title: "SCHOOL", to: "/school-training", type: "school"}]}, 
    {"header": {"text": constants.HOME_NAV_LIST[2], "link": "#"}, 
    "paras": []}, 
    {"header": {"text": constants.HOME_NAV_LIST[3], "link": "/for-jobs"},
    "paras": [{title: "PRIMARY TEACHER", to: "/jobs/primary-teacher"}, 
    {title:"SECONDARY TEACHER", to:"/jobs/secondary-teacher"}, 
    {title:"SENIOR SECONDARY TEACHER", to:"/jobs/senior-secondary-teacher"}, 
    {title:"OTHER SUBJECT", to: "/jobs/other-jobs"},
    {title:"ADMINISTRATIVE JOBS", to: "/jobs/administrative"},
    {title:"APPLY NOW", to: "/teacher-sign-up"}]},
    {"header": {"text": constants.HOME_NAV_LIST[4], "link": "/for-exams"},
    "paras": [{title: "CTET", to: "/exams/about-ctet"}, 
    {title: "TET", to: "/exams/about-tet"},
    {title:"APPLY NOW", to: "/teacher-sign-up"}]},
    {"header": {"text": constants.HOME_NAV_LIST[5], "link": "/for-certification"},
    "paras":   [{title: "UP SKILL", to: "#"}, 
    {title: "CAMPUS FIELD CERTIFICATION & ELT", to: "#"}] }]
    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false])
    let element = paraList.map((el, j) => {
    
    const toggle = (i) => {
        let dummyArray = [false, false, false, false, false, false]
        dummyArray[i] = !isOpen[i]
        setIsOpen(dummyArray)
    }
        return (
        <div key={j}>
            <div className={[styles["toggle-bar"], isOpen[j] ? styles["toggle-open"] : null].join(" ")}>
                <div className={styles["main-link"]} onClick={() => {
                    props.setIsMobileNav(false)
                    history.push(el.header.link
                    )}}>{el.header.text}</div>
                <div className={styles["toggler"]}
                 onClick={() => {toggle(j)}}>
                    <p style={{textAlign: "center", margin: 0, color: "#42754D", fontWeight: "bold"}}>
                        {!isOpen[j] ?  "+" : "-"}
                    </p>
                </div>
            </div>
            <div className={[styles["content"], isOpen[j] ? styles["expand"] : null].join(" ")}>
                <div style={{padding: "1rem", paddingLeft: 0, paddingRight: 0}}>
                {el.paras.map((para, i) => {
                   return (
                       <div
                       key={i} 
                       style={{width: "100%"}}>
                            <div className={styles["link"]} onClick={() => {
                                props.setIsMobileNav(false)
                                history.push(para.to)
                            }}>
                            {para.title}
                            </div>
                        </div>
                   )
                })}
                </div>
            </div>
        </div>
        )
    })

    return (
        <div className={[styles["mobile-nav-container"], props.isMobileNav ? styles["open-nav"] : null].join(" ") }>
            <div className={styles["logo-container"]} style={{cursor: "pointer"}}>
                <img src={require("../../../../assets/cf-logo.png")}/>
            </div>
            <div>
            {element}
            <div 
            style={{paddingLeft: "1rem", textTransform: "uppercase", cursor: "pointer"}} 
            className={[styles["toggle-bar"], styles["contact"]].join(" ")}
            onClick={() => {
            }}
            >
                Blog
            </div>
            <div 
            style={{paddingLeft: "1rem", textTransform: "uppercase", cursor: "pointer"}} 
            className={[styles["toggle-bar"], styles["contact"]].join(" ")}
            onClick={() => {
                props.setIsMobileNav(false)
                history.push("/contact-us")
            }}
            >
                contact us
            </div>
            </div>
        </div>
    )

}

export default Mobilenav