import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Dashboard as Dashboard,
  Person as Person,
  Group as Group,
  Payment as Payment,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  Security as Security,
  Help as Help,
  VpnLock as VpnLock,
  ShowChart as ShowChart,
  ScatterPlot as ScatterPlot,
  Dvr as Dvr
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import CloseIcon from "@material-ui/icons/Close"


// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 11, type: "title", label: "Dashboard" },
  { id: 10, type: "divider" },

  { id: 0, label: "Model Inventory", link: "/app/dashboard", icon: <Dashboard /> },

  // { id: 18, label: "Payment", link: "/app/sitemanagement/payments", icon: <Payment /> },

  




  // { id: 1111, type: "title", label: "User Management" },
  // { id: 102323, type: "divider" },
  // { id: 183232, label: "Users", link: "/app/users", icon: <Payment /> },
  // { id: 183234, label: "Project", link: "/app/inventory", icon: <HomeIcon /> },
  // { id: 183238, label: "Compliance", link: "/app/compliance2", icon: <FolderShared /> },

  { id: 1111, type: "title", label: "Modules" },
  { id: 102323, type: "divider" },
  { id: 183235, label: "ML Fairness", link: "", icon: <Security /> ,
  children: [
    { label: "Summary", link: "/app/biasSummary" },
    { label: "Bias", link: "/app/fairness" },
    { label: "Proxy Bias", link: "/app/aiproxy" },
    { label: "Intersectional", link: "/app/aievalation" },
    
  ],
},
  { id: 213, label: "ML Explainability", link: "/app/Explainability", icon: <ScatterPlot /> },
  { id: 1123, label: "ML Monitoring", link: "", icon: <ShowChart />,
  children: [
    { label: "Monitoring", link: "/app/Monitor" },
    { label: "Alert", link: "/app/Mlalert" }
  ],
},
  { id: 12121, label: "AI Compliance", link: "/app/compliance", icon: <VpnLock /> },
  { id: 212123, label: "DEI", link: "/app/DEI", icon: <Dvr /> }




];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
    style={{minHeight: "100vh"}}

      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <CloseIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList} 
      
    style={{"background-color": "#23284a"}}
    >
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
