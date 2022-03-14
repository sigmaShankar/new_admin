import React from "react"
import styles from "./Awards.module.css"
import * as constants from "../../constants/constants"
import Banner from "../SubHomeBanner/SubHomeBanner"
import Title from "../Title/Title"
import { NavLink } from "react-router-dom"

const Awards = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['sub-home-container']}>
            <Banner/>
            <div className={styles["is-padding"]}>
                <Title title="Campus Field Teachers Awards - IMPACT Teachers"/>
            </div>
            <div className={styles["content"]}>
                <h2>
                    {constants.HOME.AWARDS.HEADER}
                </h2>
                <article>
                    <p>
                        {constants.HOME.AWARDS.PARA_1}
                    </p>
                </article>
            </div>
            {/* <div className={styles["apply"]}>
                <div>
                    <p>
                        <b>How to Apply</b>
                    </p>
                    <p>
                        Register now and get a call back
                    </p> */}
                    {/* <div className={styles["link"]}>
                        <NavLink to="">
                            REGISTER NOW
                        </NavLink>
                    </div> */}
                {/* </div>
                <div style={{backgroundColor: "#A6A54F"}}>
                    <p>
                        <b>How Can I Help You</b>
                    </p>
                    <p>
                        Get in touch with us if you require any of our service
                    </p> */}
                    {/* <div className={styles["link"]}>
                        <NavLink to="">
                            GET IN TOUCH
                        </NavLink>
                    </div> */}
                {/* </div>
            </div> */}
        </div>
    )
    
}

export default Awards
