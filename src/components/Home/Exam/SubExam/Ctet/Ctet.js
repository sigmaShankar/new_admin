import React from "react"
import styles from "./Ctet.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import {useHistory} from "react-router"

const Ctet = (props) => {
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
        <Title title="WHAT IS CTET"/>
        <div className={styles['ctet-container']}>
            <div>
            <p>
                {constants.EXAM.CTET.PARA_1}
            </p>
            <h3>
            {constants.EXAM.CTET.HEADER_1}
            </h3>
            <p>
                {constants.EXAM.CTET.PARA_2}
            </p>
            <p>
                {constants.EXAM.CTET.PARA_3}
            </p>
            <h3>
                {constants.EXAM.CTET.HEADER_2}
            </h3>
            <ul>
                {renderList(constants.EXAM.CTET.AIM)}
            </ul>
            <h3>
                {constants.EXAM.CTET.HEADER_3}
            </h3>
            <p>
                {constants.EXAM.CTET.PARA_4}
            </p>
            <p>
                There will be two papers of CTET
            </p>
            <ul>
                {renderList(constants.EXAM.CTET.PAPERS)}
            </ul>
            <p>
                {constants.EXAM.CTET.NOTE}
            </p>
            <h3>
                {constants.EXAM.CTET.HEADER_4}
            </h3>
            <p>
                {constants.EXAM.CTET.PARA_5}
            </p>
            <ul>
                {renderList(constants.EXAM.CTET.PAPER_1)}
            </ul>
            <h3 style={{paddingLeft: "2rem", fontSize: "1.2rem"}}>
                Total 150 MCQs 150 Marks
            </h3>
            <h3>
                {constants.EXAM.CTET.HEADER_5}
            </h3>
            <ul>
                {renderList(constants.EXAM.CTET.STANDARDS_1)}
            </ul>
            <h3>
                {constants.EXAM.CTET.HEADER_6}
            </h3>
            <p>
                {constants.EXAM.CTET.PARA_5}
            </p>
            <ul>
                {renderList(constants.EXAM.CTET.PAPER_2)}
            </ul>
            <h3 style={{textTransform: "none", fontSize: "1.3rem"}}>
                *For any other teacher - either (IV) or (V)
            </h3>
            <h3 style={{fontSize: "1.3rem"}}>
                Total 150 MCQs 150 Marks
            </h3>
            <h3>
                {constants.EXAM.CTET.HEADER_5}
            </h3>
            <ul>
                {renderList(constants.EXAM.CTET.STANDARDS_2)}
            </ul>
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
                Register For CTET Training
            </div>
        </div>
        </>
    )
}

export default Ctet
