import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon, Notifications as NotificationsIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  var { product, total, color, registrations, graphData, value_d, bounce, date, total_risk, High_Risks, Medium_Risks } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("daily");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">{product}</Typography>
          {/* <NotificationsIcon /> */}
          <Select
            value={value}
            onChange={e => setValue(e.target.value)}
            input={
              <Input
                disableUnderline
                classes={{ input: classes.selectInput }}
              />
            }
            className={classes.select}
          >
            <MenuItem value="daily">{date}</MenuItem>
          </Select>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer} >
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {value_d}%
          </Typography>
          {/* <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {theme.palette[color].main}%
          </Typography> */}
        </div>
        <ResponsiveContainer width="64%" maxWidth={120} height={100}>

          <BarChart data={graphData}>
            <Bar
              dataKey="value"
              fill={theme.palette[color].main}
              radius={10}
              barSize={10}
            />
            <YAxis axisLine={false} style={{
              fontSize: '7px',
              fontFamily: 'Times New Roman',
            }} />
            <XAxis dataKey="date" axisLine={false} style={{
              fontSize: '10px',
              fontFamily: 'Times New Roman',
            }} />
            <Tooltip isAnimationActive={true} style={{ opacity: 0 }} />

          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center" className={classes.gridCenter}>
            {/* <Typography variant="h6">{total_risk}</Typography> */}
            {/* <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            /> */}
          </Grid>
          {/* <Typography size="sm" color="text" colorBrightness="secondary">
            Total Risks
          </Typography> */}
        </div>
        <div className={classes.statCell}>
          <Grid container alignItems="center" className={classes.gridCenter}>
            {/* <Typography variant="h6">{High_Risks}</Typography> */}
            {/* <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            /> */}
          </Grid>
          {/* <Typography size="sm" color="text" colorBrightness="secondary">
            High Risks
          </Typography> */}
        </div>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center" className={classes.gridCenter}>
            {/* <Typography variant="h6">
              {Medium_Risks}
            </Typography> */}
            {/* <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            /> */}
          </Grid>
          {/* <Typography size="sm" color="text" colorBrightness="secondary">
            Medium Risks
          </Typography> */}
        </div>
      </div>
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
