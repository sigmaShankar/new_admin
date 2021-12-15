import React from "react"
import styles from "./SubSchool.module.css"
import * as constants from "../../constants/constants"
import CommonHeader from "../../CommonHeader/CommonHeader"
import { Route, Switch } from "react-router-dom"
import NewSchool from "./NewSchool/NewSchool"
import ExistingSchool from "./ExistingSchool/ExistingSchool"

const SubSchool = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['school-container']}>
            <CommonHeader 
             img="assets/Banner5.jpg" />
            <div className={styles["sub-school-container"]}>
                <Switch>
                    <Route path={props.match.url + "/existing-school"}  component={ExistingSchool}/>
                    <Route path={props.match.url + "/new-school"}  component={NewSchool}/>
                </Switch>
            </div>

        </div>
    )
}

export default SubSchool
