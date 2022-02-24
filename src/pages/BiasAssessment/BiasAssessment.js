import React, { useState, useEffect, useRef } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// import Chart from "chart.js";
// react plugin used to create charts
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import MUIDataTable from "mui-datatables";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// import _Index from "./Index";
// import Loader from "react-loader-spinner";
import CircularProgress from '@material-ui/core/CircularProgress'
import "./styles.css";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";


// import Header from "components/Headers/Header.js";
// import HeaderDU from "components/Headers/HeaderDU.js";
import Typography from '@material-ui/core/Typography';

import Report from './Report'
import SummaryBias from "../summaryBias/SummaryBias"


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
  prograss: {
    width: "100%"
  }
}));


const page2 = [


]

const page3 = [


]


const data = [
  

  { vendor: "What is protected attribute in dataset (for example :- Gender, Race , Religion)", id: 1, model: "xyz", classification: "xyz" },
  {
    vendor: `Is the data representative of the target users (for example, If the model is applied for US-based users 
    but if the data collected has only EU users, there could be challenges)`, id: 2, model: "xyz", classification: "xyz"
  },
  {
    vendor: `What are all the standard / Custom performance evaluation metrics being used (for evaluating the model for performance 
    like accuracy, etc)? `, id: 3, model: "xyz", classification: "xyz"
  },
  { vendor: "Please provide other specific details (if any)", id: 4, model: "xyz", classification: "xyz" },
];


const Model = [
  { vendor: "What is the type model (machine learning or deep learning, and what specific model is considered like logistic regression, gradient boost, etc.)", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "What are all the standard performance evaluation metrics being used (for evaluating the model for performance like accuracy, etc)? ", id: 2, model: "xyz", classification: "xyz" },
  { vendor: "Do you prefer to have any other standard evaluation metrics apart from what you already have? If so, please provide the details and threshold values", id: 3, model: "xyz", classification: "xyz" },
  {
    vendor: `Apart from that, do you need any other custom evaluation metrics. If so, please provide the details and threshold values 
  (our analysis will provide all the industry standards and our metrics for Bias, Explainability, ML Monitoring, and 
  Robustness) `, id: 4, model: "xyz", classification: "xyz"
  },

];



