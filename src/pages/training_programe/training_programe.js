// import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react"
import * as constants from "../../components/Home/constants/constants"
// import 'date-fns';
import axios from "axios"
// import DateFnsUtils from '@date-io/date-fns';
// components
import PageTitle from "../../components/PageTitle";
import styles from "./training_programme.css"
import Widget from "../../components/Widget";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Select, Input, FormControl, InputLabel } from "@material-ui/core";

// import {
//   KeyboardDatePicker,
// } from '@material-ui/pickers'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from "./../../components/Wrappers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import { Places, MyMapComponent } from "../../components/Map/Map"
// import Box from '@material-ui/material/Box';
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

    setEmail({
      val: "",
      isValid: false,
      touched: false
    })
    setPassword({
      val: "",
      isValid: false,
      touched: false
    })
    setUsername({
      val: "",
      isValid: false,
      touched: false
    })

  }

  const [isFormValid, setIsFromValid] = useState(false)

  const onLocationChange = (event) => {
    //console.log(event.target.value)
    setLocation({
      ...location,
      val: event.target.value
    })
  }

  const onMapClick = (event) => {
    let lat = event.latLng.lat()
    let long = event.latLng.lng()
    setLat(lat)
    setLong(long)
    setIsShowMarker(true)
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyAyQTUfdF5HDuUEXesoLLhIXxldK0YgREg`)
      .then(res => {
        if (res.status == 200) {
          let loc = res.data.plus_code.compound_code.split(" ")
          loc = loc.slice(1, loc.length).join(" ")

          setLocation({
            ...location,
            val: loc
          })
        }
      })
      .catch(err => {
        //console.log(err)
      })
  }

  const handleMarkerClick = (event) => {
    //console.log(this.state.location)
  }


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


  const [title, setTitle] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [_userName, setUsername] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [_password, setPassword] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [_email, setEmail] = useState({
    val: "",
    isValid: false,
    touched: false
  })


  const [startDate, setStartDate] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [endDate, setEndDate] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [type, setType] = useState({
    val: "online",
    isValid: true,
    touched: true
  })

  const [category, setCategory] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [cost, setCost] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [duration, setduration] = useState({
    val: "",
    isValid: true,
    touched: true
  })
  const [amount, setAmount] = useState({
    val: "",
    isValid: false,
    touched: false
  })


  const [eventlink, setEventlink] = React.useState({
    val: "",
    isValid: false,
    touched: false
  });

  const [lat, setLat] = useState(10.850516)
  const [long, setLong] = useState(76.271080)
  const [centers, setCenters] = useState({
    val: "",
    isValid: false,
    touched: true
  })
  const [Description, setDescription] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [location, setLocation] = useState({
    val: "",
    isValid: true,
    touched: false
  })


  const [open, setOpen] = React.useState(false);
  const [State_, setState_] = React.useState([]);
  const [IP, setIp] = React.useState("");

  const [isdiable, setIsdiable] = React.useState(false);
  const [editEnable, seteditEnable] = React.useState(false);
  const [_id, set_ID] = useState('')
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  };


  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + `/ip.json`)
      .then(res => {
        setIp(res?.data?.IP)
        getUserList(res?.data?.IP);
      })
  }, []);

  const getUserList = (IP) => {
    // console.log(IP,"asada")
    axios.post(`${IP}/user/list`, {}, config)
      .then(res => {
        // console.log(res?.data,'resposnse data')

        setData(res?.data)
      })
  }


  const validate = (i, val) => {
    if (i === 0) {
      return true
    }
    return val ? true : false
  }

  const validateForm = () => {
    let partialIsValid = title.isValid && Description.isValid && selectedDate.isValid &&
      selectedEndDate.isValid && cost.isValid && selectedDueDate.isValid && programmeFor.isValid

    if (type.val == 'online') {
      partialIsValid = partialIsValid && eventlink.isValid
    }

    return true

  }

  const [openCenter, setOpenCenter] = React.useState(false);
  const [openenrolment, setopenenrolment] = React.useState(false);
  const [premium_member_discount, setpremium_member_discount] = React.useState("");
  const [minimum_participate_discount, setminimum_participate_discount] = React.useState("");
  const [programmeFor, setProgrammeFor] = React.useState({
    val: "",
    isValid: false,
  });


  const [centerlist, setCenterlist] = React.useState([]);


  const onChangeTextHandler = (event, i) => {
    let value = event.target.value
    if (i === 'username') {
      setUsername({
        ..._userName,
        val: value,
        isValid: value.length > 0
      })
    }
    if (i === 'email') {
      setEmail({
        ..._email,
        val: value,
        isValid: value.length > 0
      })
    }

    if (i === 'password') {
      setPassword({
        ..._password,
        val: value,
        isValid: value.length > 0
      })
    }

    if (i === "team") {
setTeam(value)
    }

    if (i === "role") {
      setRole(value)
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
    let startDate = new Date(tableMeta.rowData[1])
    let endDate = new Date(tableMeta.rowData[2])
    let dudate = new Date(tableMeta.rowData[7])
    // console.log(tableMeta)

    // if(typeof tableMeta.rowData[13]=== 'object') {
    //   setsuggestedList(tableMeta.rowData[13])
    // }
    setTitle({
      ...title,
      val: tableMeta.rowData[0],
      isValid: true
    })

    setProgrammeFor({
      ...programmeFor,
      val: data[tableMeta.rowIndex].programmeFor,
      isValid: true
    })

    setSelectedDate({
      ...selectedDate,
      val: `${startDate.getFullYear()}-${startDate.getMonth() > 9 ? startDate.getMonth() : "0" + startDate.getMonth()}-${startDate.getDate() > 9 ? startDate.getDate() : "0" + startDate.getDate()}`,
      isValid: true
    })
    setSelectedEndDate({
      ...selectedEndDate,
      val: `${endDate.getFullYear()}-${endDate.getMonth() > 9 ? endDate.getMonth() : "0" + endDate.getMonth()}-${endDate.getDate() > 9 ? endDate.getDate() : "0" + endDate.getDate()}`,
      isValid: true
    })

    setSelectedDueDate({
      ...selectedDueDate,
      val: `${dudate.getFullYear()}-${dudate.getMonth() > 9 ? dudate.getMonth() : "0" + dudate.getMonth()}-${dudate.getDate() > 9 ? dudate.getDate() : "0" + dudate.getDate()}`,
      isValid: true
    })

    setminimum_participate_discount({
      ...minimum_participate_discount,
      val: tableMeta.rowData[9],
      isValid: validate(0, tableMeta.rowData[9])
    })
    setpremium_member_discount({
      ...premium_member_discount,
      val: tableMeta.rowData[8],
      isValid: validate(0, tableMeta.rowData[8])
    })

    setEventlink({
      ...eventlink,
      val: tableMeta.rowData[10],
      isValid: validate(0, tableMeta.rowData[10])
    })


    setDescription({
      ...Description,
      val: tableMeta.rowData[6],
      isValid: validate(0, tableMeta.rowData[6])
    })
    setType({
      ...type,
      val: tableMeta.rowData[3],
      isValid: validate(0, tableMeta.rowData[3])
    })
    setCost({
      ...cost,
      val: data[tableMeta.rowIndex].programme_amount,
      isValid: validate(0, tableMeta.rowData[4])
    })

    setCategory({
      ...category,
      val: data[tableMeta.rowIndex].category,
      isValid: validate(0, data[tableMeta.rowIndex].category)
    })
    setAmount({
      ...amount,
      val: data[tableMeta.rowIndex].amount,
      isValid: true
    })
    setLocation({
      ...location,
      val: tableMeta.rowData[5],
      isValid: validate(0, tableMeta.rowData[5])
    })
    // setWebsite(tableMeta.rowData[7])
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
  const columns = [

    {
      name: "full_name",
      label: "User name",
      options: {
        filter: true,
      }
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <p>
              {value ? value.split('T')[0] : ''}
            </p>
          )
        }
      }
    },
    // {
    //   label: "Password",
    //   name: "password",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <p>
    //           {value ? value.split('T')[0] : ''}
    //         </p>
    //       )
    //     }
    //   }
    // },

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
              {/* <Button
                style={{ margin: "0.5rem" }}
                onClick={() => { view(tableMeta) }}
                color="success"
                size="small"
                className="px-2"
                variant="contained"
              >
                View
                </Button> */}

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
  const [team, setTeam] = React.useState("");
  const [role, setRole] = React.useState("");


  const [enrolmentlist, setenrolmentlist] = React.useState([]);

  const [isDropDown, setIsDropDown] = useState(true)

  // const view_Enrollment = (tableMeta) => {
  //   axios.get("https://campusfield.in/api/training/get_programme/" + tableMeta.rowData[6])
  //     .then(res => {
  //       if (res.data) {
  //         setenrolmentlist(res.data.output[0])
  //         setopenenrolment(true);
  //       }
  //     })
  // }

  const delete_institution = (tableMeta) => {

    // console.log(tableMeta.rowData[1],IP)
    axios.post(IP + "/user/delete", {
      email: tableMeta.rowData[1]
    }, config)
      .then(res => {
        getUserList(IP)
      })


    // http://15.223.130.155:8500/user/delete

    //   axios.post(`${IP}/user/list`,{},config)
    //   console.log(tableMeta)
    // axios.post(IP + "/user/delete" + tableMeta.rowData[11])
    //   .then(res => {
    //     getUserList(IP)

    //   })
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
    // //console.log(removeDuplicate(tempList), 'tempList')

    setsuggestedList(removeDuplicate(tempList))
    setOpenCenter(params)
    setIsFromValid(validateForm())
  }

  const onAddNewInstitution = () => {
    //console.log('called')
    // //console.log(name,Website,mobile,email,City,Description,State,District,Pincode,'sdas');
    if (true) {
      axios.post(`${IP}/user/signup`,
        {
          "full_name": _userName.val,
          "email": _email.val,
          "password": _password.val
        }, config)
        .then((res) => {
          getUserList(IP)

          clearFields()
          // setsuggestedList([])
          handleOpen(false)
          // getDetails();
        }).catch((err) => {
          //console.log(err)
        })
    }
  }

  if (type.val == 'offline' && !eventlink.isValid) {
    setEventlink({
      ...eventlink,
      touched: true,
      isValid: true
    })
    setIsFromValid(validateForm())

  }

  // if(type.val == 'online' && eventlink.val.trim() == "" && eventlink.isValid) {
  //   setEventlink({
  //     ...eventlink,
  //     touched: eventlink.touched,
  //     isValid: false
  //   })
  //   setIsFromValid(validateForm())

  // }


  if (type.val == 'offline' && suggestedList.length > 0 && !isFormValid) {
    setIsFromValid(validateForm())

  }

  if (type.val == 'offline' && suggestedList.length == 0 && isFormValid) {
    setIsFromValid(validateForm())

  }

  // if(type.val == 'offline' && eventlink.val.trim() == "" && eventlink.isValid) {
  //   validateForm()
  // }

  return (
    <>


      <PageTitle title="Add user" button="Add new" add_new={handleOpen} />
      <Button
        onClick={() => { handleOpen(true) }}
      >asasaasa</Button>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="User's"
            data={data}
            columns={columns}
            options={{
              filterType: "checkbox",
            }
            }
          />
        </Grid>
      </Grid>

      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          style={{ zIndex: 1000 }}
          onClose={handleClose}
        >
          <div style={formContainer}>
            {
              open && isAutoComplete ?
                <form
                  className={styles['centre']}
                  style={form}
                  noValidate
                  autoComplete="off">
                  <h2 style={{ fontWeight: 300, marginBottom: "1rem" }}>Add user</h2>

                  <div style={inputContainer}>
                    <TextField id="standard-basic"
                      error={_userName.touched && !_userName.isValid}
                      helperText={(_userName.touched && !_userName.isValid) ? "User Name" : ''}
                      maxLength={177}
                      onBlur={() => { setUsername({ ..._userName, touched: true }); setIsFromValid(validateForm()) }}
                      disabled={isdiable} value={_userName.val} required label="User Name" style={{ width: '100%' }}
                      onChange={(event) => { onChangeTextHandler(event, 'username') }} />

                    {/* <TextField id="standard-basic"
                      error={title.touched && !title.isValid}
                      helperText={(title.touched && !title.isValid) ? "Email" : ''}
                      maxLength={177}
                      onBlur={() => { setTitle({ ...title, touched: true }); setIsFromValid(validateForm()) }}
                      disabled={isdiable} value={title.val} required label="Title" style={{ width: '40%' }}
                      onChange={(event) => { onChangeTextHandler(event, 'title') }} /> */}



                  </div>
                  <div style={inputContainer}>

                    <TextField id="standard-basic"
                      error={_email.touched && !_email.isValid}
                      helperText={(_email.touched && !_email.isValid) ? "Email" : ''}
                      maxLength={177}
                      onBlur={() => { setEmail({ ..._email, touched: true }); setIsFromValid(validateForm()) }}
                      disabled={isdiable} value={_email.val} required label="Email" style={{ width: '40%' }}
                      onChange={(event) => { onChangeTextHandler(event, 'email') }} />

                    <TextField id="standard-basic"
                      error={_password.touched && !_password.isValid}
                      helperText={(_password.touched && !_password.isValid) ? "Password" : ''}
                      maxLength={177}
                      onBlur={() => { setPassword({ ..._password, touched: true }); setIsFromValid(validateForm()) }}
                      disabled={isdiable} value={_password.val} required label="Password" style={{ width: '40%' }}
                      onChange={(event) => { onChangeTextHandler(event, 'password') }} />

                  </div>

                  <div style={inputContainer}>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }} style={{ backgroundColor: "#fff", flex: (props.width) ? props.width[1] : '0.4' }}>
                      <InputLabel id="demo-simple-select-standard-label">Team</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={team}
                        onChange={(event) => { onChangeTextHandler(event, "team") }}
                        label="Age"
                      >
                        <MenuItem value="Data_science">Data science</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                        <MenuItem value="complaince">Complaince</MenuItem>


                        {/* {props.data.map((algo) => (
              <MenuItem value={algo}>{algo}</MenuItem>
            ))} */}
                      </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }} style={{ backgroundColor: "#fff", flex: (props.width) ? props.width[1] : '0.4' }}>
                      <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={role}
                        onChange={(event) => { onChangeTextHandler(event, "role") }}
                        label="Age"
                      >
                          <MenuItem value="Lead">Data science Lead</MenuItem>
                        <MenuItem value="developer">Jr Developer</MenuItem>
                        <MenuItem value="Manager">Product Manager</MenuItem>
                        <MenuItem value="Complaince">Complaince Lead</MenuItem>


                        {/* {props.data.map((algo) => (
              <MenuItem value={algo}>{algo}</MenuItem>
            ))} */}
                      </Select>
                    </FormControl>

                  </div>


                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    {
                      !isdiable ?
                        <button
                          disabled={!isFormValid}
                          onClick={onAddNewInstitution}
                          style={buttonStyle}>
                          Save
                        </button> :
                        <button

                          onClick={editEnable_}
                          style={buttonStyle}>
                          Edit
                        </button>
                    }
                    <button
                      onClick={handleClose}
                      style={{ ...buttonStyle, background: "#FF5C93" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form> : open && !isAutoComplete ?
                  <div style={{ height: '80%', width: '80%', maxHeight: "800px", maxWidth: '1000px', background: "white", padding: "1rem", overflow: "scroll" }}>
                    <MyMapComponent
                      isMarkerShown={isShowMarker}
                      lat={lat}
                      long={long}
                      onMapClick={onMapClick}
                      onMarkerClick={handleMarkerClick}
                    />
                    <div
                      onClick={() => { setIsAutocomplete(true) }}
                      style={{ margin: "auto", height: '40px', width: "70px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", backgroundColor: "blue", color: "white", marginTop: "2rem", borderRadius: "2px" }}>
                      Ok
                    </div>
                  </div> : null
            }

          </div>
        </Modal>


        {/* enrolment list */}

      </div>
    </>
  );
}
