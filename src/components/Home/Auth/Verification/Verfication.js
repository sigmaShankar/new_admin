import React from "react"
import { compose, withProps } from "recompose"
import { withRouter } from "react-router-dom"
import axios from "axios"

const Verification = (props) => {
    React.useEffect(() => {
        let search = window.location.href
        //console.log(typeof search)
        //console.log(search)
        let query;
        let otp;
        let email;

        if (search.trim().length) {
            query = search.split("?")
            query = query[1].split("&")
            for(let word of query) {
                //console.log(word)
                if (word.search("otp") != -1) {
                    let otpSplit = word.split("=")
                    
                    if(otpSplit.length > 1) {
                        otp = otpSplit[1]
                    }
                }  
                
                if (word.search("email") != -1) {
                    let emailSplit = word.split("=")

                    if(emailSplit.length > 1) {
                        email = emailSplit[1]
                    }
                }
            }
        }
        
        if(otp && email) {
            axios.get(`https://campusfield.in/api/verify/otpVerification/${email}/${otp}/email`)
            .then(res => {
                //console.log(res)
                if(res.data.error_code == 1) {
                    props.history.push({
                        pathname: "/sign-in",
                        state: {
                            isEmailSent: "Email has been verified successfully. Please login to ensure. Thank you!"
                        }
                })
                }
            })
            .catch(err => {
                props.history.push("/homepage")
                
            })
        } else {
            props.history.push("/homepage")
        }
    })

    return <div>Please wait..</div>
}

export default withRouter(Verification)
