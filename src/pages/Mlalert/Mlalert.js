
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Chart from "chart.js";
import Plot from 'react-plotly.js';
import {
  Card,
  Row,
  Col,
} from "reactstrap";
// import { Line } from "react-chartjs-2";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';


// import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';


// reactstrap components
import { CardHeader, Table, Container } from "reactstrap";
import Typography from '@material-ui/core/Typography';

// import "./custom.css";
// core components
// import Header from "components/Headers/Header.js";
// const _csv = require('csvtojson')

import { Link } from "react-router-dom";
// ##############################################

import PropTypes from 'prop-types';
// import {
//   Line as Line2, LineChart, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,

//   ScatterChart, Scatter, ComposedChart, Area
// } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';
// import { TramOutlined } from "@material-ui/icons";


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};


// #####################################################

const datasets = {
  "Monitoring": {
    "project_name": "Credit_Lending",
    "model_name": "Credit_Fraud_Module",
    "header": "Monitoring Alert",
    "values": [
        {
            "x": [
                "od",
                "dd",
                "cd",
                "ae",
                "NaN",
                "Out_of_range"
            ],
            "y": [
                2.30,
                5.4,
                0.0,
                0.23,
                1.0,
                1.152
            ],
            "type": "bar",
            "name": "Normal",
            "mode": "lines+markers",
            "marker": {
                "color": "blue"
            },
            "width": "0.25"
        }
    ],
    "layout": {
        "autosize": "false",
        "margin": {
            "l": 50,
            "r": 50,
            "b": 50,
            "t": 50,
            "pad": 0
        },
        "height": 350,
        "width": 875,
        "xaxis": {
            "title": ""
        },
        "yaxis": {
            "title": "Percentage"
        },
        "showlegend": "true"
    },
    "features": [
        {
            "title": "od_alert",
            "data": [
                "Percentage of outlier sample detected in production data is Normal"
            ]
        },
        {
            "title": "dd_alert",
            "data": [
                "Percentage of feature drifted in production data is High"
            ]
        },
        {
            "title": "cd_alert",
            "data": [
                "Percentage of accuracy drift detected in production data is Normal"
            ]
        },
        {
            "title": "ae_alert",
            "data": [
                "Percentage of adversarial sample detected in production data is Normal"
            ]
        },
        {
            "title": "di_alert",
            "data": [
                "Percentage of NaN value detected in production data is Normal",
                "Percentage of OOR(Out of Range) value detected in production data is Normal"
            ]
        },
        {
            "title": "Logs",
            "data": [
                "** Adverserial_Detection ** : ",
                "Critical/Error logs Not found in Adverserial_Detection log file",
                "** Concept_Drift ** : ",
                "2021-05-27 22:13:34,265 — Concept_Drift — CRITICAL — CD training failed",
                "** Drift_Detection ** : ",
                "Critical/Error logs Not found in Drift_Detection log file",
                "** Outlier_Detection ** : ",
                "Critical/Error logs Not found in Outlier_Detection log file",
                "** Credit_Lending_Credit_Fraud_Module ** : ",
                "Critical/Error logs Not found in Credit_Lending_Credit_Fraud_Module log file",
                "** response ** : ",
                "Critical/Error logs Not found in response log file"
            ]
        }
    ],
    "timestamp": "2021-06-08 23:09",
    "name": "Monitoring Alert",
    "des": " Monitoring alerts indicate the percentage of outliers, drifted features, adversarial samples, NaN(null) values, and OOR(out of range) values in the production data that go beyond the predetermined threshold value and are highlighted through a different color. If the metric percentage is less than 2% then it is considered as a normal alert (blue), if it is between 2% to 5% then it will appear as medium alert (yellow) and if the metric percentage is beyond 5% then it will appear as a high alert (red). The pie chart indicates the total number of normal, medium, and high alerts. All the dropdown buttons contain the information of the particular module such as alerts from the outlier detection module, the drift detection module, and more. Finally, the logs button contains critical/Error log information if any."
},
"bias_alert": {
    "header": "Bias Alert",
    "values": [
        {
            "x": [
                "false_negative_rate_ratio",
                "false_ommision_rate_ratio",
                "sensitivity",
                "false_discovery_rate"
            ],
            "y": [
                8.956e-08,
                1.718e-05,
                1.241e-08,
                5.162e-06
            ],
            "type": "bar",
            "marker": {
                "color": "red"
            },
            "width": "0.25",
            "barmode": "stack"
        }
    ],
    
    "layout": {
        "autosize": "false",
        "margin": {
            "l": 50,
            "r": 50,
            "b": 50,
            "t": 50,
            "pad": 0
        },
        "height": 350,
        "width": 875,
        "xaxis": {
            "title": "metrics"
        },
        "yaxis": {
            "title": "Percentage of change"
        },
        "showlegend": "true"
    },
    
    "features": [
        {
            "title": "Alert_Messages",
            "data": [
                "false_negative_rate_ratio : metric value has been changed : 8.956e-08%",
                "false_ommision_rate_ratio : metric value has been changed : 1.718e-05%",
                "sensitivity : metric value has been changed : 1.241e-08%",
                "false_discovery_rate : metric value has been changed : 5.162e-06%"
            ]
        }
    ],
    "name": "Bias alert",
    "des": "The bias alert bar chart only displays metrics that have changed in production. The y-axis indicates the percentage of change that occurred in these metrics. The pie chart indicates the number of Normal, Medium, and high alerts. The alert message button contains the information of the changed metrics along with their percentage value."
}
}


