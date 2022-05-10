import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";

// import Enrollment from "../../pages/Enrollment";

// import Enrollment from "../../pages/Site management";

// import Teachers from "../../pages/Teachers";

// import Institutions from "../../pages/Institutions";
// import enquires from "../../pages/Enquiries";
// import approve_institution from "../../pages/approve institution";
import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
// import Icons from "../../pages/icons";
// import Charts from "../../pages/charts";

// import Baners from "../../pages/Baners";
// import Designations from "../../pages/Designations";

// import Districts from "../../pages/Districts";

// import News from "../../pages/News";

// import Qualifications from "../../pages/Qualifications";

// import Questions from "../../pages/Questions";
import Exam from "../Exams/Exams"
// import State from "../../pages/State";
// import Subject from "../../pages/Subject";


// import Testimonials from "../../pages/Testimonials";

import Training_programe from "../../pages/training_programe";
import invetory from "../../pages/invetory";
import DEI from "../../pages/DEI";


// import Universities from "../../pages/Universities";
// import institution_list from "../../pages/institution_list";
// // import AddCandidate from "../../pages/AddCandidate";
// import applicant_list from "../../pages/applicant_list";
// import training_programe from "../../pages/training_programe";
import Training_center from "../../pages/traning_center";

import Tab from "../../pages/Tab";
import AIProxy from "../../pages/AIProxy";
import AIEvalution from "../../pages/AIEvalution";

import Explainability from "../../pages/Explainability";
import Mlmonitor from "../../pages/Mlmonitor";
import Mlalert from "../../pages/Mlalert";


// import Home from "../Home/Home"
import { useLayoutState } from "../../context/LayoutContext";
import AIComplaince from "../../pages/AIComplaince/AIComplaince";
import AITPRM from "../../pages/AITPRM/AITPRM";

import SummaryBias from "../../pages/summaryBias/SummaryBias";
import BiasAssessment from "../../pages/BiasAssessment/BiasAssessment";
import ReviewSummary from "../../pages/ReviewSummary/ReviewSummary";



 // #################### LAYOUT ######


/* 
    
    * Integrate sidebar & Route
    * Import all the component
    * Create a route name & assign the component to each
    * These route name are called by sidebar
    * eg :- <Route path="{URL for Routing}" component={Component name}
*/


function Layout(props) {
  var classes = useStyles();
  let history = useHistory()
  // global
  var layoutState = useLayoutState();

  if(!localStorage.getItem("id_token")) {
    history.push("/4146ec82a0f0a638db9293a0c2039e6b")
  }

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            {/* <Route path="/" exact component={Home}/> */}
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              {/* <Route path="/app/teachers" component={Teachers} />
              <Route path="/app/institution" component={Institutions} />
              <Route path="/app/newCandidate" component={AddCandidate} />
              <Route path="/app/applicant_list" component={applicant_list} />
              <Route path="/app/application" component={Tab} /> */}



              <Route path="/app/fairness" component={Tab} />
              <Route path="/app/aiproxy" component={AIProxy} />

              {/* <Route path="/app/approve_institution" component={approve_institution} />
              <Route path="/app/institution_list" component={institution_list} /> */}

              {/* <Route path="/app/enrollment" component={Enrollment} />
              <Route path="/app/enquires" component={enquires} /> */}
              <Route path="/app/typography" component={Typography} />
              {/* <Route path="/app/tables" component={Tables} /> */}
              <Route path="/app/training_center" component={Training_center} />
              <Route path="/app/users" component={Training_programe} />
              <Route path="/app/inventory" component={invetory} />
              <Route path="/app/compliance" component={AIComplaince} />
              <Route path="/app/Explainability" component={Explainability} />


            
              <Route path="/app/sitemanagement/payments" component={Exam} />
              <Route path="/app/Monitor" component={Mlmonitor} />
              <Route path="/app/Mlalert" component={Mlalert} />

              <Route path="/app/aievalation" component={AIEvalution} />
              <Route path="/app/biasSummary" component={SummaryBias} />
              <Route path="/app/tprm" component={AITPRM} />
              <Route path="/app/DEI" component={DEI} />
              <Route path="/app/BiasAssessment" component={BiasAssessment} />
              <Route path="/app/reviewBias" component={ReviewSummary} />




          
           





              {/* <Route path="/app/sitemanagement/districts" component={Districts} />

              <Route path="/app/sitemanagement/universities" component={Universities} />

              <Route path="/app/sitemanagement/qualification" component={Qualifications} />
              <Route path="/app/sitemanagement/testimonials" component={Testimonials} />
              <Route path="/app/sitemanagement/banners" component={Baners} />

              <Route path="/app/sitemanagement/news" component={News} />
              <Route path="/app/sitemanagement/designations" component={Designations} /> */}
           
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
               
              {/* <Route path="/app/ui/maps" component={Maps} /> */}
              {/* <Route path="/app/ui/icons" component={Icons} /> */}
              {/* <Route path="/app/ui/charts" component={Charts} /> */}
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
