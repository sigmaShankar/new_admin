import React, {useState, useEffect} from "react"
import styles from "./TeacherSideBar.module.css"
import {useHistory} from "react-router"
import { NavLink } from "react-router-dom"


const TeacherSideBar = (props) => {
    let history = useHistory()
    const paraList =  [
        {
            "header": 
                {"text": "Dashboard", "link": "/teacher/profile"}, 
            "paras": []
        },
    {
        "header": 
            {"text": "Profile", "link": "#"}, 
        "paras": [
                    {title:"Personal Info", to:"/teacher/profile"},
                    {title: "Qualification", to: "/teacher/qualifications"}, 
                    {title:"Experience", to:"/teacher/experiences"},
            ]
    },
    {   "header": {"text": "Training", "link": "#"}, 
        "paras": [
                    // {title: "Search Center", to: "/teacher/centre"}, 
                    {title:"Search Program", to:"/teacher/programme"}, 
                    {title:"Enrolled Program", to:"/teacher/enrolled_programme"}, 
            ]
        }, 
        {
            "header": {"text": "Job Preference", "link": "/teacher/jobPreference"}, 
            "paras": []
        }, 
        {
            "header": {"text": "Self Evaluation", "link": "/teacher/self-evaluation"},
            "paras": []},
    {
        "header": {"text": "Job", "link": "#"}, 
        "paras": [
            {title: "Job Lists", to: "/teacher/jobs"}, 
            {title:"Applied Jobs", to:"/teacher/applied_jobs"}
        ]
    }, 
    {
        "header": {"text": "Certification", "link": "/teacher/certification"},
        "paras":   []
    },
    {   
        "header": {"text": "Exam", "link": "/teacher/exams"},
        "paras":   [] 
    },
    {   
        "header": {"text": "Payment & Transaction", "link": "#"},
        "paras":   [
                    {title: "Transaction History", to: "/teacher/transaction-history"}, 
                    {title: "Payment", to: "/teacher/payments"}
                ] 
    }]
    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false, false, false])
    let element = paraList.map((el, j) => {
    
    const toggle = (i) => {
        let dummyArray = [false, false, false, false, false, false, false, false]
        dummyArray[i] = !isOpen[i]
        setIsOpen(dummyArray)
    }
        return (
        <div key={j}>
            <div className={[styles["toggle-bar"], isOpen[j] ? styles["toggle-open"] : null].join(" ")}>
                <div className={styles["main-link"]} onClick={() => {
                    // props.setIsMobileNav(false)
                    history.push(el.header.link
                    )}}>{el.header.text}</div>
                <div className={styles["toggler"]}
                 onClick={() => {toggle(j)}}>
                     {el.header.text === "Certification" || el.header.text === "Self Evaluation" || 
                     el.header.text === "Job Preference" || el.header.text === "Exam" || el.header.text === "Dashboard" ? 
                        null :
                        <p style={{textAlign: "center", margin: 0, color: "rgb(89, 182, 173)", fontWeight: "bold"}}>
                            {!isOpen[j] ?  "+" : "-"} 
                        </p> 
                     } 
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
                                // props.setIsMobileNav(false)
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
            <div>
                {element}
            </div>
        </div>
    )

}

export default TeacherSideBar