export default function BiasAssessment() {
  let history = useHistory();
  const classes = useStyles();
  const componentRef = useRef(null);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // alert(JSON.stringify(newValue))
    setAlgoname([])
    setCustomValue({})
    // setCurrentAlgo("")
    setDateList([])
    if (newValue == 3) {
      Assessment()
    }
    if (newValue == 2) {
      // RiskRegister()
    }
    if (newValue) {
      // setLoadlist('proxy')
      // initValue('proxy')
      // section()
    } else {
      // setLoadlist(null)
      // initValue(null)
    }
    setValue(newValue);
  };

  const [progress, setProgress] = React.useState(0);
  const [spinner, setSpinner] = React.useState(false);
  const [customValue, setCustomValue] = useState({});
  const [algoName, setAlgoname] = useState([]);
  const [adata, setAdata] = useState([]);
  const [_section, setSection] = useState([]);

  const [currentpage, setCurrentPage] = useState(0);
  const [dateList, setDateList] = useState([]);
  const [assessment, setassessment] = useState({});
  const [RistReg, setRistReg] = useState([]);




  useEffect(() => {
    // history.push("/admin/home")
    // initValue()

  }, [customValue], []);




  const Assessment = async () => {
    let data_ = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "assessment_report" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_accessment_report" : "assessment_report";

    fetch(process.env.PUBLIC_URL + `/test/${data_}.json`)
      .then(function (res) {
        console.log(Object.keys(res), "hgchgvgvhgvhgv", res)
        return res.json();
      })
      .then(function (selectedAlgo) {


      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  const pageChange = async (page, value) => {

    setCurrentPage(page)
    console.log(value)
    window.scrollTo(0, 200);
  }
  const changeText = (e, id) => {
    console.log(e?.target.value, id)
  }
  const initValue = async () => {
    let metricsList = {}
    let tempOverall = [];
    let dates = [];

    if (sessionStorage.getItem("currentModelName") || true) {

      let URL;
      URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "algoList" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_algoList" : "algoList";


      fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
        .then(function (res) {
          // console.log(Object.keys(res), "hgchgvgvhgvhgv")
          return res.json();
        })
        .then(function (selectedAlgo) {

        })
        .catch(function (err) {
          console.log(err, " error");
        });
    }
  }

  return (
    <>
      <h3>Quick Bias Assessment</h3>
      <br />

      {currentpage == 0 && (<><Row style={{ marginTop: "2px" }}>

        <Col xl="6" style={{ display: "flex", 'justify-content': "center" }}>
          <b>Upload Model Files</b><br />


        </Col>
        <Col xl="6" style={{ display: "flex", 'justify-content': "center" }}>
          <b>Upload Dataset Files</b><br />


        </Col>
        <Col xl="6" style={{ display: "flex", }}>
          <p>1) Please upload all relevant model files , model documentation</p>


        </Col>
        <Col xl="6" style={{ display: "flex", }}>

          <p>1) Please upload the dataset and documentation of dataset including problem statement</p>

        </Col>

      </Row>
        <Row >
          <Col xl="6" style={{
            width: "100%", display: "flex",
            "justify-content": "center",
            borderRight: "1px solid #777",
            borderBottom: "1px solid #777",

            padding: "40px",
            color: (currentpage == 0) ? "red" : "black",
            fontWeight: (currentpage == 0) ? "bolder" : "lighter"

          }}>
            <input type="file" placeholder="uploadModel" />
          </Col>
          <Col xl="6" style={{
            width: "100%", display: "flex",
            "justify-content": "center",
            borderLeft: "1px solid #777",
            borderBottom: "1px solid #777",
            padding: "40px",
            color: (currentpage == 1) ? "red" : "black",
            fontWeight: (currentpage == 1) ? "bolder" : "lighter"
          }}>
            <input type="file" placeholder="uploadData" />


          </Col>

        </Row></>)}
      <br />

      {currentpage == 0 && (
        <Row style={{ height: "10px" }}>
          <div style={{ marginLeft: "40%", marginBottom: "5px" }}>
            <h5>Self Assessment Questionaries</h5>
          </div>
          <small>* Please respond to the questions given bellow to initiate the quick bias assessment</small>

          <br />
          <br />

          <table className="table_" style={{ width: "100%", marginBottom: "20px" }}>
            <tr className="tr__">
              <th className="td_r" style={{ "max-width": "10px!important", "background-color": "black", color: "#fff" }}>SL. No</th>
              <th className="th_">Questions</th>
              <th className="th_">Response</th>
            </tr>
            {data.map(value => {
              return (
                <tr className="tr__" >
                  <td className="td_r" style={{ maxWidth: "10px" }}>{value?.id}</td>
                  <td className="td_">{value?.vendor}</td>
                  <td className="td_l"><TextareaAutosize
                    minRows={7}
                    style={{ width: "70%" }}


                    aria-label="maximum height"
                    placeholder=""
                    defaultValue=""
                  /></td>
                </tr>)
            })}
          </table>

          <br />

          {/* <div style={{ marginLeft: "40%", marginTop: "20px" }}>
            <h5>Self Assessment Questionaries - Model</h5>
          </div>
          <br />
          <br />
          <br />
          <br />
          <table className="table_" style={{ width: "100%", marginBottom: "20px" }}>
            <tr className="tr_">
              <th className="td_r" style={{ "max-width": "10px!important", "background-color": "black", color: "#fff" }}>Sr. No.</th>
              <th className="th_">Questionaries</th>
              <th className="th_">Answer</th>
            </tr>
            {Model.map(value => {
              return (
                <tr className="tr_" >
                  <td className="td_r" style={{ maxWidth: "10px" }}>{value?.id}</td>
                  <td className="td_">{value?.vendor}</td>
                  <td className="td_l"><TextareaAutosize
                    minRows={7}
                    style={{ width: "70%" }}
                    aria-label="maximum height"
                    placeholder=""
                    defaultValue=""
                  /></td>
                </tr>)
            })}
          </table> */}

          <Row>
            <Col xl="6" >
            </Col>
            <Col xl="6" >
              <div style={{ marginBottom: "20px", float: "left" }} onClick={e => { pageChange(1, null) }}>
                <Button variant="contained" style={{ backgroundColor: "#23284a", color: "#fff", marginBottom: "20px", float: "left" }} >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      )}

      {currentpage == 1 && (

        <Row style={{ width: "100%", "max-height": "100%" }}>
          <br />
          <Report />
        </Row>)}

      {currentpage == 2 && (<Row style={{ height: "10px" }}>
        <div style={{ marginLeft: "45%" }}>
          <h5>Reviewer</h5>
        </div>
        <br />

        <div className="search-table-outter wrapper">
          <table className="table_ search-table inner" style={{ marginBottom: "20px" }}>
            <tr className="">
              <th className="th_">Sr. No.</th>
              <th className="th_">Control Question</th>
              <th className="th_">Self  Assessment Comment By Third Party</th>
              <th className="th_">Self Rating (Pass/Fail) </th>
              <th className="th_">Remarks</th>
              <th className="th_">Measures</th>
              <th className="th_">Deadline</th>
              <th className="th_">Assessor Comment</th>
              <th className="th_">Ratings By Assessors</th>
              <th className="th_">Remarks By Assessor</th>
              <th className="th_">Comments</th>
            </tr>
            {page3.map(value => {
              return (
                <tr className="">
                  <td className="td_r">{value?.quetion}</td>
                  <td className="td_">{value?.answer}</td>
                  <td className="td_l">{value?.rating}</td>
                  <td className="td_l"><TextareaAutosize
                    minRows={4}
                    aria-label="maximum height"
                    placeholder=""
                    defaultValue=""
                  /></td>
                </tr>)
            })}

          </table>
        </div>
        <div style={{ marginBottom: "20px", float: "right" }} onClick={e => { pageChange(3, null) }}>
          <Button variant="contained" style={{ backgroundColor: "#23284a", color: "#fff" }} >
            Next
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </Row>)}

      {currentpage == 3 && (

        <Row style={{ width: "100%", height: "10px" }}>
          <br />
          <br />
          <br />
          <br />
          <br />

          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Table of finding" {...a11yProps(0)} />
                <Tab label="Assessment Summary" {...a11yProps(1)} />

              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} style={{ width: "120%" }}>
              <table className="table_" style={{ marginBottom: "20px" }}>
                <tr className="">
                  <th className="th_">Sr. No.</th>
                  <th className="th_">Question</th>
                  <th className="th_">Pass/Fail</th>
                  <th className="th_">Assessor Comment </th>
                  <th className="th_">Evidence comment</th>
                  <th className="th_">Mitigation comment</th>
                  <th className="th_">Deadline for mitigation</th>


                </tr>
                {page2.map(value => {
                  return (
                    <tr className="">
                      <td className="td_r">{value?.quetion}</td>
                      <td className="td_">{value?.quetion}</td>
                      <td className="td_l">{value?.quetion}</td>
                      <td className="td_l">{value?.quetion}</td>
                      <th className="td_l">{value?.quetion}</th>
                    </tr>)
                })}

              </table>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>
                <Report />
              </div>
            </TabPanel>
          </div>

        </Row>)}
    </>
  );
};

