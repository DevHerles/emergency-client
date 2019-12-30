import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

import { addEmergencyItem } from "../../redux/actions";

class AddNewEmergencyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason_call: "",
      address: "",
      phone_number: "",
      requested_by: ""
    };
  }

  addNetItem = () => {
    const newItem = {
      reason_call: this.state.reason_call,
      address: this.state.address,
      phone_number: this.state.phone_number,
      requested_by: this.state.requested_by
    };
    this.props.addEmergencyItem(newItem);
    this.props.toggleModal();
    this.setState({
      reason_call: "",
      address: "",
      phone_number: "",
      requested_by: ""
    });
  };

  render() {
    const { labels, categories } = this.props.emergencyApp;
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="emergency.add-new-title" />
        </ModalHeader>
        <ModalBody>
        <Label className="mt-4">
            <IntlMessages id="emergency.operator.phone_number" />
          </Label>
          <Input
            type="text"
            defaultValue={this.state.phone_number}
            onChange={event => {
              this.setState({ phone_number: event.target.value });
            }}
          />
          <Label className="mt-4">
            <IntlMessages id="emergency.operator.reason_call" />
          </Label>
          <Input
            type="text"
            defaultValue={this.state.reason_call}
            onChange={event => {
              this.setState({ reason_call: event.target.value });
            }}
          />
          <Label className="mt-4">
            <IntlMessages id="emergency.operator.address" />
          </Label>
          <Input
            type="textarea"
            defaultValue={this.state.address}
            onChange={event => {
              this.setState({ address: event.target.value });
            }}
          />
          <Label className="mt-4">
            <IntlMessages id="emergency.operator.requested_by" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={categories.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.requested_by}
            onChange={val => {
              this.setState({ requested_by: val });
            }}
          />
          <Label className="mt-4">
            <IntlMessages id="emergency.label" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={labels.map((x, i) => {
              return {
                label: x.label,
                value: x.label,
                key: i,
                color: x.color
              };
            })}
            value={this.state.label}
            onChange={val => {
              this.setState({ label: val });
            }}
          />

          <Label className="mt-4">
            <IntlMessages id="emergency.status" />
          </Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="COMPLETED"
            checked={this.state.status === "COMPLETED"}
            onChange={event => {
              this.setState({
                status: event.target.value === "on" ? "COMPLETED" : "PENDING"
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio2"
            label="PENDING"
            defaultChecked={this.state.status === "PENDING"}
            onChange={event => {
              this.setState({
                status: event.target.value !== "on" ? "COMPLETED" : "PENDING"
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="emergency.cancel" />
          </Button>
          <Button color="primary" onClick={() => this.addNetItem()}>
            <IntlMessages id="emergency.submit" />
          </Button>{" "}
        </ModalFooter>
      </Modal>
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
    addEmergencyItem
  }
)(AddNewEmergencyModal);
