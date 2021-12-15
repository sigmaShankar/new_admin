import React, { useState, useEffect,useRef } from "react";
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
import LinearProgress from '@material-ui/core/LinearProgress';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import Report from './Report'
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


const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "details",
    label: "Company",
    options: {
      filter: true,
      sort: false,
      display: false
    }
  }
];

const columnsAssessment = [
  {
    name: "Sr. No.",
    label: "Sl. No.",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "Risk Metrics",
    label: "Risk Metrics",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Current Value",
    label: "Current Value",
    options: {
      filter: true,
      sort: false
    }
  }, {
    name: "Normal Range",
    label: "Normal Range",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "Impact",
    label: "Impact",
    options: {
      filter: true,
      sort: false
    }
  }

];


const columnsRiskRegister = [
  {
    name: "Sr",
    label: "Sl. No",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "Regulation Name",
    label: "Risk Name",
    options: {
      filter: true,
      setCellHeaderProps: value => ({ style: { width: "38%" } }),
      sort: false
    }
  },
  {
    name: "Risk Description",
    label: "Regulation Violated",
    options: {
      filter: true,
      setCellHeaderProps: value => ({ style: { width: "40%" } }),
      sort: false
    }
  }, {
    name: "date",
    label: "Date",
    options: {
      filter: true,
      sort: false
    }
  },
];

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];





