import React, { Component, Fragment } from "react";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput
} from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import {
  getEmergencyList,
  getEmergencyListWithOrder,
  getEmergencyListSearch,
  selectedEmergencyItemsChange,
} from "../../../redux/actions";
import EmergencyListItem from "../../../components/emergencies/EmergencyListItem";
import AddNewEmergencyModal from "../../../containers/emergencies/AddNewEmergencyModal";
//import { AddMessage } from "../../../containers/emergencies/AddMessage"

import EmergencyApplicationMenu from "../../../containers/emergencies/EmergencyApplicationMenu";

import TaskList from '../../../components/socket.io/TaskList';
import Buttons from '../../../components/socket.io/Buttons';

class EmergencyApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      lastChecked: null,

      displayOptionsIsOpen: false
    };
  }

  componentDidMount() {
    this.props.getEmergencyList();
  }

  toggleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  changeOrderBy = column => {
    this.props.getEmergencyListWithOrder(column);
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.getEmergencyListSearch(e.target.value);
    }
  };

  handleCheckChange = (event, id) => {
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = Object.assign([], this.props.emergencyApp.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.props.selectedEmergencyItemsChange(selectedItems);

    if (event.shiftKey) {
      var items = this.props.emergencyApp.emergencyItems;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedEmergencyItemsChange(selectedItems);
    }
    return;
  };

  handleChangeSelectAll = () => {
    if (this.props.emergencyApp.loading) {
      if (
        this.props.emergencyApp.selectedItems.length >=
        this.props.emergencyApp.emergencyItems.length
      ) {
        this.props.selectedEmergencyItemsChange([]);
      } else {
        this.props.selectedEmergencyItemsChange(
          this.props.emergencyApp.emergencyItems.map(x => x.id)
        );
      }
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  render() {
    const {
      searchKeyword,
      loading,
      orderColumn,
      orderColumns,
      selectedItems
    } = this.props.emergencyApp;

    const emergencyItems = this.props.emergencyApp;
    const allEmergencyItems = this.props.emergencyApp.allEmergencyItems;

    const { messages } = this.props.intl;

    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.emergency" />
              </h1>
              {loading && (
                <div className="float-sm-right">
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button"
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="emergency.add-new" />
                  </Button>{" "}
                  <ButtonDropdown
                    isOpen={this.state.dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >
                    <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                      <CustomInput
                        className="custom-checkbox mb-0 d-inline-block"
                        type="checkbox"
                        id="checkAll"
                        checked={
                          selectedItems.length >= allEmergencyItems.length
                        }
                        onClick={() => this.handleChangeSelectAll()}
                        onChange={() => this.handleChangeSelectAll()}
                        label={
                          <span
                            className={`custom-control-label ${
                              selectedItems.length > 0 &&
                              selectedItems.length < emergencyItems.length
                                ? "indeterminate"
                                : ""
                            }`}
                          />
                        }
                      />
                    </div>
                    <DropdownToggle
                      caret
                      color="primary"
                      className="dropdown-toggle-split pl-2 pr-2"
                    />
                    <DropdownMenu right>
                      <DropdownItem>
                        <IntlMessages id="emergency.action" />
                      </DropdownItem>
                      <DropdownItem>
                        <IntlMessages id="emergency.another-action" />
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              )}
              <Breadcrumb match={this.props.match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                id="displayOptions"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                <IntlMessages id="emergency.display-options" />{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="emergency.orderby" />
                      {orderColumn ? orderColumn.label : ""}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder={messages["menu.search"]}
                      defaultValue={searchKeyword}
                      onKeyPress={e => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {loading ? (
                allEmergencyItems.length > 0 ? (allEmergencyItems.map((item, index) => (
                  <EmergencyListItem
                    key={`emergency_item_${index}`}
                    item={item}
                    handleCheckChange={this.handleCheckChange}
                    isSelected={
                      loading ? selectedItems.includes(item.id) : false
                    }
                  />
                )) ) : "xxx"
              ) : (
                <div className="loading" />
              )}
            </Row>
          </Colxx>
        </Row>
        {loading && <EmergencyApplicationMenu />}
        <AddNewEmergencyModal toggleModal={this.toggleModal} modalOpen={modalOpen} />
      </Fragment>
    );
  }
}
const mapStateToProps = ({ emergencyApp }) => {
  return {
    emergencyApp
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    {
      getEmergencyList,
      getEmergencyListWithOrder,
      getEmergencyListSearch,
      selectedEmergencyItemsChange
    }
  )(EmergencyApp)
);