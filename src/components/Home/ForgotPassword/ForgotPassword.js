import React, { useEffect, useState } from 'react';
import styles from "./ForgotPassword.module.css"
import {withRouter} from "react-router-dom"
import axios from "axios"
import { isMailExist } from "../../../Service/SingnUpService";

const ForgotPassword = (props) => {
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isInvalidOtp, setIsInvalidOtp] = useState(false)
    const [isNewUser, setIsNewUser] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [isInvalidPassword, setIsInvalidPassword] = useState(false)
    const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    useEffect(() => {
      //console.log(props)
      if(props.verifyStatus == 1) {
        setIsCodeSent(false)
        setIsInvalidOtp(false)
        setIsEmail(true)
      }

      if(props.isCodeSent) {
          setIsCodeSent(true)
      }

      if(props.phoneNumber) {
          setPhone(props.phoneNumber)
      }

      if(props.registeredEmail) {
          setEmail(props.registeredEmail)
      }
    }, [])

    const onVerify = () => {
        let currEmail = email ? email : localStorage.getItem('email') 
        //console.log(email)
      if(otp) {
        axios.get(`https://campusfield.in/api/verify/otpVerification/${currEmail}/${otp}/sms`)
          .then(res => {
              if(res.data.error_code == 1) {
                  if(props.update) {
                      props.update()
                  } else {
                      setIsSuccess(true)
                  }
              } else {
                setIsInvalidOtp(true)
              }
          })
          .catch(err => {
              props.setAlert()
              props.onCancel()
          })
      }
    }

    const onchangeHandler = (event) => {
      let value = event.target.value
      setOtp(value)
    }

    const onSendCode = (phoneNumber) => {
      axios.get(`https://campusfield.in/api/verify/mobile/${phoneNumber}/${email}`)
      .then(res => {
          if(res.data.error_code === 1) {
            setIsCodeSent(true)
          } else {
            props.setAlert()
            props.onCancel()
          }
      })
      .catch(err => {
          props.setAlert()
          props.onCancel()
      })
    }

    const onIsUser = () => {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setIsInvalidEmail(false)
        isMailExist(email)
        .then((res) => {
            if(res.data.error_code && res.data.msg === "Email already exist") {
                setIsUser(true)
                setIsNewUser(false)
                axios.get(`https://campusfield.in/api/verify/${email}`).
                then(res => {
                    if(res.data.error_code) {
                        setPhone(res.data.output[0].Phone_Number)
                        //console.log()
                        // setIsSuccess(true)
                        
                        onSendCode(res.data.output[0].Phone_Number)
                    }
                })
                .catch(err => {
                    //console.log(err)
                })
            } else if(res.data.error_code === 0 && res.data.msg === "New mail") {
                //console.log("hell")
                setIsNewUser(true)
                setIsInvalidEmail(false)
            }
        })
        .catch(err => {
            //console.log(err)
        })
    } else {
        setIsInvalidEmail(true)
        setIsNewUser(false)
      }
    }

    const onSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const checkPassword = () => {
        //console.log("hello")
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

        if(!isInvalidPassword && !isInvalidConfirmPassword) {
            axios.post("https://campusfield.in/api/verify/reset", {
                user_id: email,
                password: password
            }).then(res => {
                if(res.data.error_code) {
                    let formData = new FormData()
                    props.onCancel()
                    // formData.append('id', )
                    // props.history.push({
                    //                 pathname: "/sign-in",
                    //                 state: {
                    //                     message: "Password has been changed successfully!"
                    //                 }
                    //             })
                    // formData.append('Phone_Number', phone)
                    // axios.post('https://campusfield.in/api/teachers/profile', formData)
                    // .then(res => {
                    //     if(res.data.error_code) {
                    //         
                    //     }
                    // })
                    // .catch(err => {
                    // })
                }
            })
            .catch(err => {
    
            })
        } else {}
    }

    return (
          <div className={styles['otp-form']}>
            <p style={{position: "absolute", top: "5%", right: "5%", cursor: "pointer"}} onClick={props.onCancel}>
              Cancel
            </p>
            <div className={styles["logo-container"]} style={{cursor: "pointer"}}>
                <img src={require("../../../assets/cf-logo.png")}/>
            </div>
            {
                isSuccess ? 
                <>
                    {
                        isInvalidPassword ? <p style={{color: "red"}}>Password must atleast contain one special character</p> : null
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
                    isInvalidConfirmPassword ? <p style={{color: "red"}}>Confirm Password must match above password</p> : null
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
                    <p>Submit</p>
                </div>
             </> :
            isCodeSent ? <>
            <label style={{fontSize: "0. 7rem", fontWeight: 500, textAlign: "left", marginBottom: "1rem"}}>
                {`Verification Code has been sent to your mobile xxxxx${String(phone).substr(5, 10)}`}
            </label>
            {
                isInvalidOtp ? <p style={{color: "red"}}>Please enter valid otp</p> : null
            }
            <div className={styles['input-container']}>
              <input
              onChange={(event) => {onchangeHandler(event)}}
              value={otp}
              maxLength={4}
              placeholder="Enter OTP"
              />
            </div>
          <div className={styles['verify']} onClick={() => {onVerify()}}>
              <p>Submit</p>
            </div>
            </>:
            <>
            {
                isInvalidEmail ? <p style={{color: "red"}}>Please enter valid email</p> : null
            }
            {
                isNewUser ? <p style={{color: "red"}}>User doesn't exists</p> : null
            }
            <div className={styles['input-container']}>
                <input
                onChange={(event) => {setEmail(event.target.value)}}
                value={email}
                placeholder="Enter Email"
                />
          </div>
          <div className={styles['verify']} onClick={() => {onIsUser()}}>
              <p>Submit</p>
            </div>
          </>}
          </div>
    );
}

export default withRouter(ForgotPassword);