export default function AIComplaince() {
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
      RiskRegister()
    }
    if (newValue) {
      // setLoadlist('proxy')
      // initValue('proxy')
      section()
    } else {
      // setLoadlist(null)
      initValue(null)
    }
    setValue(newValue);
  };


  // const DownloadPdf = useReactToPrint({
  //   content:()=>componentRef.current,
  // })

  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  // const toggleNavs = (e, index) => {
  //   e.preventDefault();
  //   setActiveNav(index);
  //   setChartExample1Data("data" + index);
  // };
  const [progress, setProgress] = React.useState(0);
  const [spinner, setSpinner] = React.useState(false);
  const [customValue, setCustomValue] = useState({});
  const [algoName, setAlgoname] = useState([]);
  const [adata, setAdata] = useState([]);
  const [_section, setSection] = useState([]);
  const [CurrentRegulation, setCurrentRegulation] = useState("Standard");
  const [currentPage, setCurrentPage] = useState("ML_Fairness");


  const [current_section, setCurrentSection] = useState("");


  const [currentAlgo, setCurrentAlgo] = useState("");
  const [dateList, setDateList] = useState([]);
  const [assessment, setassessment] = useState({});
  const [RistReg, setRistReg] = useState([]);




  useEffect(() => {
    // history.push("/admin/home")
    initValue()
    section()

  }, [customValue], []);

  const section = async () => {
    fetch(process.env.PUBLIC_URL + `/test/${'compliance'}.json`)
      .then(function (res) {
        console.log(Object.keys(res), "hgchgvgvhgvhgv", res)
        return res.json();
      })
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgoselectedAlgoselectedAlgo", Object.keys(selectedAlgo).length)
        if (Object.keys(selectedAlgo).length) {
          let name = Object.keys(selectedAlgo)
          setSection(name)
          setAdata(selectedAlgo)
          setCurrentSection(name[0])
        } else {
          console.log("No compliance")
        }

      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  const RiskRegister = async () => {
    let data_ = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "reg_json" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_reg" : "reg_json";

    fetch(process.env.PUBLIC_URL + `/test/${data_}.json`)
      .then(function (res) {
        console.log(Object.keys(res), "hgchgvgvhgvhgv", res)
        return res.json();
      })
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgoselectedAlgoselectedAlgo", Object.keys(selectedAlgo).length)
        if (Object.keys(selectedAlgo).length) {
          setRistReg(selectedAlgo)
        } else {
          console.log("No compliance")
        }

      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }


  const Assessment = async () => {
    let data_ = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "assessment_report" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_accessment_report" : "assessment_report";

    fetch(process.env.PUBLIC_URL + `/test/${data_}.json`)
      .then(function (res) {
        console.log(Object.keys(res), "hgchgvgvhgvhgv", res)
        return res.json();
      })
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgoselectedAlgoselectedAlgo", Object.keys(selectedAlgo).length)
        if (Object.keys(selectedAlgo).length) {
          setassessment(selectedAlgo)
        } else {
          console.log("No compliance")
        }

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
          // setCreditJson(selectedAlgo);
          if (Object.keys(selectedAlgo).length) {
            selectedAlgo[Object.keys(selectedAlgo)[0]].map((metricsData) =>
              tempOverall = [...tempOverall, metricsData.algo]
            );
            Object.keys(selectedAlgo).map(date => dates.push(new Date(date * 1000).toLocaleDateString("en-US")))

            setAlgoname(tempOverall)
            setCurrentAlgo(tempOverall[0])
            setDateList(dates)
            // console.log(selectedAlgo[Object.keys(selectedAlgo)[0]],"algoName",algoName)
            Object.keys(selectedAlgo).length && Object.values(selectedAlgo).map((metricsDataList) => {
              metricsDataList.map(metricsData => {
                // console.log("algo: ", metricsData.algo)
                if (!(metricsData.algo in metricsList)) metricsList[metricsData.algo] = {};
                Object.keys(metricsData.metrics).map((metric) => {
                  if (metric in metricsList[metricsData.algo]) {
                    metricsList[metricsData.algo][metric].push(metricsData.metrics[metric]);
                  } else
                    metricsList[metricsData.algo][metric] = [metricsData.metrics[metric]];
                });
              })
            });
          }
          // console.log(Object.keys(customValue).length, metricsList)
          if (Object.keys(customValue).length == 0) setCustomValue(metricsList)
        })
        .catch(function (err) {
          console.log(err, " error");
        });
    }
  }

  const handleChange3 = (value) => {
    setCurrentRegulation(value)
  };
  const page_ = (value) => {
    if (value == "ML_Monitor") {
      history.push("/admin/Monitor")

    } else if (value == "ML_Explainability") {
      history.push("/admin/transparency")
    }
  };


  const getData = (data) => {
    if (data == "Monitor") {
      history.push("/admin/Monitor")

    } else if (data == "Transparancy") {
      history.push("/admin/transparency")
    }
  }
  return (
    <>

      {_section && current_section && value == 0 && (<PageTitle  dropDownName="Regulation Name" data={_section} tabs2={["Regulations","Analytics","Risk Register","Report"]} initialData={current_section} selectValue={(data) => { setCurrentSection(data) }} width={["0.15","0.35","0.65"]} tabValue={handleChange} tabSelection={0} />)}
      {algoName && currentAlgo && value == 1 && (<PageTitle  dropDownName="Mitigation Algorithm" data={algoName} tabs2={["Regulations","Analytics","Risk Register","Report"]} initialData={currentAlgo} selectValue={(data) => { setCurrentAlgo(data) }} width={["0.15","0.35","0.65"]} tabValue={handleChange} tabSelection={(value == 1)?1:value} />)}
      {(value == 2 || value == 3) && (<PageTitle  title="AI compliance"  tabs2={["Regulations","Analytics","Risk Register","Report"]} width={["0.3","0.45","0.7"]} tabValue={handleChange} tabSelection={value} />)}


      {/* <Grid container spacing={6}>
        <Grid item md={5} sm={5} xs={5} style={{paddingRight:"2px"}}>
          {_section.length && current_section && (<PageTitle title="AI Complaince" dropDownName="Regulation Name" data={_section} tabs2={["Regulations","Analytics","Risk Register","Assessment Report"]} initialData={current_section} selectValue={(data) => { setCurrentSection(data) }} />)}
        </Grid>
        <Grid item md={7} sm={7} xs={7}   style={{paddingLeft:0}} >
          
          <Tabs
          style={{"border-color": "23284a2e","border-style": "ridge"}}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab style={{ backgroundColor: "#fff" ,padding:"4vh 0px"}} label="Regulations" {...a11yProps(0)} />
            <Tab style={{ backgroundColor: "#fff" ,padding:"4vh 0px"}} label="Analytics" {...a11yProps(1)} />
            <Tab style={{ backgroundColor: "#fff" ,padding:"4vh 0px"}} label="Risk Register" {...a11yProps(2)} />
            <Tab style={{ backgroundColor: "#fff" ,padding:"4vh 0px"}} label="Assessment Report" {...a11yProps(2)} />


          </Tabs>
        </Grid>
      </Grid> */}
      <div className={classes.root}>
        {/* <AppBar position="static"> */}
        {/* <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab style={{ backgroundColor: "#fff" }} label="Regulations" {...a11yProps(0)} />
            <Tab style={{ backgroundColor: "#fff" }} label="Analytics" {...a11yProps(1)} />
            <Tab style={{ backgroundColor: "#fff" }} label="Risk Register" {...a11yProps(2)} />
            <Tab style={{ backgroundColor: "#fff" }} label="Assessment Report" {...a11yProps(2)} />


          </Tabs> */}
        {(spinner) ? <LinearProgress variant="determinate" value={progress} style={{ backgroundColor: "red" }} /> : null}
        {/* </AppBar> */}
        <TabPanel value={value} index={0} dir={theme.direction} >

          {/* <Row className="">
            <Col xl="5" id="select algo">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Regulation Name</h3>
                    </div>
                    <div className="col text-right">
                      <select
                        style={{ backgroundColor: "#0b2755", color: "#fff" }}
                        href="#pablo"
                        class="form-control"
                        onChange={(e) => setCurrentSection(e.target.value)}
                        size="sm"
                      >
                        {_section.length && _section.map((algo) => (
                          <option> {algo} </option>
                        ))}
                      </select>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <br /> */}

          <MUIDataTable
          style={{paddingLeft:0,paddingRight:0}}
            title={"Sections"}
            data={(adata[current_section]) ? adata[current_section]['regulatation'] : []}
            columns={columns}
            options={{
              print: false,
              filter: false,
              selectableRows: false,
              filterType: "dropdown",
              responsive: "scroll",
              expandableRows: true,
              renderExpandableRow: (rowData, rowMeta) => {
                console.log(rowData, rowMeta, "testetet");
                return (
                  <TableRow>
                    <TableCell colSpan={rowData.length}>
                      Details : <div dangerouslySetInnerHTML={{ __html: rowData[1][0] }} />
                    </TableCell>
                  </TableRow>
                );
              }
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
         {algoName && currentAlgo ? ( <Row className="mt-3">
            <Col xl="5" id="select algo">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    {/* <div className="col">
                        <h3 className="mb-0">Mitigation Algorithm</h3>
                      </div> */}
                    <div className="col text-right">
                      <select
                        href="#pablo"
                        class="form-control"
                        style={{ color: "black" }}
                        onChange={(e) => handleChange3(e.target.value)}
                        size="sm"
                      >
                        {/* {results.length && results.map((result) => (
                            <option key={result.id} value={result.name}> {result.name} </option>
                          ))} */}
                        <option value="Standard"> Standard </option>
                        <option value="Specific"> Specific </option>


                      </select>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            <Col xl="5" id="select algo">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    {/* <div className="col">
                        <h3 className="mb-0">Mitigation Algorithm</h3>
                      </div> */}
                    <div className="col text-right">
                      <select
                        href="#pablo"
                        class="form-control"
                        style={{ color: "black" }}
                        onChange={(e) => page_(e.target.value)}
                        size="sm"
                      >
                        <option value="ML_Fairness"> ML Fairness </option>
                        <option value="ML_Monitor"> ML Monitoring </option>
                        <option value="ML_Explainability"> ML Explainability </option>
                      </select>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>):null}



          {CurrentRegulation == "Standard" ? <>
         
            <Container className="mt--7" fluid>
             

              {/* <Row className="mt-3">
                <Col xl="5" id="select algo">
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <div className="col">
                          <h3 className="mb-0">Mitigation Algorithm</h3>
                        </div>
                        <div className="col text-right">
                          <select
                            style={{ backgroundColor: "#0b2755", color: "#fff" }}
                            href="#pablo"
                            class="form-control"
                            onChange={(e) => setCurrentAlgo(e.target.value)}
                            size="sm"
                          >
                            {algoName.length && algoName.map((algo) => (
                              <option> {algo} </option>
                            ))}
                          </select>
                        </div>
                      </Row>
                    </CardHeader>
                  </Card>
                </Col>
              </Row> */}

              <Row className="">

                {
                  Object.keys(customValue).length && Object.keys(customValue[currentAlgo]).map(metric => <MetricsGraph name={metric} algo={currentAlgo} data={customValue[currentAlgo][metric]} dates={dateList} />)
                }
              </Row>
            </Container></> : "Coming soon ..."}

        </TabPanel>


        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* <_Index headerDisplay={true} /> */}
          <MUIDataTable
            data={RistReg}
            columns={columnsRiskRegister}
            options={{
              print: false,
              filter: false,
              selectableRows: false,
            }}
          />
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
        {/* <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      /> */}
           <Report ref={componentRef}/>
        </TabPanel>
      </div>

    </>
  );
};


