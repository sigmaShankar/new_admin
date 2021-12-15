import React from "react"
import styles from "./Mission.module.css"
import * as constants from "../../constants/constants"
import Banner from "../SubHomeBanner/SubHomeBanner"
import Title from "../Title/Title"

const Mission = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['sub-home-container']}>
            <Banner/>
            <div className={styles["is-padding"]}>
                <Title title="Our Vision & Mission"/>
            </div>
            <div className={styles["article"]}>
                <article>
                    <h3>
                        OUR VISION
                    </h3>
                    <p>
                        <span className={styles["span-color"]}>{constants.HOME.MISSION.HEADER_1}</span> {constants.HOME.MISSION.PARA_1}
                    </p>
                    <p>
                        <span className={styles["span-color"]}>{constants.HOME.MISSION.HEADER_2}</span> {constants.HOME.MISSION.PARA_2}
                    </p>
                    <p>
                        <span className={styles["span-color"]}>{constants.HOME.MISSION.HEADER_3}</span> {constants.HOME.MISSION.PARA_3}
                    </p>
                </article>
                <article style={{backgroundColor: "#A6A54F"}}>
                    <h3>
                        OUR MISSION
                    </h3>
                    <p>
                        {constants.HOME.MISSION.PARA_4}
                    </p>
                    <p>
                        {constants.HOME.MISSION.PARA_5}
                    </p>
                    <p>
                        {constants.HOME.MISSION.PARA_6}
                    </p>
                </article>
            </div>
            <h4 className={styles["why-header"]}>
                {constants.HOME.MISSION.HEADER_4}
            </h4>
            <ul className={styles["why-list"]}>
                {constants.HOME.MISSION.WHY.map((why, i) => {
                return (<li key={i}>
                                {why}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
    
}

export default Mission
