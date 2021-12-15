import React, { useEffect } from "react"
import styles from "./BasicInfo.module.css"
import * as constants from "../../constants/constants"

const BasicInfo = (props) => {

    useEffect(() => {
    })

    return (
        <div className={styles["basic-details-form-container"]}>
            <h2>
                Get In Touch
            </h2>
            <form style={{marginTop: "0.9rem"}} onSubmit={props.onSubmit}>
                <div className={styles["input-block"]}>
                    <label style={{color: !props.firstName.isValid && props.firstName.touched ? "red": "grey"}}>
                        First Name:
                    </label>
                    <input 
                    onBlur={() => {props.onBlur(0)}}
                    value={props.firstName.value}
                    onChange={(event) => {props.onChange(event, 0)}}/>
                </div>
                <div className={styles["input-block"]}>
                    <label style={{color: props.lastName.touched && !props.lastName.isValid ? "red": "grey"}}>
                        Last Name:
                    </label>
                    <input 
                    onBlur={() => {props.onBlur(1)}}
                    value={props.lastName.value}
                    onChange = {(event) => {props.onChange(event, 1)}}/>
                </div>
                <div className={styles["input-block"]}>
                    <label style={{color: props.phone.touched && !props.phone.isValid ? "red": "grey"}}>
                        Phone:
                    </label>
                    <input
                    maxLength={10}
                    inputMode="numeric"
                    onBlur={() => {props.onBlur(2)}}
                    value={props.phone.value}
                    onChange={(event) => {props.onChange(event, 2)}}/>
                </div>
                <div className={styles["input-block"]}>
                    <label style={{color: props.email.touched && !props.email.isValid ? "red": "grey"}}>
                        Email:
                    </label>
                    <input 
                    onBlur={() => {props.onBlur(3)}}
                    value={props.email.value}
                    onChange={(event) => {props.onChange(event, 3)}}/>
                </div>
                <div className={styles["input-block"]}>
                    <label style={{color: props.message.touched && !props.message.isValid ? "red": "grey"}}>
                        Message:
                    </label>
                    <textarea
                    style={{boxShadow: "none", background : "white", border: "none", borderBottom: "1px solid gray", borderRadius: 0}}
                    onBlur={() => {props.onBlur(4)}} 
                    value={props.message.value}
                    onChange={(event) => {props.onChange(event, 4)}}/>
                </div>
                <input className={styles["submit"]} type="submit"  value="Send Message"/>
            </form>
            <div style={{clear: "both"}}></div>
        </div>
    )
    
}

export default BasicInfo
