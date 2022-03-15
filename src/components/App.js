import React from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css"
// components
import Layout from "./Layout/Layout";
// import Home from "./Home/Home"

// pages
// import Error from "../pages/error";
import Login from "../pages/login";
// import Teacher from "./Teacher/Teacher"
// import Layout from "./Layout/Layout"
// context
import { useUserState } from "../context/UserContext";
// import Institution from "./Institutution/Institution";
// import Otp from "./Otp/Otp";
// import Verification from "./Home/Auth/Verification/Verfication"


export default function App() {

  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        {/* <Route path="/teacher" component={Teacher}/>
        <Route path="/institution" component={Institution}/> */}
        <Route path="/admin" component={Layout}/>
        {/* <Route path="/otp" component={Otp}/>
        <Route path="/verify" component={Verification}/> */}
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        {/* <Route path="/" component={Home}/> */}
        {/* <Route path="/" component={Home}/> */}
        {/* <Route component={Error} /> */}
        <Redirect to="/login"/>
      </Switch>
    </HashRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          true ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
