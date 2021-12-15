import React from "react";
import Plot from "react-plotly.js";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
const ModelPerformance = (props) => {
  const [results, setResults] = useState([]);
  const config = { displayModeBar: false };

  useEffect(() => {
    // const getResults = async () => {
    //   const response = await axios.get(
    //     `http://18.116.235.85:8000/performance/`
    //   );
    //   props.stopSpinner()

    //   if(response){
    //     setResults(response.data);
    //     }else{
    //       props.startAlert()
    //     }
    // };
    getResults1()
    // getResults();
  }, []);
  const getResults1 = () =>{
    let URL = "perjs";
    let final =  (sessionStorage.getItem('currentModelName') == "Fraud Detection") ? "scikitk-learn_model" : "pytorch_model_11"

    fetch(process.env.PUBLIC_URL + `/test/${final.trim()}.json`)
    .then(function (res) {
      return res.json();;
    })
    .then(function (selectedAlgo) {
      props.stopSpinner()
      setResults(selectedAlgo)
    })
    .catch(function (err) {
      props.startAlert()
      console.log(err, " error");
    });
  }
  return (
    <section className="app">
      {results.map((result) => {
        return (
          <div className="plotDiv" key={result.id} style={{minHeight:"100%","box-shadow": "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>
          <p style={{fontWeight:"bolder",fontSize:"20px"}}>{result.name}</p>
            <h4>{result.text}</h4>
            {/* <h4>{result?.score}</h4> */}

            {/* {(result.text)?null:<br />}
            {(result.text)?null:<br />}

            {(result?.name?.length > 50 )?null:<br />} */}
            <Plot
              data={result.data}
              layout={result.layout}
              args={result.args}
              config={config}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ModelPerformance;
