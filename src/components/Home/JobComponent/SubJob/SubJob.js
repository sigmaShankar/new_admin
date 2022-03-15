import React from "react"
import styles from "./SubJob.module.css"
import * as constants from "../../constants/constants"
import CommonHeader from "../../CommonHeader/CommonHeader"
import { Route, Switch } from "react-router"
import PrimaryTeacher from "./PrimaryTeacher/PrimaryTeacher"
import SecondaryTeacher from "./SecondaryTeacher/SecondaryTeacher"
import SeniorSecondary from "./SeniorSecondary/SeniorSecondary"
import OtherSubject from "./OtherSubject/OtherSubject"
import AdministrativeJobs from "./AdministrativeJobs/AdministrativeJobs"

const SubJob = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['jobs-container']}>
            <CommonHeader 
            img="assets/Banner2.jpg"/>
            <div className={styles["sub-job-container"]}>
                <Switch>
                    <Route path={props.match.url + "/primary-teacher"}  component={PrimaryTeacher}/>
                    <Route path={props.match.url + "/secondary-teacher"}  component={SecondaryTeacher}/>
                    <Route path={props.match.url + "/senior-secondary-teacher"}  component={SeniorSecondary}/>
                    <Route path={props.match.url + "/other-jobs"}  component={OtherSubject}/>
                    <Route path={props.match.url + "/administrative"}  component={AdministrativeJobs}/>
                </Switch>
            </div>
        </div>
    )
}

export default SubJob
