import React from "react"
import styles from "./FieldOffer.module.css"
import * as constants from "../../constants/constants"
import Offer from "./Offer/Offer"

const FieldOffer = (props) => {

    return (
        <div className={styles['field-offer-container']}>
            <div className={styles["header-container"]}>
                <h2>
                    CAMPUS FIELD OFFERS
                </h2>
                <div className={styles["under-line"]}>
                </div>
            </div>
            <div className={styles["offer-container"]}>
                <Offer/>
            </div>
        </div>
    )
    
}

export default FieldOffer
