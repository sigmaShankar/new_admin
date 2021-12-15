import React from "react"
import styles from "./Context.module.css"
import * as constants from "../../constants/constants"
import Banner from "../SubHomeBanner/SubHomeBanner"
import Title from "../Title/Title"

const Context = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles['sub-home-container']}>
            <Banner/>
            <div className={styles["is-padding"]}>
                <Title title="CONTEXT"/>
            </div>
            <div className={styles["article"]}>
                <article>
                    <p>
                        {constants.HOME.CONTEXT.PARA_1}
                    </p>
                    <p>
                        {constants.HOME.CONTEXT.PARA_2}
                    </p>
                </article>
                <article>
                    <p>
                        {constants.HOME.CONTEXT.PARA_3}
                    </p>
                    {/* <p style={{color: "#017533"}}>
                        {constants.HOME.CONTEXT.PARA_4}
                    </p> */}
                    <p>
                        {constants.HOME.CONTEXT.PARA_5}
                    </p>
                </article>
            </div>
        </div>
    )
    
}

export default Context
