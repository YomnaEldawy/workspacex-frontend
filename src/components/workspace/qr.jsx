import React, { Component } from "react";
var QRCode = require("qrcode.react");

class QR extends Component {
  state = { id: 1, name: "workspace" };
  render() {
    return <QRCode value={this.props.qrVal} />;
  }
}

export default QR;
