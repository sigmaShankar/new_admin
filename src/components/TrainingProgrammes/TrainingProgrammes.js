import React, { useEffect, useState } from 'react';
import styles from "./TrainingProgrammes.module.css"
import { NavLink, useHistory, withRouter } from "react-router-dom" 
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import axios from "axios"
import * as constants from "../Teacher/constants/constants"
import Alert from "../Toast/Toast"

const TrainingProgrammes = (props) => {
    const [message, setMessage] = useState("")
    const [cart, setCart] = useState([])
    const history = useHistory()
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    const classes = useStyles();


    const onEnroll = (isUpdate, performIsDelete=true) => {
        let isTeacher = window.location.href.includes('teacher') 
        let isTeacherTraining = window.location.href.includes('teacher-training') 
        let isInstitutionTraining = window.location.href.includes('school-training') 
        let isInstitution = window.location.href.includes('institution') 
        if(props.isDelete && performIsDelete) {
            props.isDelete()
            return
        }

        if(isTeacherTraining) {
            if(localStorage.getItem('teacher_id')) {
                props.history.push("/teacher/programme")
                return
            }
            localStorage.setItem('isNavigateToTraining', true)
            props.history.push('/sign-in')
        }

        if(isInstitutionTraining) {
            if(localStorage.getItem('i_id')) {
                props.history.push("/institution/programme")
                return
            }
            localStorage.setItem('isNavigateToTraining', true)
            props.history.push('/sign-in')
        }

        if(isInstitution) {            
            props.history.push({
                pathname: `/institution/enroll`,
                state: {
                    data: "programme",
                    title: props.viewString ? "Enrolled Faculties" : null,
                    programme:{
                        id: localStorage.getItem('i_id'),
                        programme_id: props.id,
                        fee: props.fee,
                        city: props.city,
                        amount: props.amount ? props.amount : 0,
                        dueDate: props.dueDate,
                        endDate: props.endDate,
                        programmeFor: 'school',
                        startDate: props.startDate,
                        title: props.title,
                        description: props.description,
                        duration: props.duration,
                        enrolled: props.enrolled,
                      },
                    _id: props._id,
                    isUpdate: isUpdate,
                    teachers: props.teachers
                }
            })
        } else if(isTeacher){
            
            axios.post("https://campusfield.in/api/cart/", {
                id: localStorage.getItem('teacher_id'),
                programme_id: props.id,
                fee: props.fee,
                city: props.city,
                dueDate: props.dueDate,
                endDate: props.endDate,
                amount: props.amount ? props.amount : 0,
                startDate: props.startDate,
                title: props.title,
                description: props.description,
                programmeFor: 'teacher',
                duration: props.duration,
                enrolled: props.enrolled
              })
              .then(res => {
                  if(res.data.error_code == 1) {
                      setMessage("Successfully Added to  Cart")
                  }
              })
              .catch(err => {
                setMessage("network error!")
                setTimeout(() => {
                setMessage("")
                }, 3000)
              })
        } else {
            
            
        }
    }

    const calculateDuration = (from , to) => {
        //console.log(from)
        //console.log(to)
        const date1 = new Date(from);
        const date2 = new Date(to);
        const diffTime = Math.abs(date2 - date1);
        let daysString = "days"
        let diffDays = String(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        if (diffDays ==  1) {
            daysString = "day"
        }
        return String(diffDays) + " " + daysString
    }

    return (
      <div className={styles["experiences-container"]}>
          <div className={styles["experience-container"]}>
              <h4>
                  {props.title}
              </h4>
              <div className={styles["detail-container"]}>
                  <i class="fa fa-clock-o" aria-hidden={true}/>
                  <h3>
                    <b>Duration</b> : <span>{calculateDuration(props.startDate, props.endDate)}</span>
                  </h3>
              </div>
              <div className={styles["detail-container"]}>
                  <i class="fa fa-money"  aria-hidden={true}/>
                  <h3>
                      <b>Fee</b> : <span>{props.fee}</span>
                  </h3>
              </div>
              <div className={styles["detail-container"]}>
                  <i class="fa fa-money"  aria-hidden={true}/>
                  <h3>
                      <b>Amount</b> : <span>{props.amount  ? props.amount : 0}</span>
                  </h3>
              </div>
            <div className={styles["detail-container"]}>
                  <i class="fa fa-map-marker"  aria-hidden={true}/>
                  <h3>
                      <b>Location</b> : <span>{props.city ? props.city : props.centres ? props.centres[props.centres?.length - 1]?.location : ""}</span>
                  </h3>
              </div>
              <div className={styles["detail-container"]}>
                  <i
                  style={{display: "flex", alignItems: "center"}} 
                  class="fa fa-book"  aria-hidden={true}>
                    {/* <span style={{margin: "0.5rem"}}> */}
                      <h3 style={{margin: "0.5rem"}}>
                        <b>Description</b>
                      </h3>
                    {/* </span> */}
                    </i>
                  <h3>
                      {props.description}
                    {/* <span>{props.description}</span> */}
                  </h3>
              </div>
              {
                  props.dueDate ?
              <div className={styles["detail-container"]}>
                  <i class="fa fa-clock-o"  aria-hidden={true}/>
                  <h3>
                      <b>Last Date to Enroll</b> : <span>{props.dueDate.split("T")[0]}</span>
                  </h3>
              </div> : null
              }
              {
                props.teachers !== undefined ?
                <div className={styles["detail-container"]}>
                  <i class="fa fa-users" aria-hidden={true}/>
                  <b>Number of Teachers</b> : {props.teachers.length}  <span
                                                                        onClick={() => {onEnroll(true, false)}} 
                                                                        style={{marginLeft: "1rem", backgroundColor: "#00B8B0", cursor: "pointer", padding: "0.2rem", color: "white", borderRadius: "5px"}}>{props.viewString ? props.viewString : "Add / Remove"}  </span>
                </div> : null
              }
              <div className={styles["experience"]}>
                  <i class="fa fa-clock-o" aria-hidden={true}/>
                  <b>DATE</b> : {props.startDate ? props.startDate.split('T')[0] : ""} - 
                  {props.endDate ? props.endDate.split('T')[0] : ""}
              </div>
              {
                  !props.enrolled?
                  <Button
                  disabled={(window.location.href.includes('teacher-training') & localStorage.getItem('type') === 'institution') || (window.location.href.includes('school-training') & localStorage.getItem('type') === 'teacher')}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                      onEnroll()
                    }}
                  className={classes.button}
              >
                  {props.isDelete ? "Remove from cart" : "Add to cart"}
              </Button> : <a href={props.link ? props.link : ""}>Training Link</a>
              }
               
              </div>
            {message ? <Alert message={message} color={message.search("network") != -1 ? "red" : "green"}/> : null}        
          </div>
    );
}   

    export default withRouter(TrainingProgrammes);
