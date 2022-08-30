import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,

} from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon, Notifications as NotificationsIcon } from "@material-ui/icons";
import classnames from "classnames";

import {
  Row,
  Col,
} from "reactstrap";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend

} from "recharts";

import { DoneAll as DoneAllIcon } from "@material-ui/icons";

// styles
import useStyles from "./styles";
// import { ResponsiveLine } from '@nivo/line'

// import { ResponsiveChord } from '@nivo/chord'
// components
import mock from "./mock";
import Widget from "../../components/Widget";

import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Index from "./components/Table/datatable";

import BigStat from "./components/BigStat/BigStat";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];


export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [modelValue, setModelValue] = useState("Weekly");
  var [modelData, setModelData] = useState({});
  var [modelDataSelect, setModelSelection] = useState(null);
  var [Submodel, setSubmodel] = useState(null);


  useEffect(() => {
    initValue()
    sessionStorage.removeItem('modelName')
    sessionStorage.removeItem('modelId')
    sessionStorage.removeItem('projectName')
    sessionStorage.removeItem('projctId')
    // if (sessionStorage.getItem('currentModelName')) {
    //   sessionStorage.setItem('currentModelName', "Credit Lending")
    // }
  }, []);

  const setModel = (value) => {
    setModelValue(false)
    sessionStorage.setItem('currentModelName', value)
    setTimeout(() => {
      setModelValue(true)

    }, 1000);
  }

  const selectedModel = (data, name, pid, pname) => {
    console.log(data, name, pid, pname)
    setModelSelection(null)
    setSubmodel(null)
    sessionStorage.setItem('currentModelName', name)
    sessionStorage.setItem('projectName', pname)
    sessionStorage.setItem('projctId', pid)
    sessionStorage.removeItem('modelName')
    sessionStorage.removeItem('modelId')


    console.log(modelDataSelect, "modelDataSelect")
    setModelSelection(data)
  }

  const selectSub = (name, id) => {
    sessionStorage.setItem('modelName', name)
    sessionStorage.setItem('modelId', id)
    setSubmodel(true)
  }

  const initValue = async () => {
    fetch(process.env.PUBLIC_URL + `/test/${'module'}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgo")
        setModelData(selectedAlgo)
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      {/* <PageTitle title="Model Inventory" width={["0.5"]} leftTitle={"vcvbvc"} /> */}
      <br />
      <div xs={12} md={12} lg={12} sm={12}>
        <Grid item xs={6} md={6} lg={6} sm={6}>
          <h5>DFRS - Dietary Factor Rhyme Score</h5>
        </Grid>
        <Grid item xs={6} md={6} lg={6} sm={6}>
          <Select
            style={{ float: "right", marginTop: "-6%", marginRight: "-66%", width: "70%" }}
            value={modelValue}
            // onChange={e => setValue(e.target.value)}
            // input={
            //   <Input
            //     disableUnderline
            //     classes={{ input: classes.selectInput }}
            //   />
            // }
            className={classes.select}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="daily">Monthly</MenuItem>

          </Select>
        </Grid>
      </div>
      <br />
      <br />


      <Grid container spacing={4}>
        {/* {Object.keys(modelData).length && Object.keys(modelData).map(value =>
          <Grid item lg={6} md={6} sm={6} xs={12} style={{ cursor: 'pointer' }} onClick={() => { selectedModel(value, modelData[value]['temp_name'], modelData[value]['project_id'], modelData[value]['name']) }}>
            <Widget
              title={modelData[value]['name']}
              style={{ cursor: 'pointer' }}
              upperTitle
              className={classes.card}
              bodyClass={classes.fullHeightBody}
            // iconT={()) ? true : false}
            // iconT={modelData[value]['name']}
            >
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h9">{modelData[value]['description']}</Typography>
              </Grid>
              <br />

              <div className={classes.serverOverviewElement}>
      <b style={{ width: "100%" }}><Typography
        color="text"
        variant="h7"
        className={classes.serverOverviewElementText}
      >
        Number of Risk(s)
      </Typography></b>
      <div className={classes.serverOverviewElementChartWrapper}>
        <ResponsiveContainer width="99%">
          <b>
            <Typography
              color="text"
              variant="h7"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
            >
              3
            </Typography>
          </b>
        </ResponsiveContainer>
      </div>
    </div>
              <br />

              <div className={classes.serverOverviewElement}>
      <b style={{width:"100%"}}><Typography
        color="text"
        variant="h7"
        className={classes.serverOverviewElementText}
      >
        Last Trained
      </Typography></b>
      <div className={classes.serverOverviewElementChartWrapper}>
        <ResponsiveContainer  width="99%">
       <b>
        <Typography
        color="text"
        variant="h7"

        colorBrightness="secondary"
        className={classes.serverOverviewElementText}
      >
        Oct 15th 2021
      </Typography>
      </b>
        </ResponsiveContainer>
      </div>
    </div>

            </Widget>

          </Grid>
        )

        } */}




        {/* test */}
        {/* {Object.keys(modelData).length > 0 && Object.keys(modelData).map(value =>
          <Grid item lg={6} md={6} sm={6} xs={6} style={{ cursor: 'pointer' }} onClick={() => { selectedModel(value, modelData[value]['temp_name'], modelData[value]['project_id'], modelData[value]['name']) }}>
            <div class="testimotionals">
              <div class="card">
                <div class="layer">

                </div>
                <div class="content">
                  <div class="details">
                    <h2>  <span>{modelData[value]['name']}</span></h2>
                  </div>

                  <Typography variant="h9">{modelData[value]['description']}</Typography>

                </div>
              </div>
            </div>
          </Grid>
        )

        } */}
        {/* test end */}
        {/* sub model */}
        {/* <Grid item lg={12} md={12} sm={12} xs={12} >
          {modelDataSelect && (<h6>Models of {modelDataSelect}</h6>)}
          {modelDataSelect && Object.keys(modelData[modelDataSelect]['modules']).map(value =>
            <Grid item lg={4} md={4} sm={4} xs={6} style={{ cursor: 'pointer' }} onClick={() => { selectSub(modelData[modelDataSelect]['modules'][value]['project_name'], modelData[modelDataSelect]['modules'][value]['module_id']) }}>
              <Widget
                title={modelData[modelDataSelect]['modules'][value]['project_name']}
                style={{ cursor: 'pointer' }}
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <Grid lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="h9">{modelData[modelDataSelect]['modules'][value]['description']}</Typography>
                </Grid>
                <br />
              </Widget>
            </Grid>
          )
          }
        </Grid> */}
        {/* sub model end*/}
















        {true && (<>

          {(sessionStorage.getItem('currentModelName') == "Fraud Detection") ? mock.bigStat_fraud.map(stat => (
            //   <>
            // 

            <Grid item md={4} sm={6} xs={12} key={stat.product} spacing={7}>
              {/* <br /> */}
              <BigStat {...stat} />
            </Grid>
          )) : mock.bigStat.map(stat => (

            <Grid item md={4} sm={6} xs={12} key={stat.product} spacing={7}>
              {/* <br /> */}
              <BigStat {...stat} />
            </Grid>
          ))
          }
          <Grid container spacing={3}>
            <Grid item xs md sm>
              <Widget
                title="Proteins"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
                style={{ padding: "0" }}
              >
                <div >
                  <h3 size="xl" weight="medium" style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
                    85
                    {/* <ArrowForwardIcon
              className={classnames(classes.profitArrow, classes.profitArrowDanger)}
            /> */}
                  </h3>
                  <ResponsiveContainer height={50} >
                    <AreaChart data={getRandomData(10)} >
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.warning.main}
                        fill={theme.palette.warning.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Widget>
            </Grid>
            <Grid item xs md sm>
              <Widget
                title="Vegetables"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div >
                  <h3 size="xl" weight="medium" style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
                    166
                  </h3>
                  <ResponsiveContainer height={50} >
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.main}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>
              </Widget>
            </Grid>
            <Grid item xs md sm>
              <Widget
                title="Grains"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div >
                  <h3 size="xl" weight="medium" style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
                    800
                  </h3>
                  <ResponsiveContainer height={50} >
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.secondary.main}
                        fill={theme.palette.secondary.main}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>
              </Widget>
            </Grid>
            <Grid item xs md sm>
              <Widget
                title="Fruits"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div >
                  <h3 size="xl" weight="medium" style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
                    350
                  </h3>
                  <ResponsiveContainer height={50} >
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.warning.main}
                        fill={theme.palette.warning.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>
              </Widget>
            </Grid>
            <Grid item xs md sm>
              <Widget
                title="Dairy"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div >
                  <h3 size="xl" weight="medium" style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
                    552
                  </h3>
                  <ResponsiveContainer height={50} >
                    <AreaChart data={getRandomData(10)}>
                      <Area
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.warning.main}
                        fill={theme.palette.warning.light}
                        strokeWidth={2}
                        fillOpacity="0.25"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>
              </Widget>
            </Grid>
          </Grid>
          <Grid item xs={12}>

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
                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="warning" />
                      <Typography className={classes.mainChartLegentElement}>

                      </Typography>
                    </div>

                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="primary" />
                      <Typography className={classes.mainChartLegentElement}>

                      </Typography>
                    </div>
                  </div>
                  <Select
                    value={mainChartState}
                    onChange={e => setMainChartState(e.target.value)}
                    input={
                      <OutlinedInput
                        labelWidth={0}
                        classes={{
                          notchedOutline: classes.mainChartSelectRoot,
                          input: classes.mainChartSelect,
                        }}
                      />
                    }
                    autoWidth
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </div>
              }
            >
              {/* <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <ComposedChart
                  margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                  data={((sessionStorage.getItem('currentModelName') == "Fraud Detection")) ? mock?.analatics_fraud : mock?.analatics_credit}
                >
                  <YAxis
                    ticks={[0, 25, 50, 100]}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={true}
                  />
                  <XAxis
                    tickFormatter={i => i + 1}
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={true}
                    dataKey="Date"
                    style={{ color: "black" }}
                  />
                  <Area
                    type="natural"
                    dataKey="Fairness"
                    fill="#ccc9ca"
                    strokeWidth={0}
                    activeDot={true}
                  />
                  <Line
                    type="natural"
                    dataKey="Fairness"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={true}
                    activeDot={true}
                  />
                  <Line
                    type="linear"
                    dataKey="Robustness"
                    stroke={theme.palette.warning.main}
                    strokeWidth={2}
                    dot={{
                      stroke: theme.palette.warning.dark,
                      strokeWidth: 2,
                      fill: theme.palette.warning.main,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer> */}


              <ResponsiveContainer width="100%" minWidth={500} height={500}>

                <BarChart
                  data={mock?.analatics_fraud}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Actual" fill="#0b2755" radius={7} barSize={30} />
                  <Bar dataKey="DFRS" fill="#c95d5b" radius={7} barSize={30} />
                  <Bar dataKey="Recommended" fill="#ffc260" radius={7} barSize={30} />
                  <Bar dataKey="Desired" fill="#8884d8" radius={7} barSize={30} />

                  
                </BarChart>
              </ResponsiveContainer>
            </Widget>

          </Grid>

          <h5>Clinician Notes</h5>

          <Row style={{ width: "100%" }}>
            <Col xs={1} >
            </Col>
            <Col item xs={10} style={{ minHeight: "200px", backgroundColor: "#bebfc6", display: "flex", justifyContent: "center", alignItems: "center" }}></Col>
            <Col item xs={1} >
            </Col>
          </Row>

        </>)}
      </Grid>
      <br />
      <br />
      <br />
      <br />

    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
