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
import PropTypes from 'prop-types';

// import Header from "components/Headers/Header.js";
// import HeaderDU from "components/Headers/HeaderDU.js";
import Typography from '@material-ui/core/Typography';

import Report from './Report'



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
  { quetion: "Does the Organisation offer easy portability of its privately held datasets? If so, is it clear for what purposes the datasets may be transferred and whether there will be any remuneration for transfer?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "Does the Organisation foster open access to its privately held datasets? If so, is it clear who can access the datasets, for what purposes the datasets can be used and whether there will be any remuneration for granting access?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "If datasets are made available by a public sector body, how is it ensured that the data is portable, accessible and open? And if so, is it clear who can do what with the data?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "What is the scope of interoperability with other tech solutions offered by the same or other providers?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "Is the data generated by the AI System reusable in the public interest (data for good projects)?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "Are there any compulsory licensing or patent rights issues relating to the AI System?", id: 1, model: "xyz", classification: "Intellectual Property" },
  { quetion: "How experienced with tech projects is the team that will develop the AI System?", id: 1, model: "xyz", classification: "Accountability" },
  { quetion: "What is the level of internal support, including financial, for the AI System?", id: 1, model: "xyz", classification: "Accountability" },
  { quetion: "Identify all stakeholders that are affected by the AI System.", id: 1, model: "xyz", classification: "Accountability" },
  { quetion: "Are there any potential reputational and material risks attached to the AI System for the Organisation?", id: 1, model: "xyz", classification: "Principle" },
  { quetion: "Is there a risk that use of the AI System will violate any fundamental human rights (such as rights of freedom, free expression, non-discrimination)?", id: 1, model: "xyz", classification: "Accountability" },
  { quetion: "Does the AI System hinder the user’s ability to make informed decisions?", id: 1, model: "xyz", classification: "Accountability" },
  { quetion: "Is there a risk that the AI System will promote the spread of false or misleading information?", id: 1, model: "xyz", classification: "Accountability" },

]

