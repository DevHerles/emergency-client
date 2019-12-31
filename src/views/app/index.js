import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import dashboards from "./dashboards";
import emergencies from "./emergencies";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("themeColor") !== localStorage.getItem('customThemeColor')) {
      localStorage.setItem("themeColor", localStorage.getItem("customThemeColor"));
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  }
  render() {
    const { match } = this.props;
    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
          <Route path={`${match.url}/dashboards`} component={dashboards} />
          <Route path={`${match.url}/emergency`} component={emergencies} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
