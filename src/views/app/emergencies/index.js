import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import EmergencyApp from "./emergency";

const Emergency = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/calls`} />
      <Route path={`${match.url}/calls`} component={EmergencyApp} />
      <Route path={`${match.url}/regulations`} component={EmergencyApp} />
      <Route path={`${match.url}/dispatches`} component={EmergencyApp} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Emergency;
