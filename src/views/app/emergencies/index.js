import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import dataListEmergencies from './emergency-list';
import detailsEmergencies from './emergency-details';

const Emergency = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/calls`} />
            <Route path={`${match.url}/calls`} component={dataListEmergencies} />
            <Route path={`${match.url}/calls/:id`} component={detailsEmergencies} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Emergency;