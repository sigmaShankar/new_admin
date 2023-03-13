import React from "react"
import styles from "./NewSchool.module.css"
import * as constants from "../../../constants/constants"
import Title from "../../../SubHome/Title/Title"
import Buttons from "../../../JobComponent/SubJob/Buttons/Buttons"

const NewSchool = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    const renderList = (items) => {

        return items.map((el) => {
            return (<li>
                        {el}
                    </li>)
        })
    }

    return (
        <>
        <div className={styles["is-padding"]}>
            <Title title="SUPPORT FOR NEW SCHOOLS"/>
        </div>
        <div className={styles['new-schools']}>
            <div className={styles["container"]}>
            <p>
            Are you planning to start a new school and is looking for professional advise . Campus field provides total end to end solutions from the project conception to realization level . The Campus Field Consultancy Service has been carefully designed to ensure that our consultants meet 
            the specific needs of our clients. Our highly experienced consultants can offer support to schools, commercial organizations and private investors globally.
            </p>
            <div className={styles["services"]}>
                <h3 style={{fontWeight: 400}}>
                    {constants.SCHOOL.NEW_SCHOOL.HEADER_1}
                </h3>
                <ul>
                    {renderList(constants.SCHOOL.NEW_SCHOOL.SERVICES)}
                </ul>
            </div>
            </div>
            <div style={{height: "auto", marginTop: "3rem", marginBottom: 0}}>
                
                <Buttons
                 links={["/teacher-sign-up", "/teacher-sign-up", "/institution-sign-up" ]} 
                buttons={["GET ASSESSED", "REGISTER PROGRAMS", "TEACHER RECRUITMENT"]}/>
            </div>
        </div>
        </>
    )
}

export default NewSchool
