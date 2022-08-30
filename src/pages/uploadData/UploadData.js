// import React from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Fade,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react"
import * as constants from "../../components/Home/constants/constants"
import { Card, CardHeader, Row, Col } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

// components
import PageTitle from "../../components/PageTitle";
// import Widget from "../../components/Widget";
import Modal from '@material-ui/core/Modal';
import { Places, MyMapComponent } from "../../components/Map/Map"
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

// import {Button  } from "./../../components/Wrappers";

// import Table from "../dashboard/components/Table/Table";

import "./upload.css"
import Plot from "react-plotly.js";


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

export default function UploadData(props) {



  const classes = useStyles();
  const [data, setData] = useState(null)
  const [row, setRow] = useState([])
  const [_result, setResult_] = useState([])


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
    backgroundColor: "rgb(0, 0, 0, 0.5)"
  }

  const inputContainer = {
    display: "flex",
    justifyContent: "space-between",
    height: "4rem",
    marginBottom: "2rem",
    width: "100%"
  }

  const [keyIngredient, setKeyIngredient] = useState(null)
  const [location, setLocation] = useState("null")
  const [catagory, setCatagory] = useState(null)





  const [file, setFile] = useState();

  const [_id, set_ID] = useState('')

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {

  }, []);
  const config = { displayModeBar: false };

  const validate = (i, val) => {
    if (1 == 0) {
      return true
    }

    if (i === 2) {
      return /^\d{10}$/.test(val)
    }

    if (i === 4) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
    }


    return val ? true : false
  }



  // const [open, setOpen] = React.useState(false);



  const view = (tableMeta) => {
  };

  const AAA = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
  ]

  const handleChange3 = (key, value) => {
    if (key == "Catagory") {
      setCatagory(value)
    } else if (key == "KeyIngredient") {
      setKeyIngredient(value)
    }

  }

  const onFileChange = (event) => {
    console.log(event.target.files[0])
    const formData = new FormData();
    // setFile(event.target.files[0])
    formData.append("file", event.target.files[0]);

    axios.post("http://13.127.201.98:8000/get_prediction_v3?user_id=asas%40gmail.com", formData)
      .then((res) => {
        console.log(res?.data, "esdsd")
        setData(res?.data)
        if (res?.data?.image_id) {
          axios.post('http://13.127.201.98:8000/get_image/?image_id=' + res?.data?.image_id, {})
            .then((res) => {
              console.log(typeof res?.data, "laslasdkalhdlkhal")
              setFile(res?.data?.image)
            }).catch((err) => {
              console.log(err)
            })
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const submitDetails = () =>{
    axios.post(`http://13.127.201.98:8000/post_food_details/?user_id=asas@gmail.com&location=temp&key_ingredients=${keyIngredient}&serving_category=${catagory}`,{})
    .then((res) => {
      console.log(res, "esdsd")
    }).catch((err) => {
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
  }

  const convertImage = (image_id) => {
    alert()
    console.log(image_id, "image_idimage_idimage_idimage_id")
    return 'http://13.127.201.98:8000/get_image/?image_id=' + image_id
  }

  return (
    <div className="centre">
      {/* <PageTitle title="Upload Image"  />
       */}
      <h5>Upload Image</h5>
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sm={12} style={{ borderRightColor: "black", borderBottomColor: "black", borderRightStyle: "solid", paddingBottom: "10%", marginBottom: "50px" }}>

          <div style={{ marginTop: "4vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={require("./img_525430.png")} alt="logo" style={{ width: "20%", height: "12vh" }} />

          </div>
          <div style={{ marginLeft: "21%", marginTop: "4vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <input type="file" id="myfile" name="myfile" accept="image/*" onChange={($event) => { onFileChange($event) }} />
          </div>

        </Grid>


        <Grid item xs={12} md={6} sm={12}  >
          <h5 style={{ marginTop: "-9%" }}>Image Preview</h5>
          <div >

            {data && data?.data &&
              <div>
                {/* <Grid item  xs={12} md={12} sm={12}> */}
                <img src={'data:image/jpeg;base64,' + file} alt="logo" style={{ width: "100%", height: "35vh" }} />
                {/* </Grid> */}
                <br />
                <br />

                {/* <table >
              <tr>
                <th>Class Name</th>
                <th>Probabilities</th>
              </tr>
              {data['data'].map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val?.classname}</td>
                    <td>{val?.probabilities}</td>
                  </tr>
                )
              })}
            </table> */}

                <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: 0, margin: 0 }}>
                  <Plot
                    data={data?.data}
                    layout={data?.layout}
                    args={data?.args}
                    config={config}
                    useResizeHandler
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                <br />
                <br />
                <br />

                <h5 style={{ marginTop: "-9%" }}>Food Details</h5>
                <br />
             
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: 0, margin: 0 }}>

                  <select
                    href="#pablo"
                    class="form-control"
                    style={{ color: "black" }}
                    onChange={(e) => handleChange3("Catagory", e.target.value)}
                    size="sm"
                  >

                    
                    {/* {results.length && results.map((result) => (
                            <option key={result.id} value={result.name}> {result.name} </option>
                          ))} */}
                    <option value="Standard"> Select Category </option>
                    <option value="Esmall"> Extra Small </option>
                    <option value="small"> Small </option>
                    <option value="medium"> Medium </option>
                    <option value="large"> Large </option>
                    <option value="Elarge"> Extra Large </option>

                  </select>
                <br />

                 
                  <TextField
                    id=""
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={keyIngredient}
                    onChange={e => handleChange3("KeyIngredient", e.target.value)}
                    margin="normal"
                    placeholder="Description"
                    fullWidth
                  />
                  <br />
                  <br />
                  <br />

                  <Button
                    disabled={
                      keyIngredient == null && catagory == null
                    }
                    onClick={submitDetails}
                    variant="contained"
                    color="primary"
                    size="large"
                    
                    style={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </div>
            }

            {data == null &&
              <div style={{ marginTop: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={require("./preview-icon.png")} alt="logo" style={{ width: "30%", height: "15vh" }} />
              </div>
            }
          </div>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <div className={classes.formDividerContainer}>
        <div className={classes.formDivider} />
        {/* <Typography className={classes.formDividerWord}>or</Typography> */}
        <div className={classes.formDivider} />
      </div>
      <ToastContainer />

    </div>
  );
}
