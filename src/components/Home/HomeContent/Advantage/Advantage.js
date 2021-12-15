import React from "react"
import styles from "./Advantage.module.css"
import * as constants from "../../constants/constants"
import AdvantageList from "./AdvantageList/AdvantageList"
import {useHistory} from "react-router"

const Advantage = (props) => {
    let history = useHistory()
    let buttons =  constants.HOME.ADVANTAGES.BUTTONS.map((title, i) => {

        let oddColor = i % 2 !== 0 ? styles["odd-color"] : null
        return (
            <button
            onClick={() => {history.push("/teacher-sign-up#teacherSignUp")}}
            key={i} 
            className={[styles["buttons"], oddColor].join(" ")}>
                {title}
            </button>
            
        )
    })

    return (
        <div className={styles['field-offer-container']}>
            <div className={styles["header-container"]}>
                <h2 style={{marginTop: "20px"}}>
                    CF ADVANTAGE
                </h2>
                <div className={styles["under-line"]}>
                </div>
            </div>
            <div className={styles["offer-container"]}>
                <AdvantageList/>
            </div>
            <div className={styles["button-list"]}>
                {buttons}
            </div>
        </div>
    )
    
}

export default Advantage
