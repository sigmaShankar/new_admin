import React from "react"
import styles from "./SubExam.module.css"
import * as constants from "../../constants/constants"
import CommonHeader from "../../CommonHeader/CommonHeader"
import { Route, Switch } from "react-router"
import Ctet from "./Ctet/Ctet"
import Tet from "./Tet/Tet"

const SubExam = (props) => {

    return (
        <div className={styles['exams-container']}>
            <CommonHeader 
            img="assets/Banner3.jpg"/>
            <div className={styles["sub-exam-container"]}>
                <Switch>
                    <Route path={"/exams/about-ctet"}  component={Ctet}/>
                    <Route path={props.match.url + "/about-tet"}  component={Tet}/>
                </Switch>
            </div>
        </div>
    )
}

export default SubExam
