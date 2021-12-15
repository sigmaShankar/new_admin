import React, { useEffect } from "react"
import styles from "./Home.module.css"
import HomeHeader from "./HomeHeader/HomeHeader"
// import Banner from "./HomeContent/Banner/Banner"
// import HomeContent from "./HomeContent/HomeContent"
import Footer from "./Footer/Footer"
// import Teacher from "./Teacher/Teacher"
import { Route, Redirect, Switch } from "react-router-dom"
// import School from "./School/School"
// import Job from "./JobComponent/Job"
// import Certification from "./Certification/Certification"
// import Exam from "./Exam/Exam"
// import ContactUs from "./ContactUs/ContactUs"
// import Auth from "./Auth/Auth"
// import { Switch } from "@material-ui/core"
// import InstitutionSignUp from "./Auth/InstitutionSignUp/InstitutionSignUp"
// import TeacherSignUp from "./Auth/TeacherSignUp/TeacherSignUp"
// import Context from "./SubHome/Context/Context"
// import AboutUs from "./SubHome/AboutUs/AboutUs"
// import Conference from "./SubHome/Conference/Conference"
// import Awards from "./SubHome/Awards/Awards"
// import Mission from "./SubHome/Mission/Mission"
// import SubTeacher from "./Teacher/SubTeacher/SubTeacher"
// import SubJob from "./JobComponent/SubJob/SubJob"
// import SubExam from "./Exam/SubExam/SubExam"
// import SubSchool from "./School/SubSchool/SubSchool"
// import TrainingPrograms from "../Teacher/TrainingPrograms/TrainingPrograms"
// import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy"

const Home  = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles["home-container"]}>
            <div className={styles["main"]} style={{maxWidth: "1600px"}}>
                <HomeHeader/>
                <Switch>
                {/* <Route path="/for-teachers" component={Teacher}/>
                <Route path="/campusfield-certified" component={Certification}/>
                <Route path="/teachers" component={SubTeacher}/>
                <Route path="/jobs" component={SubJob}/>
                <Route path="/exams" component={SubExam}/>
                <Route path="/schools" component={SubSchool}/>
                <Route path="/context" component={Context}/>
                <Route path="/about-us" component={AboutUs}/>
                <Route path="/teacher-annual-conference" component={Conference}/>
                <Route path="/vision&mission" component={Mission}/>
                <Route path="/campusfield-award" component={Awards}/>
                <Route path="/for-schools" component={School}/>
                <Route path="/for-jobs" component={Job}/>
                <Route path="/for-exams" component={Exam}/>
                <Route path="/contact-us" component={ContactUs}/>
                <Route path="/sign-in" component={Auth}/>
                <Route path="/institution-sign-up" component={InstitutionSignUp}/>
                <Route path="/teacher-sign-up" component={TeacherSignUp}/>
                <Route path="/for-certification" component={Certification}/>
                <Route path="/training" exact component={TrainingPrograms}/>
                <Route path="/teacher-training" exact render={() => {return <TrainingPrograms filterType="teacher"/>}}/>
                <Route path="/school-training" exact render={() => {return <div><TrainingPrograms filterType="school"/></div>}}/>
                <Route path="/homepage" exact component={HomeContent}/>
                <Route path="/privacy-policy" exact component={PrivacyPolicy}/>
                <Redirect to="/homepage"/> */}
                </Switch>
                <Footer/>
            </div>
        </div>
    )
}

export default Home
