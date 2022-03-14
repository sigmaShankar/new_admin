import React, { useEffect, useState } from "react"
import styles from "./UserPreference.module.css"
import Map from "../../Map/Map"
import axios from "axios"
// import * as constants from "../../Institutution/constants/constants"
const UserPreference  = (props) => {
    let constants = {}

    const [selectedLocations, setSelectedLocations] = useState([])
    const [currentLocation, setCurrentLocation] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordResetSuccessFull, setPasswordResetSuccessFull] = useState(false)
    const [isInvalidPassword, setIsInvalidPassword] = useState(false)
    const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState(false)
    const [isAutoComplete, setIsAutoComplete] = useState(true)
    const [isResetPassword, setIsResetPassword] = useState(false)
    // const [isFresher, setIsFresher] = useState("")
    const [designationList, setDesignationList] = useState([])
    const [invalidLocation, setInvalidLocation] = useState(false)
    const [error, setError ] = useState(false)
    const [isClose, setIsClose ] = useState(false)
    
    const [preferredDesignation, setPreferredDesignation] = useState({
        val: "",
        isValid: false,
        touched: false
    })

    const [isFresher, setIsFresher] = useState({
        val: false,
        isValid: false,
        touched: false
    })
    
    const [about, setAbout] = useState({
        val: "",
        isValid: false,
        touched: false
    })


    useEffect(() => {
        if(props.Location) {
            setCurrentLocation(props.Location)
        }

        if(props.isResetPassword) {
            setIsResetPassword(props.isResetPassword)
        }

        if(props.isFresher) {
            setIsFresher({
                ...isFresher,
                val: props.isFresher,
                isValid: true
            })
        }

        if(props.About) {
            setAbout({
                ...about,
                val: props.About,
                isValid: true 
                })
        }

        if(props.isFresher) {
            setIsFresher({
                ...isFresher,
                val: props.isFresher,
                isValid: true 
                })
        }

        if(props.preferredDesignation) {
            setPreferredDesignation({
                ...preferredDesignation,
                isValid: true,
                val: props.preferredDesignation
            })
        }

        if(props.preferredLocations){
            setSelectedLocations(props.preferredLocations.split(';'))
        }

        if(designationList.length === 0) {
            axios.get(constants.url + "site_management/designation")
            .then((response) => {
                if(response.data.error_code) {
                    setDesignationList([...response.data.output])
                }
            })
            .catch(err => {
                // //console.log(err)
           })
        }
        
    }, [])


    const onChangeTextHandler = (event, i) => {
        let value = event.target.value
        let isValid = false

        if(i === 1) {
             setPreferredDesignation({
                 ...preferredDesignation,
                 val: value,
                 isValid: value ? true : false
             })
        }

        if(i === 15) {
             setAbout({
                 ...about,
                 val: value,
                 isValid: true
             })
        }
    }

    const onSaveLocation = () => {
        if(selectedLocations.length) {
            //console.log(selectedLocations.join(";"))
            let data = new FormData()
            data.append('id', localStorage.getItem('teacher_id'))
            data.append('isFresher', isFresher.val)
            data.append('preferredLocations', selectedLocations.join(';'))
            data.append('preferredDesignation', preferredDesignation.val)
            data.append('About', about.val)
            //console.log(data)
            axios.post(constants.url + "teachers/profile", data)
            .then((res) => {
                if(res.data.error_code == 1) {
                    window.location.reload()
                }
            })
            .catch(err => {
                //console.log(err)
            })
        }
    }

    const onSaveInstLocation = () => {
        if(currentLocation) {
            let data = new FormData()
            data.append('id', localStorage.getItem('i_id'))
            data.append('About', about.val)
            data.append('Location', currentLocation)
            axios.post(constants.url + "institution/profile", data)
            .then((res) => {
                if(res.data.error_code == 1) {
                    window.location.reload()
                }
            })
            .catch(err => {
                //console.log(err)
            })
        } else {
            setInvalidLocation(true)
        }
    }

    const onSkip = () => {
        let data = new FormData()
        data.append('id', localStorage.getItem('teacher_id'))
        data.append('isSkip', true)
        axios.post(constants.url + "teachers/profile", data)
        .then((res) => {
            if(res.data.error_code == 1) {
                window.location.reload()
            }
        })
        .catch(err => {
            //console.log(err)
        })
    }

    const toggleMap = () => {
        if(isAutoComplete) {
            setCurrentLocation("Pottachira, Kerala, India")
        }

        setIsAutoComplete(!isAutoComplete)
    }

    const onSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const checkPassword = () => {
        if(/^[a-zA-Z0-9- ]*$/.test(password)) {
            //console.log("he;;")
            setIsInvalidPassword(true)
        } else {
            setIsInvalidPassword(false)
        }
    }

    const checkConfirmPassword = () => {
        if(password === confirmPassword) {
            setIsInvalidConfirmPassword(false)
        } else {
            setIsInvalidConfirmPassword(true)
        }
    }

    const onSetConfrimPassword = (event) => {
        setConfirmPassword(event.target.value) 
    }

    const onChangePassword = () => {

        if(password && confirmPassword && !isInvalidPassword && !isInvalidConfirmPassword) {
            axios.post("https://campusfield.in/api/verify/reset", {
                user_id: localStorage.getItem('email'),
                password: password
            }).then(res => {
                if(res.data.error_code) {
                    props.setPasswordResetSuccessFull(true)
                    props.setUserPreference(false)
                }
            })
            .catch(err => {
                setError(true)
            })
        } else {}
    }

    return (
        <div className={styles["backdrop"]}>
            <div className={styles['user-preference-container']}>
                 <i
                 onClick={() => {
                     //console.log(props.Location)
                     if(props.max === 3 && props.preferredLocations.length < 1) {
                        setIsClose(true)
                     } else if(props.isInstitution && props.Location.length === 0){
                        setIsClose(true)
                     } else {
                         props.setUserPreference(false)}} 
                     }
                 style={{position: "absolute", top: 10, right: 10, cursor: "pointer"}} className="fa fa-close"/>
             {
                 isResetPassword ? 
                 <>
                 {
                        isInvalidPassword ? 
                        <p 
                        style={{color: "red", textAlign: "center"}}>Password must atleast contain one special character</p> : null
                    }
                   <div
                    style={{marginBottom: "1rem"}} 
                   className={styles['input-container']}>
                   <input
                   type="password"
                   onChange={(event) => {onSetPassword(event)}}
                   value={password}
                   onBlur={() => {checkPassword()}}
                   placeholder="Enter Password"
                   />
                 </div>
                    {
                    isInvalidConfirmPassword ? 
                    <p style={{color: "red", textAlign: "center"}}>Confirm Password must match above password</p> : null
                    }
                  <div
                  className={styles['input-container']}>
                  <input
                  type="password"
                  onChange={(event) => {onSetConfrimPassword(event)}}
                  value={confirmPassword}
                  onBlur={() => {checkConfirmPassword()}}
                  placeholder="Confirm passsword"
                  />
                </div>
                <div className={styles['verify']} onClick={() => {onChangePassword()}}>
                    Reset
                </div>
                {
                    error ? <p style={{color: "red", textAlign: "center", marginTop: "1rem"}}>Something went wrong, Please try again later</p>: null
                }
                 </> : 
                 
                 !isResetPassword && props.isNotDesignation ? null :  
                <>
                <div style={{display: "flex", alignItems: "center", marginTop: 0, maxWidth: "500px", margin: "auto"}}>
                        Are you a fresher ?
                        <span style={{width: "20px"}}>
                            <input
                            onChange={(event) => {setIsFresher({touched: true, val: event.target.checked, isValid: true})}}
                            checked={isFresher.val}
                            style={{boxShadow: "none", marginLeft: "2rem"}} 
                            type="checkbox" id="isFresher"/>
                        </span>
                </div>
                <div className={styles["input-container"]}>
                    <select 
                    id="designation" 
                    name="desig"
                    onChange={(event) => {onChangeTextHandler(event, 1)}}
                    value={preferredDesignation.val}>
                        <option value="">SELECT DESIGNATION</option>
                        {
                            designationList.map((el, i) => {

                            return <option 
                                    key={i}
                                    value={el.name}>{String(el.name).toUpperCase()}</option>
                            })
                        }
                    </select>
                </div>
                </>
             } 
            {
                !isResetPassword ? 
                <>
                <div className={styles["description"]}>
                    <textarea
                    placeholder="About"
                    className={[!about.isValid && about.touched  ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setAbout({...about, touched: true})}}
                    onChange={(event) => {onChangeTextHandler(event, 15)}}
                    value={about.val}/>
                </div>
                {
                    props.max === 3 && isClose && props.preferredLocations.length < 1 ?
                    <p style={{color: "red", textAlign: "center"}}>Save atleast one preferred Location</p> : null
                }
                {
                    props.isInstitution && isClose && props.Location.length == 0 ?
                    <p style={{color: "red", textAlign: "center"}}>Please save Institution Location</p> : null
                }
                <h2>
                    {props.max === 3 ? "Select Upto 3 Preferred Job Location" : "Locate Your Institution"}
                </h2>
                {
                    invalidLocation ? <p style={{color: "red", maxWidth: "500px"}}>Please select a valid location</p> : null
                }
                {
                    props.max === 1 ? <p style={{textAlign :"center"}}>{currentLocation}</p> : null
                }
                {
                    selectedLocations.map((el, i) => {
                    return (
                    <>
                    <p className={styles['locations']}>
                        {props.max === 3 ? `${i + 1}.` : null} {el}
                    <i
                    key={`${i}da`}
                    onClick={() => {
                        selectedLocations.splice(i, 1)
                        setSelectedLocations([...selectedLocations])
                    }} 
                    style={{position: "absolute", right: 10}} className="fa fa-close"/>
                    </p>
                    </>)
                    })
                }
                <div
                className={styles['map']} 
                style={{display: "flex", justifyContent: "center", alignItems: "center", height: isAutoComplete ? "3rem" : "5%", maxWidth: "500px",
                margin: "auto"}}>
                <div style={isAutoComplete ? {flex: 0.7} : {width: "100%", maxWidth: '1600px', position: "absolute", top: 0}}>
                
                <Map
                currentLocation={currentLocation}
                isAutoComplete={isAutoComplete}
                setCurrentLocation={setCurrentLocation}
                />
                </div>
                {props.max === 3 && isAutoComplete? <div
                style={{flex: 0.3}}
                onClick={() => {
                    //console.log(selectedLocations.join(";"))

                    if(currentLocation && selectedLocations.length < props.max) {
                        setSelectedLocations([...selectedLocations, currentLocation])
                        setCurrentLocation('')
                    }

                }
                } 
                className={styles['map-button']}>
                    Add
                </div>: null}
                </div>
                <div className={styles['map-buttons']}>
                    {
                        isAutoComplete ?
                        <div
                        onClick={() => {props.max === 3 ? onSaveLocation() : onSaveInstLocation()}} 
                        className={styles['map-button']}>
                            Save
                        </div>: !props.isInstitution ?
                        <div
                        style={{flex: 0.3}}
                        onClick={() => {
                            //console.log(selectedLocations.join(";"))
                            setIsAutoComplete(true)
                            if(currentLocation && selectedLocations.length < props.max) {
                                setSelectedLocations([...selectedLocations, currentLocation])
                                setCurrentLocation('')
                            }
                        }
                        } 
                        className={styles['map-button']}>
                            Add
                        </div> : null

                    }

                </div>
                <div className={styles['map-buttons']} style={{justifyContent: "space-between"}}>
                <div
                onClick={() => {toggleMap()}} 
                style={{justifyContent: "center", alignItems: "center", display: "flex", width: "auto", padding: "0.5rem", height: "25px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer"}}>
                    {isAutoComplete ? "Choose your location on map" : "Back"}
                </div>
                {!isAutoComplete && !props.isInstitution?  
                <div
                style={{marginTop: 0}}
                onClick={() => {toggleMap()}} 
                className={styles['map-button-inst']}>
                    Done
                </div> : null
                }
                {/* {props.max == 3 && isAutoComplete? <div
                onClick={onSkip}
                style={{justifyContent: "center", alignItems: "center", display: "flex", width: "60px", height: "25px", background: "orange", color: "white", borderRadius: "5px"}}>
                    Skip
                </div>: null} */}
                </div>             
                </> : null}
            {   
                        !isAutoComplete && props.isInstitution ?
                        <div
                        // style={{margin: "auto", marginTop: "7rem", height: "20%"}}
                        onClick={() => {toggleMap()}} 
                        className={styles['map-button-inst']}>
                            Done
                        </div>: null}
            </div>
            {

            }
        </div>
    )
}

export default UserPreference
