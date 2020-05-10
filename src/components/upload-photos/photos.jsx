import React from "react";
import { Base64 } from "js-base64";
import axios from "axios";
import cookie from "react-cookies";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  getBase64 = (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.setState({
        imgUpload: reader.result,
      });
      try {
        var workspaceId = cookie.load("details").workspaceId;

        axios
          .post("http://localhost:5000/upload", {
            img: reader.result,
            workspaceId,
            description: "Big room",
          })
          .then((response) => {
            console.log(response);
          });
      } catch (error) {}
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  render() {
    return (
      <div>
        <input
          type="file"
          className="input-file"
          name="imgUpload"
          accept=".png"
          onChange={this.getBase64}
        />
      </div>
    );
  }
}

export default Photos;
