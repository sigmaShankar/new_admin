import React from "react"
import styles from "./Title.module.css"
import * as constants from "../../constants/constants"

const Title = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <>
            <h1 className={styles['title']}>
                {props.title}
            </h1>
            <div className={styles['highlighter']}>
            </div>
        </>
    )
    
}

export default Title
