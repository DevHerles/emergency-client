import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import ErrorBoundary from "./Error";
//import WebSocketConnection from "./WebSocketConnection";

//import { appSocketHost } from "./constants/defaultValues";

import App from "./App";
ReactDOM.render(
  // <ErrorBoundary>    
    <Provider store={configureStore()}>
      {/* <WebSocketConnection host={ appSocketHost }> */}
        <App />
      {/* </WebSocketConnection> */}
    </Provider>
  // </ErrorBoundary>
  ,document.getElementById("root")
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