const datasetForChaild ={
  "Monitoring": {
      "project_name": "insurance_claim",
      "model_name": "insurance",
      "header": "Monitoring Alert",
      "values": [
          {
              "x": [
                  "od",
                  "dd",
                  "cd",
                  "ae",
                  "NaN",
                  "Out_of_range"
              ],
              "y": [
                  2,
                  0.125,
                  0.95,
                  2,
                  0.0,
                  0.001
              ],
              "type": "bar",
              "name": "Normal",
              "mode": "lines+markers",
              "marker": {
                  "color": "rgb(0, 204, 204)"
              },
              "width": "0.25"
          }
      ],
      "layout": {
          "autosize": "false",
          "margin": {
              "l": 50,
              "r": 50,
              "b": 50,
              "t": 50,
              "pad": 0
          },
          "height": 350,
          "width": 875,
          "xaxis": {
              "title": ""
          },
          "yaxis": {
              "title": ""
          },
          "showlegend": "true"
      },
      "features": [
          {
              "title": "od_alert",
              "data": [
                  "Percentage of outlier sample detected in production data is Medium"
              ]
          },
          {
              "title": "dd_alert",
              "data": [
                  "Percentage of feature drifted in production data is Normal"
              ]
          },
          {
              "title": "cd_alert",
              "data": [
                  "Percentage of accuracy drift detected in production data is Normal"
              ]
          },
          {
              "title": "ae_alert",
              "data": [
                  "Percentage of adversarial sample detected in production data is High"
              ]
          },
          {
              "title": "di_alert",
              "data": [
                  "Percentage of NaN value detected in production data is Normal",
                  "Percentage of OOR(Out of Range) value detected in production data is Normal"
              ]
          },
          {
              "title": "Logs",
              "data": [
                  "***** Adverserial_Detection ***** : ",
                  "Critical/Error logs Not found in Adverserial_Detection log file",
                  "***** Concept_Drift ***** : ",
                  "Critical/Error logs Not found in Concept_Drift log file",
                  "***** Drift_Detection ***** : ",
                  "Critical/Error logs Not found in Drift_Detection log file",
                  "***** Outlier_Detection ***** : ",
                  "Critical/Error logs Not found in Outlier_Detection log file",
                  "***** insurance_claim_insurance ***** : ",
                  "Critical/Error logs Not found in insurance_claim_insurance log file",
                  "***** response ***** : ",
                  "Critical/Error logs Not found in response log file"
              ]
          }
      ],
      "timestamp": "2021-06-15 18:51:51.967794",
      "name": "Monitoring Alert",
      "des": " Monitoring alerts indicate the percentage of outliers, drifted features, \n\n      adversarial samples, NaN(null) values and OOR(out of range) values in the production \n\n      data that go beyond the predetermined threshold value and is highlighted through a \n\n      different color. If the metric percentage is less than 2% then it is considered as a \n\n      normal alert (blue), if it is between 2% to 5% then it will appear as medium alert (yellow) \n\n      and if the metric percentage is beyond 5% then it will appear as a high alert (red). \n\n      The pie chart indicates the total number of normal, medium and high alerts. All the dropdown \n\n      buttons contain the information of the particular module such as alerts from the outlier \n\n      detection module, the drift detection module and more. Finally, the logs button contains \n\n      critical/Error log information if any.\n"
  },
  "bias_alert": {
      "header": "Bias Alert",
      "values": [
          {
              "x": [
                  "false_negative_rate_ratio",
                  "false_ommision_rate_ratio",
                  "sensitivity",
                  "false_discovery_rate"
              ],
              "y": [
                  8.956371354087289e-08,
                  1.7182778292181736e-05,
                  1.241283226986617e-08,
                  5.162895667882635e-06
              ],
              "type": "bar",
              "marker": {
                  "color": "red"
              },
              "width": "0.25",
              "barmode": "stack"
          }
      ],
      "layout": {
          "autosize": "false",
          "margin": {
              "l": 50,
              "r": 50,
              "b": 50,
              "t": 50,
              "pad": 0
          },
          "height": 350,
          "width": 875,
          "xaxis": {
              "title": ""
          },
          "yaxis": {
              "title": ""
          },
          "showlegend": "true"
      },
      "features": [
          {
              "title": "Alert_Messages",
              "data": [
                  "false_negative_rate_ratio : metric value has been changed : 8.956371354087289e-08%",
                  "false_ommision_rate_ratio : metric value has been changed : 1.7182778292181736e-05%",
                  "sensitivity : metric value has been changed : 1.241283226986617e-08%",
                  "false_discovery_rate : metric value has been changed : 5.162895667882635e-06%",
                  "false_discovery_rate: metric has medium risk in production",
                  "false_ommision_rate: metric has HIGH risk in production"
              ]
          }
      ],
      "name": "Bias alert",
      "des": " The bias alert bar chart only display metrics that have changed in production. \n\n        The y-axis indicates the percentage of change that occurred in these metrics. The pie chart \n\n        indicates the number of Normal, Medium and high alerts. The alert message button contains the \n\n        information of the changed metrics along with their percentage value."
  }
}


