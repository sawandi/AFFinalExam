import React from "react";
import "./App.css";
import Navigation from "./components/navigation";
import Login from "./components/login";
import Register from "./components/register";
import Event from "./components/event";
import Users from "./components/usersList";
import EventList from "./components/eventList";
import BookingEventList from "./components/bookingList";
import oneEvent from "./components/oneEvent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

class App extends React.Component {
  render() {
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
          <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route path="/usersList" component={Users}></Route>
                <Route path="/event" component={Event}></Route>
                <Route path="/eventList" component={EventList}></Route>
                <Route path="/oneEvent" component={oneEvent}></Route>
                <Route path="/bookingList" component={BookingEventList}></Route>
                <Route path="/" component={EventList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route path="/eventList" component={EventList}></Route>
                <Route path="/oneEvent" component={oneEvent}></Route>
                <Route path="/" component={EventList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      }
    } else {
      return (
        <Router>
          <div className="App">
            <Navigation />
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/eventList" component={EventList}></Route>
              <Route path="/oneEvent" component={oneEvent}></Route>
              <Route path="/" component={EventList}></Route>
            </Switch>
            <ButterToast
              position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
            />
          </div>
        </Router>
      );
    }
  }
}

export default App;
