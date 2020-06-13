import React from "react";
import "../App.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/*******for navigation bar********/
class Navigation extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /******According to the user type display the their features*********/
  render() {
    //admin's system features
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
          <Navbar className="navbar navbar-light" variant="light"  style={{backgroundColor: '#82E0AA'}}>
            <Navbar.Brand href="/"><b>Event Plan Management System</b></Navbar.Brand>

            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/usersList">Users |</Nav.Link>
                <Nav.Link href="/event">Add Event Details |</Nav.Link>
                <Nav.Link href="/">View Event Details |</Nav.Link>
                <Nav.Link href="/bookingList">View Bookings |</Nav.Link>
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
       } else {
        //normal user's features
        return (
          <Navbar className="navbar navbar-light" variant="light"  style={{backgroundColor: '#82E0AA'}}>
            <Navbar.Brand href="/"><b>Event Plan Management System</b></Navbar.Brand>

            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/">View Event Details |</Nav.Link>
                {/* <Nav.Link href="/cart">Book For Hall Arrangement |</Nav.Link> */}
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    } else {
      return (
          <Navbar className="navbar navbar-light" variant="light"  style={{backgroundColor: '#82E0AA'}}> 
            <Navbar.Brand><b>Event Plan Management System</b></Navbar.Brand>

            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/login">Login |</Nav.Link>
                <Nav.Link href="/register">Register </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> 
    
      );
    }
  }
}

export default Navigation;
