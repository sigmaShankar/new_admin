import React, { useState, useEffect } from "react"
import styles from "./TeacherSignUp.module.css"
import { NavLink, Redirect } from "react-router-dom"
import axios from "axios"
import * as constants from "../../constants/constants"
import InvalidHighlighter from "../InvalidHighlighter/InvalidHighlighter"
import SignIn from "../SignIn/SignIn"
import Otp from "../../../Otp/Otp"
import {signUp, isMailExist} from "../../../../Service/SingnUpService"
import Alert from "../../../Toast/Toast"

const TeacherSignUp = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [message, setMessage] = useState("")
    let date = new Date()
    let month = date.getMonth() 
    month = String(month).length === 1 ? `0${month + 1}` : month + 1
    let parsedDate = `${date.getFullYear()}-${month}-${date.getDate()}`
    const [isRedirect, setIsRedirect] = useState(false)
    const [stateList, setStateList] = useState("")
    const [isOtp, setIsOtp] = useState(false)
    const [isInvalidOtp, setIsInvalidOtp] = useState(false)
    const [districtList, setDistrictList] = useState("")
    const [isUserIdExist, setIsUserIdExist] = useState(false)
    const [age, setAge] = useState(0)
    const [isFormValid, setIsFormValid] = useState({
        touched : false,
        isValid: false
    })
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
    const [firstName, setFirstName] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [lastName, setLastName] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [birthDate, setBirthDate] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [gender, setGender] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [phoneNumber, setPhoneNumber] = useState({
        val: "",
        isValid: false,
        touched: false
    })
    const [confirmMail, setConfirmMail] = useState({
        val: "",
        isValid: false,
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
    const [address, setAddress] = useState({
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

    const validateForm = () => {
        return email.isValid && firstName.isValid && lastName.isValid && password.isValid &&
                confirmPassword.isValid && address.isValid && street.isValid && city.isValid && phoneNumber.isValid && about.isValid &&
                pin.isValid && district.isValid && confirmMail.isValid
    }

    const getAge = (from) => {
        let to = new Date().getTime()
        from = new Date(from).getTime()
        var diff =(to - from ) / 1000;
        diff /= (60 * 60 * 24);
        diff = (diff/365).toFixed(0)

        return diff;
    }
    
    const setAlert = () => {
        setMessage("something went wrong!")
        setTimeout(() => {
            setMessage("")
        }, 3000)
    }

    const onRegister = (event) => {
        let isValid = validateForm()
        setEmail({...email, touched: true})
        setPassword({...password, touched: true})
        setConfirmPassword({...confirmPassword, touched: true})
        setFirstName({...firstName, touched: true})
        setLastName({...lastName, touched: true})
        setBirthDate({...birthDate, touched: true})
        setGender({...gender, touched: true})
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
                "First_name": firstName.val,
                "Last_name": lastName.val,
                "Pass": password.val,
                "DOB": birthDate.val,
                "Phone_Number": phoneNumber.val,
                "Email": email.val,
                "Gender": gender.val,
                "isFresher": 'true',
                "isSkip": false,
                "isSubscribed": age > 7,
                "About": about.val,
                "address": address.val,
                "city": city.val,
                "type":"teacher",
                "State": state.val,
                "age": age,
                "Street": street.val,
                "District": district.val,
                "signupFrom": "website",
                "Pin": pin.val,
                "Profile_pic":"",
                "Resume":"",
                "Qualification":[],
                "Certification":[],
                "Training_from_campus":[],
                "preferredLocations": '',
                "preferredDesignation": "",
                "Experience":[],
                "Transactions":[],
                "applied_jobs":[]
                    }, '/teachers')
            .then(response => {
                if(response) {
                    props.history.push({
                        pathname: "/sign-in",
                        state: {
                            message: "Successfully Registered!"
                        }
                    })
                } else {
                    setAlert()
                }
            }, reason => {
                setAlert()
            })               
        }
    }
    // if(res.data.error_code === 1) {
    //     axios.get(`https://campusfield.in/api/verify/email/${email.val}`)
    //     .then(res => {
    //         onOtp(email.val)
            
    //     })
    //     .catch(err => {
    //         //console.log(err)
    //     })
    // }
    
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
            return val ? true : false
        }

        if(i === 6) {
            return val ? true : false
        }

        if(i === 7) {
            return val ? true : false
        }

        if(i === 8) {
            return /^\d{10}$/.test(val)
        }

        if(i === 9) {
            return val ? true : false
        }

        if(i === 10) {
            return val ? true : false
        }

        if(i === 11) {
            return val ? true : false
        }

        if(i === 12) {
            return val ? true : false
        }

        if(i === 13) {
            return val ? true : false
        }

        if(i === 14) {
            return val.length === 6
        }

        if(i === 15) {
            return val ? true : false
        }
    }
    
    const onChangeTextHandler = (event, i) => {
        let value = event.target.value
        let isValid = false

        if(i === 1) {
            // if(email.touched && email.isValid) {
            //     initiateIsMailExist(email.val)
            // }

            setEmail({
                ...email,
                val: value,
                isValid: validate(i, value)
            })
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
             setFirstName({
                 ...firstName,
                 val: value,
                 isValid:  validate(i, value)
             })
        }

        if(i === 5) {
             setLastName({
                 ...lastName,
                 val: value,
                 isValid:  validate(i, value)
             })
        }

        if(i === 6) {
             setBirthDate({
                 ...birthDate,
                 val: value,
                 isValid:  validate(i, value)
             })
             setAge(getAge(value))
        }

        if(i === 7) {
             setGender({
                 ...gender,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if( i===8 && (/^[0-9]*$/.test(value) || value === "")) {
            setPhoneNumber({
                 ...phoneNumber,
                 val: value,
                 isValid: validate(i, value)
            })
        }

        if(i === 9) {
             setAddress({
                 ...address,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 10) {
             setStreet({
                 ...street,
                 val: value,
                 isValid: value ? true : false
             })
        }

        if(i === 11) {
             setCity({
                 ...city,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 12) {
            if(state.touched) {
                isValid =  validate(i, value)
             }
 
             setState({
                 ...state,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 13) {
            if(district.touched) {
                isValid =  validate(i, value)
             }
 
             setDistrict({
                 ...district,
                 val: value,
                 isValid: validate(i, value)
             })
        }
        
        if(i === 14 && (/^[0-9]*$/.test(value) || value === "")) {
            if(pin.touched) {
                isValid =  validate(i, value)
             }
 
             setPin({
                 ...pin,
                 val: value,
                 isValid: validate(i, value)
             })
        }

        if(i === 15) {
             setAbout({
                 ...about,
                 val: value,
                 isValid: validate(i, value)
             })
        }
        setIsFormValid({
            ...isFormValid,
            isValid: validateForm()
        })
    }

    const onCancel = () => {
        setIsOtp(false)
    }

    const onVerify = (otp) => {
        axios.get(`https://campusfield.in/api/verify/otpVerification/${email.val}/${otp}/sms`)
        .then(res => {
            if(res.data.error_code == 1) {
               props.history.push({
                        pathname: "/sign-in",
                        state: {
                            isEmailSent: "Thank you for registering with campusfield!. Verification mail has been sent to Your Account.Plese verify your mail id in order to login"
                        }
                })
            }
        })
        .catch(err => {
            //console.log(err)
            setIsInvalidOtp(true)
        })
    }

    const initiateIsMailExist = (email) =>{
        if(email) {
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
    }

    return (
        <>{isOtp ? 
        <Otp
        email={email.val}
        isInvalidOtp={isInvalidOtp}
        onVerify={onVerify}
        onCancel={onCancel}/> :
        <div className={styles['sign-up-container']} onSubmit={onRegister} id="teacherSignUp">
            
            <form id="TeacherSignup">
                <h2>
                    SIGNUP FOR TEACHER
                </h2>
                <h3 style={{marginTop: "40px"}}>
                    Signup Details
                </h3>
                <div className={styles["input-container"]}>
                    <input
                    className={[(email.touched && !email.isValid) || isUserIdExist ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {
                        initiateIsMailExist(email.val)
                        setEmail({...email, touched: true})
                    }}
                    onChange={(event) => {onChangeTextHandler(event, 1)}}
                    value={email.val}
                    placeholder="Email"
                    />
                </div>
                <InvalidHighlighter 
                message="Please enter valid email id"
                visible={email.touched && !email.isValid && !isUserIdExist}
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
                    onChange={(event) => {onChangeTextHandler(event, 2)}}
                    value={password.val}
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
                    type="password"
                    onChange={(event) => {onChangeTextHandler(event, 3)}}
                    value={confirmPassword.val}
                    placeholder="Confirm Password*"/>
                </div>
                <InvalidHighlighter 
                message="Password did not match with the above password"
                visible={confirmPassword.touched && !confirmPassword.isValid}
                />
                <h3 style={{marginTop: "0.9rem"}}>
                    Personal Details
                </h3>
                <div className={styles["basic-info"]}>
                <div className={[styles["input-container"], styles["margin"]].join(" ")}>
                    <div style={{width: "100%", height: "100%"}}>
                        <input
                        className={[firstName.touched & !firstName.isValid ? styles["invalid"] : null].join(" ")}
                        onBlur={() => {setFirstName({...firstName, touched: true})}}
                        onChange={(event) => {onChangeTextHandler(event, 4)}}
                        value={firstName.val}
                        placeholder="First Name*"/>
                    </div>
                    <InvalidHighlighter 
                    message="Please enter First Name"
                    visible={firstName.touched && !firstName.isValid}
                    />
                </div>
                <div className={[styles["input-container"], styles["margin"]].join(" ")}>
                    <div style={{width: "100%", height: "100%"}}>
                        <input
                        className={[!lastName.isValid && lastName.touched  ? styles["invalid"] : null].join(" ")}
                        onBlur={() => {setLastName({...lastName, touched: true})}}
                        onChange={(event) => {onChangeTextHandler(event, 5)}}
                        value={lastName.val}
                        placeholder="Last Name*"/>
                    </div>
                    <InvalidHighlighter 
                    message="Please enter Last Name"
                    visible={lastName.touched && !lastName.isValid}
                    />
                </div>
                {/* <div className={[styles["input-container"], styles["margin"]].join(" ")}>
                    <div style={{width: "100%", height: "100%"}}>
                        <input
                        className={[!birthDate.isValid && birthDate.touched  ? styles["invalid"] : null].join(" ")}
                        onBlur={() => {setBirthDate({...birthDate, touched: true})}}
                        onChange={(event) => {onChangeTextHandler(event, 6)}}
                        value={birthDate.val}
                        max={new Date().toISOString().split("T")[0]}
                        type="date"/>
                    </div>
                    <InvalidHighlighter 
                    message="Please select valid Date"
                    visible={birthDate.touched && !birthDate.isValid}
                    />
                </div> */}
                {/* <div className={styles["input-container"]}>
                    <div className={styles["age"]}>
                        <p>
                            Age: {age ? age : ""}
                        </p>
                    </div>
                </div> */}
                </div>
                {/* <div className={styles["input-container"]}>
                    <select 
                    id="gender" 
                    name="select-gender" 
                    value={gender.val}
                    onChange={(event) => {onChangeTextHandler(event, 7)}}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div> */}
                <div className={styles["input-container"]}>
                    <input
                    className={[!phoneNumber.isValid && phoneNumber.touched ? styles["invalid"] : null].join(" ")}
                    onBlur={() => {setPhoneNumber({...phoneNumber, touched: true})}}
                    onChange={(event) => {onChangeTextHandler(event, 8)}}
                    value={phoneNumber.val}
                    maxLength={10}
                    placeholder="Phone Number*"/>
                </div>
                <InvalidHighlighter 
                message="Please enter valid Phone Number"
                visible={phoneNumber.touched && !phoneNumber.isValid}
                />
                <div className={styles["submit"]} onClick={onRegister}>
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
                        <NavLink to="sign-in">
                            Login
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>}
        {message ? <Alert message={message} color="red" />: null}
    </>
    )
}

export default TeacherSignUp
