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
  ResponsiveContainer
} from "recharts";

import { Card, CardHeader, Row, Col } from "reactstrap";

const des = {
  "balanced accuracy":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Balanced accuracy of the model. More the score better the model" : "Evenwichtige nauwkeurigheid van het model. Hoe meer hoe beter het model" ,
  "statistical parity difference": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"The ideal value of this metric is 0. A value < 0 implies higher benefit for the privileged group and a value >0 implies a higher benefit for the unprivileged group":"De ideale waarde van deze statistiek is 0. Een waarde < 0 impliceert een hoger voordeel voor de bevoorrechte groep en een waarde >0 impliceert een hoger voordeel voor de niet-bevoorrechte groep",
  "disparate impact ratio": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value of this metric is 1.0 A value < 1 implies higher benefit for the privileged group and a value >1 implies a higher benefit for the unprivileged group":"De ideale waarde van deze statistiek is 1,0 Een waarde < 1 impliceert een hoger voordeel voor de bevoorrechte groep en een waarde >1 impliceert een hoger voordeel voor de niet-bevoorrechte groep",
  "average odds difference":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value of this metric is 0. A value of < 0 implies higher benefit for the privileged group and a value > 0 implies higher benefit for the unprivileged group":"De ideale waarde van deze statistiek is 0. Een waarde van < 0 impliceert een hoger voordeel voor de bevoorrechte groep en een waarde > 0 impliceert een hoger voordeel voor de niet-bevoorrechte groep" ,
  "equal opportunity difference":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "The ideal value of this metric is 0. A value of < 0 implies higher benefit for the privileged group and a value > 0 implies higher benefit for the unprivileged group":"De ideale waarde van deze statistiek is 0. Een waarde van < 0 impliceert een hoger voordeel voor de bevoorrechte groep en een waarde > 0 impliceert een hoger voordeel voor de niet-bevoorrechte groep",
  "theil index": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "A value of 0 implies perfect fairness. Fairness is indicated by lower score, higher score are problematic":"Een waarde van 0 impliceert perfecte eerlijkheid. Eerlijkheid wordt aangegeven door een lagere score, een hogere score is problematisch",
  "true positive rate difference":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "The ideal value is 0. A value of < 0 implies higher benefit for the privileged group and a value > 0 implies higher benefit for the unprivileged group.":"De ideale waarde is 0. Een waarde van < 0 impliceert een hoger voordeel voor de kansarme groep en een waarde > 0 impliceert een hoger voordeel voor de kansarme groep.",
  "false posiitve rate difference":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "The ideal value is 0. A value of < 0 implies higher benefit for the Un-privileged group and a value > 0 implies higher benefit for the Privileged group.":"De ideale waarde is 0. Een waarde van < 0 impliceert een hoger voordeel voor de Onbevoorrechte groep en een waarde > 0 impliceert een hoger voordeel voor de Bevoorrechte groep.",
  "false negative rate difference": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 0. A value of < 0 implies higher benefit for the Un-privileged group and a value > 0 implies higher benefit for the Privileged group.":"De ideale waarde is 0. Een waarde van < 0 impliceert een hoger voordeel voor de Onbevoorrechte groep en een waarde > 0 impliceert een hoger voordeel voor de Bevoorrechte groep.",
  "false ommision rate difference": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 0. A value of < 0 implies higher benefit for the Un-privileged group and a value > 0 implies higher benefit for the Privileged group.":"De ideale waarde is 0. Een waarde van < 0 impliceert een hoger voordeel voor de Onbevoorrechte groep en een waarde > 0 impliceert een hoger voordeel voor de Bevoorrechte groep.",
  "false discovery rate difference": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 0. A value of < 0 implies higher benefit for the Un-privileged group and a value > 0 implies higher benefit for the Privileged group":"De ideale waarde is 0. Een waarde van < 0 impliceert een hoger voordeel voor de groep zonder privileges en een waarde > 0 impliceert een hoger voordeel voor de groep met privileges",
  "false posiitve rate ratio": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 1. A value of < 1 implies higher benefit for the Un-privileged group and a value > 1 implies higher benefit for the Privileged group.":"De ideale waarde is 1. Een waarde < 1 impliceert een hoger voordeel voor de Onbevoorrechte groep en een waarde > 1 impliceert een hoger voordeel voor de Bevoorrechte groep.",
  "false negative rate ratio":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "The ideal value is 1. A value of < 1 implies higher benefit for the Un-privileged group and a value > 1 implies higher benefit for the Privileged group.":"De ideale waarde is 1. Een waarde < 1 impliceert een hoger voordeel voor de Onbevoorrechte groep en een waarde > 1 impliceert een hoger voordeel voor de Bevoorrechte groep.",
  "false ommision rate ratio":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 1. A value of < 1 implies higher benefit for the Un-privileged group and a value > 1 implies higher benefit for the Privileged group":"De ideale waarde is 1. Een waarde van < 1 impliceert een hoger voordeel voor de groep zonder privileges en een waarde > 1 impliceert een hoger voordeel voor de groep met privileges",
  "false discovery rate ratio": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "The ideal value is 1. A value of < 1 implies higher benefit for the Un-privileged group and a value > 1 implies higher benefit for the Privileged group":"De ideale waarde is 1. Een waarde van < 1 impliceert een hoger voordeel voor de groep zonder privileges en een waarde > 1 impliceert een hoger voordeel voor de groep met privileges",
  "accuracy":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Accuracy of the model. More the score better the model":"Nauwkeurigheid van het model. Hoe meer hoe beter het model",
  "biased group accuracy":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Accuracy of privileged group.":"Nauwkeurigheid van de bevoorrechte groep.",
  "error rate":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "1- accuracy. Lower the score better the model":"1- nauwkeurigheid. Verlaag de score beter het model",
  "number of true positives":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "Number of data points which are actually postive and predicted as positive":"Aantal gegevenspunten dat daadwerkelijk positief is en voorspeld als positief",
  "number of false positives": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Number of data points which are actually Negative but predicted as positive":"Aantal gegevenspunten dat feitelijk negatief is maar als positief wordt voorspeld",
  "number of false negatives":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "Number of data points which are actually Positive but predicted as Negative":"Aantal gegevenspunten dat feitelijk positief is, maar voorspeld als negatief",
  "number of true negatives": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Number of data points which are actually Negative and also predicted as  negative":"Aantal gegevenspunten dat feitelijk negatief is en ook als negatief wordt voorspeld",
  "true positive rate ":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Out of all positives how many predicted as postive":"Van alle positieve hoeveel voorspelden als positief",
  "false posiitve rate": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? " Out of all negative points how many points are falsly predicted as positive":"Hoeveel punten van alle negatieve punten worden ten onrechte als positief voorspeld",
  "false negative rate": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Out of all positive points how many are falsly predicted as negative (Ratio of False negatives over all the positive points in dataset )":"Hoeveel van alle positieve punten worden ten onrechte als negatief voorspeld (verhouding van valse negatieven over alle positieve punten in de dataset)",
  "true negative rate ":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "Out of all negative points how many are truely predicted as negative":"Hoeveel van alle negatieve punten worden echt als negatief voorspeld",
  "precision":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "More the score better the model":"Hoe meer hoe beter het model",
  "recall":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "More the score better the model":"Hoe meer hoe beter het model",
  "sensitivity":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "More the score better the model":"Hoe meer hoe beter het model",
  "specificity": (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "More the score better the model":"Hoe meer hoe beter het model",
  "false ommision rate":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "Out of all predicted Negative points how many of them are actually predicted as false. Near to zero is better":"Van alle voorspelde negatieve punten, hoeveel ervan worden daadwerkelijk als onwaar voorspeld. Bijna nul is beter",
  "false discovery rate":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?  "Out of all predicted positive points how many of them are actually predicted as false. Lower the score better the model":"Van alle voorspelde positieve punten, hoeveel ervan worden daadwerkelijk als onwaar voorspeld. Verlaag de score beter het model",
  "adjusted mutual info score":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Adjusted Mutual Information (AMI) is an adjustment of the Mutual Information (MI) score to account for chance. It accounts for the fact that the MI is generally higher for two clusters with a large numbers. The strength of the proxy is given by this score. We wish to measure how strongly a random feature X is a proxy for protected feature Z":"Van alle voorspelde positieve punten, hoeveel ervan worden daadwerkelijk als onwaar voorspeld. Verlaag de score beter het model",
  "normalized mutual info score":(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Normalized Mutual Information (NMI) is a normalization of the Mutual Information (MI) score to scale the results between 0 (no mutual information) and 1 (perfect correlation). The strength of proxy is given by this score. We wish to measure how strongly a random feature X is a proxy for protected feature Z.":"Normalized Mutual Information (NMI) is een normalisatie van de Mutual Information (MI)-score om de resultaten te schalen tussen 0 (geen wederzijdse informatie) en 1 (perfecte correlatie). De sterkte van proxy wordt gegeven door deze score. We willen meten hoe sterk een willekeurig kenmerk X een proxy is voor beschermd kenmerk Z.",
  "Fairness" : (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "More the score, Fairer the model.":"Meer de score, Eerlijker het model.",
  "Adjusted_mutual_info_score" : (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "SigmaRed reponsible AI platform provides more than 40+ metrics, it can be accessable in ML Fairness page":"Meer de score, Eerlijker het model."

}

const CustomizedTick = (props) => {


  const { x, y, fill, value } = props;
  // console.log(x, y, fill, value)
  return <text
    x={x}
    y={y}

    fontSize='16'
    fontFamily='sans-serif'
    fill={fill}
    textAnchor="start">{value}%</text>

};


function MetricsBar(props) {
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
  }, [])

  return (
    <>
      <Col className="mt-4">
        <Card style={{boxShadow:"rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px",backgroundColor:"#fff"}}>
          <CardHeader className="border-0" style={{backgroundColor:"black"}}>
            <Row className="align-items-center">
            <div className="col" style={{display:"inline-flex"}}>
              <span className="mb-0" title={des[props.name]} style={{cursor:"help",textTransform: "capitalize",color:"#fff" }}> <b title={des[props.name]} >{props.name}</b></span>
              <span style={{marginLeft:"auto",float:"right",cursor:"help",color:"#fff"}}><i  title={des[props.name]} style={{color:"#fff",cursor:"help","font-size":"20px"}}  class="fa fa-info-circle" aria-hidden="true"></i></span>
            </div>
           
            </Row>
          </CardHeader>
      <br />
      <ResponsiveContainer width="100%" minWidth={480} height={300}>
          <BarChart  data={props.data} layout="vertical" style={{marginLeft:"-1px"}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category"  fontSize={10} dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Value" fill="#23284a" />
          </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    {/* )} */}
    </>
  );
}

export default MetricsBar;
