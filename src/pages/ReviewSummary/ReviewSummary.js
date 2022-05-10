import React, { useState, useEffect, useCallback } from "react";
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
  YAxis,
  XAxis,Tooltip,
  PieChart, Pie, Sector, Cell, Legend
} from "recharts";
import { DoneAll as DoneAllIcon, Notifications as NotificationsIcon } from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";
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


const data = [
  {"name":"High","value":5},
  {"name":"Medium","value":20},
  {"name":"Low","value":3}
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
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
      >{`Value: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function ReviewSummary(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [modelValue, setModelValue] = useState(true);
  var [modelData, setModelData] = useState(null);
  var [modelDataSelect, setModelSelection] = useState(null);
  var [Submodel, setSubmodel] = useState(null);
  const columns_metrics = [
    {
      name: "metrics_name",
      label: "Metric Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "metrics_value",
      label: "Metric Value",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "normal_range",
      label: "Normal Range",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "impact",
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Criticality" : "Kritiek",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ cursor: "pointer" }}>
              {tableMeta.rowData[3] == "Critical" || tableMeta.rowData[3] == "Kritiek" ? (
                <span style={{ color: "#b41a06" }}>
                  <small>{tableMeta.rowData[3]}</small>
                </span>
              ) : tableMeta.rowData[3] == "Medium" || tableMeta.rowData[3] == "Medium" ? (
                <span style={{ color: "orange" }}>
                  <small>{tableMeta.rowData[3]}</small>
                </span>
              ) : tableMeta.rowData[3] == "High" || tableMeta.rowData[3] == "hoog" ? (
                <span style={{ color: "#ef820d" }}>
                  <small>{tableMeta.rowData[3]}</small>
                </span>
              ) : (
                <span >
                  <small>{tableMeta.rowData[3]}</small>
                </span>
              )}
            </div>
          );
        },
      },
    }
  ];

  const columns_proxy_evaluation = [
    {
      name: "Protected_attribute",
      label: "Protected attribute",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Feature_name",
      label: "Feature name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "P_value",
      label: "P value",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_it_proxy?",
      label: "Is it proxy?",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "%_avg_contribution_to_output",
      label: "% avg contribution to output",
      options: {
        filter: true,
        sort: false,
      },
    }
  ];

  useEffect(() => {
    initValue()

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



  const initValue = async () => {
    let URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "Credit_bias_summary_page" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_summary_page" : "Credit_bias_summary_page";

    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
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

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
    {console.log(!props?.hide,"!props?.hide")}
      {!props?.hide && (<PageTitle title="Model Inventory" width={["0.5"]} leftTitle={"vcvbvc"} />)}
      <br />

      <Grid container spacing={4}>



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


        {modelData && (<>
          <Grid item md={6} sm={12} xs={6} style={{ marginBottom: "4vh" }}>
            <h4>Fairness and Accuracy Over Time</h4>

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
                      Accuracy
                      </Typography>
                    </div>

                    <div className={classes.mainChartHeaderLabel}>
                      <Dot color="primary" />
                      <Typography className={classes.mainChartLegentElement}>
                      Fairness Score
                      </Typography>
                    </div>
                  </div>
                  {/* <Select
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
                </Select> */}
                </div>
              }
            >

              <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <ComposedChart
                  margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                  data={modelData['Fairness']}
                >
                  <YAxis

                    // stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                  />
                  <XAxis
                    tickFormatter={i => i}
                    // tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    // stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    dataKey="Date"
                    style={{ color: "black" }}
                  />
                  {/* <Area
                    type="natural"
                    dataKey="Fainess_Score"
                    fill={theme.palette.background.light}
                    strokeWidth={0}
                  /> */}
                  <Line
                    type="natural"
                    dataKey="Fainess_Score"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}

                  />
                  <Line
                    type="linear"
                    dataKey="Accuracy"
                    stroke={theme.palette.warning.main}
                    strokeWidth={2}
                    dot={{
                      stroke: theme.palette.warning.dark,
                      strokeWidth: 2,
                      fill: theme.palette.warning.main,
                    }}
                  />
            <Tooltip isAnimationActive={true} style={{ opacity: 0 }} />

                </ComposedChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>

          <Grid item xs={6} md={6} sm={12} style={{ marginBottom: "4vh" }}>
            <h4>Metric Impact Overview</h4>
            <Widget
              bodyClass={classes.mainChartBody}
            >
              
              <ResponsiveContainer width="100%" minWidth={500} height={300}>
                <PieChart width={600} height={800}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={modelData['Pie_chart']}
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <br />
                  <Legend />

                </PieChart>
              </ResponsiveContainer>
            </Widget>

          </Grid>




          <Grid item md={12} sm={12} xs={12}>
            <Widget
              title={modelData['Trans_Ip_Name']['Name']}
              style={{ cursor: 'pointer' }}
              upperTitle

              className={classes.card}
              bodyClass={classes.fullHeightBody}
            >
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h9">{modelData['Trans_Ip_Name']['description']} </Typography>
              </Grid>

              <br />

              <div className={classes.serverOverviewElement}>
                <b style={{ width: "100%" }}><Typography
                  color="text"
                  variant="h7"
                  className={classes.serverOverviewElementText}
                >
                  Actual Value
                </Typography></b>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer width="99%">
                    <Typography
                      color="#23284a"
                      variant="h6"
                      colorBrightness="secondary"
                      className={classes.serverOverviewElementText}
                    >
                      {modelData['Trans_Ip_Name']['Actual']}
                    </Typography>
                  </ResponsiveContainer>
                </div>
              </div>

              <br />

              <div className={classes.serverOverviewElement}>
                <b style={{ width: "100%" }}><Typography
                  color="text"
                  variant="h7"
                  className={classes.serverOverviewElementText}
                >
                  Mitigated Value
                </Typography></b>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer width="99%">
                    <b>
                      <Typography
                        color="#23284a"
                        variant="h6"
                        colorBrightness="secondary"
                        className={classes.serverOverviewElementText}
                      >
                        {modelData['Trans_Ip_Name']['Mitigated']}
                      </Typography>
                    </b>
                  </ResponsiveContainer>
                </div>
              </div>

              <br />

              <div className={classes.serverOverviewElement}>
                <b style={{ width: "100%" }}><Typography
                  color="text"
                  variant="h7"
                  className={classes.serverOverviewElementText}
                >
                  Acceptable Range
                </Typography></b>
                <div className={classes.serverOverviewElementChartWrapper}>
                  <ResponsiveContainer width="99%">
                    <Typography
                      color="#23284a"
                      variant="h6"
                      colorBrightness="secondary"
                      className={classes.serverOverviewElementText}
                    >
                      {modelData['Trans_Ip_Name']['Acceptable Range']}
                    </Typography>
                  </ResponsiveContainer>
                </div>
              </div>
            </Widget>
          </Grid>



          <Grid item xs={12} >

            <MUIDataTable
              title={"Table of Metrics"}
              data={modelData['Metrics_Table']}
              columns={columns_metrics}
              options={{
                print: false,
                filter: false,
                viewColumns: false,
                selectableRows: false,

              }}
            />
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
