import React, { Component } from "react";
import { connect } from 'react-redux';

import { appSocketHost } from "./constants/defaultValues";
import {
  wsConnect,
} from './redux/webSocket/actions'

class WebSocketConnection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      const { dispatch, host } = this.props;
      dispatch(wsConnect(host));
  }
  
  render() {
    return <div>ZZZZ{this.props.children}</div>;
  }
}

export default connect()(WebSocketConnection);