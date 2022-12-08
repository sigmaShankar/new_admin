import React from "react";
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
    Area,
    PieChart,
    Pie
} from 'recharts';
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PlainCard from "../dashboard/components/BigStat/PlainCard";
import { useTheme } from "@material-ui/styles";
import MetricsBar from "../Tab/Ethics/MetricsBar";

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

const Report = (props) => {
    var theme = useTheme();

    var classes = useStyles();

    const [results, setResults] = useState({});
    const config = { displayModeBar: false };

    useEffect(() => {
        getResults1()
    }, []);

    const getResults1 = () => {
        // eda_credit
        let URL = (sessionStorage.getItem("currentModelName") == "Employee recruitment") ? "Assessment_report_new" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_accessment_report" : "Assessment_report_new";

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

                <Grid item md={12} sm={12} xs={12} >
                    {Object.keys(results).length ? <Widget
                        title={results['Model_Name']}
                        style={{ cursor: 'pointer' }}
                        upperTitle

                        className={classes.card}
                        bodyClass={classes.fullHeightBody}
                    >
                        <Grid lg={12} md={12} sm={12} xs={12}>
                            <Typography variant="h9">{results['Model_Description']} </Typography>
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
                                            color="#23284a"
                                            variant="h3"
                                            colorBrightness="secondary"
                                            className={classes.serverOverviewElementText}
                                        >
                                            {results['No_Of_Risks']}
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
                                Last Trained
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
                                            {results['Last_Trained_On']}
                                        </Typography>
                                    </b>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </Widget> : null}



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
                        <h5>Fairness</h5>
                        {Object.keys(results).length ? <span>{results["Fairness"]["Fariness_Metrics_desc"]}</span> : null}

                        {Object.keys(results).length ? <div style={{ display: "flex" }}>
                            <Grid item md={4} sm={4} xs={12} style={{ padding: "10px" }}>
                                <br />
                                <PlainCard color="secondary" product="Fairness Score" total={results["Fairness"]["Fairness_Score"]} className="PlainCard" />
                            </Grid>
                            <Grid item md={4} sm={4} xs={12} style={{ padding: "10px" }}>
                                <br />
                                <PlainCard color="secondary" product="High Risks" total={results["Fairness"]["High"]} className="PlainCard" />
                            </Grid>
                            <Grid item md={4} sm={4} xs={12} style={{ padding: "10px" }}>
                                <br />
                                <PlainCard color="secondary" product="Medium Risks" total={results["Fairness"]["Medium"]} className="PlainCard" />
                            </Grid>
                            <Grid item md={4} sm={4} xs={12} style={{ padding: "10px" }}>
                                <br />
                                <PlainCard color="secondary" product="Low Risks" total={results["Fairness"]["Low"]} className="PlainCard" />
                            </Grid>
                        </div> : null
                        }
                        <div>
                            <br />
                            <br />
                            <br />

                            <Grid item md={12} sm={12} xs={12}>

                                {Object.keys(results).length ? <ResponsiveContainer width="100%" minWidth={500} height={350}>

                                    <LineChart

                                        data={results["Fairness"]["Fairness"]}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {/* <Line type="natural" dataKey="Accuracy" stroke="#8884d8" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} /> */}
                                        <Line type="natural" dataKey="Fainess_Score" strokeWidth={2}
                                            dot={{
                                                stroke: theme.palette.warning.dark,
                                                strokeWidth: 2,
                                                fill: theme.palette.warning.main,
                                            }} stroke={theme.palette.warning.main} />
                                    </LineChart>
                                    {/* <ComposedChart
                                    margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                                    data={mainChartData}
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
                                    />
                                    <Area
                                        type="natural"
                                        dataKey="desktop"
                                        fill={theme.palette.background.light}
                                        strokeWidth={0}
                                        activeDot={false}
                                    />
                                    <Line
                                        type="natural"
                                        dataKey="mobile"
                                        stroke={theme.palette.primary.main}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={false}
                                    />
                                    <Line
                                        type="linear"
                                        dataKey="tablet"
                                        stroke={theme.palette.warning.main}
                                        strokeWidth={2}
                                        dot={{
                                            stroke: theme.palette.warning.dark,
                                            strokeWidth: 2,
                                            fill: theme.palette.warning.main,
                                        }}
                                    />
                                </ComposedChart> */}
                                </ResponsiveContainer> : null
                                }
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} >

                        {Object.keys(results).length ? <MetricsBar name={["Normalized Mutual Info Score"]} data={results["Fairness"]["proxy_Bias"]['adjusted_mutual_info_score']} /> : null}

                    </Grid>
                </div>


                {/* <div style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={12} sm={12} xs={12} >
                        <h5>Transparency</h5>
                        {Object.keys(results).length ? <span>{results["Transperency"]["Explainability_Metrics_desc"]}</span> : null}

                        <div>
                            <br />

                            <Grid item md={12} sm={12} xs={12}>

                                {Object.keys(results).length ?
                                    <ResponsiveContainer width="100%" minWidth={500} height={300} >
                                        <BarChart data={results["Transperency"]['Feature_Importance']} layout="vertical" margin={{left: 50 ,right:20}}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis type="category" allowDataOverflow={false} fontSize={10} style={{width:"10px","overflow-wrap": "break-word"}} dataKey="name" />
                                            <Tooltip />
                                            <Bar dataKey="Value"radius={8}  fill="#ffc260" />
                                        </BarChart>
                                    </ResponsiveContainer> : null
                                }

                            </Grid>
                        </div>
                    </Grid>
                </div> */}

                <div style={{ borderBottom: "1px", borderBottomStyle: "solid", borderColor: "black", padding: "2vh" }}>
                    <Grid item md={12} sm={12} xs={12} >
                        <h5>Monitoring</h5>
                        {Object.keys(results).length ? <span>{results["Monitoring"]["dd_decsr"]}</span> : null}

                        <div>
                            <br />


                            <Grid item md={12} sm={12} xs={12}>
                                <h6>Monitoring metrics</h6>
                                {Object.keys(results).length ?
                                    <ResponsiveContainer width="100%" minWidth={600} height={300}>
                                        <BarChart
                                            width={600}
                                            height={300}
                                            data={results["Monitoring"]['Production_monitoring_metrics']}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            {/* <Legend /> */}
                                            <Bar dataKey="Value" fill="#23284a" radius={8} barSize={60} minPointSize={5}>
                                                {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                                            </Bar>
                                            {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
                                        </BarChart>
                                    </ResponsiveContainer> : null
                                }
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} >
                        <h6>Data drift over time</h6>

                        {Object.keys(results).length ? <ResponsiveContainer width="100%" minWidth={500} height={350}>

                            <LineChart
                                data={results["Monitoring"]["Production_data_drift"]}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="Date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="natural" dataKey="Drift" stroke="#8884d8" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                                <Line type="natural" dataKey="Drift" strokeWidth={2}
                                    dot={{
                                        stroke: theme.palette.warning.dark,
                                        strokeWidth: 2,
                                        fill: theme.palette.warning.main,
                                    }} stroke={theme.palette.warning.main} />
                            </LineChart>

                        </ResponsiveContainer> : null
                        }
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