import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "@ant-design/pro-layout/dist/layout.less";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "@icon-park/react/styles/index.css";
const { homepage } = require("../package.json");

ReactDOM.render(
  <Provider store={store}>
    <HashRouter >
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
