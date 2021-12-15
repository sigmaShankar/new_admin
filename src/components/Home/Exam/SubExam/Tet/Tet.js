import React from "react"
import styles from "./Tet.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import {useHistory} from "react-router"

const Tet = (props) => {
    let history = useHistory()
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const renderList = (items) => {

        return items.map((el, i) => {
            return (<li key={i}>
                {el}
                </li>)
        })

    }

    return (
        <>
        <Title title="WHAT TRAIN WITH CAMPUS FIELD FOR CTET?"/>
        <div className={styles['tet-container']}>
            <div>
            <p>
                {constants.EXAM.TET.PARA_1}
            </p>
            <p>
                {constants.EXAM.TET.PARA_2}
                <strong>Paper 1</strong>
                {constants.EXAM.TET.PARA_3}
                <strong>Paper 2</strong>
                {constants.EXAM.TET.PARA_4}
            </p>
            <h3 style={{fontSize: "1rem"}}>
                {constants.EXAM.TET.PARA_5}
            </h3>
            <p>
                {constants.EXAM.TET.PARA_6}
            </p>
            <div className={styles["program-overview"]}>
                <h3 style={{fontWeight: 500, fontSize: "1.2rem"}}>
                    {constants.EXAM.CTET.HEADER_7}
                </h3>
                <ul>
                    {renderList(constants.EXAM.CTET.OVERVIEW)}
                </ul>
            </div>
            </div>
            <div
            onClick={() => {history.push("/teacher-sign-up")}}
            className={styles["register"]}>
                Register For Ctet Training
            </div>
        </div>
    </>
    )
}

export default Tet
