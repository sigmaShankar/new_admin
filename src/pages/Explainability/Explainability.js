import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";
import SimpleAttributions from "./TransparencyPages/SimpleAttributions";
import ModelPerformance from "./TransparencyPages/ModelPerformance";
import Eda from "./TransparencyPages/Eda";
import Explainability from "./TransparencyPages/Explainability";

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

// core components


// import Header from "components/Headers/Header.js";
// import HeaderDU from "components/Headers/HeaderDU.js";


const ENDPOINT = "http://127.0.0.1:4000";


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


export default function Explainability2 (){
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [spinner, setSpinner] = React.useState(true);
  const [algoName, setAlgoname] = useState([]);
  const [customValue, setCustomValue] = useState({});
  const [currentAlgo, setCurrentAlgo] = useState("");
  const [dateList, setDateList] = useState([]);
  const [loadList, setLoadlist] = useState(null);
  const [results, setResults] = useState([]);

  const [fetchResults, setFetchResults] = useState(false);
  const explain = {
    "FeatureImportance": ["Feature Importance"],
    "FeatureImportanceWRTNeurons": ["Layer_0", "Layer_1", "Layer_2"],
    "NeuronIportance": ["Layer_0", "Layer_1", "Layer_2"]
  }

  const lang = sessionStorage.getItem("set")
  const handleChange = (event, newValue) => {
    setSpinner(true)

    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [groupValue1, setgroupValue1] = useState("");
  const [groupValue2, setgroupValue2] = useState("");




  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  // const [value, setValue] = useState([]);
  const [Barchartvalue, setBarchartvalue] = useState([]);


  useEffect(() => {
    // if(!sessionStorage.getItem("currentModelName")){
    // toast.error("Please select the model", {
    //   position: "top-right",
    //   autoClose: 4000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    // }
    sessionStorage.removeItem('MODULE_DATA')

    sessionStorage.removeItem("algorithem")
    // document.getElementById('navbar-main').style.display = "block"
    // getResults();
    handleChange3("pytorch_model")
  }, []);


  const startAlert = () => {
    toast.error("Error", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const stopSpinner = () => {
    setSpinner(false)

  }

  // console.log(customValue,"Object.keys(customValue).length");
  const getResults = async () => {
    const response = await axios.get(`http://18.116.235.85:8000/target`);
    setResults(response.data);
    console.log(response);
  };

  const handleChangeGroup = (value) => {
    setgroupValue1("")
    setgroupValue2("")
    setTimeout(() => {
      setgroupValue1(value)

    }, 0);
  }

  const handleChangeGroup2 = (value) => {
    setgroupValue2("")
    setTimeout(() => {
      setgroupValue2(value)

    }, 0);
  }

  const handleChange2 = (value) => {
    axios
      .post("http://18.116.235.85:8000/target", {
        target_feature: value,
      })
      .then(function (response) {
        if (response.data === "Invalid Target") {
          // alert("Select a valid target column");
          toast.error("Select a valid target column", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setFetchResults(true);
          setSpinner(true)
        }
      });
  };

  const handleChange3 = (value) => {
    setFetchResults(false);
    setSpinner(true)
    sessionStorage.setItem("algorithem", value)
    setTimeout(() => {
      setFetchResults(true);
    }, 1000);
  };

  return (
    <>
      {/* {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? <Header /> : <HeaderDU />} */}

      <div className={classes.root}>
      <b>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('projectName'))?sessionStorage.getItem('projectName'):"* Please select Project"}
              
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('modelName'))?sessionStorage.getItem('modelName'):"* Please select Model"}
            </span>
          </b>
          <br />
          <br />

        {(fetchResults) ?

          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              style={{backgroundColor:"#fff"}}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label={(!lang || lang == "ENGLISH") ? "EDA" : "Si"} {...a11yProps(0)} />
              <Tab label={(!lang || lang == "ENGLISH") ? "Performance" : "Actuación"}{...a11yProps(1)} />
              <Tab label={(!lang || lang == "ENGLISH") ? "Explainability" : "Explicabilidad"} {...a11yProps(2)} />
              {/* <Tab href="https://whatif.sigmared.ai/" target="_blank" label={(!lang || lang == "ENGLISH") ? "What if" : "Wat nou als"} {...a11yProps(3)} /> */}
              <Tab href="https://whatif.sigmared.ai/" target="_blank" label={(!lang || lang == "ENGLISH") ? "What if" : "Wat nou als"} {...a11yProps(3)} disabled={false}/>

              

            </Tabs>
            {(spinner) ? <LinearProgress variant="determinate" value={progress} style={{ backgroundColor: "red" }} /> : null}
          </AppBar> : null}


        {/* {(!fetchResults) ?
          <Container className="mt--14" fluid style={{ paddingLeft: 0 }}>

            <Row className="mt-5">
              <Col xl="5" id="select algo">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Select target column :</h3>
                      </div>
                      <div className="col text-right">
                        <select
                          href="#pablo"
                          class="form-control"
                          style={{ backgroundColor: "#0b2755", color: "#fff" }}
                          onChange={(e) => handleChange2(e.target.value)}
                          size="sm"
                        >
                          {results.length && results.map((result) => (
                            <option key={result.id} value={result.name}> {result.name} </option>
                          ))}
                        </select>
                      </div>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
          </Container>
          : null} */}


         {(value == 2) ? 
        <Container className="mt--14" fluid style={{ paddingLeft: 0 ,paddingBottom:"0"}}>

          <Row className="mt-3">
            <Col xl="8" id="select algo">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h5 className="mb-0">{(!lang || lang == "ENGLISH") ? "Select Model" : "Seleccionar columna de destino"}  :</h5>
                    </div>
                    <div className="col text-right">
                      <select
                        href="#pablo"
                        class="form-control"
                        style={{ backgroundColor: "#0b2755", color: "#fff" }}
                        onChange={(e) => handleChange3(e.target.value)}
                        size="sm"
                      >
                        {/* {results.length && results.map((result) => (
                            <option key={result.id} value={result.name}> {result.name} </option>
                          ))} */}
                        <option value="pytorch_model"> Pytorch Model(Credit Lending) </option>
                        <option value="scikitk-learn_model"> Scikit-learn model(Sample Welfare Benefit Fraud) </option>


                      </select>
                    </div>
                    {(sessionStorage.getItem('algorithem') == "pytorch_model" && value == 2) ?
                      <>
                        <div className="col text-right">
                          <select

                            class="form-control"
                            style={{ backgroundColor: "#0b2755", color: "#fff" }}
                            onChange={(e) => handleChangeGroup(e.target.value)}
                            size="sm"
                          >

                            <option value="">{(!lang || lang == "ENGLISH") ? "Select Group" : "Selecciona grupo"}  </option>
                            <option value="FeatureImportance"> Feature Importance </option>
                            <option value="FeatureImportanceWRTNeurons"> Feature Importance WRT Neurons </option>
                            <option value="NeuronIportance"> Neuron Importance </option>


                          </select>
                        </div>

                        <div className="col text-right">
                          <select

                            class="form-control"
                            style={{ backgroundColor: "#0b2755", color: "#fff" }}
                            onChange={(e) => handleChangeGroup2(e.target.value)}
                            size="sm"
                          >
                            <option value="">{(!lang || lang == "ENGLISH") ? " Select sub Group" : "Seleccionar subgrupo"}  </option>
                            {groupValue1 && explain[groupValue1].map((result) => (
                              <option key={result} value={result}> {result} </option>
                            ))}

                          </select>
                        </div>
                      </>
                      : null}
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
        : null}

        {(fetchResults) ?
          <>
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/* Item One */}
              <br />
           
              <Container className="mt--6" fluid style={{ paddingLeft: 0 }}>
                {(spinner) ? "Please wait it's loading...." : null}

                {(fetchResults) ? <Eda stopSpinner={stopSpinner} startAlert={startAlert}></Eda> : null}

              </Container>

            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {/* Item Two */}
              <br />

              <Container className="mt--6" fluid>

              {(spinner) ? "Please wait it's loading...." : null}

                {(fetchResults) ? <ModelPerformance stopSpinner={stopSpinner} startAlert={startAlert}></ModelPerformance> : null}

              </Container>
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              {/* Item Two */}
              <br />

              <Container className="mt--6" fluid>

                {(sessionStorage.getItem('algorithem') == "pytorch_model") ? <>{(spinner) ? "Please select any model...." : null


                }
                  {(groupValue2) ? <Explainability stopSpinner={stopSpinner} startAlert={startAlert} group1={groupValue1} group2={groupValue2}></Explainability> : null}

                </> :

                  <>

                    {(spinner) ? "Please wait it's loading...." : null}
                    <SimpleAttributions stopSpinner={stopSpinner} startAlert={startAlert}></SimpleAttributions>

                  </>
                }

              </Container>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              {/* Item Two */}
              <br />


              <Container className="mt--6" fluid>

              {(spinner) ? "Please refer the new tab" : null}

                {/* {(fetchResults) ? <ModelPerformance stopSpinner={stopSpinner} startAlert={startAlert}></ModelPerformance> : null} */}

              </Container>
            </TabPanel>
          </>
          : null}
      </div>
      <ToastContainer />

    </>
  );
};


