import React from "react"
import styles from "./Offer.module.css"
import * as constants from "../../../constants/constants"
import {useHistory} from "react-router"
const Offer = (props) => {

    let history = useHistory()
    const icon = ["teacher_logo_1", "ad-institution", "jobs-icon", "certificate-icon"]
    let knowMoreLink = ["/for-teachers", "/for-schools", "/for-jobs", '/for-certification']

    const onKnowMore = (i) => {
        //console.log("hell")
        history.push(knowMoreLink[i])
    }

    const offer = constants.HOME.FIELD_OFFER.OFFER.map((title, i) => {
        let backGround = i % 2 === 0 ? styles["even-colour"] : styles["odd-colour"]
        let hover = i % 2 === 0 ? styles["odd-colour"] : styles["even-colour"]

        return (
        <div
        key={i} 
        className={[styles['offer-container'], backGround].join(" ")}>
           <div className={styles['icon-container']}>
               <img src={require(`../../../../../assets/${icon[i]}.png`)}/>
            </div>
            <p className={styles['title']}>
                {title}
            </p>
            <button className={styles["link"]} onClick={() => {onKnowMore(i)}}>
                KNOW MORE
            </button>
        </div>
        )
    })

    return (
        <>
            {offer}
        </>
    )
}

export default Offer
