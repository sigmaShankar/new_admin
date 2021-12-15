import React from "react"
import styles from "./AdvantageList.module.css"
import * as constants from "../../../constants/constants"

const AdvantageList = (props) => {
    const icon = ["ad-teacher", "ad-student", "ad-institution", "ad-training"]

    const offer = constants.HOME.FIELD_OFFER.OFFER.map((title, i) => {
        let backGround = 1 % 2 === 0 ? styles["even-colour"] : styles["odd-colour"]
        return (
        <div
        key={i} 
        className={[styles['offer-container']]}>
            <div style={{flex: 0.3, display: "flex"}}>
           <div className={styles['icon-container']}> 
                <img src={require(`../../../../../assets/${icon[i]}.png`)}/>
            </div>
            </div>
            <h2 className={styles['title']}>
                {constants.HOME.ADVANTAGES.WHO[i]}
            </h2>
            <p style={{textAlign: "center"}}>
            {constants.HOME.ADVANTAGES.ADVANTAGE[i]}
            </p>
        </div>
        )
    })

    return (
        <>
            {offer}
            <div 
            className={[styles['offer-container']]}>
            <div style={{flex: 0.3, display: "flex"}}>
           <div className={styles['icon-container']}> 
                <img src={require(`../../../../../assets/ad-training.png`)}/>
            </div>
            </div>
            <h2 className={styles['title']}>
                Exams
            </h2>
            <p style={{textAlign: "center"}}>
                Offering a opportunity to take formal test that you take to show your knowledge or ability in a particular subject.
            </p>
        </div>
        </>
    )
}

export default AdvantageList
