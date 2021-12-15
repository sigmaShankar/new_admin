import React from "react"
import styles from "./Buttons.module.css"
import {useHistory} from "react-router"

const Buttons = (props) => {
    let history = useHistory()
    let buttons =  props.buttons.map((title, i) => {

        let oddColor = i % 2 !== 0 ? styles["odd-color"] : null
        
        const onButton = (i) => {
            //console.log(props.links)
            if(props.links) {
                history.push(props.links[i])
            }
        }

        return (
            <button
            onClick={() => {onButton(i)}}
            key={i} 
            className={[styles["buttons"], oddColor].join(" ")}>
                {title}
            </button>
            
        )
    })
    

    return (
        <div className={styles["button-list"]}>
            {buttons}
        </div>
    ) 
}

export default Buttons




