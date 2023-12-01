import React, { useState } from "react"
import styles from "./ContactUs.module.css"
import * as constants from "../constants/constants"
import BasicInfo from "./BasicInfo/BasicInfo"
import Alert from "../../Toast/Toast"
import axios from "axios"

const ContactUs = (props) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [message, setMessage] = useState("")
    const [isInvalid, setIsInvalid] = useState(false)
    const [formValues, setFormValues ] = useState({
        firstName: {
            value: "",
            isValid: false,
            touched: false

        },
        lastName: {
            value: "",
            isValid: false,
            touched: false
        },
        phone: {
            value: "",
            isValid: false,
            touched: false
        },
        email: {
            value: "",
            isValid: false,
            touched: false
            
        },
        message: {
            value: "",
            isValid: false,
            touched: false
        }
    })

    const onBlur = (i) => {
        let oldValues = {
            ...formValues
        }

        if(i === 0) {
            setFormValues({
                ...oldValues,
                firstName: {
                    ...oldValues.firstName,
                    touched: true
                },
            })
        }

        if(i === 1) {
            setFormValues({
                ...oldValues,
                lastName: {
                    ...oldValues.lastName,
                    touched: true

                },
            })
        }

        if(i === 2) {
            setFormValues({
                ...oldValues,
                phone: {
                    ...oldValues.phone,
                    touched: true

                },
            })
        }

        if(i === 3) {
            setFormValues({
                ...oldValues,
                email: {
                    ...oldValues.email,
                    touched: true

                },
            })
        }

        if(i === 4) {
            setFormValues({
                ...oldValues,
                message: {
                    ...oldValues.message,
                    touched: true

                },
            })
        }
    }

    const validateForm = () => {
        return (formValues.firstName.isValid && formValues.lastName.isValid &&
        formValues.email.isValid && formValues.phone.isValid && formValues.message.isValid)
    }

    const onChangeTextHandler = (event, i) => {

        let value = event.target.value
        let oldValues = {
            ...formValues
        }

        if(i === 0) {
            setFormValues({
                ...oldValues,
                firstName: {
                    ...oldValues.firstName,
                    value: value,
                    isValid: validate(i, value)
                }
            })
        }

        if(i === 1) {
            setFormValues({
                ...oldValues,
                lastName: {
                    ...oldValues.lastName,
                    value: value,
                    isValid: validate(i, value)
                }
            })
        }

        if(i === 2 && (/^[0-9]*$/.test(value) || value === "")) {
            setFormValues({
                ...oldValues,
                phone: {
                    ...oldValues.phone,
                    value: value,
                    isValid: validate(i, value)
                }
            })
        }

        if(i === 3) {
            setFormValues({
                ...oldValues,
                email: {
                    ...oldValues.email,
                    value: value,
                    isValid: validate(i, value)
                }
            })
        }

        if(i === 4) {
            setFormValues({
                ...oldValues,
                message: {
                    ...oldValues.message,
                    value: value,
                    isValid: validate(i, value)
                }
            })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if(validateForm()) {
            axios.post(constants.url + '/site_management/enquirie' , {
                "Name": formValues. firstName.value + " " + formValues.lastName.value,
                "Email": formValues.email.value,
                "Mobile_Number": formValues.phone.value,
                "Message": formValues.message.value
            })
            .then((res) => {
                setMessage("your message as been received!")
                setIsInvalid(false)
                clearFields()
                setTimeout(() => {
                    setMessage("")
                }, 3000)
            })
            .catch(() => {
                setMessage("network error")
                setIsInvalid(true)
                setTimeout(() => {
                    setMessage("")
                }, 3000)
            })
        } else {
            setFormValues({
                firstName:{
                    ...formValues.firstName,
                    touched: true
                },
                lastName:{
                    ...formValues.lastName,
                    touched: true
                },
                phone:{
                    ...formValues.phone,
                    touched: true
                },
                email: {
                    ...formValues.email,
                    touched: true
                },
                message: {
                    ...formValues.message,
                    touched: true
                }
            })
        }
    }

    const clearFields = () => {
        setFormValues({
            firstName:{
                ...formValues.firstName,
                value: "",
                isValid: false,
                touched: false
            },
            lastName:{
                ...formValues.lastName,
                value: "",
                isValid: false,
                touched: false
            },
            phone:{
                ...formValues.phone,
                value: "",
                isValid: false,
                touched: false
            },
            email: {
                ...formValues.email,
                value: "",
                isValid: false,
                touched: false
            },
            message: {
                ...formValues.message,
                value: "",
                isValid: false,
                touched: false
            }
        })
    }

    const validate = (i, val) => {
        
        if(i === 2) {
            return val.length === 10     
        }

        if(i === 3) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
        }
        
        return val.length > 0
    }

    return (
        <div className={styles["contact-us-container"]}>
            <div className={styles["basic-info"]}>
                <h2>
                    Contact Information
                </h2>
                <h4 className={styles["sub-heading"]}>
                    Campus Field
                </h4>
                <p>
                    {constants.CONTACT_US.ADDRESS}
                </p>
                <div className={styles["details-container"]}>
                    <h4 className={styles["details"]}>
                        Tel
                    </h4>
                    <p className={styles["details"]}>
                        : {constants.CONTACT_US.TEL}
                    </p>
                </div>
                <div className={styles["details-container"]}>
                    <h4 className={styles["details"]}>
                        Email
                    </h4>
                    <p className={styles["details"]}>
                        : {constants.CONTACT_US.Email}
                    </p>
                </div>
            </div>
            <BasicInfo
            onBlur={onBlur}
            validate={validate}
            firstName={formValues.firstName}
            lastName={formValues.lastName}
            email={formValues.email}
            phone={formValues.phone}
            message={formValues.message}
            onChange={(text, i) => {onChangeTextHandler(text, i)}}
            onSubmit={(event) => {onSubmit(event)}}
            />
        {
            message && isInvalid ? 
            <Alert message={message} color="red"/> : 
            null          
        }
        {
            message && !isInvalid ? 
            <Alert message={message} color="green"/> : 
            null
        }
        </div>
    )
    
}

export default ContactUs
