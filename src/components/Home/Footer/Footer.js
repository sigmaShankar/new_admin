import React from "react"
import styles from "./Footer.module.css"
import * as constants from "../constants/constants"

const Footer = (props) => {

    let contactList = constants.HOME.FOOTER.CONTACT_SOURCE.map((el, i) => {

        return(
            <li key={i}>
                <i
                style={{color: el.color}} 
                className={el.class}></i>
            </li>
        )
    })

    return (
        <div className={styles['footer-container']}>
            <p>
                FOLLOW US ON SOCIAL MEDIA
            </p>
            <ul className={styles["contact-source"]}>
                {contactList}
            </ul>
            <a href="https://campusfield.in/#/privacy-policy" style={{color:"white"}}>Privacy Policy</a>
            <p className={styles["copyrights"]}>
                &copy; {constants.HOME.FOOTER.COPYRIGHTS}
            </p>
        </div>
    )
    
}

export default Footer
