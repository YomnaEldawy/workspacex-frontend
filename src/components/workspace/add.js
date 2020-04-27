import React from "react";
import loginImg from "../../login.svg";
import { Alert } from "react-bootstrap";
import Map from "./map";

const axios = require("axios");
export default class Add_workspace extends React.Component {
  state = {
    loginDetails: "",
    message: "",
  };
  addWorkspaceHandler = (e) => {
    e.preventDefault();
    console.log(this.props.location.state);
    this.setState({ loginDetails: this.props.location.state });
    axios({
      method: "POST",
      url: "http://localhost:5000/workspace/new",
      data: { ...this.state, loginDetails: this.props.location.state },
    }).then((response) => {
      if (response.data.affectedRows) {
        this.setState({
          message: (
            <Alert style={{ margin: "0.8rem" }} variant="success">
              {"Added Successfully"}
            </Alert>
          ),
        });
        this.props.history.push({
          pathname: "/login/",
        });
      } else {
        this.setState({
          message: (
            <Alert style={{ margin: "0.8rem" }} variant="danger">
              {"Error adding workspace"}
            </Alert>
          ),
        });
      }
    });
  };

  changeStateHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="add workspace">
        <div className="container">
          <div>{this.state.message}</div>
          <div className="base-container" ref={this.props.containerRef}>
            {<Map />}
            <div className="header">New Workspace</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} />
              </div>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="ws_name">Workspace name</label>
                  <input
                    onChange={this.changeStateHandler}
                    type="text"
                    name="ws_name"
                    placeholder="workspace name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    onChange={this.changeStateHandler}
                    type="text"
                    name="city"
                    placeholder="city"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Phone</label>
                  <input
                    onChange={this.changeStateHandler}
                    type="text"
                    name="phone"
                    placeholder="phone"
                  />
                </div>
                <div className="form-group">
                  <label>Street Name</label>

                  <input
                    onChange={this.changeStateHandler}
                    type="text"
                    name="streetName"
                    placeholder="street name"
                  />
                </div>
                <div className="form-group">
                  <label>Street Number</label>
                  <input
                    onChange={this.changeStateHandler}
                    type="text"
                    name="streetNumber"
                    placeholder="street number"
                  />
                </div>
              </div>
            </div>
            <div className="footer">
              <button
                onClick={this.addWorkspaceHandler}
                type="button"
                className="btn"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
