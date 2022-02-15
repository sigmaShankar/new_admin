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

import MetricsGraph from "../Tab/Ethics/Metrics";
// import metricsDataCollection from "./Ethics/data/algoList.json";
// import ReactPDF from '@react-pdf/renderer';
import ReactToPrint from 'react-to-print';



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






const data = [
  { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" }, { vendor: "Infosys Inc", id: 1,model:"xyz",classification:"xyz" },
  { vendor: "Sigmared pvt limited", id: 1,model:"xyz",classification:"xyz" },
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
    setCurrentAlgo("")
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

  const [currentAlgo, setCurrentAlgo] = useState("");
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
        <Col xl="4" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center"
        }}>
          <h2>1</h2>
        </Col>
        <Col xl="4" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center"
        }}>
          <h2>2</h2>

        </Col>
        <Col xl="4" style={{
          width: "100%", height: "10px", display: "flex",
          "justify-content": "center"
        }}>
          <h2>3</h2>

        </Col>
      </Row>
      <br />
      <br />
      <br />

      <Row style={{ width: "100%", height: "10px", backgroundColor: "red" }}>
        <table className="table_">
          <tr className="tr_">
            <th className="th_">No</th>
            <th className="th_">Vendor Name</th>
            <th className="th_">Model</th>
            <th className="th_">Classified Type</th>

          </tr>
         {data.map(value=>{
           return (
           <tr className="tr_">
           <td className="td_r">{value?.id}</td>
           <td className="td_">{value?.vendor}</td>
           <td className="td_l">{value?.model}</td>
           <td className="td_l">{value?.classification}</td>
         </tr>)
         })} 
          {/* <tr className="tr_">
            <td className="td_r">Peter</td>
            <td className="td_">asndjankajnsdkjandkajsndkajndkanjsdnkasjdnadasdasdasasdasd</td>
            <td className="td_l">$100</td>
            <td className="td_l">$100</td>

          </tr> */}

        </table>
      </Row>
    </>
  );
};

