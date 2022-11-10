import React, { useState } from "react";
import UserPreference from "../Home/UserPreference/UserPreference"

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
} from "@material-ui/icons";

import CloseIcon from "@material-ui/icons/Close"
import classNames from "classnames";
import { useHistory } from "react-router-dom";


// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";

const messages = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  },
  {
    id: 1,
    variant: "success",
    name: "Lloyd Brown",
    message: "Check out my new Dashboard",
    time: "9:18",
  },
  {
    id: 2,
    variant: "primary",
    name: "Mark Winstein",
    message: "I want rearrange the appointment",
    time: "9:15",
  },
  {
    id: 3,
    variant: "secondary",
    name: "Liana Dutti",
    message: "Good news from sale department",
    time: "9:09",
  },
];

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();
  const history = useHistory();
  const landing = () => {
    history.push("/homepage")
  };
  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  var [isUserPref, setIsUserPref] = useState(false);
  let [passwordResetSuccessFull, setPasswordResetSuccessFull] = useState(false)

  return (
    <>
      {
        isUserPref ?
          <UserPreference
            setPasswordResetSuccessFull={setPasswordResetSuccessFull}
            isResetPassword={true}
            setUserPreference={setIsUserPref} /> : null
      }
      {
        passwordResetSuccessFull ?
          <div style={{
            position: "fixed",
            backgroundColor: "rgb(0, 0, 0, 0.5)",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "0",
            left: "0",
            zIndex: "1000"
            /* display: none; */
          }}>
            <div style={{ height: "50%", maxHeight: "15rem", width: "80%", maxWidth: "30rem", position: "relative", background: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <i
                onClick={() => setPasswordResetSuccessFull(false)}
                style={{ position: "absolute", top: "3%", right: "3%", cursor: "pointer" }}
                className="fa fa-close" />
              <i
                style={{ fontSize: "40px", color: "green" }}
                className="fa fa-check-circle" />
              <p style={{ marginTop: "1rem" }}>
                Password Has been Reset Successfully!
              </p>
            </div>
          </div> : null
      }
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              <CloseIcon
                style={{ color: "#23284a" }}
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                style={{ color: "#23284a" }}
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>
          <div >
            <img style={{ height: "6rem", width: "13rem", marginLeft: "-13px", position: "absolute", "margin-top": "-3rem" }} src={require("../../assets/Sigma-red-Final-logo.png")} />
          </div>
          <div className={classes.grow} />
          {/* <Button  href="#" variant={"outlined"} color={"secondary"} style={{marginRight: 24,fontSize:"10px"}}>
          Unlock full version
          <br />
          contact@sigmared.ai
        </Button> */}
          <div
            className={classNames(classes.search, {
              [classes.searchFocused]: isSearchOpen,
            })}
          >
            <div
              className={classNames(classes.searchIcon, {
                [classes.searchIconOpened]: isSearchOpen,
              })}
              onClick={() => setSearchOpen(!isSearchOpen)}
            >
              <SearchIcon classes={{ root: classes.headerIcon }}
                style={{ display: "none" }}
              />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>


          <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={e => {
              setNotificationsMenu(e.currentTarget);
              setIsNotificationsUnread(false);
            }}
            className={classes.headerMenuButton}
          >
            <Badge
              badgeContent={isNotificationsUnread ? notifications.length : null}
              color="warning"
              style={{ display: "none" }}
            >
              <NotificationsIcon classes={{ root: classes.headerIcon }} />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={e => {
              setMailMenu(e.currentTarget);
              setIsMailsUnread(false);
            }}
            className={classes.headerMenuButton}
          >
            <Badge
              badgeContent={isMailsUnread ? messages.length : null}
              color="secondary"
              style={{ display: "none" }}

            >
              <MailIcon classes={{ root: classes.headerIcon }} />
            </Badge>
          </IconButton>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={e => setProfileMenu(e.currentTarget)}
          >
            <AccountIcon style={{ color: "#23284a" }} className="iconCol" classes={{ root: classes.headerIcon }} />
          </IconButton>

          {/* <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide,
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu> */}

          {/* <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu> */}

          <Menu
            id="profile-menu"
            open={Boolean(profileMenu)}
            anchorEl={profileMenu}
            onClose={() => setProfileMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
          >
            {/* <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              John Smith
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://flatlogic.com"
            >
              Flalogic.com
            </Typography>
          </div> */}
            {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem> */}
            {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem> */}
            {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem> */}
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={() => signOut(userDispatch, props.history)}
              >
                Sign Out
              </Typography>
            </div>
            {
              localStorage.getItem('type') !== "admin" ?
                <div className={classes.profileMenuUser}>
                  <Typography
                    className={classes.profileMenuLink}
                    color="primary"
                    onClick={() => {
                      setProfileMenu(false)
                      setIsUserPref(true)
                    }}
                  >
                    Reset Password
                  </Typography>
                </div> : null
            }
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
