import React, { useEffect, useState } from 'react';
import styles from "./Otp.module.css"
import {withRouter} from "react-router-dom"
import axios from "axios"
// import Header from "./Header/Header";

const Otp = (props) => {
    const [otp, setOtp] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isInvalidOtp, setIsInvalidOtp] = useState(false)
    const [phone, setPhone] = useState(props.registeredMobileNumber)
    const [isEmail, setIsEmail] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [invalidPhone, setInvalidPhone] = useState(false)
    const [reqSent, setReqSent] = useState(false)

    useEffect(() => {
      if(props.registeredMobileNumber){
        setPhone(props.registeredMobileNumber)
      }
      if(props.verifyStatus == 1) {
        setIsCodeSent(false)
        setIsInvalidOtp(false)
        setIsEmail(true)
      }
    }, [])

    const onVerify = () => {
      if(otp) {
        axios.get(`https://campusfield.in/api/verify/otpVerification/${props.registeredEmail}/${otp}/sms`)
          .then(res => {
              if(res.data.error_code == 1) {
                if(props.verifyStatus == 3) {
                  setIsCodeSent(false)
                  setIsInvalidOtp(false)
                  setIsEmail(true)
                } else {
                  props.onCancel()
                  props.setIsEmailSent("Your account has been verified successfully")
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

    const onSendCode = (email) => {
      // //console.log(Strphone)
      if(String(phone).length == 10) {
        setInvalidPhone(false)
        axios.get(`https://campusfield.in/api/verify/mobile/${phone}/${props.registeredEmail}`)
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
      } else {
        setInvalidPhone(true)
      }
    }

    const onPhoneChange = (event) => {
      let value = event.target.value
      //console.log(value)
      if(/^[0-9]*$/.test(value) && value.length <=10) {
        setPhone(value)
      } else {

      }
    }

    const onSendMail = () => {
      setReqSent(true)
      axios.get(`https://campusfield.in/api/verify/email/${props.registeredEmail}`)
      .then(res => {
          if(res.data.error_code == 1) {
              props.onCancel() 
              props.setIsEmailSent("Verification mail has been sent to your account.Thank You!")
          }
      setReqSent(false)

      })
      .catch(err => {
      setReqSent(false)

        props.setAlert()
        props.onCancel() 
      })
    }

    return (
          <div className={styles['otp-form']}>
            <p style={{position: "absolute", top: "5%", right: "5%", cursor: "pointer"}} onClick={props.onCancel}>
              Cancel
            </p>
            <div className={styles["logo-container"]} style={{cursor: "pointer"}}>
                <img src={require("../../assets/cf-logo.png")}/>
            </div>
            <div className={styles['user-name']}>
              <p>{props.email}</p>
            </div>
            {isInvalidOtp?
              <label style={{color: "red", fontSize: "0. 7rem", fontWeight: 400}}>
                Please enter a valid OTP
              </label>: null
            }
            {isCodeSent ?
            <>
              <label style={{fontSize: "0. 7rem", fontWeight: 500, textAlign: "left", marginBottom: "1rem"}}>
                Verification Code has been sent to your mobile
              </label>
            <div className={styles['input-container']}>
              <input
              onChange={(event) => {onchangeHandler(event)}}
              value={otp}
              maxLength={4}
              placeholder="Enter OTP"
              />
            </div> </>: 
            <>{
              invalidPhone ?
            <p style={{color: "red"}}>Please enter a valid phone number</p> : null
            }
            <div className={styles['input-container']}>
                <input
              onChange={(event) => {
                //console.log(event.target.value)
                onPhoneChange(event)
              }}
              value={isEmail ? props.registeredEmail : phone}
              maxLength={10}
              placeholder="Enter OTP"
              />
            </div></>
            } 
            {
              isCodeSent ?
            <div className={styles['verify']} onClick={() => {onVerify()}}>
              <p>Verify Code</p>
            </div> : isEmail ?
            <div className={styles['verify']} onClick={() => {if (!reqSent){onSendMail()}}}>
              <p>{isEmail && !reqSent ? "Send Email" : "Please Wait"}</p>
            </div>: 
            <div className={styles['verify']} onClick={() => {onSendCode()}}>
              <p>Send Code</p>
            </div>
            } 
          </div>
    );
}

export default withRouter(Otp);
