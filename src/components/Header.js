import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import socketIOClient from 'socket.io-client';

let socket;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:3001'
    };
    socket = socketIOClient(this.state.endpoint);
  }
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Place Order
              </NavLink>
            </li>
            <li>
              <NavLink to="/emergencies">Emergencies</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default { Header, socket };
