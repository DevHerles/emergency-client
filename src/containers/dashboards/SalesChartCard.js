import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import {LineChart} from "../../components/charts"

import { lineChartData } from "../../data/charts";

const SalesChartCard = ({labels, datas}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.total_by_unities" />
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData(labels, datas)} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
