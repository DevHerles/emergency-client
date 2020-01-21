import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import { Row } from "reactstrap";
import axios from "axios";

import { Colxx } from "../../../components/common/CustomBootstrap";
import SalesChartCard from "../../../containers/dashboards/SalesChartCard";

class DashboardAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datas: []
    };
  }
  componentDidMount() {
    axios.get('https://disamu.minsa.gob.pe/api')
      .then(response => {
        this.setState({ labels: response.data.labels, datas: response.data.datas })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <SalesChartCard labels={this.state.labels} datas={this.state.datas}/>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DashboardAnalytics);