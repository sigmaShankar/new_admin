import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"


/**
 * Main source of the page
 * Import redux and app sources
 
 */


ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline/>
        <Provider store={configureStore()}>
          <App/>
        </Provider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