const useStyles = makeStyles((theme) => ({
  bar: {
    // display: 'flex',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  root: {
    width: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backgroundColor: "red"
}));

// const Plot = createPlotlyComponent(Plotly);


export default function Mlalert(){
  const classes = useStyles();
  // const executeScroll = (params) => { document.getElementById(params).scrollIntoView() }

  const [progress, setProgress] = React.useState(20);

  const [overallEthics, setOverallScore] = useState("0");
  const [monitor, setMonitor] = useState({});
  const [bias, setBias] = useState({});
  // const [drift, setDrift] = useState({});
  // const [adversarial, setAdversarial] = useState({});
  // const [concept, setConcept] = useState({});
  // const [bias, setBias] = useState({});
  // const [transparency, setTransparency] = useState({});
  const [spinner, setSpinner] = React.useState(true);
  const nbsp = '\u00A0';
  const breakline = '\u000A';


  let config = {
    showLink: false,
    displayModeBar: true
  };

  useEffect(() => {
    
    getData("all")
  }, []);

  const getData = (value) => {
    setSpinner(true)

    if (Object.keys(datasets).length) {
      if (datasets['Monitoring']) {
        // setMonitor(datasets['Monitoring'])
        setMonitor((sessionStorage.getItem("currentModelName") == "Credit Lending") ? datasets['Monitoring'] : datasetForChaild['Monitoring'])

      }

      if (datasets['bias_alert']) {
        // setBias(datasets['bias_alert'])
        setBias((sessionStorage.getItem("currentModelName") == "Credit Lending") ? datasets['bias_alert'] : datasetForChaild['bias_alert'])

      }

    }
    setSpinner(false)

    // let localData = JSON.parse(sessionStorage.getItem('MODULE_DATA'))
    // http://127.0.0.1:8000/v2/${value}/`
    // fetch(`http://127.0.0.1:8000/monitoring/?project_name=${localData.project_name}&module_name=${localData.module_name}`)
    //   .then(function (res) {
    //     return res.json();
    //   })
    //   .then(function (datasets) {
    //     if (Object.keys(datasets).length) {
    //       if (datasets['Monitoring']) {
    //         setMonitor(datasets['Monitoring'])

    //       }

    //       if (datasets['bias_alert']) {
    //         setBias(datasets['bias_alert'])

    //       }
    //       setSpinner(false)
    //     }


    //     else {
    //       toast.error("No data found", {
    //         position: "top-right",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //     }
    //     setSpinner(false)

    //   })
    //   .catch(function (err) {
    //     // toast.error("Unable to load the file", {
    //     //   position: "top-right",
    //     //   autoClose: 4000,
    //     //   hideProgressBar: false,
    //     //   closeOnClick: true,
    //     //   pauseOnHover: true,
    //     //   draggable: true,
    //     //   progress: undefined,
    //     // });
    //     // console.log(err, " error");
    //     // setSpinner(false)

    //   });

  }


  return (
    <>
      {/* <Header show={overallEthics}  type=""/> */}
      {/* Page content */}
      {/* {console.log(outlier?.values, "outvalue", data)} */}
      <Container  fluid >
      <b>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('projectName'))?sessionStorage.getItem('projectName'):"* Please select Project"}
              
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('modelName'))?sessionStorage.getItem('modelName'):"* Please select Model"}
            </span>
          </b>
        {(spinner) ? <div className={classes.bar}>
          <LinearProgress color="secondary" style={{ backgroundColor: 'rgb(181 29 25)' }} />
          {/* <CircularProgress color="secondary" /> */}
        </div>
          :
          <>
            {/* <ThemeProvider theme={theme}>
              <Row>
                <Col xl="3" className="" >
                  <Button variant="contained" onClick={() => { executeScroll('outlier') }} style={{ color: "#fff", backgroundColor: "#0b2755", width: "100%", borderRadius: "29px" }} className={classes.margin}>
                    Monitor Alert
      </Button>
                </Col>
                <Col xl="3" className="" >

                  <Button variant="contained" onClick={() => { executeScroll('bias') }} style={{ color: "#fff", backgroundColor: "#0b2755", width: "100%", borderRadius: "29px" }} className={classes.margin}>
                    Bias Alert
      </Button>
                </Col>



              </Row>
            </ThemeProvider> */}
            {/* {ROW 1 => } */}

            <Row className="mt-5" id="outlier">
              <Col className=" mb-xl-0" xl="12" style={{
               "background-color": "#fff",
               "box-shadow":" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
               "background-clip": "border-box",
               "border-radius": "0.375rem"
              }}>
                {/* <Card className="" style={{ "box-shadow": "1px 1px 7px 0px black", transitionDelay: "1.5s" }}> */}
                <CardHeader className="border-0" >
                  <Row className="align-items-center">
                    <div className="col" style={{ marginLeft: "-3%" }}>
                      <Link
                        className="h2 m-3   d-none d-lg-inline-block "

                      > {monitor.header} </Link>
                    </div>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>

                  <tbody>
                    <tr>
                      <th scope="row">Description</th>
                      <td className="text-wrap" style={{ lineHeight: 1.6 }}>{monitor.des} </td>
                    </tr>

                  </tbody>
                </Table>
                <Col xl="12" className="mt-3" style={{ marginLeft: '0%' }}>

                  <Row className="mt-5">

                    <Col xl="12" className="" >
                      <Plot
                        style={{ marginTop: "-2.5%", borderRadius: "25px", alignItems: "center", display: "flex", justifyContent: "center" }}
                        data={monitor.values}
                        layout={monitor.layout}

                        config={{
                          showLink: false,
                          displayModeBar: false,
                          responsive: true
                        }}
                      />
                    </Col>
                  </Row>

                  {/* <Row className="mt-5">

                    <Col xl="12" className="" >
                      <Plot
                        style={{ marginTop: "-2.5%", borderRadius: "25px", alignItems: "center", display: "flex", justifyContent: "center" }}
                        data={monitor.values2}
                        layout={monitor.layout2}

                        config={{
                          showLink: false,
                          displayModeBar: false,
                          responsive: true
                        }}
                      />
                    </Col>
                  </Row> */}
                  {/* </Card> */}

                  <br />
                  {monitor.features && monitor.features.map(x => <div className={classes.root}>
                    <Accordion style={{ marginBottom: "10px", backgroundColor: "rgb(218 218 218 / 28%)" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading} style={{ width: "100%" }}>
                          <small style={{ float: "left", width: "100px" }}> {x.title}</small>
                        </Typography>

                      </AccordionSummary>
                      <AccordionDetails style={{ width: "100%" }}>
                        <div style={{ display: "inline-flex", marginLeft: "3%", width: "100%" }}>
                          {(x?.data.length) ?
                            <>
                              <Table className="align-items-center table-flush" responsive >

                                <tbody>

                                  {x?.data.length && x.data.map((inlineGrapth, index) => <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td className="text-wrap" style={{ lineHeight: 1.6 }}>{inlineGrapth} </td>
                                  </tr>
                                  )}
                                </tbody>
                              </Table>

                            </>
                            : null
                          }
                        </div>
                      </AccordionDetails>
                    </Accordion>

                  </div>)}

                </Col>
                <br />
                {/* </Card> */}
              </Col>
            </Row>

            {/* {ROW  => 2 bias} */}

            <Row className="mt-5" id="bias">
              <Col className=" mb-xl-0" xl="12" style={{
                "background-color": "#fff",
                "box-shadow":" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                "background-clip": "border-box",
                "border-radius": "0.375rem"
              }}>
                {/* <Card className="" style={{ "box-shadow": "1px 1px 7px 0px black", transitionDelay: "1.5s" }}> */}
                <CardHeader className="border-0" >
                  <Row className="align-items-center">
                    <div className="col" style={{ marginLeft: "-3%" }}>
                      <Link
                        className="h2 m-3   d-none d-lg-inline-block "

                      > {bias.header} </Link>
                    </div>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>

                  <tbody>
                    <tr>
                      <th scope="row">Description</th>
                      <td className="text-wrap" style={{ lineHeight: 1.6 }}>{bias.des} </td>
                    </tr>

                  </tbody>
                </Table>
                <Col xl="12" className="mt-3" style={{ marginLeft: '0%' }}>

                  <Row className="mt-5">

                    <Col xl="12" className="" >
                      <Plot
                        style={{ marginTop: "-2.5%", borderRadius: "25px", alignItems: "center", display: "flex", justifyContent: "center" }}
                        data={bias.values}
                        layout={bias.layout}

                        config={{
                          showLink: false,
                          displayModeBar: false,
                          responsive: true
                        }}
                      />
                    </Col>
                  </Row>

                  {/* <Row className="mt-5">

                    <Col xl="12" className="" >
                      <Plot
                        style={{ marginTop: "-2.5%", borderRadius: "25px", alignItems: "center", display: "flex", justifyContent: "center" }}
                        data={bias.values2}
                        layout={bias.layout2}

                        config={{
                          showLink: false,
                          displayModeBar: false,
                          responsive: true
                        }}
                      />
                    </Col>
                  </Row> */}
                  {/* </Card> */}

                  <br />
                  {bias.features && bias.features.map(x => <div className={classes.root}>
                    <Accordion style={{ marginBottom: "10px", backgroundColor: "rgb(218 218 218 / 28%)" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading} style={{ width: "100%" }}>
                          <small style={{ float: "left", width: "100px" }}> {x.title}</small>
                        </Typography>

                      </AccordionSummary>
                      <AccordionDetails style={{ width: "100%" }}>
                        <div style={{ display: "inline-flex", marginLeft: "3%", width: "100%" }}>
                          {(x?.data.length) ?
                            <>
                              <Table className="align-items-center table-flush" responsive >

                                <tbody>

                                  {x?.data.length && x.data.map((inlineGrapth, index) => <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td className="text-wrap" style={{ lineHeight: 1.6 }}>{inlineGrapth} </td>
                                  </tr>
                                  )}
                                </tbody>
                              </Table>

                            </>
                            : null
                          }
                        </div>
                      </AccordionDetails>
                    </Accordion>

                  </div>)}

                </Col>
                <br />
                {/* </Card> */}
              </Col>
            </Row>

          </>
        }

      </Container>
      <ToastContainer />
    </>
  );
};

