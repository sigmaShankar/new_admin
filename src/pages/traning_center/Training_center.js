// import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react"
import * as constants from "../../components/Home/constants/constants"

import axios from "axios"

// components
import PageTitle from "../../components/PageTitle";
// import Widget from "../../components/Widget";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import {Places, MyMapComponent} from "../../components/Map/Map"
import {   makeStyles, ThemeProvider } from '@material-ui/core/styles';
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

let screenWidth = window.screen.width;
let modalWidth = 1250
let screenHeight = window.screen.height;
let modalHeight = 600


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

// const useStyles = makeStyles(theme => ({
//   custom: {
//     height: "10%",
//     width: "100%",
//     backgroundColor: "green"
//   },

//   paper: {
//     position: 'absolute',
//     width: modalWidth,
//     height: modalHeight,
//     top: 30,
//     left: (screenWidth / 2) - (modalWidth / 2),
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: 200,
//     },
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },

// }));

export default function Training_center(props) {

  const clearFields = () => {
    setName({
      val: '',
      isValid: false,
      touched: false
    })
    setMobile({
      val: '',
      isValid: false,
      touched: false
    })
    setWebsite({
      val: '',
      isValid: false,
      touched: false
    })
    setEmail({
      val: '',
      isValid: false,
      touched: false
    })
    setLocation({
      val: '',
      isValid: false,
      touched: false
    })
    setAbout({
      val: '',
      isValid: false,
      touched: false
    })
    set_ID({
      val: '',
      isValid: false,
      touched: false
    })
  }

  const classes = useStyles();
  const [data, setData] = useState([])
  const [row, setRow] = useState([])

  const form = {
    height: '80%',
    width: '80%',
    margin: 'auto',
    position: "relative",
    backgroundColor: "white",
    padding: "2rem",
    paddingTop: "1rem",
    overflow: "scroll"
  }

  const formContainer = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgb(0, 0, 0, 0.5)"
  }

  const inputContainer = {
    display: "flex",
    justifyContent: "space-between",
    height: "4rem",
    marginBottom: "2rem",
    width: "100%"
  }

  const [name, setName] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [mobile, setMobile] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [email, setEmail] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [Website, setWebsite] = useState({
    val: "",
    isValid: false,
    touched: false    
  })
  const [about, setAbout] = useState({
    val: "",
    isValid: false,
    touched: false
  })

  const [location, setLocation] = useState({
    val: "",
    isValid: false,
    touched: false
  })
  const [State_, setState_] = React.useState([]);
  const [District_, setDistrict_] = React.useState([]);
  const [isShowMarker, setIsShowMarker] = useState(false)
  const [isAutoComplete, setIsAutocomplete] = useState(true)
  const [lat, setLat] = useState(10.850516) 
  const [long, setLong] = useState(76.271080) 
  const [State, setState] = useState({
    val: "",
    isValid: true,
    touched: true
  })
  const [Pincode, setPincode] = useState({
    val: "",
    isValid: true,
    touched: true
  })
  const [open, setOpen] = React.useState(false);
  const [isdiable, setIsdiable] = React.useState(false);
  const [editEnable, seteditEnable] = React.useState(false);
  const [_id, set_ID] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    getDetails()
    getState();
    getDistrict()
  }, []);
  const getState = () => {
    axios.get("https://campusfield.in/api/site_management/state")
      .then(res => {
        if (res.data) {
          if (res.data.error_code) {
            setState_(res.data.output)
          }
        }
      })
  }
  const getDistrict = () => {
    axios.get("https://campusfield.in/api/site_management/district")
      .then(res => {
        if (res.data) {
          if (res.data.error_code) {
            setDistrict_(res.data.output)
          }
        }
      })
  }


  const getDetails = () => {
    axios.get("https://campusfield.in/api/training/training_center")
      .then(res => {
        if (res.data) {
          if (res.data.error_code) {
            // //console.log(res.data.output,'dat')
            //console.log(res.data.output)
            setData(res.data.output)
          }
        }
      })
  }

  const validate = (i, val) => {
    if(1 == 0) {
      return true
    }

    if(i === 2) {
      return /^\d{10}$/.test(val)
    }

    if(i === 4) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
    }
  

    return val ? true : false
  }

  const validateForm = () => {
    //console.log(name.isValid &&  location.isValid )
    return (name.isValid && location.isValid && about.val)
  }

  const setTouched = () =>{
    setName({ ...name, touched: true })
    setMobile({...mobile, touched: true })
    setWebsite({...Website, touched: true })
    setEmail({ ...email, touched: true })
    setLocation({ ...location, touched: true })
    setAbout({ ...about, touched: true })
  }
  // const [open, setOpen] = React.useState(false);

  const onChangeTextHandler = (event, i) => {
    let value = event.target.value

    let isValid = validateForm()

    if (i === 1) {
      setName({
        ...name,
        val: value,
        isValid: validate(i, value)
      })
    }

    if (i === 2) {
      setMobile({
        ...mobile,
        val: value,
        isValid: validate(i, value)
      })
    }
    if (i === 3) {
      setWebsite({
        ...Website,
        val: value,
        isValid: validate(i, value)
      })
    }

    if (i === 4) {
      setEmail({
        ...email,
        val: value,
        isValid: validate(i, value)
      })
    }

    if (i === 5) {
      setAbout({
        ...about,
        val: value,
        isValid: validate(i, value)
      })
    }

    if (i === 11) {
      setLocation({
        ...location,
        val: value,
        isValid: validate(i, value)
      })
    }
    setIsFormValid(validateForm())
  }

  const editEnable_ = () => {
    setIsdiable(false)
  }

  const handleOpen = (params) => {
    setOpen(params);
  }
  const view = (tableMeta) => {
    //console.log(tableMeta)
    seteditEnable(true)


    setName({
      ...name,
      val: tableMeta.rowData[0],
      isValid: validate(0, tableMeta.rowData[0])
    })
    setMobile({
      ...mobile,
      val: tableMeta.rowData[1],
      isValid: validate(0, tableMeta.rowData[1])
    })
    setEmail({
      ...email,
      val: tableMeta.rowData[2],
      isValid: validate(0, tableMeta.rowData[2])
    })
    setLocation({
      ...location,
      val: tableMeta.rowData[3],
      isValid: validate(0, tableMeta.rowData[3])
    })
    setWebsite({
      ...Website,
      val: tableMeta.rowData[5],
      isValid: validate(0, tableMeta.rowData[5])
    })
    setAbout({
      ...about,
      val: tableMeta.rowData[6],
      isValid: validate(0, tableMeta.rowData[6])
    })
    set_ID(tableMeta.rowData[6])


    setIsdiable(true)
    handleOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
    setIsdiable(false)
    seteditEnable(false)
    clearFields()
  };
  const columns = [
    {
      name: "name",
      label:"Name",
      options: {
        filter: true,
      }
    },
    {
      label: "Mobile Number",
      name: "Phone_Number",
      options: {
        filter: true,
        display:false,
      }
    },
    {
      name: "Email",
      options: {
        filter: false,
        display: false,
      }
    },

    {
      label: "Location",
      name: "location",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "_id",
      options: {
        filter: false,
        display: false,
        sort: false,
      }
    },
    {
      name: "website",
      labe:"Website",
      options: {
        filter: false,
        sort: false,
        display: false,
      }
    },
    {
      name: "About",
      labe:"about",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, meta, updateValue) => {
          if (!value.trim()) {
            value = ''
          } 

          if(value.length <= 3) {
            return value
          }
          
          return value.substr(0, 3) + '...'
        }
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
                style={{margin: "0.5rem"}}
                onClick={() => { view(tableMeta) }}
                color="success"
                size="small"
                className="px-2"
                variant="contained"
              >
                View
                </Button>
              {/* <Button
                  onClick={() => {Edit_teacher(tableMeta)}}
                  color="warning"
                  size="small"
                  className="px-2"
                  variant="contained"
                >
                  Edit
                </Button> */}
              <Button
                style={{margin: "0.5rem"}}

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
  ];

  const delete_institution = (tableMeta) => {
    axios.delete(constants.url + "/training/centers/" + tableMeta.rowData[4])
      .then(res => {
        if (res.data) {
          if (res.data.error_code) {
            getDetails()
          }
        }
      })
  }

  const onLocationChange = (event) => {
    //console.log(location.val)
    setLocation({
      ...location,
      isValid: true,
      val: event.target.value})
  }

  const onAddNewInstitution = () => {
    //console.log(location.val);
    setTouched(true)
    let isValid = validateForm()
    setTouched()
    if(isValid) {

      if (editEnable) {
        axios.post("https://campusfield.in/api/institution/edit/" + _id,
        {
          "name": name.val,
          "website": Website.val,
          "Phone_Number": mobile.val,
          "Email": email.val,
          "About": about.val,
          "location": location.val,
          "lat": lat,
          "longitude": long,
        })
          .then((res) => {
            clearFields()
  
            handleOpen(false)
            getDetails();
          }).catch((err) => {
            //console.log(err)
          })
      } else {
        //console.log(location)
        axios.post("https://campusfield.in/api/training/training_center",
          {
            "name": name.val,
            "website": "",
            "Phone_Number": "",
            "Email": "",
            "About": about.val,
            "location": location.val,
            "lat": lat,
            "longitude": long,
          })
          .then((res) => {
            clearFields()
            handleOpen(false)
            getDetails();
          }).catch((err) => {
            //console.log(err)
          })
      }
    }
  }

  const onMapClick  = (event) => {
    let lat =  event.latLng.lat()
    let long = event.latLng.lng()
    setLat(lat)
    setLong(long)
    setIsShowMarker(true)
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyAyQTUfdF5HDuUEXesoLLhIXxldK0YgREg&libraries=places`)
    .then(res => {
      if(res.status == 200) {
        let loc = res.data.results[0].formatted_address
        // loc = loc.slice(1, loc.length).join(" ")

        setLocation({
          ...location,
          val: loc,
          isValid: true
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


  return (
    <div className="centre">
      <PageTitle title="Training Centre" button="Add new" add_new={handleOpen} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Centre List"
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
          style={{zIndex: 1000}}
          onClose={handleClose}
        >
          <div style={formContainer}>
          {
              open && isAutoComplete ?
            <form style={form} noValidate autoComplete="off">
              <h2 style={{fontWeight: 300, marginbottom: "1rem"}}>Training Center</h2>
              <div style={inputContainer}>
                <TextField id="standard-basic"
                  error={name.touched && !name.isValid}
                  helperText={(name.touched && !name.isValid) ? "Enter the Name" : ''}
                  maxLength={177}
                  onBlur={() => { setName({ ...name, touched: true }) }}
                  disabled={isdiable} value={name.val} required label="Name" style={{ width: "45%" }}
                  onChange={(event) => { onChangeTextHandler(event, 1) }} />


<div style={{display: "flex", justifyContent: "space-around", width: '45%'}}>
                   <Places
                   disabled={isdiable}
                   style={{border: 'none', borderBottom: isdiable ? "0.5px solid lightgray" : "1px solid gray", height: '80%', width: '70%', color: isdiable ? "lightgray" : "gray"}}
                   onChange={(event) => {onLocationChange(event)}}
                   value={location.val}
                   onPlaceSelected={(place) => {
                     //console.log(place,'place')
                    setLat(place.geometry.location.lat()) 
                    setLong(place.geometry.location.lng()) 
                     setLocation({...location, val: place.formatted_address, isValid: true})}}
                   />
                  {!isdiable ? <span
                   onClick={() => {setIsAutocomplete(false)}} 
                   style={mapPin}>
                   <i class="fa fa-map-pin" aria-hidden="true"></i>
                  </span> : null}
                </div>



                {/* <TextField id="standard-basic" disabled = {isdiable} value={LastName} required label="Last Name" style={{ width: "45%" }} onChange={(event) => { onChangeTextHandler(event, 7) }} /> */}

                {/* <TextField
                  value={mobile.val}
                  disabled={isdiable}
                  
                  error={mobile.touched && !mobile.isValid}
                  helperText={(mobile.touched && !mobile.isValid) ? "Enter the mobile" : ''}
                  maxLength={12}
                  onBlur={() => { setMobile({ ...mobile, touched: true }) }}

                  style={{ width: "45%" }}
                  id="standard-basic"
                  label="Mobile Number"
                  onChange={(event) => { onChangeTextHandler(event, 2) }}
                /> */}
              </div>
              {/* <div style={inputContainer}> */}
                {/* <TextField value={Website.val} id="standard-basic"
                   disabled={isdiable} type="text" label="Website" style={{ width: "45%" }} onChange={(event) => { onChangeTextHandler(event, 3) }} /> */}
                {/* <TextField value={email} id="standard-basic" disabled = {editEnable}  required type="email" label="Email" style={{ width: "45%" }} onChange={(event) => { onChangeTextHandler(event, 4) }} /> */}

                {/* <TextField value={email.val} id="standard-basic"
                  error={email.touched && !email.isValid}
                  helperText={(email.touched && !email.isValid) ? "Invalid Emaiil" : ''}
                  maxLength={177}
                  onBlur={() => { setEmail({ ...email, touched: true }) }}
                  disabled={editEnable} type="email" label="Email" style={{ width: "45%" }} onChange={(event) => { onChangeTextHandler(event, 4) }} /> */}
                {/* <TextField value={password.val}
                  error={password.touched && !password.isValid}
                  helperText={(password.touched && !password.isValid) ? "Enter the password" : ''}
                  maxLength={177}
                  onBlur={() => { setPassword({ ...password, touched: true }) }}
                  id="standard-basic" disabled={editEnable} required type="password" label="Password" style={{ width: "45%" }} onChange={(event) => { onChangeTextHandler(event, 5) }} /> */}

              {/* </div> */}
              {/* <div style={inputContainer}>
              <div style={{display: "flex", justifyContent: "space-around", width: '50%'}}>
                   <Places
                   disabled={isdiable}
                   style={{border: 'none', borderBottom: isdiable ? "0.5px solid lightgray" : "1px solid gray", height: '80%', width: '70%', color: isdiable ? "lightgray" : "gray"}}
                   onChange={(event) => {onLocationChange(event)}}
                   value={location.val}
                   onPlaceSelected={(place) => {
                    setLat(place.geometry.location.lat()) 
                    setLong(place.geometry.location.lng()) 
                     setLocation({...location, val: place.formatted_address, isValid: true})}}
                   />
                  {!isdiable ? <span
                   onClick={() => {setIsAutocomplete(false)}} 
                   style={mapPin}>
                   <i class="fa fa-map-pin" aria-hidden="true"></i>
                  </span> : null}
                </div>
              </div> */}
              <div style={{ marginTop: 9 }}>
                <TextField
                  value={about.val}
                  disabled={isdiable}
                  style={{ width: "100%", height: "45%", boxShadow: '0 0 0 0', marginBottom: "2rem"}}
                  id="standard-multiline-basic"
                  label="About"
                  multiline
                  rows="4"
                  error={about.touched && !about.isValid}
                  helperText={(about.touched && !about.isValid) ? "Enter something about" : ''}
                  onBlur={() => { setAbout({ ...about, touched: true }) }}
                  onChange={(event) => { onChangeTextHandler(event, 5) }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {
                  !editEnable ?
                <button disabled={!validateForm()} onClick={onAddNewInstitution} style={buttonStyle}>
                  Save
              </button> : null
                }
                {/* {editEnable ? <Button  disabled={!validateForm()} variant="contained" color="primary" onClick={editEnable_} className={classes.margin}>
                  Edit
              </Button> : null} */}
                <Button
                  onClick={handleClose}
                  style={{...buttonStyle, background: "#FF5C93"}}
                >
                  Cancel
              </Button>
              </div>
            </form> :  open && !isAutoComplete ? 
          <div style={{height: '80%', width: '80%', maxHeight: "800px",maxWidth: '1000px', background: "white", padding: "1rem", overflow: "scroll"}}>
         <MyMapComponent
          isMarkerShown={isShowMarker}
          lat={lat}
          long={long}
          onMapClick={onMapClick}
          onMarkerClick={handleMarkerClick}
        />
        <div
        onClick={() => {setIsAutocomplete(true)}} 
        style={{margin: "auto", height: '40px', width: "70px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", backgroundColor: "blue", color: "white", marginTop: "2rem", borderRadius: "2px"}}>
          Ok
        </div> 
      </div>: null}
          </div>
        </Modal>
      </div>
    </div>
  );
}
