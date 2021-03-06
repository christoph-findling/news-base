import React, { Component } from "react";

import Header from "./header";
import Footer from "./footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="main_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
