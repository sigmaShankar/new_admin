import React,{useCallback} from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { Typography } from "../../components/Wrappers";
import MUIDataTable from "mui-datatables";
import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    YAxis,
    XAxis,Tooltip,BarChart,
    Bar,CartesianGrid,
    PieChart, Pie, Sector, Cell, Legend
} from 'recharts';
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PlainCard from "../dashboard/components/BigStat/PlainCard";
import { useTheme } from "@material-ui/styles";
import MetricsBar from "../Tab/Ethics/MetricsBar";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = ['#ba2b29','#00C49F','#0088FE', '#ffc107','#FFBB28','#23284a','#FF8042','#FF8341'];
const COLORS3 = ['#ba2b29', '#23284a'];

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },{
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const mainChartData = getMainChartData();
const columns_risk = [
    {
        name: "ids",
        label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Risk No." : "Risico Nr",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "pillar",
        label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Category" : "Categorie",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "name",
        label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Risk Description" : "Risicobeschrijving",
        options: {
            setCellHeaderProps: value => ({ style: { width: "38%" } }),

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
    },
    {
        name: "date_generated",
        label: "_id",
        options: {
            display: false,

            filter: false,

        },
    },
    {
        name: "date",
        label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Date " : "Datum en tijd ",
        options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                        {tableMeta.rowData[5]}
                    </>
                );
            },
        },
    },
];


const options = {
    print: false,
    filter: false,
    selectableRows: false,
    download: false,
    search: false,
    onDownload: false
};


const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                {value.split(' ')[1]}
            </text>
        </g>
    );
};

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


const Report2 = (props) => {
    var theme = useTheme();

    var classes = useStyles();

    const [results, setResults] = useState({});
    const config = { displayModeBar: false };

    useEffect(() => {
        getResults1()
    }, []);

    const getResults1 = () => {
        // eda_credit
        let URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "hr_analytics" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "hr_analytics" : "hr_analytics";

        let final = process.env.PUBLIC_URL + `/test/${URL}.json`
        fetch(final.trim())
            .then(function (res) {
                return res.json();
            })
            .then(function (selectedAlgo) {
                //   props.stopSpinner()
                setResults(selectedAlgo)

                // console.log(results, "selectedAlgo",typeof selectedAlgo)
            })
            .catch(function (err) {
                //   props.startAlert()
                console.log(err, " error");
            });
    }
    //   return (
    //     <section className="app">
    //       { results.map((result) => {
    //         return (
    // Fairness
    // roxy Bias
    //         );
    //       })}
    //     </section>
    //   );

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex3, setActiveIndex3] = useState(0);


  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieEnter2 = useCallback(
    (_, index) => {
        setActiveIndex2(index);
    },
    [setActiveIndex2]
  );

  const onPieEnter3 = useCallback(
    (_, index) => {
        setActiveIndex3(index);
    },
    [setActiveIndex3]
  );
    return (
        <>
      <Grid container spacing={4}>

{Object.keys(results).length && (<>
    {/* {console.log(results['gender_data'],"resultsresultsresults")} */}

  <Grid item md={6} sm={12} xs={6} style={{ marginBottom: "4vh" }}>
    <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Gender Details
          </Typography>
        </div>
      }
    >

<ResponsiveContainer width="100%" minWidth={500} height={300}>
        <PieChart width={600} height={800}>
          <Pie
            activeIndex={activeIndex2}
            activeShape={renderActiveShape}
            data={results['gender_data']}
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
            ))}
          </Pie>
          <br />
          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

  <Grid item xs={6} md={6} sm={12} style={{ marginBottom: "4vh" }}>
    <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Citizen Details
          </Typography>
        </div>
      }
    >
      
      <ResponsiveContainer width="100%" minWidth={500} height={300}>
        <PieChart width={600} height={800}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={results['CitizenDesc']}
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


  <Grid item md={6} sm={6} xs={6}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Race Details
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={400}>
      <PieChart width={600} height={800}>
          <Pie
            activeIndex={activeIndex3}
            activeShape={renderActiveShape}
            data={results['RaceDesc']}
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
            ))}
          </Pie>
          <br />
          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

  <Grid item md={6} sm={6} xs={6}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Department wise report (based on race)
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={400}>
      <BarChart
          width={500}
          height={300}
          data={results['race_dept']}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="White" stackId="a" fill="#1e7e34" />
          <Bar dataKey="Black_or_African_American" stackId="a" fill="##b41914" />
          <Bar dataKey="Asian" stackId="a" fill="#ffc107" />
          <Bar dataKey="Two_or_more_races" stackId="a" fill="#23284a" />
          <Bar dataKey="American_Indian_or_Alaska_Native" stackId="a" fill="#7e1e46" />
          <Bar dataKey="Hispanic" stackId="a" fill="#adb5bd" />
    
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

  <Grid item md={12} sm={12} xs={12}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Gender and Race Details
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={400}>
      <BarChart
          width={500}
          height={300}
          data={results['gender_race']}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" stackId="a" fill="#23284a" />
          <Bar dataKey="Female" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

  <Grid item md={12} sm={12} xs={12}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
              Department wise report (based on gender)
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={400}>
      <BarChart
          width={500}
          height={300}
          data={results['gender_dept']}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Female" stackId="a" fill="#23284a" />
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

 

  <Grid item md={12} sm={12} xs={12}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
             Department wise report (based on citizen)
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={400}>
      <BarChart
          width={500}
          height={300}
          data={results['citizen_dept']}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Eligible_NonCitizen" stackId="a" fill="#1e7e34" />
          <Bar dataKey="US_Citizen" stackId="a" fill="#ffc107" />
          <Bar dataKey="Non_Citizen" stackId="a" fill="#ba2b29" />
    
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>

  <Grid item md={12} sm={12} xs={12}>
  <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography
            variant="h5"
            color="text"
            colorBrightness="secondary"
          >
             Gender wise department count
          </Typography>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={480} height={1100}>
      <BarChart
          width={500}
        //   height={800}
          layout="vertical"
          data={results['gender_dept_count']}
          margin={{
            top: 20,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number"/>
          <YAxis type="category" allowDataOverflow={false} fontSize={9} style={{width:"8px","overflow-wrap": "break-word"}} dataKey="Name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" stackId="a" fill="#ffc107" />
          <Bar dataKey="Female" stackId="a" fill="#ba2b29" />
    
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  </Grid>
</>)}
</Grid>
        </>
    )
};

export default Report2;

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