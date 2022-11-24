import React, { useState, useEffect, useCallback } from "react";

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
// import LinearProgress from '@material-ui/core/LinearProgress';
import Widget from "../../components/Widget";
import Dot from "../../components/Sidebar/components/Dot";
import axios from "axios";

import PageTitle from "../../components/PageTitle";

import { Grid, LinearProgress, Select, MenuItem, Input, FormControl, InputLabel } from "@material-ui/core";
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
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  CartesianGrid,
  Bar,
  YAxis,
  XAxis, Tooltip,
  PieChart, Pie, Sector, Cell, Legend,
  BarChart
} from "recharts";
// core components
const data = [
  { "name": "High", "accuracy": 5 },
  { "name": "Medium", "accuracy": 20 },
  { "name": "Low", "accuracy": 3 },
  { "name": "High", "accuracy": 5 },
  { "name": "Medium", "accuracy": 20 },
  { "name": "Low", "accuracy": 3 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#ffff00", "#008000"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={5} textAnchor="middle" fill={fill} style={{ fontSize: "12px" }}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        style={{ fontSize: "12px" }}
      >{`value: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        style={{ fontSize: "12px" }}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const data4 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data2 = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

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


export default function AdversarialML() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [spinner, setSpinner] = React.useState(true);
  const [select2, setSelect2] = useState("");
  const [customValue, setCustomValue] = useState({});
  const [currentAlgo, setCurrentAlgo] = useState("");
  const [Preattack, setPreattack] = useState(null);
  const [loadList, setLoadlist] = useState(null);
  const [results, setResults] = useState([]);
  const [modelData, setModelData] = useState(null);
  const [age, setAge] = useState("Model");

  const [fetchResults, setFetchResults] = useState(false);
  const explain = {
    "FeatureImportance": ["Feature Importance"],
    "FeatureImportanceWRTNeurons": ["Layer_0", "Layer_1", "Layer_2"],
    "NeuronIportance": ["Layer_0", "Layer_1", "Layer_2"]
  }

  const lang = sessionStorage.getItem("set")
  const handleChange = (event, newValue) => {
    console.log(newValue, "newValue")
    setModelData(null)
    setValue(newValue);
    if (newValue == 0) {
      getResults('Pre_Attack');

    } else if (newValue == 1) {
      getResults('Post_Attack');

    } else if (newValue == 2) {
      getResults('Defense');

    }
  };

const handle2 = (value)=>{
console.log(value,"valuevalue");
setAge(value.target.value)
}

const handle3 = (value)=>{
  console.log(value,"valuevalue");
  setSelect2(value.target.value)
  }
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

    sessionStorage.removeItem('MODULE_DATA')

    sessionStorage.removeItem("algorithem")
    // document.getElementById('navbar-main').style.display = "block"
    getResults('Pre_Attack');
    // handleChange3("pytorch_model")
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
  const getResults = async (params) => {
    console.log("data received", "selectedAlgoPost_Attack", params)

    fetch(process.env.PUBLIC_URL + `/test/${params}.json`)
      .then(response => response.json())
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgoselectedAlgo")

        setModelData(selectedAlgo)

      })
      .catch(function (err) {
        console.log(err, " error22");
      });
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
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <>
      {/* {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? <Header /> : <HeaderDU />} */}

      <div className={classes.root}>

        <PageTitle title=" Model Performance" leftTitle={"vcvbvc"} />
        <br />




        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ backgroundColor: "#fff" }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={(!lang || lang == "ENGLISH") ? "Pre Attack" : "Si"} {...a11yProps(0)} />
            <Tab label={(!lang || lang == "ENGLISH") ? "Post Attack" : "Actuación"}{...a11yProps(1)} />
            <Tab label={(!lang || lang == "ENGLISH") ? "Defense" : "Explicabilidad"} {...a11yProps(2)} />
            {/* <Tab href="https://whatif.sigmared.ai/" target="_blank" label={(!lang || lang == "ENGLISH") ? "What if" : "Wat nou als"} {...a11yProps(3)} /> */}
            {/* <Tab href="https://whatif.sigmared.ai/" target="_blank" label={(!lang || lang == "ENGLISH") ? "What if" : "Wat nou als"} {...a11yProps(3)} disabled={false}/> */}



          </Tabs>
          {(spinner) ? <LinearProgress variant="determinate" value={progress} style={{ backgroundColor: "red" }} /> : null}
        </AppBar>







        {/* {(fetchResults) ? */}
        <>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* Item One */}
            <br />

            <Container className="mt--6" fluid style={{ paddingLeft: 0 }}>
              {/* {(spinner) ? "Please wait it's loading...." : null} */}

              <>
                <Row style={{ justifyContent: "center" }}>
                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "4vh", marginRight: "5px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                          >
                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                          </div>
                        </div>
                      }
                    >


                      {(modelData && value == 0) && <ResponsiveContainer width="100%" minWidth={300} height={300}>
                        <BarChart
                          data={modelData?.barchart}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 1]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="accuracy" fill="#413ea0" radius={8} barSize={70} />

                        </BarChart>
                      </ResponsiveContainer>
                      }
                    </Widget>
                  </Grid>

                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "4vh", marginLeft: "5px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            {/* <div className={classes.mainChartHeaderLabel}>
                                <Dot color="warning" />
                                <Typography className={classes.mainChartLegentElement}>
                                  Accuracy
                                </Typography>
                              </div>

                              <div className={classes.mainChartHeaderLabel}>
                                <Dot color="primary" />
                                <Typography className={classes.mainChartLegentElement}>
                                  Fairness Score
                                </Typography>
                              </div> */}
                          </div>
                        </div>
                      }
                    >

                      <ResponsiveContainer width="100%" minWidth={300} height={300}>
                        <ComposedChart
                          width={320}
                          height={205}
                          data={data2}
                          margin={{
                            top: 20,
                            right: 10,
                            bottom: 20,
                            left: 10,
                          }}
                        >
                          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis dataKey="name" scale="band" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </Widget>
                  </Grid>
                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                </Row>
                <Row>
                  <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "2vh", margin: "10px" }}></Grid>

                  <Grid item md={3} sm={3} xs={3} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}
                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Precision :-
                              </Typography>
                            </div>
                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "120%" }}>{modelData?.Precision}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >
                    </Widget>
                  </Grid>
                  <Grid item md={3} sm={3} xs={3} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Recall :-
                              </Typography>
                            </div>
                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "120%" }}>{modelData?.Recall}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >
                    </Widget>
                  </Grid>
                  <Grid item md={3} sm={3} xs={3} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                F1 - Score :-
                              </Typography>
                            </div>
                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "120%" }}>{modelData?.f1_Score}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >
                    </Widget>
                  </Grid>
                  <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "2vh", margin: "10px" }}></Grid>

                </Row>
              </>

            </Container>

          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* Item Two */}
            <br />

            <Container className="mt--6" fluid>

              <>
                <Row style={{ justifyContent: "center" }}>
                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                  <Grid item md={6} sm={6} xs={6} style={{ marginBottom: "4vh", marginRight: "5px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>

                          </div>
                        </div>
                      }
                    >

                      {(modelData && value == 1) && <ResponsiveContainer width="100%" minWidth={300} height={300}>
                        <BarChart
                          data={modelData?.barchart}
                          margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" style={{ fontSize: "10px" }} />
                          <YAxis domain={[0, 1]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="old" fill="#dc3545" radius={5} barSize={12} />
                          <Bar dataKey="transformed" fill="#fd7e14" radius={5} barSize={12} />

                        </BarChart>
                      </ResponsiveContainer>}
                    </Widget>
                  </Grid>

                  <Grid item md={4} sm={4} xs={4} style={{ marginBottom: "4vh", marginLeft: "5px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>

                          </div>
                        </div>
                      }
                    >

                      {(modelData && value == 1) && <ResponsiveContainer width="100%" minWidth={300} height={300}>
                        <PieChart width={550} height={750}>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={modelData?.piechart}
                            innerRadius={60}
                            outerRadius={85}
                            fill="#8884d8"
                            dataKey="accuracy"
                            onMouseEnter={onPieEnter}
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <br />
                          <Legend />
                        </PieChart>

                      </ResponsiveContainer>}
                    </Widget>
                  </Grid>
                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                </Row>
                <Row style={{ justifyContent: "center" }}>

                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Sensitivity :-
                              </Typography>
                            </div>

                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "180%" }}>{modelData?.Sensitivity}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >


                    </Widget>
                  </Grid>
                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Robustness :-
                              </Typography>
                            </div>
                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "180%" }}>{modelData?.Robustness}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >


                    </Widget>
                  </Grid>

                </Row>
              </>

            </Container>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            {/* Item Two */}
            <br />

            <Container className="mt--6" fluid>


              <>
                <Row>
                  <Grid item md={4} sm={4} xs={4} style={{ marginBottom: "4vh", marginRight: "5px", width: "100%" }}>
                    <FormControl variant="standard" style={{ width: "100%" }} >
                      <InputLabel id="demo-simple-select-standard-label">Attack Type :-</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handle2}
                        label="Age"
                      >
                        <MenuItem value="projected_gradient_attack">Projected Gradient Attack</MenuItem>
                        <MenuItem value="carliniInfMethod">CarliniInf Method</MenuItem>
                        <MenuItem value="FastestGradientMethod">Fastest Gradient Method</MenuItem>
                        <MenuItem value="deepfool">Deepfool</MenuItem>
                        <MenuItem value="zoo">Zoo</MenuItem>
                        <MenuItem value="adpatch">Adpatch</MenuItem>
                        <MenuItem value="hoopskip">Hoopskip</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} sm={4} xs={4} style={{ marginBottom: "4vh", marginRight: "5px", width: "100%" }}>
                    <FormControl variant="standard" style={{ width: "100%" }} >
                      <InputLabel id="demo-simple-select-standard-label">Defense Type :-</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={select2}
                        onChange={handle3}
                        label="Age"
                      >
                        <MenuItem value="Spatial Smoothing">Spatial Smoothing</MenuItem>
                        <MenuItem value="Resample">Resample</MenuItem>
                        <MenuItem value="Label Smoothing">Label Smoothing</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                  <Grid item md={10} sm={10} xs={10} style={{ marginBottom: "4vh", marginRight: "5px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                           
                          </div>
                        </div>
                      }
                    >

                      {(modelData && value == 2) && <ResponsiveContainer width="100%" minWidth={300} height={300}>
                        <BarChart
                          data={modelData?.Accuracy_meter}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 1]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="accuracy" fill="#413ea0" radius={8} barSize={100} />

                        </BarChart>
                      </ResponsiveContainer>}
                    </Widget>
                  </Grid>


                  {/* <Grid item md={1} sm={1} xs={1} style={{ marginBottom: "4vh" }}></Grid> */}

                </Row>
                <Row style={{ justifyContent: "center" }}>

                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Sensitivity :-
                              </Typography>
                            </div>
                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "150%" }}>{modelData?.Sensitivity}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >


                    </Widget>
                  </Grid>
                  <Grid item md={5} sm={5} xs={5} style={{ marginBottom: "2vh", margin: "10px" }}>
                    {/* <h4>Fairness and Accuracy Over Time</h4> */}

                    <Widget
                      bodyClass={classes.mainChartBody}
                      header={
                        <div className={classes.mainChartHeader}>
                          <Typography
                            variant="h4"
                            color="text"
                            colorBrightness="secondary"
                          >

                          </Typography>
                          <div className={classes.mainChartHeaderLabels}>
                            <div className={classes.mainChartHeaderLabel}>
                              <Typography className={classes.mainChartLegentElement}>
                                Robustness :-
                              </Typography>
                            </div>

                            <Grid item md={12} sm={12} xs={12}>
                              <h1 style={{ display: "flex", justifyContent: "center", marginLeft: "150%" }}>{modelData?.Robustness}</h1>
                            </Grid>
                          </div>
                        </div>
                      }
                    >
                    </Widget>
                  </Grid>

                </Row>
              </>

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
        {/* : null} */}
      </div>
      <ToastContainer />

    </>
  );
};