const page3 = [
  { quetion: "Does the Organisation offer easy portability of its privately held datasets? If so, is it clear for what purposes the datasets may be transferred and whether there will be any remuneration for transfer?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Intellectual Property",rating:0.3 },
  { quetion: "Does the Organisation foster open access to its privately held datasets? If so, is it clear who can access the datasets, for what purposes the datasets can be used and whether there will be any remuneration for granting access?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", rating:0.3,classification: "Intellectual Property" },
  { quetion: "If datasets are made available by a public sector body, how is it ensured that the data is portable, accessible and open? And if so, is it clear who can do what with the data?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Intellectual Property",rating:1 },
  { quetion: "What is the scope of interoperability with other tech solutions offered by the same or other providers?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Intellectual Property",rating:0.5 },
  { quetion: "Is the data generated by the AI System reusable in the public interest (data for good projects)?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Intellectual Property",rating:0.3 },
  { quetion: "Are there any compulsory licensing or patent rights issues relating to the AI System?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Intellectual Property",rating:0.3 },
  { quetion: "How experienced with tech projects is the team that will develop the AI System?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Accountability" ,rating:0.3},
  { quetion: "What is the level of internal support, including financial, for the AI System?", id: 1, answer: "xLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip yz", classification: "Accountability",rating:0.3 },
  { quetion: "Identify all stakeholders that are affected by the AI System.", id: 1, answer: "xLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip yz", classification: "Accountability",rating:0.3 },
  { quetion: "Are there any potential reputational and material risks attached to the AI System for the Organisation?", id: 1, answer: "xyLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip z", classification: "Principle",rating:0.3 },
  { quetion: "Is there a risk that use of the AI System will violate any fundamental human rights (such as rights of freedom, free expression, non-discrimination)?", id: 1, answer: "xLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip yz", classification: "Accountability",rating:0.3 },
  { quetion: "Does the AI System hinder the user’s ability to make informed decisions?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Accountability",rating:0.3 },
  { quetion: "Is there a risk that the AI System will promote the spread of false or misleading information?", id: 1, answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ", classification: "Accountability",rating:0.3 },

]


const data = [
  { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" }, { vendor: "Infosys Inc", id: 1, model: "xyz", classification: "xyz" },
  { vendor: "Sigmared pvt limited", id: 1, model: "xyz", classification: "xyz" },
];





export default function AITPRM() {
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
      <Row>
        <Col xl="3" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center",
          color: (currentpage == 0) ? "red" : "black",
          fontWeight: (currentpage == 0) ? "bolder" : "lighter"

        }}>
          <h2>1</h2>
        </Col>
        <Col xl="3" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center",
          color: (currentpage == 1) ? "red" : "black",
          fontWeight: (currentpage == 1) ? "bolder" : "lighter"
        }}>
          <h2>2</h2>

        </Col>
        <Col xl="3" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center",
          color: (currentpage == 2) ? "red" : "black",
          fontWeight: (currentpage == 2) ? "bolder" : "lighter"
        }}>
          <h2>3</h2>

        </Col>
        <Col xl="3" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center",
          color: (currentpage == 3) ? "red" : "black",
          fontWeight: (currentpage == 3) ? "bolder" : "lighter"
        }}>
          <h2>4</h2>

        </Col>
      </Row>
      <br />
      <br />
      <br />

      {currentpage == 0 && (<Row style={{  height: "10px" }}>

        <div style={{marginLeft:"40%"}}>
        <h5>Select Model & Vendor</h5>
        </div>
        <br />
        <br />
        <br />
        <br />
        <table className="table_">
          <tr className="tr_">
            <th className="th_">No</th>
            <th className="th_">Vendor Name</th>
            <th className="th_">Model</th>
            <th className="th_">Classified Type</th>
          </tr>
          {data.map(value => {
            return (
              <tr className="tr_" onClick={e => { pageChange(1, value) }}>
                <td className="td_r">{value?.id}</td>
                <td className="td_">{value?.vendor}</td>
                <td className="td_l">{value?.model}</td>
                <td className="td_l">{value?.classification}</td>
              </tr>)
          })}
        </table>
      </Row>)}

      {currentpage == 1 && (<Row style={{ height: "10px" }}>
       
        <div style={{marginLeft:"45%"}}>
        <h5>Checklist</h5>
        </div>
        <br />
        <br />
        <br />
        <br />
        <table className="table_" style={{ marginBottom: "20px" }}>
          <tr className="">
            <th className="th_">Risk Factors</th>
            <th className="th_">Addressing The Factor</th>
            <th className="th_">Risk Rating</th>
            <th className="th_">Mitigation Measures</th>
            <th className="th_">Revised Rating</th>


          </tr>
          {page2.map(value => {
            return (
              <tr className="">
                <td className="td_r">{value?.quetion}</td>
                <td className="td_"><TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Eg: Lorem ipsum dolor sit amet."
                  defaultValue=""
                /></td>
                <td className="td_l"><TextField id="standard-basic" label="Standard" type="number" placeholder="5" /></td>
                <td className="td_l"><TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Eg: Lorem ipsum dolor sit amet."
                  defaultValue=""
                /></td>
                <th className="td_l"><TextField id="standard-basic" label="Standard" type="number" placeholder="5" /></th>
              </tr>)
          })}

        </table>

        <div style={{ marginBottom: "20px", float: "right" }} onClick={e => { pageChange(2, null) }}>
          <Button variant="contained" style={{ backgroundColor: "#23284a", color: "#fff" }} >
            Next
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </Row>)}

      {currentpage == 2 && (<Row style={{ height: "10px" }}>
        <div style={{marginLeft:"45%"}}>
        <h5>Reviewer</h5>
        </div>
        <br />
        <br />
        <br />
        <br />

        <table className="table_" style={{ marginBottom: "20px" }}>
          <tr className="">
            <th className="th_">Risk Factors</th>
            <th className="th_">Addressing The Factor</th>
            <th className="th_">Mitigation Measures</th>
            <th className="th_">Reviewer</th>


          </tr>
          {page3.map(value => {
            return (
              <tr className="">
                <td className="td_r">{value?.quetion}</td>
                <td className="td_">{value?.answer}</td>
                <td className="td_l">{value?.rating}</td>
                <td className="td_l"><TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Eg: Lorem ipsum dolor sit amet."
                  defaultValue=""
                /></td>
              </tr>)
          })}

        </table>

        <div style={{ marginBottom: "20px", float: "right" }} onClick={e => { pageChange(3, null) }}>
          <Button variant="contained" style={{ backgroundColor: "#23284a" , color: "#fff" }} >
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

        <Report />

        </Row>)}
    </>
  );
};

