import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";
import { getEmergencyListWithFilter } from "../../redux/actions";
class EmergencyApplicationMenu extends Component {
  constructor(props) {
    super();
  }

  addFilter = (column, value) => {
    this.props.getEmergencyListWithFilter(column, value);
  };

  render() {
    const {
      emergencyItems,
      filter,
      allEmergencyItems,
      loading,
      labels,
      categories
    } = this.props.emergencyApp;

    //console.log(this.props.emergencyApp);

    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="emergency.status" />
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink to="#" onClick={e => this.addFilter("", "")}>
                  <i className="simple-icon-reload" />
                  <IntlMessages id="emergency.all-emergencies" />
                  <span className="float-right">
                    {loading && allEmergencyItems.length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "PENDING"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "PENDING")}
                >
                  <i className="simple-icon-refresh" />
                  <IntlMessages id="emergency.pending-emergencies" />
                  <span className="float-right">
                    {loading &&
                      allEmergencyItems.length > 0 ? (allEmergencyItems.filter(x => x.status === "PENDING").length) : ""}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "COMPLETED"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "COMPLETED")}
                >
                  <i className="simple-icon-check" />
                  <IntlMessages id="emergency.attended-emergencies" />
                  <span className="float-right">
                    {loading &&
                      allEmergencyItems.length > 0 ? (allEmergencyItems.filter(x => x.status === "COMPLETED").length) : ""}
                  </span>
                </NavLink>
              </NavItem>
            </ul>
            <p className="text-muted text-small">
              <IntlMessages id="emergency.categories" />
            </p>
            <ul className="list-unstyled mb-5">
              {categories.map((c, index) => {
                return (
                  <NavItem key={index}>
                    <div onClick={e => this.addFilter("category", c)}>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultChecked={
                            filter &&
                            filter.column === "category" &&
                            filter.value === c
                          }
                        />
                        <label className="custom-control-label">{c}</label>
                      </div>
                    </div>
                  </NavItem>
                );
              })}
            </ul>
            <p className="text-muted text-small">
              <IntlMessages id="emergency.labels" />
            </p>
            <div>
              {labels.map((l, index) => {
                return (
                  <p className="d-sm-inline-block mb-1" key={index}>
                    <NavLink
                      to="#"
                      onClick={e => this.addFilter("label", l.label)}
                    >
                      <Badge
                        className="mb-1"
                        color={`${
                          filter &&
                          filter.column === "label" &&
                          filter.value === l.label
                            ? l.color
                            : "outline-" + l.color
                        }`}
                        pill
                      >
                        {l.label}
                      </Badge>
                    </NavLink>
                  </p>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}

const mapStateToProps = ({ emergencyApp }) => {
  return {
    emergencyApp
  };
};
export default connect(
  mapStateToProps,
  {
    getEmergencyListWithFilter
  }
)(EmergencyApplicationMenu);