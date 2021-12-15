import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Legend,
} from "recharts";

import { Card, CardHeader, Row, Col } from "reactstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import Plot from 'react-plotly.js';

const CustomizedTick = (props) => {


  const { x, y, fill, value } = props;
  console.log(x, y, fill, value)
  return <text
    x={x}
    y={y}

    fontSize='16'
    fontFamily='sans-serif'
    fill={fill}
    textAnchor="start">{value}%</text>

};
// {'age': 25.227561455640345,
//  'credit_history=Delay': 8.547989927544462,
//  'credit_history=None/Paid': 10.216115410521478,
//  'credit_history=Other': 5.580008813406085,
//  'savings=500+': 0.40321186112960083,
//  'savings=<500': 3.3644637497643286,
//  'savings=Unknown/None': 4.291771368254436,
//  'employment=1-4 years': 14.855228613036685,
//  'employment=4+ years': 16.653066183033623,
//  'employment=Unemployed': 3.365024210693746,
//  'credit': 7.495558406975212}
var data = [{
  "labels": [
    "race",
    "Age (decade)=10",
    "Age (decade)=20",
    "Age (decade)=30",
    "Age (decade)=40",
    "Age (decade)=50",
    "Age (decade)=60",
    "Age (decade)=>=70",
    "Education Years=6",
    "Education Years=7",
    "Education Years=8",
    "Education Years=9",
    "Education Years=10",
    "Education Years=11",
    "Education Years=12",
    "Education Years=<6",
    "Education Years=>12"
],
"values": [
    16.90,
    13.30,
    13.28,
    7.14,
    6.45,
    6.83,
    2.20,
    0.26,
    0.15,
    1.89,
    0.42,
    2.11,
    9.99,
    1.83,
    3.93,
    5.70,
    7.54
],
  domain: {column: 0},
  name: '',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function DonutBar(props) {
  const [mitigateChk, setMitigateChk] = useState(true);
  
  const [tickerLabel, setTlabel] = useState([])
  useEffect(() => {
    let temp = []
    // console.log(props.data,"skdbksdbksbjksbksbj")
    // if (props.data) {
    //   for (let k = 0; k > props.data.length; k++) {
    //     temp.push(props.data[k]['name'])
    //   }
    // }
    // setTlabel(temp)
    Getdata()
  }, [])

let Getdata = ()=>{
  let URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "PieChart" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "crf" : "PieChart";

  fetch(process.env.PUBLIC_URL + `/test/bias/${URL}.json`)
    .then(function (res) {
      return res.json();
    })
    .then(function (selectedAlgo) {
      console.log(selectedAlgo,"dfdfgd",data)
      selectedAlgo['domain']= {column: 0}
      selectedAlgo['name'] = '';
      selectedAlgo['hoverinfo']= 'label+percent+name';
      selectedAlgo['hole']= .4;
      selectedAlgo['type']= 'pie';
      setTlabel([selectedAlgo])
    })
    .catch(function (err) {
      console.log(err, " error");
    });
}

  return (
    <>
      
      <Col xl="12" className="mt-4">
        <Card style={{boxShadow:"rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px",backgroundColor:"#fff"}}>
          <CardHeader className="border-0">
            <Row className="align-items-center">
            <div className="col" style={{display:"inline-flex"}}>
              <h4 className="mb-0"  style={{cursor:"help",textTransform: "capitalize" }}> <b title="Representing the correlation between protected feature vs other feature in the dataset." >Correlation pie chart</b></h4>
              <span style={{marginLeft:"auto",float:"right",cursor:"help"}}><i  title="Representing the correlation between protected feature vs other feature in the dataset." style={{cursor:"help","font-size":"20px"}}  class="fa fa-info-circle" aria-hidden="true"></i></span>
            </div>

            </Row>
            <Row className="align-items-center">
            <div className="col" >
              {/* <h5>Note : </h5><br /> */}
          {(sessionStorage.getItem("currentModelName") == "Credit Lending") ?   <p  style={{fontSize:"11px"}}> {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "This charts depicts the impact of each feature towards the protected attribute (in this example, that is Gender). Thus, higher score, implies that particular feature is a potential proxy for that protected attribute (in this example, that is Gender)" : "Deze grafiek toont de impact van elk kenmerk op het beschermde kenmerk (in dit voorbeeld is dat geslacht). Een hogere score houdt dus in dat een bepaald kenmerk een potentiële proxy is voor dat beschermde kenmerk (in dit voorbeeld is dat geslacht)"}</p> 
          :  
          <p  style={{fontSize:"11px"}}> {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "This charts depicts the impact of each feature towards the protected attribute (in this example, that is dual nationality). Thus, higher score, implies that particular feature is a potential proxy for that protected attribute (in this example, that is dual nationality)" : "Deze grafiek toont de impact van elk kenmerk op het beschermde kenmerk (in dit voorbeeld is dat de dubbele nationaliteit). Een hogere score houdt dus in dat een bepaald kenmerk een potentiële proxy is voor dat beschermde kenmerk (in dit voorbeeld is dat een dubbele nationaliteit)"}</p>}  
              {/* <p  style={{fontSize:"13px",marginLeft:"1%"}}> ii) It is also to be noted that in the graph given below, Income Binary is a outcome data (Y)</p> */}

            </div>

            </Row>
          </CardHeader>
          {(tickerLabel.length)?
        <Plot
        style={{ borderRadius: "25px", marginLeft: "20%" }}
        data={tickerLabel}
         layout = {{
          // title: 'Global Emissions 1990-2011',
          autosize: false,
          margin: {
            l: 25,
            r: 0,
            b: 16,
            t: 0,
            pad: 0
          },
          height: 420,
          width: 800,
          annotations: [
            {
              font: {
                size: 15
              },
              showarrow: false,
              text: 'Correlation',
              x: 0.17,
              y: 0.5
            },
          ],
          showlegend: true,
          grid: {rows: 1, columns: 2}
        }}
     
        config={{
          showLink: false,
          displayModeBar: false,
          responsive: true
        }}
      />:null  
        }
          
        </Card>
      </Col>
      {/* )} */}
    </>
  );
}

export default DonutBar;
