import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Grid, Select, MenuItem, Input, FormControl, InputLabel } from "@material-ui/core";
import Widget from "../../components/Widget";
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// styles
import useStyles from "./styles";
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

// components
import { Typography } from "../Wrappers";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
export default function PageTitle(props) {
  var classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(props?.tabSelection);

  const [age, setAge] = React.useState(props?.initialData);
  const click = () => {
    props.add_new(true);
  }
  // useEffect(()=>{
  //   setValue(props?.tabSelection)
  // },[])
  const handleChange = (event) => {
    setAge(event.target.value);
    props.selectValue(event.target.value);

  };
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
    props.tabValue("", newValue);

  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  return (
    // <div className={classes.pageTitleContainer}>
    <Grid spacing={12} md={12} sm={12} xs={12} style={{ padding: "3vh", "background-color": "#fff", "box-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px", display: "flex", "flex-direction": "row" }}>


      {props?.title && (<div style={{ flex: (props.width) ? props.width[0] : '0.5' }}>
        <b>
          <h6>
            {props.title}    {props.title2}
          </h6>
        </b>
      
        {!props?.leftTitle && (<span>
              &nbsp; {(sessionStorage.getItem('projectName'))?sessionStorage.getItem('projectName'):"* Please select Project"}
              <br />
               &nbsp; {(sessionStorage.getItem('modelName'))?sessionStorage.getItem('modelName'):"* Please select Model"}
            </span>)}
      </div>)}

      {props?.data && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: "#fff", flex: (props.width) ? props.width[1] : '0.5' }}>
          <InputLabel id="demo-simple-select-standard-label">{props?.dropDownName}</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            {props.data.map((algo) => (
              <MenuItem value={algo}>{algo}</MenuItem>
            ))}
          </Select>
        </FormControl>)
      }

      {props?.leftTitle && (
        <div style={{ flex: (props.width) ? props.width[0] : '0.5' ,display:"flex",flexDirection:"row-reverse"}}>
          <b>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('projectName'))?sessionStorage.getItem('projectName'):"* Please select Project"}
              <br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(sessionStorage.getItem('modelName'))?sessionStorage.getItem('modelName'):"* Please select Model"}
            </span>
          </b>
        </div>)
      }

      {props?.tabs2 && (
        <>
          <Tabs
            value={value}
            onChange={handleChange2}
            style={{ backgroundColor: "#fff", flex: (props.width) ? props.width[2] : '0.5', marginLeft: "20px" }}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            {props.tabs2.map((algo, index) => (
              <Tab label={algo} {...a11yProps(index)} />

            ))}
            {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </>
      )
      }
      {/* <Widget
      style={{"flex-direction":"inherit!important"}}
        bodyClass={classes.mainChartBody}
        header={
          <div >
            <b>
              <span

              >
                {props.title} \ {props.title2}

              </span>

            </b>
          </div>
        }
      >
        {props.data && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{ marginLeft: "4%", position: "fixed", width: "15%",backgroundColor:"#fff" }}>
            <InputLabel id="demo-simple-select-standard-label">Mitigation Algorithm</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              {props.data.length && props.data.map((algo) => (
                <MenuItem value={algo}>{algo}</MenuItem>

              ))}

            </Select>
          </FormControl>)
        }

        {props.button && (

          <Button
            classes={{ root: classes.button }}
            style={{ float: "right", marginTop: "-1vh" }}
            variant="contained"
            disabled={props.disabled === undefined ? false : props.disabled}
            size="large"
            color="secondary"
            onClick={click}
          >
            {props.button}
          </Button>
        )}

      </Widget> */}

    </Grid>
  );
}
