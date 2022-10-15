import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {HashRouter} from "react-router-dom";
import {getUrl} from "./helper/url-helper";

import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

if (!sessionStorage.getItem("fetch")){
  sessionStorage.setItem("fetch", JSON.stringify({fetch: true}));
  fetch(`${getUrl()}/users/demo`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }).then(rs => {
    let d = rs.json();
  });
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);