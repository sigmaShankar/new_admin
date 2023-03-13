import React, {useEffect} from "react"
import styles from "./Auth.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import SignIn from "./SignIn/SignIn"

const Auth = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles['auth-container']}>
            <SignIn/>
        </div>
    )
}

export default Auth
