import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  firstName,
  lastName,
  userId,
  requestId,
  requestTime,
  email
) {
  return {
    name: firstName + " " + lastName,
    userId,
    requestId,
    requestTime,
    email,
  };
}

const rows = [
  createData("Yomna", "Eldawy", 2, 2, "2020-04-25 12:10:29", "yomna@gmail.com"),
  createData("Salma", "Samir", 1, 1, "2020-04-25 12:10:29", "salma@gmail.com"),
];

class UsersTable extends Component {
  state = { classes: useStyles, rows };

  checkoutHandler = (checkInId) => {
    return () => {
      var curUsers = [...this.state.rows];
      var user = curUsers.find((element) => element.requestId == checkInId);
      var ind = curUsers.indexOf(user);
      curUsers.splice(ind, 1);
      this.setState({ rows: curUsers });
      console.log(user);
    };
  };

  constructor(props) {
    super(props);
    axios.get("http://localhost:5000/dashboard/requests/1").then((response) => {
      console.log(response);
      this.setState({
        rows: response.data.map((element) => {
          return createData(
            element.firstName,
            element.lastName,
            element.customerId,
            element.requestId,
            element.createdAt,
            element.email
          );
        }),
      });
    });
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table className={this.state.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Sent at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.requestId}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.requestTime}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={this.checkoutHandler(row.requestId)}
                  >
                    Confirm
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={this.checkoutHandler(row.requestId)}
                  >
                    Dismiss
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default UsersTable;
