import React, { useEffect } from 'react';

import styles from "./EmptyList.module.css"
import { NavLink,Link } from "react-router-dom" 
import { ThemeProvider } from '@material-ui/core';

const EmptyList = (props) => {

    useEffect(() => {
        //console.log(props)
    })

    return (
        <p
        style={{ fontWeight: "500", 
            color: "gray",
            fontSize: "0.9rem"}} 
        className={styles["message"]}>
            {props.message}
        </p>
    )
}

export default EmptyList;
