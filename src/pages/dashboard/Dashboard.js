import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
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
  YAxis,
  XAxis,
} from "recharts";
import { DoneAll as DoneAllIcon, Notifications as NotificationsIcon } from "@material-ui/icons";

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
  var [modelValue, setModelValue] = useState(true);
  var [modelData, setModelData] = useState({});
  var [modelDataSelect, setModelSelection] = useState(null);
  var [Submodel, setSubmodel] = useState(null);


  useEffect(() => {
    Holder()
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
  const Holder = ()=>{
    fetch(process.env.PUBLIC_URL + `/test/${'platformdocs'}.json`)
    .then(function (res) {
      return res.json();
    })
    .then(function (selectedAlgo) {
      console.log(selectedAlgo, "222222")
      // setModelData(selectedAlgo)
      localStorage.setItem("holder",JSON.stringify(selectedAlgo))
    })
    .catch(function (err) {
      console.log(err, " error");
    });
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
      <PageTitle title="Model Inventory" width={["0.5"]} leftTitle={"vcvbvc"} />
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
        {Object.keys(modelData).length > 0 && Object.keys(modelData).map(value =>
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

        }
        {/* test end */}
        {/* sub model */}
        <Grid item lg={12} md={12} sm={12} xs={12} >
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
        </Grid>
        {/* sub model end*/}










        {/* temp  */}
        {/* <Grid item lg={6} md={6} sm={6} xs={12} style={{ cursor: 'pointer' }}
          onClick={() => { setModel('Credit Lending') }}
        >
          <Widget
            title="Model - Credit Lending"
            style={{ cursor: 'pointer' }}
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
            iconT={(sessionStorage.getItem('currentModelName') == undefined || sessionStorage.getItem('currentModelName') == "Credit Lending") ? true : false}
          >
            <Grid lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h9">This model is used to predict approval of loan for a given applicant, using various attributes of the application </Typography>
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

        <Grid item lg={6} md={6} sm={6} xs={12} style={{ cursor: 'pointer' }}
          onClick={() => { setModel('Fraud Detection') }}
        >
          <Widget
            title="Model - Sample Welfare Benefit Fraud"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
            iconT={(sessionStorage.getItem('currentModelName') == "Fraud Detection") ? true : false}

          >
            <Grid lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h9">This model is used to predict approval of loan for a given applicant, using various attributes of the application </Typography>
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
        </Grid> */}

        {/* temp end */}




        {Submodel && (<>
          {(sessionStorage.getItem('currentModelName') == "Fraud Detection") ? mock.bigStat_fraud.map(stat => (

            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              {/* <br /> */}
              <BigStat {...stat} />
            </Grid>
          )) : mock.bigStat.map(stat => (

            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              {/* <br /> */}
              <BigStat {...stat} />
            </Grid>
          ))}
          {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Visits Today"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                12, 678
              </Typography>
              <LineChart
                width={55}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Registrations
                </Typography>
                <Typography size="md">860</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Sign Out
                </Typography>
                <Typography size="md">32</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Rate
                </Typography>
                <Typography size="md">3.25%</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid> */}
          {/* <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="App Performance"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Integration
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  SDK
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Integration
              </Typography>
              <LinearProgress
                variant="determinate"
                value={30}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                SDK
              </Typography>
              <LinearProgress
                variant="determinate"
                value={55}
                classes={{ barColorPrimary: classes.progressBar }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid> */}
          {/* <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Server Overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
              >
                60% / 37°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
              >
                54% / 31°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
              >
                57% / 21°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
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
            </div>
          </Widget>
        </Grid> */}
          {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie
                      data={PieChartData}
                      innerRadius={45}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid> */}

          {/* <Grid item xs={12}>
          <h3>Summary Analytics</h3>

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
                      Bias
                    </Typography>
                  </div>
               
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Robustness Score
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
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={((sessionStorage.getItem('currentModelName') == "Fraud Detection")) ? mock?.analatics_fraud : mock?.analatics_credit}
              >
                <YAxis
                ticks={[0, 2500, 5000, 7500]}
                tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                stroke={theme.palette.text.hint + "80"}
                tickLine={false}
                />
                <XAxis
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                  dataKey="Date"
                  style={{ color: "black" }}
                />
                <Area
                  type="natural"
                  dataKey="Fairness"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="Fairness"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
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
            </ResponsiveContainer>
          </Widget>

        </Grid> */}



          {/* {mock.bigStat.map(stat => (
          
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
              <br />
            <BigStat {...stat} />
          </Grid>
        ))} */}


          <Grid item xs={12} style={{ marginTop: "5vh" }}>
            {/* <Widget
            title="Model - Credit Lending"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          > */}
            {/* <Table data={mock.table} /> */}
            {(modelValue) ? <Index /> : null}
            {/* </Widget> */}
          </Grid>
        </>)}
      </Grid>
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
