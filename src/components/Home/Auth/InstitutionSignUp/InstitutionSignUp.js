import React, { useState, useEffect } from "react"
import styles from "./InstitutionSignUp.module.css"
import { NavLink, Router } from "react-router-dom"
import * as constants from "../../constants/constants"
import axios from "axios"
import InvalidHighlighter from "../InvalidHighlighter/InvalidHighlighter"
import Otp from "../../../Otp/Otp"
import {signUp, isMailExist} from "../../../../Service/SingnUpService"
import Alert from "../../../Toast/Toast"


const InstitutionSignUp = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [message, setMessage] = useState("")
    const [stateList, setStateList] = useState("")
    const [isUserIdExist, setIsUserIdExist] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [isInvalidOtp, setIsInvalidOtp] = useState(false)
    const [districtList, setDistrictList] = useState("")
    const [isFormValid, setIsFormValid] = useState({
        touched : false,
        isValid: false
    })
    const [isdiable,setisdiable] = useState(false)
    const [email, setEmail] = useState({
        val: "",
        isValid: false,
        touched: false
    })

    const [password, setPassword] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [confirmPassword, setConfirmPassword] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [confirmMail, setConfirmMail] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [name, setName] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [phoneNumber, setPhoneNumber] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [address, setAddress] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [street, setStreet] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [city, setCity] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [state, setState] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [district, setDistrict] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [pin, setPin] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [about, setAbout] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [webAddress, setWebAddress] = useState({
        val: "",
        isValid: true,
        touched: false
    })
    const [logo, setLogo] = useState({
        val: "",
        isValid: true,
        touched: false
    })

    useEffect(() => {
        if(stateList.length === 0) {
            axios.get(constants.url + "/site_management/state")
                 .then((response) => {
                     setStateList([...response.data.output])
                 })
                 .catch(err => {
                    //  //console.log(err)
                 })
        }

        if(districtList.length === 0) {
            axios.get(constants.url + "/site_management/district")
            .then((response) => {
                setDistrictList([...response.data.output])
            })
            .catch(err => {
                // //console.log(err)
           })
        }
        
    }, []);
    
    const onCancel = () => {
        setIsOtp(false)
    }

    // const onOtp = () => {
    //

    //     if(isValid) {
    //         setIsOtp(true)
    //         // axios.get(`https://campusfield.in/api/verify/mobile/${phoneNumber.val}/${email.val}`)
    //         // .then(res => {
    //         //     setIsOtp(true)
    //         // })
    //         // .catch(err => {
    //         //     //console.log(err)
    //         // })
    //     }
    // }

    const initiateIsMailExist = (email) =>{
        isMailExist(email)
        .then(res => {
            if(res.data.error_code == 1) {
                setIsUserIdExist(true)
            } else {
                setIsUserIdExist(false)
            }
        })
        .catch(err => {
            setAlert()
        })
    }

    // const onCancel = () => {
    //     setIsOtp(false)
    // }

    const setAlert = () => {
        setMessage("something went wrong!")
        setTimeout(() => {
            setMessage("")
        }, 3000)
    }

    let states;
    if(stateList.length) {
        let updatedList = [{name: " "}, ...stateList]
        states = updatedList.map((el, i) => {
            // //console.log(el)
            return <option key={i} value={`${el.name}`}>{el.name.trim() ? el.name.toUpperCase() : "SELECT STATE"}</option>
        })
    }

    let districts;
    if(districtList.length) {
        let updatedList = [{name: " "}, ...districtList]
        districts = updatedList.map((el, i) => {
    
            return <option key={i} value={`${el.name}`}>{el.name.trim() ? el.name.toUpperCase() : "SELECT DISTRICT"}</option>
        })
    }


    const validateForm = () => {
        return email.isValid && name.isValid &&  password.isValid &&
                confirmPassword.isValid && address.isValid && street.isValid && city.isValid &&
                phoneNumber.isValid && about.isValid && pin.isValid && district.isValid
    }

    const onRegister = (event) => {
        setisdiable(true)
        let isValid = validateForm()
        setEmail({...email, touched: true})
        setPassword({...password, touched: true})
        setConfirmPassword({...confirmPassword, touched: true})
        setName({...name, touched: true})
        setAbout({...about, touched: true})
        setAddress({...address, touched: true})
        setCity({...city, touched: true})
        setState({...state, touched: true})
        setStreet({...street, touched: true})
        setPhoneNumber({...phoneNumber, touched: true})
        setPin({...pin, touched: true})
        setDistrict({...district, touched: true})
        setIsFormValid({
            isValid: isValid,
            touched: true 
        })
        if(isValid) {            
            signUp({
                "Name": name.val,
                "Website": webAddress.val,
                "Phone_Number": phoneNumber.val,
                "Email": email.val,
                "Pass": password.val,
                "About": about.val,
                "State": state.val,
                "Street": street.val,
                "city": city.val,
                "District": district.val,
                "signupFrom": "website",
                "Pin": pin.val,
                "Location": "",
                "Address": address.val,
                "type": "institution",
                "Logo": logo.val,
                "webAddress": webAddress.val
            }, '/institution')
            .then(value => {
                //console.log(value)
                if(value) {
                    props.history.push({
                        pathname: "/sign-in",
                        state: {
                            message: "Successfully Registered and Your account will be approved within 24hrs!"
                        }
                    })
                } else {
                    setisdiable(false)
                    setAlert()
                }
            }, reason => {
                setAlert()
            })               
        }
    }

    // //console.log(res)
    //             if(res.data.error_code === 1) {
    //                 axios.get(`https://campusfield.in/api/verify/email/${email.val}`)
    //                 .then(res => {
    //                     onOtp(email.val)
    //                 })
    //                 .catch(err => {
    //                     //console.log(err)
    //                 })
    //             }

    const validate = (i, val) => {
        if(i === 1) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
        }

        if(i === 55) {
            return val === email.val
        }

        if(i === 2) {
            if(/^[a-zA-Z0-9- ]*$/.test(val) === true) {
                return false
            }

            return true
        }

        if(i === 3) {
            return val === password.val
        }

        if(i === 4) {
            return val ? true : false
        }

        if(i === 5) {
            return /^\d{10}$/.test(val)
        }

        if(i === 6) {
            return val ? true : false
        }

        if(i === 7) {
            return val ? true : false
        }

        if(i === 8) {
            return val ? true : false
        }

        if(i === 9) {
            return val ? true : false
        }

        if(i === 10) {
            return val ? true : false
        }

        if(i === 11) {
            return val.length === 6
        }

        if(i === 12) {
            return val ? true : false
        }
    }
    
    const onChangeTextHandler = (event, i) => {

        let value = event.target.value

        if(i === 1) {
            
            
            setEmail({
                ...email,
                val: value,
                isValid: validate(i, value)
            })
            
            // if(email.touched && email.isValid) {
            //     initiateIsMailExist(email.val)
            // }
        }

        if(i === 55) {
            // if(email.touched && email.isValid) {
            //     initiateIsMailExist(email.val)
            // }

            setConfirmMail({
                ...confirmMail,
                val: value,
                isValid: validate(i, value)
            })
        }


        if(i === 2) {
            
            setPassword({
                ...password,
                val: value,
                isValid:  validate(i, value)
            })

        }

        if(i === 3) {
             setConfirmPassword({
                 ...confirmPassword,
                 val: value,
                 isValid:  validate(i, value)
             })
        }


        if(i === 4) {
            setName({
                ...name,
                val: value,
                isValid:  validate(i, value)
            })
        }

        if(i === 5 && (/^[0-9]*$/.test(value) || value === "")) {
            setPhoneNumber({
                 ...phoneNumber,
                 val: value,
                 isValid: validate(i, value)
            })
        }

        if(i === 6) {
             setAddress({
                 ...address,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 7) {
             setStreet({
                 ...street,
                 val: value,
                 isValid: value ? true : false
             })
        }

        if(i === 8) {
             setCity({
                 ...city,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 9) {
             setState({
                 ...state,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 10) {
             setDistrict({
                 ...district,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 11 && (/^[0-9]*$/.test(value) || value === "")) {
             setPin({
                 ...pin,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 12) {
             setAbout({
                 ...about,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 13) {
            setWebAddress({
                ...webAddress,
                val: value
            })
       }

       setIsFormValid({
        ...isFormValid,
        isValid: validateForm()
    })
    }

    const onVerify = (otp) => {
        axios.get(`https://campusfield.in/api/verify/otpVerification/${email.val}/${otp}/sms`)
        .then(res => {
            if(res.data.error_code == 1) {
               props.history.push({
                        pathname: "/sign-in",
                        state: {
                            isEmailSent: "Thank you for registering with campusfield!. Verification mail has been sent to Your Account. Plese verify your mail id in order to login."
                        }
                })
            }
        })
        .catch(err => {
            //console.log(err)
            setIsInvalidOtp(true)
        })
    }

    const onOtp = () => {
        axios.get(`https://campusfield.in/api/verify/mobile/${phoneNumber.val}/${email.val}`)
        .then(res => {
            setIsOtp(true)
        })
        .catch(err => {
            //console.log(err)
        })
    }

    return (
        <> {isOtp ? <Otp
            email={email.val}
            isInvalidOtp={isInvalidOtp}
            onVerify={onVerify}
            onCancel={onCancel}/>:
        <div className={styles['sign-up-container']}>
            <form id="InstitutionSignup">
                <h2>
                    SIGNUP FOR INSTITUTION
                </h2>
                <h3 style={{marginTop: "40px"}}>
                    Signup Details
                </h3>
                <div className={styles["input-container"]}>
                    <input
                    className={[email.touched && !email.isValid ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {
                        initiateIsMailExist(email.val)
                        setEmail({...email, touched: true})}
                    }
                    value={email.val}
                    onChange={(event) => {onChangeTextHandler(event, 1)}}
                    placeholder="Email"
                    />
                </div>
                <InvalidHighlighter 
                message="Please enter valid email id"
                visible={email.touched && !email.isValid}
                />
                <InvalidHighlighter 
                message="User Id already exists"
                visible={email.touched && email.isValid && isUserIdExist}/>
                <div className={styles["input-container"]}>
                    <input
                    className={[confirmMail.touched && !confirmMail.isValid ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {
                        setConfirmMail({...confirmMail, touched: true})
                    }}
                    onChange={(event) => {onChangeTextHandler(event, 55)}}
                    value={confirmMail.val}
                    placeholder="confirm Email"
                    />
                </div>
                <InvalidHighlighter 
                message="should match the above email"
                visible={confirmMail.touched && !confirmMail.isValid}/>
                <div className={styles["input-container"]}>
                    <input
                    className={[password.touched && !password.isValid ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setPassword({...password, touched: true})}}
                    value={password.val}
                    onChange={(event) => {onChangeTextHandler(event, 2)}}
                    placeholder="Password* (must contain atleast one special character)" 
                    type="password"/>
                </div>
                <InvalidHighlighter 
                message={password.val.length ? "Password must atleast contain atleast one special character": "Please enter valid password"}
                visible={password.touched && !password.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                    className={[!confirmPassword.isValid && confirmPassword.touched  ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setConfirmPassword({...confirmPassword, touched: true})}}
                    value={confirmPassword.val}
                    type="password"
                    onChange={(event) => {onChangeTextHandler(event, 3)}}
                    placeholder="Confirm Password*"/>
                </div>
                <InvalidHighlighter 
                message="Password did not match with the above password"
                visible={confirmPassword.touched && !confirmPassword.isValid}
                />
                <h3 style={{marginTop: "0.9rem"}}>
                    Institution Details
                </h3>
                <div className={styles["input-container"]}>
                    <input
                    className={[name.touched & !name.isValid ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setName({...name, touched: true})}}
                    value={name.val}
                    onChange={(event) => {onChangeTextHandler(event, 4)}}
                    placeholder="Name*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter name"
                visible={name.touched && !name.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                    type = "numeric"
                    className={[!phoneNumber.isValid && phoneNumber.touched ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setPhoneNumber({...phoneNumber, touched: true})}}
                    value={phoneNumber.val}
                    maxLength={10}
                    onChange={(event) => {onChangeTextHandler(event, 5)}}
                    placeholder="Phone Number*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter valid phone number"
                visible={phoneNumber.touched && !phoneNumber.isValid}
                />
                {/* <div className={styles["input-container"]}>
                    <input
                    className={[!address.isValid && address.touched  ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setAddress({...address, touched: true})}}
                    value={address.val}
                    onChange={(event) => {onChangeTextHandler(event, 6)}}
                    placeholder="Address*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter address"
                visible={address.touched && !address.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                     className={[!street.isValid && street.touched  ? styles["invalid"] : null].join(" ")}
                     onBlur={() => {setStreet({...street, touched: true})}}
                    value={street.val}
                    onChange={(event) => {onChangeTextHandler(event, 7)}}
                    placeholder="Street*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter street"
                visible={street.touched && !street.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                    className={[!city.isValid && city.touched  ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setCity({...city, touched: true})}}
                    value={city.val}
                    onChange={(event) => {onChangeTextHandler(event, 8)}}
                    placeholder="City*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter city"
                visible={city.touched && !city.isValid}
                />
                <div className={styles["input-container"]}>
                    <select
                    onChange={(event) => {onChangeTextHandler(event, 12)}}
                    className={[!state.isValid && state.touched  ? styles["invalid"] : null].join(" ")}
                    value={state.val} 
                    id="state" 
                    name="select-state"
                    onChange={(event) => {onChangeTextHandler(event, 9)}}>
                        {states}
                    </select>
                </div>
                <div
                className={[!district.isValid ? styles["invalid"] : null].join(" ")}
                onBlur={() => {setDistrict({...district, touched: true})}} 
                className={styles["input-container"]}>
                    <select
                    value={district.val} 
                    id="district" 
                    name="select-district"
                    onChange={(event) => {onChangeTextHandler(event, 10)}}>
                        {districts}
                    </select>
                </div>
                <div className={styles["input-container"]}>
                    <input
                     className={[!pin.isValid && pin.touched  ? styles["invalid"] : null].join(" ")}
                     onBlur={() => {setPin({...pin, touched: true})}}
                    value={pin.val}
                    maxLength={6}
                    onChange={(event) => {onChangeTextHandler(event, 11)}}
                    placeholder="Pin*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter pin"
                visible={pin.touched && !pin.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                    onBlur={() => {setWebAddress({...webAddress, touched: true})}}
                    value={webAddress.val}
                    onChange={(event) => {onChangeTextHandler(event, 13)}}
                    placeholder="Web Address"/>
                </div> */}
                {/* <div>
                    <p style={{marginBottom: 0, marginTop: "10px", textAlign: "left"}}>
                        Logo(.png, .jpeg)
                    </p>
                    <input 
                    onChange={(event) => {onUploadLogo(event)}}
                    className={styles["file"]}
                    accept="image/png, image/jpeg"
                    type="file"/>
                </div> */}
                {/* <h3 style={{marginTop: "0.9rem"}}>
                    Brief about you (Mandatory)
                </h3>
                <div className={styles["description"]}>
                    <textarea
                    className={[!about.isValid && about.touched  ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setAbout({...about, touched: true})}}
                    value={about.val} 
                    onChange={(event) => {onChangeTextHandler(event, 12)}}/>
                </div>
                <InvalidHighlighter 
                message="Please enter few lines about your institution"
                visible={about.touched && !about.isValid}
                /> */}
                <div className={styles["submit"]} onClick={onRegister} style={{display: isdiable ? 'none' : 'flex' }}>
                    Sign Up
                </div>
                <div style={{height: "auto", width: "auto", display: "flex", justifyContent: "center", marginTop:"0.5rem"}}> 
                <InvalidHighlighter 
                message="Please enter valid details for all required fields"
                visible={isFormValid.touched && !isFormValid.isValid}
                />
                </div>
                <div className={styles["register"]}>
                    <p>
                        If you have an account?
                    </p>
                    <div className={styles["register-link"]}>
                        <NavLink to={{
                            pathname: "/sign-in"
                        }}>
                            Login
                        </NavLink>
                    </div>
                </div>
            </form>
            
                    </div> }
        {message ? <Alert message={message} color="red" />: null}
             
                    </>
    )

}
export default InstitutionSignUp
