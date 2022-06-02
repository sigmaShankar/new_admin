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
import Plot from "react-plotly.js";

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

import Chart from "react-apexcharts";
import radialBar from "./radialBar.json";

export default function Dashboard(props) {
  var classes = useStyles();

  var [modelDataSelect, setModelSelection] = useState(null);
  var [Submodel, setSubmodel] = useState(null);
  const [result, setResults] = useState([]);
  const [radial1, setRadial] = useState();

  const config = { displayModeBar: false };


  useEffect(() => {
    // initValue()
    setResults({

      "data": [
        {
          type: 'bar',
          x: ['Fruits', 'Grains', 'Vegetables', 'Protein', 'Dairy'],
          y: [14, 25, 21, 42, 25],
          base: 0,
          textposition: 'auto',
          hoverinfo: 'none',
          // opacity: 0.5,

          marker: {
            color: '#df0505d1',
            line: {
              color: 'rgb(8,48,107)',
              width: 2.5
            }
          },
          name: 'Desired'
        },
        {
          type: 'bar',
          x: ['Fruits', 'Grains', 'Vegetables', 'Protein', 'Dairy'],
          y: [9, 20, 23, 42, 23],
          base: 0,
          textposition: 'auto',
          hoverinfo: 'none',
          // opacity: 0.4,

          marker: {
            color: '#45ad15',
            line: {
              color: 'rgb(8,48,107)',
              width: 2.5
            }
          },
          name: 'Achieved'
        },
      ],

      "layout": {
        // title: 'Food Analytics',
        barmode: 'stack',
        // paper_bgcolor: 'rgba(245,246,249,1)',
        // plot_bgcolor: 'rgba(245,246,249,1)',
        xaxis: { title: 'Food' },
        // yaxis:{},
        // width: 600,
        // height: 600,
        showlegend: true,
        annotations: []
      }
    })
  }, []);

  const initValue = async () => {
    fetch(process.env.PUBLIC_URL + `/test/${'module'}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        console.log(selectedAlgo, "selectedAlgo")
        // setModelData(selectedAlgo)
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  return (
    <>
      <h5>Food Analytics</h5>
      <br />

      <Grid container spacing={4} >
        <Grid item lg={4} md={4} sm={4} xs={4} >

          <Chart
            options={{
              "chart": {
                "height": 280,
                "type": "radialBar",
                "toolbar": { "show": false }
              },
              "plotOptions": {
                "radialBar": {
                  "startAngle": -135,
                  "endAngle": 225,
                  "hollow": {
                    "margin": 0,
                    "size": "70%",
                    "background": "#fff",
                    "imageOffsetX": 0,
                    "imageOffsetY": 0,
                    "position": "front",
                    "dropShadow": {
                      "enabled": true,
                      "top": 3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.24
                    }
                  },
                  "track": {
                    "background": "#fff",
                    "strokeWidth": "67%",
                    "margin": 0,
                    "dropShadow": {
                      "enabled": true,
                      "top": -3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.35
                    }
                  },
                  "dataLabels": {
                    "show": true,
                    "name": {
                      "offsetY": -10,
                      "show": true,
                      "color": "black",
                      "fontSize": "18px"
                    },
                    "value": { "color": "#111", "fontSize": "20px", "show": false }
                  }
                }
              },
              "fill": {
                "type": "solid",
                "colors": "#006400",
                "gradient": {
                  "shade": "dark",
                  "shadeIntensity": 0.4,
                  "inverseColors": false,
                  "opacityFrom": 1,
                  "opacityTo": 1,
                  "stops": [0, 50, 53, 91]
                }
              },
              "stroke": { "lineCap": "round" },
              "labels": [""]
            }}
            series={["95"]}
            type="radialBar"
            height={95}
          />
          <p style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Dietary Factor Rhyme - 93%</p>

        </Grid>


        <Grid item lg={4} md={4} sm={4} xs={4} >

          <Chart
            options={{
              "chart": {
                "height": 280,
                "type": "radialBar",
                "toolbar": { "show": false }
              },
              "plotOptions": {
                "radialBar": {
                  "startAngle": -135,
                  "endAngle": 225,
                  "hollow": {
                    "margin": 0,
                    "size": "70%",
                    "background": "#fff",
                    "imageOffsetX": 0,
                    "imageOffsetY": 0,
                    "position": "front",
                    "dropShadow": {
                      "enabled": true,
                      "top": 3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.24
                    }
                  },
                  "track": {
                    "background": "#fff",
                    "strokeWidth": "67%",
                    "margin": 0,
                    "dropShadow": {
                      "enabled": true,
                      "top": -3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.35
                    }
                  },
                  "dataLabels": {
                    "show": true,
                    "name": {
                      "offsetY": -10,
                      "show": true,
                      "color": "black",
                      "fontSize": "18px"
                    },
                    "value": { "color": "#111", "fontSize": "23px", "show": false }
                  }
                }
              },
              "fill": {
                "type": "solid",
                "colors": "#006400",
                "gradient": {
                  "shade": "dark",
                  "shadeIntensity": 0.4,
                  "inverseColors": false,
                  "opacityFrom": 1,
                  "opacityTo": 1,
                  "stops": [0, 50, 53, 91]
                }
              },
              "stroke": { "lineCap": "round" },
              "labels": [""]
            }}
            series={["23"]}
            type="radialBar"
            height={95}
          />
          <p style={{display:"flex",justifyContent:"center",alignItems:"center"}}>BMI - 23%</p>

        </Grid>



        <Grid item lg={4} md={4} sm={4} xs={4} >

          <Chart
            options={{
              "chart": {
                "height": 280,
                "type": "radialBar",
                "toolbar": { "show": false }
              },
              "plotOptions": {
                "radialBar": {
                  "startAngle": -135,
                  "endAngle": 225,
                  "hollow": {
                    "margin": 0,
                    "size": "70%",
                    "background": "#fff",
                    "imageOffsetX": 0,
                    "imageOffsetY": 0,
                    "position": "front",
                    "dropShadow": {
                      "enabled": true,
                      "top": 3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.24
                    }
                  },
                  "track": {
                    "background": "#fff",
                    "strokeWidth": "67%",
                    "margin": 0,
                    "dropShadow": {
                      "enabled": true,
                      "top": -3,
                      "left": 0,
                      "blur": 4,
                      "opacity": 0.35
                    }
                  },
                  "dataLabels": {
                    "show": true,
                    "name": {
                      "offsetY": -10,
                      "show": true,
                      "color": "black",
                      "fontSize": "18px"
                    },
                    "value": { "color": "#111", "fontSize": "23px", "show": false }
                  }
                }
              },
              "fill": {
                "type": "solid",
                "colors": "#006400",
                "gradient": {
                  "shade": "dark",
                  "shadeIntensity": 0.4,
                  "inverseColors": false,
                  "opacityFrom": 1,
                  "opacityTo": 1,
                  "stops": [0, 50, 53, 91]
                }
              },
              "stroke": { "lineCap": "round" },
              "labels": [""]
            }}
            series={["23"]}
            type="radialBar"
            height={95}
          />
          <p style={{display:"flex",justifyContent:"center",alignItems:"center"}}>BMR - 23%</p>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: 0, margin: 0 }}>

          <Plot
            data={result?.data}
            layout={result?.layout}
            args={result?.args}
            config={config}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
 
        <h5 style={{marginTop:"10%"}}>Summarized Analytics</h5>
        {/* <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

          <p><b>Fruits</b></p>
          <p>You ate 9 and you need 5 to hit your goal for the week</p>

          <ul>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>

          </ul>
        </Grid>
        <br />
        <br />

        <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

          <p><b>Grains</b></p>
          <p>You ate 25 and you need 5 to hit your goal for the week</p>

          <ul>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>

          </ul>
        </Grid>
        <br />
        <br />
        <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

          <p><b>Vegetables</b></p>
          <p> You have achieved your goal for the week!</p>

          <ul>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>

          </ul>
        </Grid>
        <br />
        <br />
        <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

          <p><b>Protein</b></p>
          <p> You have achieved your goal for the week!</p>


          <ul>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>

          </ul>
        </Grid>
        <br />
        <br />
        <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>

          <p><b>Dairy</b></p>
          <p>You ate 23 and you need 3 to hit your goal for the week</p>

          <ul>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>
            <li>You ate food-5 12 times, this week</li>

          </ul>
        </Grid> */}

        <table>
          <tr>
            <th>Food Type</th>
            <th>Actual</th>
            <th>Desired</th>
          </tr>
          {[{ type: "Fruits", actual: "14", desired: "9" }, { type: "Grains", actual: "25", desired: "20" }, { type: "Vegetables", actual: "21", desired: "23" }, { type: "Protein", actual: "42", desired: "42" }, { type: "Dairy", actual: "25", desired: "23" }].map((val, key) => {
            return (
              <tr key={key}>
                <td>{val?.type}</td>
                <td>{val?.actual}</td>
                <td>{val?.desired}</td>

              </tr>
            )
          })}
        </table>

        <br />
        <br />
        {/* <Grid item lg={12} md={12} sm={12} xs={12} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </Grid>
        <br />
        <br /> */}
      </Grid>
    </>
  );
}

// #######################################################################

