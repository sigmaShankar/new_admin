// import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import * as constants from "../../components/Home/constants/constants"
// import 'date-fns';
import axios from "axios";
import { Card, CardHeader, Row, Col } from "reactstrap";
import Button from '@material-ui/core/Button';

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


// import Table from "../dashboard/components/Table/Table";

// data
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SyncIcon from '@material-ui/icons/Sync';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  let history = useHistory();

  const removeItem = (value) => {
    let filteredArray = suggestedList.filter(item => item._id !== value._id)
    setsuggestedList(filteredArray)

  }

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

  const [DataValue, setDataValue] = useState(null)
  const [role, setRole] = useState(null)
  const [roleReject, setRoleReject] = useState(null)

  const [monitorIP, setmonitorIP] = useState("")

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
    if (localStorage.getItem('type') == 'admin') {
      setRole("Approved_admin")
      setRoleReject('RejectAdmin')
    } else if (localStorage.getItem('type') == 'datascience') {
      setRole("Approved_Datascience")
      setRoleReject('RejectDatascience')

    } else if (localStorage.getItem('type') == 'product') {
      setRole("Approved_Product")
      setRoleReject('RejectProduct')
    } else if (localStorage.getItem('type') == 'complaince') {
      setRole("Approved_Complaince")
      setRoleReject('RejectComplaince')
    }
    getData()

  }, []);


  const getData = () => {
    let _temp = (DataValue)?DataValue.length:0
    axios.get(`http://127.0.0.1:4000/api/getModel/${(localStorage.getItem('type') == 'admin') ? 'admin' : null}`)
      .then(res => {
        if(_temp != res?.data?.output.length && DataValue){
          toast.info('New Model arraived!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          }
        setDataValue(res?.data?.output)
   
        // console.log(DataValue, "DataValueDataValueDataValue", res)
      })
  }





  const validate = (i, val) => {
    if (i === 0) {
      return true
    }
    return val ? true : false
  }

  const validateForm = () => {
    let partialIsValid = projectname.isValid && modulename.isValid && monitorIP.isValid && monitorIP.isValid

    return partialIsValid

  }



  // fetch(process.env.PUBLIC_URL + `/test/${URL}.json`)


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
  const [rejectReson, setResonReject] = React.useState("");
  const [isDropDown, setIsDropDown] = useState(true)


  const delete_institution = (tableMeta) => {
    axios.post(`/project/delete`)
      .then(res => {
        // getDetails()
      })
  }

const selectedModel = () =>{
  if(localStorage.getItem('type') == "datascience" || localStorage.getItem('type') == "admin"){
    history.push("/app/BiasAssessment")

  }else if(localStorage.getItem('type') == "complaince"){
    history.push("//app/Explainability")

  }
}

  const grantPermission = (value, data) => {
    // console.log(value, data._id, "value,datavalue,datavalue,data")
    let _temp = {}
    _temp[role] = value
    if (value) {
      // console.log(data?._id,role,_temp)
      axios.put(`http://127.0.0.1:4000/api/updateModel/${role}/${data?._id}`, _temp)
        .then(res => {
          console.log(res, "resss")
          getData()
        })
    } else {
      if (rejectReson) {
        _temp[roleReject] = rejectReson;
        // console.log(_temp,"_temp_temp")
        axios.put(`http://127.0.0.1:4000/api/updateModel/${role}/${data?._id}`, _temp)
          .then(res => {
            console.log(res, "resss")
            getData()
          })
      } else {
        alert("Please provide reason for rejecting this model")
      }
    }
  }

  const onChangeTextHandler = (event, i) => {
    setResonReject(event.target.value)
  }

  return (
    <>
      {/* <PageTitle title="Add Project" button="Add Project" add_new={handleOpen} /> */}
      <Row>
        <Col xl="6" style={{ width: "100%" }}>
          <h5>Project Inventory</h5>
        </Col>
        <Col xl="6" style={{ width: "100%", right: "9%", display: "flex", flexDirection: "row-reverse" }}>
          <SyncIcon style={{ fontSize: "35px", color: "#23284a", cursor: "pointer" }} onClick={() => { getData() }} />
        </Col>
      </Row>
      {DataValue && DataValue.map(value => <Row style={{ width: "100%", margin: "10px", padding: "10px", paddingBottom: "10px" }}>
        <Col xl="1" style={{ width: "100%" }}>
        </Col>
        <Col xl="10" style={{ width: "100%", backgroundColor: "#fff", boxShadow: `${(value[role]) ? 'green' : 'red'} 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px` }}>
          <Row style={{ width: "100%", padding: "8px" }}>
            <small style={{ float: "left" }}> <h5>{value?.ModelName}</h5></small>
            <Button variant="contained" style={{ float: "right", fontSize: "10px", padding: "2px", backgroundColor: "rgb(206 105 104)", color: "#fff", right: "-65%" }} onClick={() => { selectedModel() }}>
              Review Model
            </Button>
            <p style={{ float: "right", margin: "auto" }}>Date : {value?.Create_at?.substring(0, 10)}</p>

          </Row>

          <Row style={{ width: "100%", paddingLeft: "8px", paddingBottom: "5px", marginTop: "-1%" }}>
            <span> <b>Type : {value?.ModelType}</b></span>

          </Row>



          <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <Row style={{ padding: "40px", margin: "20px", 'border-bottom': "1px solid gray" }}>
            <Col xl="3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>

              <div>
                <span> Admin </span>
                <AccountCircleIcon style={{ color: `${(value['Approved_admin']) ? 'green' : (!value["Approved_admin"] && !value['RejectAdmin']?.length) ? '#ffa600' : 'red'}`, marginLeft: "16%", cursor: "pointer" }} />
              </div>
              {/* <div style={{position:"absolute",minWidth:"140px",top:"-150%",backgroundColor: "#cfcfcfa6","box-shadow": "rgb(29 29 217 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px"}}>
              <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>

              </ul>
              </div> */}
            </Col>
            {(role == "admin" || role == "Approved_Datascience" || role == "Approved_admin") && <Col xl="3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <div>
                <span> Data Scinece </span>
                <AccountCircleIcon style={{ color: `${(value["Approved_Datascience"]) ? 'green' : (!value["Approved_Datascience"] && !value["RejectDatascience"]?.length) ? '#ffa600' : 'red'}`, marginLeft: "23%", cursor: "pointer" }} />
              </div>
            </Col>}

            {(role == "admin" || role == "Approved_Complaince" || role == "Approved_admin") && <Col xl="3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>

              <div>
                <span> Complaince </span>
                <AccountCircleIcon style={{ color: `${(value["Approved_Complaince"]) ? 'green' : (!value["Approved_Complaince"] && !value["RejectComplaince"]?.length) ? '#ffa600' : 'red'}`, marginLeft: "23%", cursor: "pointer" }} />
              </div>

            </Col>}

            {(role == "admin" || role == "Approved_Product" || role == "Approved_admin") && <Col xl="3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>

              <div>
                <span> Product </span>
                <AccountCircleIcon style={{ color: `${(value["Approved_Product"]) ? 'green' : (!value['Approved_Product'] && !value['RejectProduct']?.length) ? '#ffa600' : 'red'}`, marginLeft: "16%", cursor: "pointer" }} />
              </div>

            </Col>}
          </Row>
          {!value[role] && !value[roleReject]?.length && (<Row style={{ marginBottom: "20px" }}>
            <Col xl="6" style={{ width: "100%" }}>
            </Col>
            <Col xl="3" style={{ width: "100%" }}>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Write Reason to Reject"
                onChange={(event) => { onChangeTextHandler(event, "team") }}
              />

              <NewReleasesIcon style={{ color: "red", marginLeft: "25%", cursor: "pointer" }} onClick={() => { grantPermission(false, value) }} />

            </Col>
            <Col xl="2" style={{ width: "100%" }}>

              <DoneOutlineIcon style={{ color: "green", marginLeft: "16%", cursor: "pointer" }} onClick={() => { grantPermission(true, value) }} />

            </Col>
          </Row>)}

          {(role == "Approved_admin" && value["Approved_Product"] && value["Approved_Complaince"] && value["Approved_Datascience"] && value['Approved_admin']) && (<Row style={{ marginBottom: "20px" }}>
            <Col xl="6" style={{ width: "100%" }}>
            </Col>
            <Col xl="3" style={{ width: "100%" }}>
            </Col>
            <Col xl="3" style={{ width: "100%" }}>

              <Button variant="contained" style={{ backgroundColor: "#23284a", color: "#fff" }} >
                Process Init
              </Button>

            </Col>
          </Row>)}
        </Col>

      </Row>)}
      <ToastContainer />
    </>
  );
}
