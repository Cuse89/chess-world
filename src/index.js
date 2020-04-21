import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/index.js";
import * as serviceWorker from "./serviceWorker";
import "./styles/styles.scss";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();