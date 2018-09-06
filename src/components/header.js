import React, { Component } from "react";

import Nav from "../widgets/nav";
import NavSideDrawer from "../widgets/navSideDrawer";
import Backdrop from "../widgets/Backdrop/backdrop";

class Header extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  render() {
    let backdrop = false;
    if (this.state.showSideDrawer === true) {
      backdrop = true;
    }
    return (
      <div>
        <Nav sideDrawerClickHandler={this.sideDrawerToggleClickHandler} />
        <NavSideDrawer
          visible={this.state.showSideDrawer}
          sideDrawerClickHandler={this.sideDrawerToggleClickHandler}
        />
        {backdrop ? <Backdrop clicked={this.backdropClickHandler} /> : ""}
      </div>
    );
  }
}

export default Header;
