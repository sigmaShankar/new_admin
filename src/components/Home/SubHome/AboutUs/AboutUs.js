import React from "react"
import styles from "./AboutUs.module.css"
import * as constants from "../../constants/constants"
import Banner from "../SubHomeBanner/SubHomeBanner"
import Title from "../Title/Title"

const AboutUs = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles['sub-home-container']}>
            <Banner/>
            <div className={styles["is-padding"]}>
                <Title title="ABOUT US"/>
            </div>
            <div className={styles["article"]}>
                <div>
                <article>
                    <p>
                        {constants.HOME.ABOUT_US.PARA_1}
                    </p>
                   
                </article>
                <article>
                    <p>
                        {constants.HOME.ABOUT_US.PARA_2}
                    </p>
                </article>
                </div>
                <div className={styles["list-container"]}>
                        <ul>
                            {constants.HOME.ABOUT_US.PROGRAMS.map((program, i) => {
                                return (<li key={i}>
                                            {program}
                                        </li>
                                )
                            })}
                    </ul>
                    </div>
            </div>
        </div>
    )
    
}

export default AboutUs
