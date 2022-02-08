import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Plot from 'react-plotly.js';

import { Card, CardHeader, Row, Col } from "reactstrap";



function MetricsGraph(props) {
  const [mitigateChk, setMitigateChk] = useState(true);
  const data = [];

  var temp = {};
  
  return (
    <Col xl={(props.type == "default") ? "12" : "6"} className="mt-5">
      <Card style={{boxShadow:"rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px",backgroundColor:"#fff"}}>
        <CardHeader className="border-0" style={{backgroundColor:"black"}}>
          <Row className="align-items-center" >
            <div className="col" style={{ display: "inline-flex" }}>
              {/* <h4 className="mb-0" title={des[props.name]} style={{ cursor: "help", textTransform: "capitalize" }}> <b title={des[props.name]} >{props.name}</b></h4> */}
              <span style={{ marginLeft: "auto", float: "right", cursor: "help" ,color:"#fff" }}><i title={props.data.discription} style={{ cursor: "help", "font-size": "20px",color:"#fff" }} class="fa fa-info-circle" aria-hidden="true"></i></span>
            </div>
           
          </Row>
        </CardHeader>
    <br />
    <br />

        <Plot
          style={{ marginTop: "-2.5%", borderRadius: "25px", alignItems: "center", display: "flex", justifyContent: "center" }}
          data={props.data.values}
          layout={props.data.layout}
          config={{
            showLink: false,
            displayModeBar: false,
            responsive: true
          }}
        />
    <br />

      </Card>
    </Col>
  );
}

export default MetricsGraph;
