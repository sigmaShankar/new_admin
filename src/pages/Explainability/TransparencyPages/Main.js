import "./App.css";
import "react-tabs/style/react-tabs.css";
import { Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SimpleAttributions from "./SimpleAttributions";
import ModelPerformance from "./ModelPerformance";
import Eda from "./Eda";
import axios from "axios";
import { useState, useEffect } from "react";

const Main = () => {
  const [results, setResults] = useState([]);

  const [fetchResults, setFetchResults] = useState(false);

  useEffect(() => {
    // const getResults = async () => {
    //   const response = await axios.get(`http://18.116.235.85:8000/target`);
    //   setResults(response.data);
    //   console.log(response);
    // };
    // getResults();
  }, []);

  const handleChange = (event) => {
    axios
      .post("http://18.116.235.85:8000/target", {
        target_feature: event.target.value,
      })
      .then(function (response) {
        if (response.data === "Invalid Target") {
          alert("Select a valid target column");
        } else {
          setFetchResults(true);
        }
      });
  };

  if (!fetchResults) {
    return (
      <div className="formDiv" style={{ margin: "20px" }}>
        <label>
          select target column :
          <select onChange={handleChange}>
            {results.map((result) => {
              return (
                <option key={result.id} value={result.name}>
                  {result.name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    );
  }

  return (
    <>
      <div style={{ margin: "20px" }} className="Root">
        <Tabs className="Tabs" selected={1}>
          <div>
            <TabList className="TabsList">
              <Tab>
                <Button className="Button">EDA</Button>
              </Tab>
              <Tab>
                <Button className="Button">Performance</Button>
              </Tab>
              <Tab>
                <Button className="Button">Importance</Button>
              </Tab>
            </TabList>
            <TabPanel>
              <Eda></Eda>
            </TabPanel>
            <TabPanel>
              <ModelPerformance></ModelPerformance>
            </TabPanel>
            <TabPanel className="TabPanel">
              <SimpleAttributions></SimpleAttributions>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Main;
