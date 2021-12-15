import React, {useState} from "react"
import styles from "./NavBar.module.css"
import * as constants from "../../constants/constants"
import { NavLink, useHistory } from "react-router-dom"
const NavBar = (props) => {

    let history = useHistory()
    const [isSubNav, setIsSubNav] = useState([
        0, 0, 0, 0, 0, 0, 0, 0
    ]);
    const [isVisible, setIsVisible] = useState([
        false, false, false, false, false, false, false, false
    ])
    const [currentMouse, setCurrentMouse] = useState(-1)

    const subLinks = [[{title: "Context", to: "/context"}, 
                    {title:"About Us", to:"/about-us"}, 
                    {title:"OUR VISION & MISSIOn", to:"/vision&mission"}, 
                    {title:"CAMPUSFIELD TEACHER Annual Conference", to:"teacher-annual-conference"}, 
                    {title:"CAMPUSFIELD TEACHERS Awards-IMPACT TEACHERS", to: "campusfield-award"}],
                    [{title: "TEACHER", to: "/teacher-training", type: "teacher"}, 
                    {title: "SCHOOL", to: "/school-training", type: "school"}],
                    // [{title: "currently employed", to: "/teachers/currently-employed"}, 
                    // {title:"fresh graduates", to:"/teachers/fresh-graduates"}, 
                    // {title:"finishing school for teachers", to:"/teachers/finishing-school-for-teachers"}, 
                    // {title:"kg, montessori programme", to: "/teachers/montessori"},
                    // {title:"APPLY NOW", to: "/teacher-sign-up"}],
                    [],
                    // [{title: "FOR EXISTING SCHOOLS", to: "/schools/existing-school"}, 
                    // {title: "FOR NEW SCHOOLS", to: "/schools/new-school"},
                    // {title:"APPLY NOW", to: "/institution-sign-up"}],
                    [{title: "PRIMARY TEACHER", to: "/jobs/primary-teacher"}, 
                    {title:"SECONDARY TEACHER", to:"/jobs/secondary-teacher"}, 
                    {title:"SENIOR SECONDARY TEACHER", to:"/jobs/senior-secondary-teacher"}, 
                    {title:"OTHER SUBJECT", to: "/jobs/other-jobs"},
                    {title:"ADMINISTRATIVE JOBS", to: "/jobs/administrative"},
                    {title:"APPLY NOW", to: "/teacher-sign-up"}],
                    [{title: "CTET", to: "/exams/about-ctet"}, 
                    {title: "TET", to: "/exams/about-tet"},
                    {title:"APPLY NOW", to: "/teacher-sign-up"}],
                    [{title: "UP SKILL", to: "#"}, 
                    {title: "CAMPUS FIELD CERTIFICATION & ELT", to: "#"}], [] ]

    let links = [
        "/homepage",
        '/',
        "#",
        // "/for-schools",
        "/for-jobs",
        "/for-exams",
        "/for-certification",
        "/blog",
        "/contact-us"
    ]

    const toSignIn = () => {
        history.push("/sign-in")
    }

    const onMouse = (event, i) => {
        event.stopPropagation()
        let isVisibleCopy = [false, false, false, false, false, false, false, false]
        isVisibleCopy[i] = true
        // //console.log(isVisibleCopy)
        setIsVisible(isVisibleCopy)

        if(i !== isSubNav.indexOf(1) || i !== isSubNav.indexOf(2)) {
            let isSubNavCopy = [0, 0, 0, 0, 0, 0, 0, 0]
            isSubNavCopy[i] = 1
            setIsSubNav(isSubNavCopy)
        }
    }

    
    const offMouse = (i) => {
        setIsVisible([false, false, false, false, false, false, false, false])
        if(isSubNav.indexOf(1) > -1) {
            setIsSubNav([0, 0, 0, 0, 0, 0, 0, 0])
        } 
    }
    
    const offCurrentMouse = (event) => {
        event.stopPropagation()
        setIsVisible([false, false, false, false, false, false, false, false])
        setIsSubNav([0, 0, 0, 0, 0, 0, 0, 0])
    }

    const onCurrentMouse = (event, i) => {
        event.stopPropagation()
        setIsVisible([false, false, false, false, false, false, false, false])
        let isSubNavCopy = [0, 0, 0, 0, 0, 0, 0, 0]
        isSubNavCopy[i] = 2
        setIsSubNav(isSubNavCopy)
    }

    const navList = constants.HOME_NAV_LIST.map((title, i) => {
        return (
            <li 
            key={i}
            onMouseOver={(event) => {onMouse(event, i)}}
            // onMouseOut={() => {startHiding()}}
            className={styles['home-nav-item']}
            key={i}>
                {
                    i === 1 || i === 2 ?
                    <div>
                        {title}
                    </div> : 
                <NavLink 
                    exact activeClassName="is-active" activeStyle={{
                    color: "#588562"
                }} to={links[i]}>{title}</NavLink>
                }
                {
                    i <= 6 ?
                    <ul
                    className={styles["sub-navigation"]}
                    onMouseOver={(event) => {onCurrentMouse(event, i)}}
                    onMouseOut={(event) => {offCurrentMouse(event, i)}}
                    style={{position: "absolute", 
                            top: 55,
                            listStyle: "none", 
                            height: "auto",
                            border: "none",
                            padding: 0,
                            margin: 0,
                            minWidth: 130,
                            width: "auto", 
                            backgroundColor: "white",
                            boxShadow: "lightgrey 0px 0px 1px 1px", 
                            display: isVisible[i] || isSubNav[i] ? "flex" : "none",
                            flexDirection: "column" }}>
                        {subLinks[i] ?
                            subLinks[i].map((el, i) => {
                                return (
                                <li
                                key={i} 
                                style={{padding: "0.3rem", paddingRight: "0.5rem"}}>
                                    <NavLink to={{pathname: el.to, filterType: el.type}}>
                                        {el.title}
                                    </NavLink>
                                </li>
                                )
                            }) : null
                        }
                    </ul> : null
                }
            </li>
        )
    })
    return (
        <>
        <ul className={styles["home-nav-items"]}
        onMouseOut={offMouse}>
                {navList}
                <button onClick={toSignIn} className={styles["button"]}>
                    Member Login
                </button>
        </ul>
            </>
    )
}

export default NavBar
