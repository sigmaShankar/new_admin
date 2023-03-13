import React, { useState, useEffect } from "react"
import styles from "./SignIn.module.css"
import { NavLink, useHistory, withRouter } from "react-router-dom"
import * as constants from "../../constants/constants"
// import * as constants from "./../../../../assets/"

import axios from "axios";
import Modal from '@material-ui/core/Modal';
import InvalidHighlighter from "../InvalidHighlighter/InvalidHighlighter"
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Alert from "../../../Toast/Toast"
import Otp from "../../../Otp/Otp"
import ForgotPassword from "../../ForgotPassword/ForgotPassword";


const images = [
    {
      url: './small-logo.png',
      title: 'Teacher signup',
      width: '50%',
    },
    {
      url: './small-logo.png',
      title: 'Institution signup',
      width: '50%',
    }
  ];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));
  

const SignIn = (props) => {

  const [isEmailSent, setIsEmailSent] = useState("")
  const [verifyStatus, setVerifyStatus] = useState(0)
  const [registeredMobileNumber, setRegisteredMobileNumber]  = useState("")
  const [registeredEmail, setRegisteredEmail]  = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)

  useEffect(() => {
    let state = props.location ? props.location.state : undefined

    if(state) {
      setIsEmailSent(state.isEmailSent)
    }
  }, [])

    let state =  props.location ? props.location.state : ""

    let message = state ? state.message : ""
    const history = useHistory();
    const [isInvalid, setIsInvalid] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const teachers_signup =() =>{
        setOpen(false);
        history.push('/teacher-sign-up')
    }
    const institution_signup =() =>{
        setOpen(false);
        history.push('/institution-sign-up')
    }
    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
      function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      let screenWidth = window.screen.width;
      let screenLeft = ((screenWidth / 2) / screenWidth) * 100
      let modalWidth =  60 / 100 * screenWidth
      let modalLeft = ((modalWidth/ 2) / screenWidth) * 100
      let screenHeight = window.screen.height;
      let screenTop = ((screenHeight / 2) / screenHeight) * 100
      let modalHeight =  25 / 100 * screenHeight
      let modalTop = ((modalHeight / 2) / screenHeight) * 100

      
      let topPercentage = (screenHeight / 2) - (modalHeight / 2)
      let leftPercentage = (screenWidth / 2) - (modalWidth / 2)
      const useStyles = makeStyles(theme => ({
        custom: {
          height: "10%", 
          width: "100%", 
          backgroundColor: "green"
        },
        
        paper: {
          position: 'absolute',
          width: modalWidth,
          height: modalHeight,
          top: `${screenTop - modalTop}%`,
          left: `${screenLeft - modalLeft}%`,  
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
          },
        },
        margin: {
          margin: theme.spacing(1),
        },
        
      }));
      const theme = createMuiTheme({
        palette: {
          primary: green,
        },
      });
      const gender = [
        {
          value: 'Male'
        },
        {
          value: 'Female'
        },
      
      ];
      const ColorButton = withStyles(theme => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);
      const classes = useStyles();
      // getModalStyle is not a pure function, we roll the style only on the first render
      const [modalStyle] = React.useState(getModalStyle);
      const [open, setOpen] = React.useState(false);
    
      const handleOpen = () => {
        // //console.log(params)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleChange = event => {
        // setCurrency(event.target.value);
      };
    

    const [email, setEmail] = useState({
      value: "",
      touched: "",
      isValid: false
    })

    const [password, setPassword] = useState("")

    const onLogin = (event) => {
      // alert("sdf")
      if(email.value && password) {

        event.preventDefault()
        axios.post(constants.url + "/teachers/login", {
            "Email": email.value,
            "Pass": password
        })
        .then((res) => {
            if(res.data.error_code === 1) {
                localStorage.setItem("id", res.data.output[0]._id)
                let type = res.data.output[0].type
                
                if(type === "teacher") {
                  localStorage.setItem("teacher_id", res.data.output[0]._id)
                  localStorage.removeItem("i_id")
                }else {
                  localStorage.setItem("i_id", res.data.output[0]._id)
                  localStorage.removeItem("teacher_id")

                }
                const location = {
                    pathname: type === "teacher" ? "/teacher/profile" : "/institution/profile",
                    state: {
                        id: res.data.output[0]._id,
                        message: "Signed in successfully"
                    }
                }
                
                if(localStorage.getItem('isNavigateToTraining')) {
                  location.pathname = location.pathname.replace('profile', 'programme')
                }
                props.history.push(location)
            } else if(res.data.error_code == 0 && res.data.msg == "No data found") {
                setAlert("Invalid user name or password")
            } else if(res.data.error_code == 0 && res.data.output[0].status == false && res.data.output[0].email_verify == true && res.data.output[0].otp_verify == true){
              // if(res.data.output[0].status == false && res.data.output[0].status == false){
                setAlert("Please wait for admin approvel") 
            }
            else {
              let data = res.data.output[0]
              setRegisteredMobileNumber(data.Phone_Number)
              setRegisteredEmail(data.Email)
              setVerificationStatus(data.email_verify, data.otp_verify)
            }
          })
          .catch((err) => {
            setAlert()
            setTimeout(() => {
              setIsInvalid(false)
            }, 3000)
        })
      }
    } 

    const onCancel = () => {
      setVerificationStatus(true, true)
    }
    
    const setAlert = (message="something went wrong!") => {
      setAlertMessage(message)
      setTimeout(() => {
          setAlertMessage("")
      }, 3000)
    }

    const onChangeTexthandler = (event, i) => {
        let value = event.target.value

        if(i === 1) {
          let isValidUserName = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
            setEmail({
              ...email,
              value: value,
              isValid: isValidUserName
            })
        }

        if(i === 2) {
            setPassword(value)
        }
    }

    const setVerificationStatus = (emailStatus, mobileNumberStatus) => {
      let status = 0
      if(!emailStatus) {
        status = 1
      }

      if(!mobileNumberStatus) {
        status = 2
      }

      
      if(!emailStatus && !mobileNumberStatus) {
        status = 3
      }

      setVerifyStatus(status)

    }
    
    return (
        <>
        {
          forgotPassword ? 
          <div className={styles["backdrop"]}>
            <ForgotPassword 
            setAlert={setAlertMessage}
            onCancel={()=>{setForgotPassword(false)}}/>
            </div>: null
        }
        <div className={styles['sign-in-container']}>
            <form id="SignIn" onSubmit={onLogin}>
                <h2>
                    Login
                </h2>
                <div className={styles["input-container"]}>
                    <input
                    value={email.value}
                    onBlur={() => {setEmail({...email, touched: true})}}
                    onChange={(event) => { onChangeTexthandler(event, 1)}}
                    placeholder="Email"
                    />
                </div>
                <InvalidHighlighter 
                message="please enter valid user id"
                visible={email.touched && !email.isValid}
                />
                <div className={styles["input-container"]}>
                    <input
                    onChange={(event) => { onChangeTexthandler(event, 2)}}
                    value={password}
                    placeholder="Password" 
                    type="password"/>
                </div>
                <div className={styles["submit"]}>
                    <input type="submit" value="Login" />
                </div>
                <div className={styles["forgot-password"]}>
                    <p
                    style={{textAlign: "center", cursor: "pointer"}} 
                    onClick={() => {setForgotPassword(true)}}>
                        Forgot Your Password?
                    </p>
                </div>
                <div className={styles["register"]}>
                    <p>
                        Don't you have an account?
                    </p>
                    <div className={styles["register-link"]}>
                        <NavLink onClick={handleOpen} to="#">
                            Register Now
                        </NavLink>
                    </div>
                </div>
            </form>
            
        </div>
        {
          open ?
        <div className={styles["backdrop"]} onClick={() => {setOpen(false)}}>
            <div className={styles["navigator"]}>
                <div className={styles["navigate"]} style={{borderRight: "0.5px solid gray"}} onClick={() => {teachers_signup()}}>
                  <i className="fa fa-user" aria-hidden={true} style={{fontSize: screenWidth > 500 ? "90px" : "50px"}}/>
                  <p style={{fontSize:screenWidth > 500 ?  "1.2rem" : "1rem", marginTop: "0.9rem", fontWeight: "bold"}}>Teacher Signup</p>
                </div>
                <div className={styles["navigate"]} onClick={() => {institution_signup()}}>
                  <i className="fa fa-university" aria-hidden={true} style={{fontSize: screenWidth > 500 ? "90px" : "50px"}}/>
                  <p style={{fontSize:screenWidth > 500 ?  "1.2rem" : "1rem", marginTop: "0.9rem", fontWeight: "bold"}}>Institution Signup</p>
                </div>
            </div>
        </div> : null
        }
      {isEmailSent?
      <div className={styles["backdrop"]}>
                        <div className={styles["verification-alert"]}>
                            <i
                            style={{top: 5, right: 5, position: "absolute", cursor: "pointer"}}
                            onClick={() => {setIsEmailSent(false)}}
                            className="fa fa-window-close" aria-hidden="true"></i>
                            <i
                            className={isEmailSent.search('successfully') !== -1 ? "fa fa-check-circle" : "fa fa-check-circle"} 
                            aria-hidden="true" 
                            style={{color: isEmailSent.search('successfully') !== -1 ? "green" : "orange", fontSize: "60px"}}></i>
                            <h1>
                              {isEmailSent}
                            </h1>
                        </div>
                      </div>: null
      }
      {verifyStatus !== 0  ?
      <div className={styles["backdrop"]}>
          <Otp
          setIsEmailSent={setIsEmailSent}
          verifyStatus={verifyStatus}
          setAlert={setAlertMessage}
          registeredEmail={registeredEmail}
          registeredMobileNumber={registeredMobileNumber}
          onCancel={onCancel}
          />
      </div>: null
      }
      {
        isInvalid ? <Alert message="Invalid Credintials!" color="red"/> : null
      }
      {
        message ? <Alert message="Registered successfully login to verify your account!"/> : null 
      }
      {
        alertMessage ? <Alert message={alertMessage} color={alertMessage.search("register") != -1 ? "orange": "red"}/> : null 
      }
      {
        message = null
      }
      </>
    )
}

export default withRouter(SignIn)
