import React from "react";
import { Base64 } from "js-base64";
import axios from "axios";
import cookie from "react-cookies";
import { Form, Button, Container, Alert } from "react-bootstrap";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: "",
      fileName: "Choose a file",
      caption: "",
    };
  }

  getBase64 = (e) => {
    var file = e.target.files[0];
    console.log(file.name);
    this.setState({ pictures: file, fileName: file.name, successAlert: "" });
  };

  submitHandler = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(this.state.pictures);
    reader.onload = () => {
      this.setState({
        imgUpload: reader.result,
      });
      try {
        var workspaceId = cookie.load("details").workspaceId;

        axios
          .post("http://localhost:5000/images/upload", {
            img: reader.result,
            workspaceId,
            description: this.state.caption,
          })
          .then((response) => {
            console.log(response);
            if (response.data.success) {
              window.setTimeout(() => {
                this.setState({ successAlert: "" });
              }, 2000);
              this.setState({
                successAlert: (
                  <Alert style={{ margin: "0.8rem" }} variant="success">
                    Photo Uploaded successfully
                  </Alert>
                ),
              });
            }
          });
      } catch (error) {}
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  captionChangeHandler = (e) => {
    this.setState({ caption: e.target.value });
  };

  render() {
    return (
      <div>
        <Container>
          <Form>
            <Form.Group controlId="file">
              <Form.File
                id="custom-file"
                onChange={this.getBase64}
                label={this.state.fileName}
                custom
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                placeholder="Write a caption"
                value={this.state.caption}
                onChange={this.captionChangeHandler}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.submitHandler}>
              Upload
            </Button>
          </Form>
        </Container>
        <div>{this.state.successAlert}</div>
      </div>
    );
  }
}

export default Photos;
