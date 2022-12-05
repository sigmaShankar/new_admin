import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";

// import Moment from "react-moment";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
} from "reactstrap";
// reactstrap components
import { CardHeader, Progress, Table, Container } from "reactstrap";
// import riskData2 from "./Ethics/data/risk2.json";
// import credit_json from process.env.PUBLIC_URL + '/img/logo.png'
// import ethics_csv from "./Ethics/data/ethics_.csv";
// import mitigation_csv from "./Ethics/data/mitigation.csv";
import axios from "axios";
// const csv=require('csvtojson')
// core components

// import Header from "components/Headers/Header.js";
// import HeaderDU from "components/Headers/HeaderDU.js";

// const _csv = require('csvtojson')

let screenWidth = window.screen.width;
let modalWidth = 1250;
let screenHeight = window.screen.height;
let modalHeight = 600;


const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [overallEthics, setOverallScore] = useState("0");
  let model = {};
  const [_risk, setRisk] = useState([]);
  const [overall, setOverall] = useState([]);
  const [mitigation, setMitigation] = useState([]);
  const [accuracy, setAccuracy] = useState([]);


  useEffect(() => {
    initSetValue()
  }, [])

  //set current model
  // console.log("test url: ", props.location.query);

  const initSetValue = async (props) => {
    setOverall([])
    setMitigation([])
    setRisk([])
    setAccuracy([])
    let tempOverall = [];
    let _accuracy = [];
    let tempRisk = [];
    let tempMitigation = [];
    let URL = ""
    if (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH"){
      URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "credit_lending" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud" : "credit_lending";

    }else{
     URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "credit_lendingDU" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraudDU" : {};

    }
    // URL = "credit_lending";
    console.log("meeee", URL)
    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        // setCreditJson(selectedAlgo);
        if (Object.keys(selectedAlgo).length) {
          for (const key in selectedAlgo) {
            tempOverall = [...tempOverall, selectedAlgo[key]["pillar_overallscore"]];
            _accuracy = [..._accuracy, selectedAlgo[key]["accuracy"]];

            selectedAlgo[key]["risk"].map(x => x['date_generated'] = key)
            selectedAlgo[key]["mitigation"].map(x => x['date_generated'] = key)
            // console.log(selectedAlgo[key]["risk"],key,'selectedAlgo[key]["risk"]]selectedAlgo[key]["risk"]]',selectedAlgo[key]["mitigation"]);
            tempRisk = [...tempRisk, selectedAlgo[key]["risk"]];
            tempMitigation = [...tempMitigation, selectedAlgo[key]["mitigation"]];
          }
        }
        if (overall.length == 0) setOverall(tempOverall)
        if (mitigation.length == 0) {
          console.log(tempMitigation, "tempMitigation")
          setMitigation(tempMitigation[0])
        }
        if (_risk.length == 0) setRisk(tempRisk[0])
        if (accuracy.length == 0) setAccuracy(_accuracy[0])

      })
      .catch(function (err) {
        toast.error("Unable to load the file", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err, " error");
      });
  }

  // if (props.location.state) {
  //   model.model = props.location.state.model;
  //   model.name = props.location.state.name;
  //   model.lastTrained = props.location.state.lastTrained;
  //   console.log("test: ", model);

  //   if (props.location.state.model) {

  //     sessionStorage.setItem("accuracy", JSON.stringify(accuracy));
  //     sessionStorage.setItem("currentModel", model.model);
  //     // sessionStorage.setItem("currentModelName", model.name);
  //     sessionStorage.setItem("lastTrained", model.lastTrained);
  //     sessionStorage.setItem("ethicOverall", JSON.stringify(overall));

  //   }
  // } else if (sessionStorage.getItem("currentModel")) {
  //   model.model = sessionStorage.getItem("currentModel");
  //   model.name = sessionStorage.getItem("currentModelName");
  //   model.lastTrained = sessionStorage.getItem("lastTrained");
  // }

  // let selectedAlgo =


  
  

  const [activeTab, setActiveTab] = useState("Ethics");
  const [title, setTitle] = useState("Risk");
  const [secondTitle, setSecondTitle] = useState("Mitigation");

  const [column, setColumn] = useState([]);
  const [value, setValue] = useState([]);

  const columns_risk = [
    {
      name: "ids",
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH")?"Risk No.":"Risico Nr" ,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "pillar",
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH")?"Category":"Categorie",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH")?"Risk Description":"Risicobeschrijving",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "impact",
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH")?"Criticality":"Kritiek",
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
      label: (!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH")?"Date ":"Datum en tijd ",
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
  };

  const getData = (value) => {
    if (value.length) {
      setColumn(Object.keys(value[0]));
      setValue(value);
    } else {
      setColumn([]);
      setValue([]);
    }
  };



  const approve = (url) => {

    axios.get(url)
      .then(function (response) {
        console.log(response);
        setModalShow(false)
        toast.success("Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Error", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .then(function () {
      });
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [popup, setPopup] = React.useState([]);

  const mitigation_funtion = (id, date) => {
    setPopup([])
    let data = mitigation.filter((x) => x.date_generated == date);
    console.log(data, 'datadaaatf', mitigation);
    setPopup(data);
    setModalShow(true);
  };

  return (
    <>
      {/* { true ? <Header show={overall[0]} accuracy={accuracy[0]} type="ethics" /> : ""} */}
      {/* {((!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") && !props.headerDisplay) ? <Header show={overallEthics} show={overall[0]} accuracy={accuracy[0]} type="ethics"/> : (!props.headerDisplay) ?<HeaderDU show={overallEthics} /> : null} */}
     
     {/* Page content */}
     {/* <Container  fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12"> */}
            <Card className="shadow">
              <CardHeader className="border-0" style={{backgroundColor:"black",color:"#fff"}}>
                <Row className="align-items-center">
                  <div className="col">
                  {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? <h5 className="mb-0">Risks - {(sessionStorage.getItem("currentModelName") == "Employee recruitment")?"Employee recruitment":"Sample Welfare Benefit Fraud" } </h5>
                   :
                   <h5 className="mb-0">risico's - {(sessionStorage.getItem("currentModelName") == "Credit Lending")?"Kredietverlening":"Voorbeeld uitkeringsfraude" } </h5>
                  }
                  </div>
                  <div className="col text-right">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => _setTitle(secondTitle)}
                      size="medium"
                    >
                      {secondTitle}
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                popup={popup}
                _approve={approve}
              // title={activeTab}
              />
              <div className="m-3">
                {/* <Nav pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "Ethics" })}
                      onClick={() => {
                        toggle("Ethics");
                        setModalShow(true)
                      }}
                    >
                      Ethics
                    </NavLink>
                  </NavItem>
                </Nav> */}
              </div>
              <MUIDataTable
                data={_risk}
                columns={columns_risk}
                options={{
                  print: false,
                  filter: false,
                  viewColumns:false,
                  selectableRows: false,
                  onRowClick: (rowData, rowState) => {
                    // setAdd(rowData[1])
                    //console.log("hello")
                    mitigation_funtion(
                      rowData[0],
                      rowData[4]
                    );
                    console.log(rowData[0], rowData);
                  },
                }}
              />
            </Card>
          {/* </Col>
        </Row> */}
        <ToastContainer />
      {/* </Container> */}
    </>
  );
};


function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      isOpen={props.show}
      className="modal-xl"
    // contentClassName="migitage-modal"
    // toggle={toggle}
    >
      {/* <Modal
      {...props}
      size="modal-xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered */}
      {/* > */}
      {/* <ModalHeader toggle={toggle} className="m-3 h2" >Mitigations</ModalHeader> */}
      <ModalBody>
        <Col>
          <Card className="shadow ">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Mitigations" :"Beperkingen"}</h3>
                </div>
              </Row>
            </CardHeader>
            <Table
              className="align-items-center mitigation-table table-flush"
              responsive
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Name" :"Naam"}</th>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Scope" :"Toepassingsgebied"}</th>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Pillar Score" :"Pijlerscore"}</th>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Protected Group Acc" :"Beveiligde groepstoegang"}</th>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Overall Accuracy" :"Algemene nauwkeurigheid"}</th>
                  <th scope="col">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Decision" :"Besluit"}</th>
                </tr>
              </thead>
              <tbody>
                {props.popup.length ? (
                  props.popup.map((mitigation, ind) => {
                    return (
                      <tr>
                        <td>
                          <b>{mitigation.name}</b>
                        </td>
                        <td>{mitigation.scope}</td>
                        <td style={{ paddingLeft: "4%" }}>{mitigation.score}%</td>

                        <td style={{ paddingLeft: "4%" }}>{mitigation.Biased_Group_Acc}%</td>
                        <td style={{ paddingLeft: "4%" }}>{mitigation.OverAll_Acc}%</td>
                        <td>
                          <button type="button" onClick={() => { { props._approve(mitigation.url) } }} class="btn btn-success">
                          {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Approve" :"Goedkeuren"} 
                          </button>
                          <button type="button" class="btn btn-danger" onClick={props.onHide}>
                          {(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ?"Reject" :"afwijzen"} 
                            
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <small>No data found</small>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Index;
