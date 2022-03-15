import React from "react"
import styles from "./Conference.module.css"
import * as constants from "../../constants/constants"
import Banner from "../SubHomeBanner/SubHomeBanner"
import Title from "../Title/Title"

const Conference = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['sub-home-container']}>
                <Banner/>
            <div className={styles["is-padding"]}>
                <Title title="CAMPUS FIELD TEACHER ANNUAL CONFERENCE"/>
            </div>
            <div className={styles["article"]}>
                <div className={styles["content"]}>
                    <p>
                        {constants.HOME.CONFERENCE.PARA_1}
                    </p>
                </div>
                <div className={styles["who"]}>
                    <h3>
                        {constants.HOME.CONFERENCE.ATTENDERS.TITLE}
                    </h3>
                    <ul>
                        {constants.HOME.CONFERENCE.ATTENDERS.LIST.map((el, i) => {
                            return (<li key={i}>
                                        {el}
                                    </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
    
}

export default Conference
