import React from "react"
import styles from "./InvalidHighlighter.module.css"

const InvalidHighlighter = (props) => {

    if(props.visible) {
        return  (<p className={styles["invalid-highlighter"]}>
                     {props.message}
                </p>)
    }

    return null
}

export default InvalidHighlighter
