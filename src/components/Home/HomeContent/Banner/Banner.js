import React, { useState, useEffect } from "react"
import styles from "./Banner.module.css"
import * as constants from "../../constants/constants"
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./custom.css"
import { Carousel } from 'react-responsive-carousel';
import axios from "axios"

const Banner = (props) => {
    const history = useHistory();
    const [data, setData] = useState("")
    const signupPage = () =>{
        history.push("/sign-in")
    };

    let buttons =  constants.HOME.BANNER.BUTTONS.map((title, i) => {
        return (
            <button
            key={i} 
            onClick = {signupPage}
            className={styles["buttons"]}>
                {title}
            </button>
            
        )
    })

    useEffect(() => {
        if(data === "") {
            axios.get("https://campusfield.in/api/site_management/banner")
            .then((res) => {
                if(res.data.error_code === 1) {
                    // //console.log(res.data.output)
                    setData(res.data.output)
                }
            })
            .catch((err) => {
                // //console.log(err)
                setData([])
            })

        }
    })

    return (
        <div className={styles['banner-container']}>
            <Carousel autoPlay infiniteLoop>
                {
                    data ? data.map((el, i) => {
                    return  (<div key={i}>
                                <img src={el.image_path} />
                            </div>)
                    }) : null
                }
                {/* <div>
                    <img src={require("../../../../assets/banner_1.png")} />
                </div>
                <div>
                    <img src={require("../../../../assets/banner_2.png")}/>
                </div> */}
            </Carousel>
            <div className={styles["login-navigator"]}>
                <h2>
                    Welcome to Campus Field Education
                </h2>
                <p>
                    Offering Professional Education Solution in India
                </p>
                <div className={styles["button-list"]}>
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default Banner
