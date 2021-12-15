import React from "react"
import styles from "./CommonHeader.module.css"
import * as constants from "../constants/constants"

const CommonHeader = (props) => {

    return (
        <div className={[styles["common-header"], props.header_1 ? styles["is-height"] : null].join(" ")}>
            <img src={require(`../../../${props.img}`)}></img> 
            {
                props.header_1 ? 
                <div className={styles["header"]}>
                    <h2>
                        {props.header_1}
                    </h2>
                    <h2>
                        {props.header_2}
                    </h2>
                </div> : null
            } 
            {
                props.headerPolicy ? 
                <div className={styles["header"]}>
                    <h2
                    style={{fontFamily: "Century Gothic, CenturyGothic, AppleGothic, sans-serif"}}>
                        {props.headerPolicy}
                    </h2>
                </div> : null
            }                
        </div>
    )
    
}

export default CommonHeader
