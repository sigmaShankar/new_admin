// import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react"
import * as constants from "../../components/Home/constants/constants"
// import 'date-fns';
import axios from "axios";
import { Card, CardHeader, Row, Col } from "reactstrap";

// import DateFnsUtils from '@date-io/date-fns';
// components
import PageTitle from "../../components/PageTitle";
import styles from "./training_programme.css"
import Widget from "../../components/Widget";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
// import {
//   KeyboardDatePicker,
// } from '@material-ui/pickers'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from "./../../components/Wrappers";

// import Table from "../dashboard/components/Table/Table";

// data



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

let screenWidth = window.screen.width;
let modalWidth = 1250
let screenHeight = window.screen.height;
let modalHeight = 600

const buttonStyle = {
  height: "40px",
  width: "60px",
  background: "#3CD4A0",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
}

const useStyles = makeStyles(theme => ({
  custom: {
    height: "10%",
    width: "100%",
    backgroundColor: "green"
  },


  paper: {
    position: 'absolute',
    width: modalWidth,
    height: modalHeight,
    top: 30,
    left: (screenWidth / 2) - (modalWidth / 2),
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: modalWidth,
    height: modalHeight,
    top: 30,
    left: (screenWidth / 2) - (modalWidth / 2),
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

}));

export default function Training_center(props) {

  const removeItem = (value) => {
    let filteredArray = suggestedList.filter(item => item._id !== value._id)
    setsuggestedList(filteredArray)

  }
  const [isShowMarker, setIsShowMarker] = useState(false)

  const clearFields = () => {
    setServerIP({
      val: "",
      isValid: false,
      touched: false
    })
    setPath({
      val: "",
      isValid: false
    })
    setProjectName({
      val: "",
      isValid: false,
      touched: false
    })

  }

  const [isFormValid, setIsFromValid] = useState(false)




  const handleMarkerClick = (event) => {
    //console.log(this.state.location)
  }
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
};

  const classes = useStyles();
  const [data, setData] = useState([])
  const [row, setRow] = useState([])

  const [selectedDate, setSelectedDate] = React.useState({ val: new Date(), isValid: false, touched: false });
  const [isAutoComplete, setIsAutocomplete] = useState(true)
  const [selectedEndDate, setSelectedEndDate] = React.useState({ val: new Date(), isValid: false, touched: false });
  const [selectedDueDate, setSelectedDueDate] = React.useState({ val: new Date(), isValid: false, touched: false });

  const form = {
    height: '80%',
    width: '80%',
    maxHeight: "800px",
    maxWidth: "1000px",
    margin: 'auto',
    position: "relative",
    backgroundColor: "white",
    padding: "2rem",
    paddingTop: "1rem",
    overflow: "scroll"
  }

  const mapPin = {
    height: '40px',
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '40px',
    backgroundColor: '#d3d3d330',
    cursor: 'pointer',
    boxShadow: '0 1px 10px 0 lightgrey',
  }

  const formContainer = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0, 0, 0, 0.5)"
  }

  const inputContainer = {
    display: "flex",
    justifyContent: "space-between",
    height: "4rem",
    marginBottom: "2rem",
    width: "100%"
  }


  const [projectname, setProjectName] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [modulename, setModuleName] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [path, setPath] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [IP, setIp] = useState("")
  const [biasIP, setbiasIP] = useState("")
  const [monitorIP, setmonitorIP] = useState("")
  const [IP_explainability, setIP_explainability] = useState("")
  const [od_alert_resolved, setod_alert_resolved] = useState("")
  const [dd_alert_resolved, setdd_alert_resolved] = useState("")
  const [cd_alert_resolved, setcd_alert_resolved] = useState("")
  const [ae_alert_resolved, setae_alert_resolved] = useState("")
  const [target_column, settarget_column] = useState("")
  const [modelType_explainability, setmodelType_explainability] = useState("")
  const [nan_alert_resolved, setnan_alert_resolved] = useState("")
  const [oor_alert_resolved, setoor_alert_resolved] = useState("")
  const [bias_alert_resolved, setbias_alert_resolved] = useState("")
  const [p_val, setp_val] = useState("")
  const [alert_sleep_interval, setalert_sleep_interval] = useState("")
  const [is_production, setis_production] = useState(true)
  const [retrain_models, setretrain_models] = useState(false)
  const [imageUI, setimageUI] = useState("")
  const [description, setdescription] = useState("")



  const [ServerIP, setServerIP] = useState({
    val: "",
    isValid: true,
    touched: true
  })


  const [open, setOpen] = React.useState(false);
  const [isdiable, setIsdiable] = React.useState(false);
  const [editEnable, seteditEnable] = React.useState(false);
  const [_id, set_ID] = useState('')
  const [__project, setProject] = useState([])




  useEffect(() => {
    // const [IP, setIp] = useState("")

    axios.get(process.env.PUBLIC_URL + `/ip.json`)
      .then(res => {
        setIp(res?.data?.IP)
        getUserList();
      })

  }, []);


  const getUserList = () => {
    axios.get(`${IP}/user/list`)
      .then(res => {
        setData(res)
        getDetails();

      })
  }



  const getDetails = () => {
    axios.get(`${IP}/project/create`)
      .then(res => {
        setProject(res)
      })
  }

  const validate = (i, val) => {
    if (i === 0) {
      return true
    }
    return val ? true : false
  }

  const validateForm = () => {
    let partialIsValid = projectname.isValid && biasIP.isValid && modulename.isValid && monitorIP.isValid && monitorIP.isValid

    return partialIsValid

  }

  const [openCenter, setOpenCenter] = React.useState(false);
  const [openenrolment, setopenenrolment] = React.useState(false);


  const [centerlist, setCenterlist] = React.useState([]);

  // fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)

  const onChangeTextHandler = (event, i) => {
    let value = event.target.value
    if (i === 'Projec_Name') {
      setProjectName({
        ...projectname,
        val: value,
        isValid: value.length > 0
      })
    }
    if (i === 'Module_Name') {
      setModuleName({
        ...modulename,
        val: value,
        isValid: value.length > 0
      })
    }

    if (i === 'biasIP') {
      setbiasIP({
        ...biasIP,
        val: value,
        isValid: value.length > 0
      })
    }

    if (i === 'monitorIP') {
      setmonitorIP({
        ...monitorIP,
        val: value,
        isValid: value.length > 0
      })
    }    if (i === 'IP_explainability') {
      setIP_explainability({
        ...IP_explainability,
        val: value,
        isValid: value.length > 0
      })
    }    if (i === 'od_alert_resolved') {
      setod_alert_resolved(value)
    }    if (i === 'dd_alert_resolved') {
      setdd_alert_resolved(value)
    }    if (i === 'cd_alert_resolved') {
      setcd_alert_resolved(value)
    }    if (i === 'ae_alert_resolved') {
      setae_alert_resolved(value)
    }    if (i === 'modelType_explainability') {
      setmodelType_explainability(value)
    }    if (i === 'nan_alert_resolved') {
      setnan_alert_resolved(value)
    }
    
    if (i === 'oor_alert_resolved') {
      setoor_alert_resolved(value)
    } if (i === 'bias_alert_resolved') {
      setbias_alert_resolved(value)
    } if (i === 'is_production') {
      setis_production(value)
    }
    if (i === 'retrain_models') {
      setServerIP({
        ...ServerIP,
        val: value,
        isValid: value.length > 0
      })
    }

    let isvalid = validateForm()
    setIsFromValid(isvalid)
  }
  let tempList = [];
  const editEnable_ = () => {
    setIsdiable(false)
  }

  const handleOpen = (params) => {
    setOpen(params);
  }

  // edit

  const view = (tableMeta) => {
    seteditEnable(true)
    // console.log(tableMeta)

    set_ID(tableMeta.rowData[11])
    // "project_name": projectname.val,
    // "module_name": modulename.val,
    // "path": path.val,
    // "description": description.val,
    // "biasIP": biasIP.val,
    // "monitorIP": monitorIP.val,
    // "IP_explainability": IP_explainability.val,
    // "od_alert_resolved": od_alert_resolved,
    // "dd_alert_resolved": dd_alert_resolved,
    // "cd_alert_resolved": cd_alert_resolved,
    // "ae_alert_resolved": ae_alert_resolved,
    // "modelType_explainability": modelType_explainability,
    // "nan_alert_resolved": nan_alert_resolved,
    // "oor_alert_resolved": oor_alert_resolved,
    // "bias_alert_resolved": bias_alert_resolved,
    // "is_production": is_production,


    setIsdiable(true)
    handleOpen(true)
    seteditEnable(true)
  }
  const type_ = [{ name: "online" }, { name: "offline" }]
  const category_ = [{ name: "fresher" }, { name: "experienced" }, { name: "principal" }]

  const handleClose = () => {
    setOpen(false);
    setIsdiable(false)
    seteditEnable(false)
    setIsDropDown(true)
    clearFields()
  };

  const center_column = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
      }
    },
    {
      name: "location",
      label: "Location",
      options: {
        filter: true,
      }
    }
  ];
  const columns = [
    {
      name: "project_name",
      label: "Project name",
      options: {
        filter: true,
      }
    },
    {
      label: "Module name",
      name: "module_name",
      options: {
        filter: true,

      }
    },
    {
      label: "Bias IP",
      name: "biasIP",
      options: {
        filter: false,

      }
    },

    {
      label: "Monitor IP",
      name: "monitorIP",
      options: {
        filter: false,
   
      }
    },   {
      label: "Explainability IP",
      name: "IP_explainability",
      options: {
        filter: false,

      }
    },
    {
      label: "Is Production",
      name: "is_production",
      options: {
        filter: false,
      }
    },
    {
      name: "status",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,

        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                style={{ margin: "0.5rem" }}
                onClick={() => { view(tableMeta) }}
                color="success"
                size="small"
                className="px-2"
                variant="contained"
              >
                View
              </Button>

              <Button
                style={{ margin: "0.5rem" }}

                onClick={() => { delete_institution(tableMeta) }}
                color="secondary"
                size="small"
                className="px-2"
                variant="contained"
              >
                Delete
              </Button>
            </div>

          );
        }
      }
    },
    {
      label: "centers",
      name: "centers",
      options: {
        filter: false,
        display: false
      }
    },
  ];

  const enrolment_columns = [
    {
      name: "First_name",
      label: "Name",
      options: {
        filter: true,
      }
    },
    {
      name: "DOB",
      label: "DOB",
      options: {
        filter: true,
      }
    }, {
      name: "Phone_Number",
      label: "Phone Number",
      options: {
        filter: true,
      }
    }, {
      name: "Gender",
      label: "Gender",
      options: {
        filter: true,
      }
    },
    {
      name: "age",
      label: "age",
      options: {
        filter: true,
      }
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
      }
    },
    {
      name: "State",
      label: "State",
      options: {
        filter: true,
      }
    },
    {
      name: "District",
      label: "District",
      options: {
        filter: true,
      }
    },

  ];

  const dateStyle = {
    display: "flex",
    height: "4rem",
    flexDirection: "column",
    alignItems: "start",
    marginBottom: "2rem",
    width: "40%",
    alignItems: "flexStart"
  }

  const [suggestedList, setsuggestedList] = React.useState([]);
  const [enrolmentlist, setenrolmentlist] = React.useState([]);
  const [isDropDown, setIsDropDown] = useState(true)

  const view_Enrollment = (tableMeta) => {
    axios.get("https://campusfield.in/api/training/get_programme/" + tableMeta.rowData[6])
      .then(res => {
        if (res.data) {
          setenrolmentlist(res.data.output[0])
          setopenenrolment(true);
        }
      })
  }

  const delete_institution = (tableMeta) => {
    axios.post(`${IP}/project/delete`)
      .then(res => {
        getDetails()
      })
  }
  function removeDuplicate(things) {
    return things.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === things.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
  }
  const closeCenter = (params) => {
    // setsuggestedList(removeDuplicate(tempList))
    // setOpenCenter(params)
    // setIsFromValid(validateForm())
  }
  const get_center = () => {
    axios.get("https://campusfield.in/api/training/training_center")
      .then(res => {
        if (res.data) {
          //console.log(res.data)
          setCenterlist(res.data.output)
        }
      })
  }
  const onAddNewInstitution = () => {
    //console.log('called')
    // //console.log(name,Website,mobile,email,City,Description,State,District,Pincode,'sdas');
    if (editEnable) {
      axios.post(`${IP}/project/update`,

        {
          "project_name": projectname.val,
          "module_name": modulename.val,
          "path": path.val,
          "description": description.val,
          "biasIP": biasIP.val,
          "monitorIP": monitorIP.val,
          "IP_explainability": IP_explainability.val,
          "od_alert_resolved": od_alert_resolved,
          "dd_alert_resolved": dd_alert_resolved,
          "cd_alert_resolved": cd_alert_resolved,
          "ae_alert_resolved": ae_alert_resolved,
          "modelType_explainability": modelType_explainability,
          "nan_alert_resolved": nan_alert_resolved,
          "oor_alert_resolved": oor_alert_resolved,
          "bias_alert_resolved": bias_alert_resolved,
          "is_production": is_production,
          "retrain_models":"",
          "meta_data": {
            "project_name": projectname.val,
            "module_name": modulename.val
          }

        },config)
        .then((res) => {
          clearFields()
          handleOpen(false)
          // getDetails();
        }).catch((err) => {
          //console.log(err)
        })
    } else if (editEnable == false) {
      axios.post(`${IP}/project/create`,
      {
        "project_name": projectname.val,
        "module_name": modulename.val,
        "path": path.val,
        "description": description.val,
        "biasIP": biasIP.val,
        "monitorIP": monitorIP.val,
        "IP_explainability": IP_explainability.val,
        "od_alert_resolved": od_alert_resolved,
        "dd_alert_resolved": dd_alert_resolved,
        "cd_alert_resolved": cd_alert_resolved,
        "ae_alert_resolved": ae_alert_resolved,
        "modelType_explainability": modelType_explainability,
        "nan_alert_resolved": nan_alert_resolved,
        "oor_alert_resolved": oor_alert_resolved,
        "bias_alert_resolved": bias_alert_resolved,
        "is_production": is_production,
        "retrain_models":"",
        "meta_data": {
          "project_name": projectname.val,
          "module_name": modulename.val
        }

      },config)
        .then((res) => {
          // if (res.status == 200 & res.data.error_code == 1) {
            clearFields()
            handleOpen(false)
            // setsuggestedList([])
            // setIsDropDown(true)
            // getDetails();
          // }
        }).catch((err) => {
          //console.log(err,'errr')
        })
    }
  }


  return (
    <>
      <PageTitle title="Add Project" button="Add Project" add_new={handleOpen} />
      <Row style={{ width: "100%" }}>
                <Col xl="12" style={{ width: "100%",backgroundColor:"red" }}>

                    <h1>akjdkajsd</h1>
                </Col>
              </Row>

              <Row style={{ width: "100%" }}>
              <Col xl="1" style={{ width: "100%" }}>
                </Col>
                <Col xl="10" style={{ width: "100%" ,backgroundColor:"green"}}>
                <h1>akjdkajsd</h1>

                </Col>
                <Col xl="1" style={{ width: "100%" }}>
                </Col>
              </Row>

  
    </>
  );
}
