import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card, CardHeader, Row, Col } from "reactstrap";

// components
import PageTitle from "../../components/PageTitle";

import MetricsGraph from "../Tab/Ethics/Metrics";
import Evaluate_ from "../Tab/Ethics/Evaluate";

import MetricsBar from "../Tab/Ethics/MetricsBar";
import Donut from "../Tab/Ethics/Donut";

// components

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AIProxy() {
  const classes = useStyles();
  // const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [spinner, setSpinner] = React.useState(false);
  const [algoName, setAlgoname] = useState([]);
  const [customValue, setCustomValue] = useState({});
  const [currentAlgo, setCurrentAlgo] = useState("");
  const [dateList, setDateList] = useState([]);
  const [loadList, setLoadlist] = useState(null);
  const [Option1, setOption1] = React.useState((sessionStorage.getItem("currentModelName") == "Fraud Detection") ? ["Nationality Status", "Family Status"] : ["Sex", "Race"]);
  const [Option2, setOption2] = React.useState([]);
  const [deault, setdeault] = React.useState([]);
  const [graph, setGraph] = React.useState();


  const [privilege, setPrivilege] = React.useState([]);
  const [unprivilege, setUnPrivilege] = React.useState([]);

  const [Option1Selected, setOption1Seleced] = React.useState("");
  const [Option2Selected, setOption2Seleced] = React.useState("");
  const [defaultSelected, setdefaultSelected] = React.useState("");


  const [radio, setRadio] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open_default, setopen_default] = React.useState(false);

  const columns_proxy_evaluation = [
    {
      name: "Protected_attribute",
      label: "Protected attribute",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Feature_name",
      label: "Feature name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "P_value",
      label: "P value",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_it_proxy?",
      label: "Is it proxy?",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "%_avg_contribution_to_output",
      label: "% avg contribution to output",
      options: {
        filter: true,
        sort: false,
      },
    }
  ];

  const handleChange_drop = (event) => {
    setOption1Seleced(event.target.value)
    // setOption2(['Male', 'Female'])



    // temp
    if (event.target.value == "Sex" || event.target.value == "Nationality Status") {
      (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? setOption2(["dual-nationality", "single-nationality"]) : setOption2(['Male', 'Female'])


    } else if (event.target.value == "Race" || event.target.value == "Family Status") {

      (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? setOption2(["Divorced", "Married"]) : setOption2(['white', 'Black'])

    }

    // 

    fetch(`http://127.0.0.1:8000/get_protected_data/${event.target.value}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        if (selectedAlgo)
          setOption2(selectedAlgo['data'])
      })
      .catch(function (err) {
        console.log(err, " error");
      });

  };

  const handleChange_drop2 = (event) => {
    setOption2Seleced(event.target.value);


    // temp
    if (event.target.value == "Male" || event.target.value == "white" || event.target.value == "single-nationality" || event.target.value == "Married") {
      if (privilege.indexOf(event.target.value) == -1) {
        privilege.push(event.target.value)
        setPrivilege(privilege)
      }

    } else if (event.target.value == "Female" || event.target.value == "Black" || event.target.value == "dual-nationality" || event.target.value == "Divorced") {
      if (unprivilege.indexOf(event.target.value) == -1) {
        unprivilege.push(event.target.value)
        setUnPrivilege(unprivilege)
      }
    }

    setOption2Seleced("")
    // /////////



  };

  const handleChange_default = (event) => {
    setdefaultSelected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setopen_default(false)

  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleOpen_default = () => {
    setopen_default(true);
  };

  const [Evaluate, setEvaluateValue] = React.useState([]);


  const handleChange_select_privilege = (event) => {
    setPrivilege(event.target.value);
  };
  const handleChange_select_unprivilege = (event) => {
    setUnPrivilege(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    // setPersonName(value);
  };

  const handleChange = (event, newValue) => {

    setAlgoname([])
    setCustomValue({})
    setCurrentAlgo("")
    setDateList([])
    if (newValue == 2) {
      filterValue()
      filterValue2()

    }
    if (newValue) {
      setLoadlist('proxy')
      initValue('proxy')
    } else {
      setLoadlist(null)
      initValue(null)
    }
    setValue(newValue);
  };


  const filterValue2 = () => {
    setdeault((sessionStorage.getItem("currentModelName") == "Fraud Detection") ? ["Nationality Status", "Family Status"] : ["Sex", "Race"])
    // fetch(`http://127.0.0.1:8000/get_overall_data/`)
    //   .then(function (res) {
    //     return res.json();
    //   })
    //   .then(function (selectedAlgo) {
    //     if (selectedAlgo)
    //       setdeault(selectedAlgo['data'])
    //   })
    //   .catch(function (err) {
    //     console.log(err, " error");
    //   });
  };


  const filterValue = () => {
    // setOption1(['sex', 'race', 'age'])
    fetch(`http://127.0.0.1:8000/get_protected_data/`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        if (selectedAlgo)
          setOption1(selectedAlgo['data'])
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  };

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const [modelData, setmodelData] = useState({});

  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  // const [value, setValue] = useState([]);
  const [Barchartvalue, setBarchartvalue] = useState([]);


  useEffect(() => {
    // if(!sessionStorage.getItem("currentModelName")){
    //   toast.error("Please select the model", {
    //     position: "top-right",
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   }
    sessionStorage.removeItem('MODULE_DATA')


    // const socket = socketIOClient(ENDPOINT);
    // socket.emit("join", data => {
    //     console.log(data)
    //     // setResponse(data);
    //   });
    // socket.on("user joined", data => {
    //   alert()
    //   console.log(data)
    //   // setResponse(data);
    // });
    URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "Barchart" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_Barchart" : "Barchart";

    fetch(process.env.PUBLIC_URL + `/test/${'proxy_child_fraud_table'}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        setmodelData(selectedAlgo)
      })
      .catch(function (err) {
        console.log(err, " error");
      });

    setLoadlist('proxy')
    initValue('proxy')
    getBarchart()
  }, [customValue]);


  const getBarchart = () => {
    let URL = ""
    URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "Barchart" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_Barchart" : "Barchart";

    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        setBarchartvalue(selectedAlgo)
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  const handleChangeRadio = (e) => {
    // document.getElementById("demo-mutiple-checkbox-label").click()
    // console.log(privilege.indexOf(Option2Selected) > -1, privilege.indexOf(Option2Selected))
    if (e.target.value == 'Privilege' && privilege.indexOf(Option2Selected) == -1) {
      privilege.push(Option2Selected)
      setPrivilege(privilege)
    } else if (e.target.value == 'Un_privilege' && unprivilege.indexOf(Option2Selected) == -1) {
      unprivilege.push(Option2Selected)
      setUnPrivilege(unprivilege)
    }
    setRadio(e.target.value)
    setOption2Seleced("")
    setOption1Seleced("")
    setOption1([])
    setOption2([])
    setRadio("")
    filterValue()

  }
  const submitEval2 = () => {
    setGraph("default")
    setEvaluateValue([])
    // setEvaluateValue(Object.values(test))
    // let test = {"pp": {"layout": {"autosize": "false", "margin": {"l": 50, "r": 50, "b": 50, "t": 50, "pad": 0}, "height": 280, "width": 490, "title": "pp", "xaxis": {"title": {"text": "Scores", "font": {"family": "Courier New, monospace", "size": 18, "color": "#7f7f7f"}}}, "yaxis": {"title": {"text": "Attribute Name", "font": {"family": "Courier New, monospace", "size": 18, "color": "#7f7f7f"}}}, "showlegend": "true"}, "values": [{"x": [10596, 361, 1405, 329, 85, 42, 40, 39, 11, 3], "y": ["Male+White", "Male+Black", "Female+White", "Male+Asian-Pac-Islander", "Female+Black", "Male+Other", "Male+Amer-Indian-Eskimo", "Female+Asian-Pac-Islander", "Female+Amer-Indian-Eskimo", "Female+Other"], "name": "pp", "type": "bar", "orientation": "h"}]}}
    // setEvaluateValue(Object.values(test))
    // fetch(`http://127.0.0.1:8000/get_overall_metrics/?str_input=${defaultSelected}`)
    let URL = ""
    URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "Final_OverView_json" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_overall_json" : "Final_OverView_json";

    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        // console.log(selectedAlgo[defaultSelected],defaultSelected)
        let setSelectValue = selectedAlgo[defaultSelected]
        setEvaluateValue(Object.values(setSelectValue))
        // setEvaluateValue(Object.values(selectedAlgo))

      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  const submitEval = () => {
    setGraph("intersec")
    setEvaluateValue([])
    // let formJson = { "priv": privilege, "Unpriv": unprivilege }
    // fetch(`http://127.0.0.1:8000/get_results/?dictionary=${JSON.stringify(formJson)}`)
    let URL = ""
    URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "intersectional_metrics" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_interectional_json" : "intersectional_metrics";

    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {
        // console.log(Object.values(selectedAlgo))
        setEvaluateValue(Object.values(selectedAlgo))
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }

  // const Intersect = () => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }

  // console.log(customValue,"Object.keys(customValue).length");
  const initValue = async (params) => {
    // Intersect()
    setSpinner(true)
    let metricsList = {}
    let tempOverall = [];
    let dates = [];

    // if (sessionStorage.getItem("currentModelName")) {
    let URL;
    if (false) {
      //  URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "algoList" : {};

      URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "algoList" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_algoList" : "algoList";

    } else {
      URL = (sessionStorage.getItem("currentModelName") == "Credit Lending") ? "proxy" : (sessionStorage.getItem("currentModelName") == "Fraud Detection") ? "child_fraud_proxy" : "proxy";

    }
    // alert(URL)
    // console.log(URL)
    fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)
      .then(function (res) {
        return res.json();
      })
      .then(function (selectedAlgo) {

        if (selectedAlgo && Object.keys(selectedAlgo).length) {
          selectedAlgo[Object.keys(selectedAlgo)[0]].map((metricsData) =>
            tempOverall = [...tempOverall, metricsData.algo]
          );
          selectedAlgo && Object.keys(selectedAlgo).map(date => dates.push(new Date(date * 1000).toLocaleDateString("en-US")))

          setAlgoname(tempOverall)
          setCurrentAlgo(tempOverall[0])
          setDateList(dates)
          // console.log(selectedAlgo[Object.keys(selectedAlgo)[0]],"algoName",algoName)
          selectedAlgo && Object.keys(selectedAlgo).length && Object.values(selectedAlgo).map((metricsDataList) => {
            metricsDataList && metricsDataList.map(metricsData => {
              // console.log("algo: ", metricsData.algo)
              if (!(metricsData.algo in metricsList)) metricsList[metricsData.algo] = {};
              Object.keys(metricsData.metrics).map((metric) => {
                if (metric in metricsList[metricsData.algo]) {
                  metricsList[metricsData.algo][metric].push(metricsData.metrics[metric]);
                } else
                  metricsList[metricsData.algo][metric] = [metricsData.metrics[metric]];
              });
            })
          });
        }
        // console.log(Object.keys(customValue).length,loadList)
        if (customValue && Object.keys(customValue).length == 0) setCustomValue(metricsList)

        setTimeout(function () {
          setSpinner(false)
        }, 3000);
      })
      .catch(function (err) {
        setSpinner(false)
        console.log(err, " error");
      });
    // }
  }
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };


  return (
    <>
      {algoName.length > 0 && currentAlgo && (<PageTitle title="Proxy Bias" data={algoName} initialData={currentAlgo} dropDownName="Mitigation Algorithm" width={["0.5", "0.5"]} selectValue={(data) => { setCurrentAlgo(data) }} />)}
      {/* <Row className="mt-5">
        <Col xl="5" id="select algo">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{(!sessionStorage.getItem("set") || sessionStorage.getItem("set") == "ENGLISH") ? "Mitigation Algorithm" : "Algoritmo de mitigación"}</h3>
                </div>
                <div className="col text-right">
                  <select
                    href="#pablo"
                    class="form-control"
                    style={{ backgroundColor: "#0b2755", color: "#fff" }}
                    onChange={(e) => setCurrentAlgo(e.target.value)}
                    size="sm"
                  >
                    {algoName.length && algoName.map((algo) => (
                      <option> {algo} </option>
                    ))}
                  </select>
                </div>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row> */}
      <br />
      <div >
        <Grid container spacing={6}>
          {
            Barchartvalue && Object.keys(Barchartvalue).length > 0 && Object.keys(Barchartvalue).map((metric) => <MetricsBar name={metric} data={Barchartvalue[metric]} />)
          }
        </Grid>
        <br />
        <br />



        <Grid container spacing={6}>
          {/* {
            Barchartvalue && Object.keys(Barchartvalue).length > 0 ? <Donut /> : null
          } */}
          <Donut />
        </Grid>
        <br />
        <br />




        {sessionStorage.getItem('currentModelName') == "Fraud Detection" && (
          <Grid item xs={12} style={{ marginTop: "3vh" }}>

            <MUIDataTable
              title={"Proxy Bias Evaluation Using Transparency"}
              data={modelData['Proxy_Bias_Evaluation_Using_Transparency']}
              columns={columns_proxy_evaluation}
              options={{
                print: false,
                filter: false,
                viewColumns: false,
                selectableRows: false,

              }}
            />
          </Grid>

        )}
        <br />

        <Grid container spacing={6}>
          {
            customValue && Object.keys(customValue).length > 0 && customValue[currentAlgo] && Object.keys(customValue[currentAlgo]).map(metric => <MetricsGraph name={metric} type={"proxy"} algo={currentAlgo} data={customValue[currentAlgo][metric]} dates={dateList} />)

          }
        </Grid>
        <br />

      </div>

    </>
  );
}












