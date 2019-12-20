import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import callsApp from "./calls";

const Emergency = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/calls`} />
      <Route path={`${match.url}/calls`} component={callsApp} />
      <Route path={`${match.url}/regulations`} component={callsApp} />
      <Route path={`${match.url}/dispatches`} component={callsApp} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Emergency;
