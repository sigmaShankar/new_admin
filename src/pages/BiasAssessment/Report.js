import React, { useCallback } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { Typography } from "../../components/Wrappers";
import MUIDataTable from "mui-datatables";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area, Sector,
    PieChart,
    Pie
} from 'recharts';
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PlainCard from "../dashboard/components/BigStat/PlainCard";
import { useTheme } from "@material-ui/styles";
import MetricsBar from "../Tab/Ethics/MetricsBar";
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

const data = [
    { "name": "High", "value": 5 },
    { "name": "Medium", "value": 20 },
    { "name": "Low", "value": 3 }
]
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

const Report = (props) => {
    var theme = useTheme();

    var classes = useStyles();

    const [results, setResults] = useState({});
    const [modelData, setModelData] = useState(null);

    const config = { displayModeBar: false };
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );
    useEffect(() => {
        getResults1()
        initValue()
    }, []);

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
    const getResults1 = () => {
        // eda_credit
        let URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "Assessment_report_new" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_accessment_report" : "Assessment_report_new";

        let final = process.env.PUBLIC_URL + `/test/${URL}.json`
        fetch(final.trim())
            .then(function (res) {
                return res.json();
            })
            .then(function (selectedAlgo) {
                //   props.stopSpinner()
                setResults(selectedAlgo)

                console.log(selectedAlgo["Fairness"]["proxy_Bias"]['adjusted_mutual_info_score'], "selectedAlgo")
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
    return (
        <>
            <Grid item md={10} sm={10} xs={10} style={{ backgroundColor: "#fff", marginLeft: "5%", width: "100%", "box-shadow": "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset" }}>
                <Grid item md={12} sm={12} xs={12} style={{ borderBottom: "3px", borderBottomStyle: "solid", borderColor: "#b41712", padding: "2vh" }}>
                    <Grid item md={5} sm={5} xs={5} >
                        <div >
                            <img style={{ height: "6rem", width: "13rem" }} src={require("../../assets/Sigma-red-Final-logo.png")} />
                        </div>
                    </Grid>
                </Grid>


                <Grid item md={12} sm={12} xs={12} style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={10} sm={10} xs={10} >
                        <h5>Model Health</h5>
                        {Object.keys(results).length ?
                            <ResponsiveContainer width="100%" minWidth={600} height={300}>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={results['model_health_metrics']}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis style={{ fontSize: '10px' }} />
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    <Bar dataKey="Value" fill="#ffc260" radius={8} barSize={60} minPointSize={5}>
                                        {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                                    </Bar>
                                    {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
                                </BarChart>
                            </ResponsiveContainer> : null
                        }
                    </Grid>
                </Grid>

                <div style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={12} sm={12} xs={12} >
                        {/* <h5>Fairness</h5> */}
                        <h4>Metric Impact Overview</h4>
                        <Widget
                            bodyClass={classes.mainChartBody}
                        >

                            {modelData && (<ResponsiveContainer width="100%" minWidth={500} height={300}>
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
                            </ResponsiveContainer>)}
                        </Widget>
                    </Grid>

                </div>

                <div style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={12} sm={12} xs={12} >
                        <div>
                            <br />
                            {modelData && (<MUIDataTable
                                title={"Table of Metrics"}
                                data={modelData['Metrics_Table']}
                                columns={columns_metrics}
                                options={{
                                    print: false,
                                    filter: false,
                                    viewColumns: false,
                                    selectableRows: false,

                                }}
                            />)}
                        </div>
                    </Grid>
                </div>

                <div style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={12} sm={12} xs={12} >
                        <h5>Risk</h5>

                        <div>
                            <br />
                            <MUIDataTable
                                data={results['risk']}
                                columns={columns_risk}
                                options={{
                                    print: false,
                                    filter: false,
                                    viewColumns: false,
                                    selectableRows: false,
                                    download: false,
                                    search: false,
                                    onDownload: false
                                    //   onRowClick: (rowData, rowState) => {
                                    //     // setAdd(rowData[1])
                                    //     //console.log("hello")
                                    //     mitigation_funtion(
                                    //       rowData[0],
                                    //       rowData[4]
                                    //     );
                                    //     console.log(rowData[0], rowData);
                                    //   },
                                }}
                            />
                        </div>
                    </Grid>
                </div>
            </Grid>
        </>
    )
};

export default Report;

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