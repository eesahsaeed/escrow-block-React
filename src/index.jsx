
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {HashRouter} from "react-router-dom";
import {getUrl} from "./helper/url-helper";
import authHelper from "./helper/auth-helper";

import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
