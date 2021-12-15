import React from "react"
import styles from "./Apply.module.css"
import * as constants from "../../constants/constants"
import { NavLink, useHistory } from "react-router-dom"

const Apply = (props) => {

    let history = useHistory()

    let apllyNows = constants.SCHOOL.SCHOOL_TYPES.map((el, i) => {
        let link = ["#", "/schools/existing-school", "/schools/new-school", "/institution-sign-up", "/contact-us" ]
        let styler = [styles["apply-now"]] 
        let linkStyler = [styles["link"]]
        let buttonValue;
        
        if(i > 2) {
            buttonValue = "Click Here"
        } else {
            buttonValue = "Apply Now"
        }
        
        if(i === 5) {
            buttonValue = constants.SCHOOL.PARA_3
        }

        if(i <=2 && i % 2 !== 0) {
            styler.push(styles["odd-color"])
        }

        if(i > 2) {
            styler.push(styles['gray-color'])
        }

        return (
        <li
        key={i} 
        className={styler.join(" ")}>
            <p>
                {el}
            </p>
           {i === 5 ? <p>{buttonValue}</p> : 
                <div
                onClick={() => {history.push(link[i])}} 
                className={i > 2 ? 
                [...linkStyler, styles["help-line-background"]].join(" ") :
                 linkStyler}>
                    <NavLink to={link[i]}>
                        {
                            buttonValue
                        }    
                    </NavLink>
                </div>
            }
        </li>
        )
    })

    return (
        <div className={styles['apply-container']}>
            <ul className={styles["apply-now-container"]}>
                {apllyNows}  
            </ul>
        </div>
    )
}

export default Apply
