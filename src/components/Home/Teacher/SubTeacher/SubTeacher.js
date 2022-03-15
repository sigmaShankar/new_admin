import React from "react"
import styles from "./SubTeacher.module.css"
import * as constants from "../../constants/constants"
import CommonHeader from "../../CommonHeader/CommonHeader"
import { Route, Switch } from "react-router"
import CurrentlyEmployed from "./CurrentlyEmployed/CurrentlyEmployed"
import FinishingSchool from "./FinishingSchool/FinishingSchool"
import Montessori from "./Montessori/Montessori"

const SubTeacher = (props) => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className={styles['teachers-container']}>
            <CommonHeader 
            img="assets/Banner4.jpg"/>
            <div className={styles["sub-teacher-container"]}>
                {/* <p>
                    <span className={styles["average"]}>
                        An average teacher    
                    </span>

                        {" "}
                    <span className={styles["imaginative"]}>
                        An imaginative teacher
                    </span>
                        {" "}
                    <span className={styles["innovative"]}>
                        An innovative teacher
                    </span>
                </p> */}
                <Switch>
                    <Route path={props.match.url + "/currently-employed"}  component={CurrentlyEmployed}/>
                    <Route path={props.match.url + "/fresh-graduates"}  component={CurrentlyEmployed}/>
                    <Route path={props.match.url + "/finishing-school-for-teachers"}  component={FinishingSchool}/>
                    <Route path={props.match.url + "/montessori"}  component={Montessori}/>
                </Switch>
            </div>
        </div>
    )
}

export default SubTeacher
