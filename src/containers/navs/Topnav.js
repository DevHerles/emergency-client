import React, { Component } from "react";

class TopNav extends Component {
  render() {
    return (
      <nav className="navbar fixed-top">
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
      </nav>
    );
  }
}

export default TopNav;