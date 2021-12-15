import React from "react"
import styles from "./Certification.module.css"
import * as constants from "../constants/constants"
import CommonHeader from "../CommonHeader/CommonHeader"
import Apply from "../Apply/Apply"
import Buttons from "../JobComponent/SubJob/Buttons/Buttons"

const Certification = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    let certify = constants.CERTIFICATION.CERTIFY
    let programs = certify.PROGRAM.map((el, i) => {
        return <Apply key={i} title={el} link="#" index={i}/>
    })

    return (
        <div className={styles['certification-container']}>
            <CommonHeader 
            img="assets/board-img.jpg"
            header_1={constants.CERTIFICATION.HEADER_1}
            header_2={constants.CERTIFICATION.HEADER_2}/>
            <main className={styles["main"]}>
                <h3 style={{textAlign: "center", fontSize: "1.3rem", fontWeight: 400}}>
                    {constants.CERTIFICATION.CERTIFY.HEADER_1}
                </h3>
                <p className={[styles["center"], styles["common-text-style"]].join(" ")}>
                {constants.CERTIFICATION.CERTIFY.PARA_1}
                </p>
                <div className={styles["program-container"]}>
                    {programs}
                </div>
                <ul className={styles["category"]}>
                    {certify.CATEGORY.map((el, i) => {
                        return <li key={i} className={styles["common-text-style"]}>{el}</li>
                    })}
                </ul>
                <p style={{margin:"2rem", marginLeft: 0}}>
                    {certify.PARA_2}
                </p>
                <h2 style={{fontSize: "1.2rem", fontWeight: 400}}>
                    {certify.HEADER_2}
                </h2>
                <ul className={styles["category"]}>
                    {certify.BENEFITS.map((el, i) => {
                        return <li key={i} className={styles["common-text-style"]}>{el}</li>
                    })}
                </ul>
                <p style={{fontSize: "1.7rem", fontWeight: 300, marginTop: "2rem"}}>
                    {certify.HEADER_3}
                </p>
                <p>
                    {certify.PARA_3}
                </p>
                <p>
                    {certify.PARA_4}
                </p>
                <h3 style={{fontSize: "0.9rem", fontWeight: 400, marginBottom: "10px"}}>
                    {certify.HEADER_4}
                </h3>
                <p>
                    {certify.PARA_5}
                </p>
                <div className={styles["modules-container"]}>
                    <ul className={styles["modules"]}>
                        {certify.MODULES_1.map((el, i) => {
                            return <li key={i}>{el}</li>
                        })}
                    </ul>
                    <ul className={styles["modules"]}>
                        {certify.MODULES_2.map((el, i) => {
                            return <li key={i}>{el}</li>
                        })}
                    </ul>
                </div>
                <p style={{fontSize: "0.9rem"}}>
                    {
                        certify.PARA_6
                    }
                </p>
                <h3 style={{fontSize: "1.5rem", fontWeight: 300, marginTop: "2rem"}}>
                    {certify.HEADER_6}
                </h3>
                <h3 style={{fontSize: "0.9rem", fontWeight: 400, marginBottom: "10px", marginTop: "20px"}}>
                    {certify.HEADER_7}
                </h3>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_7
                    }
                </p>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_8
                    }
                </p>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_9
                    }
                </p>
                <h3 style={{fontSize: "1.2rem", fontWeight: 400, marginBottom: "10px", marginTop: "20px"}}>
                    {certify.STRONG_1}
                </h3>
                <ul>
                    {certify.SUPPORT.map((el, i) => {
                        return <li key={i}>{el}</li>
                    })}
                </ul>
                <p  style={{fontSize: "1.5rem", fontWeight: 300, marginTop: "2rem"}}>
                    {certify.HEADER_8}
                </p>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_10
                    }
                </p>
                <h3 style={{fontSize: "0.9rem", fontWeight: 400, marginBottom: "10px", marginTop: "20px"}}>
                    {certify.HEADER_9}
                </h3>
                <ul>
                    {certify.AVAILABLE_MODULES.map((el, i) => {
                        return <li key={i}>{el}</li>
                    })}
                </ul>
                <h3 style={{fontSize: "1.5rem", fontWeight: 300, marginTop: "2rem"}}>
                    {certify.HEADER_10}
                </h3>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_11
                    }
                </p>
                <h3 style={{fontSize: "1.2rem", fontWeight: 400, marginBottom: "10px", marginTop: "20px"}}>
                    {certify.STRONG_1}
                </h3>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_11
                    }
                </p>
                <p className={styles["common-text-style"]}>
                    {
                        certify.PARA_11
                    }
                </p>
                <ul>
                    {certify.WHAT_IS_ABOUT.map((el, i) => {
                        return <li key={i}>{el}</li>
                    })}
                </ul>
                <Buttons
                links={["/teacher-sign-up"]} 
                buttons={["Register"]}/>
            </main>
        </div>
    )
}

export default Certification
