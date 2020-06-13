import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

class BookingEventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingEvents: [],
    };
  }

  componentDidMount() {
    const url = "/myEvent";
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
            bookingEvents: json.filter(
            (myEvent) => myEvent.email !== localStorage.getItem("userEmail")
          ),
        })
      );
  }

  /* --------------deleting a record in this list----------------- */
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .myBooking()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Event Plan Management System"
                content="Delete Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  render() {
    if (localStorage.getItem("userEmail")) {
      const { bookingEvents } = this.state;
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card"  style={{backgroundColor: '#82E0AA'}}>
                <div className="card-header text-white bg-success mb-3" style={{maxWidth: '75rem'}}><h4>Booking Events</h4></div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="tableTh">Booked Event Name</th>
                        <th className="tableTh">Booked Hall Type</th>
                        <th className="tableTh">User Email</th>
                        <th className="tableTh">Category / Duration</th>
                        <th className="tableTh">Description</th>
                        <th className="tableTh">Charge</th>
                        <th className="tableTh">Remove Booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingEvents.map((myEvent) => (
                        <tr>
                          <td className="tableTh">{myEvent.eventName}</td>
                          <td className="tableTh">
                            <img
                                width="200px"
                                alt=""
                                src={"/" + myEvent.eventImage}
                                className="img-thumbnail"
                            />
                          </td>
                          <td className="tableTh">{myEvent.email}</td>
                          <td className="tableTh">{myEvent.eventCategory+"/"+myEvent.eventDuration}</td>
                          <td className="tableTh">{myEvent.eventDescription}</td>
                          <td className="tableTh">{myEvent.total}</td>
                          <td className="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onDelete(myEvent._id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BookingEventList;
