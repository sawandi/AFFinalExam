import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

// define variables
const initialState = {
  events: [],
  confirmButton: "Send",
  eventId: "",
  eventName: "",
  eventPrice: "",
  eventImage: "",
  eventCategory: "",
  eventDescription: "",
  eventDuration: "",
  total: "",
  
};

class oneEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  componentDidMount() {
    const eurl = "/event";
    fetch(eurl)
      .then((response) => response.json())
      .then((json) => {
        const ev = json.filter(
          (ev) => ev._id === localStorage.getItem("itemId")
        );
        this.setState({
          events: ev,
          eventId: ev[0]["_id"],
          eventName: ev[0]["name"],
          eventCategory: ev[0]["category"],
          eventDuration: ev[0]["duration"],
          eventDescription: ev[0]["description"],
          eventPrice: ev[0]["price"],
          eventImage: ev[0]["image"],
        });
      });
  }

  bookingHotel() {
    console.log("Book")
    if (localStorage.getItem("userEmail")) {
      console.log("Book if")
          const total = this.state.eventPrice;
          this.setState(
            {
              total: total,
              email: localStorage.getItem("userEmail"),
            },
            () => {
              console.log(total)
              api
                .myBooking()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Event Planning systems"
                        content=" Book Successful!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.componentDidMount();
                  this.setState(initialState);
                });
            }
          );
    } else {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Event Planning systems"
            content="Please Login to the system!"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<ExtensionSharp />}
          />
        ),
      });
    }
  }

 
  editButton(id, msg, email) {
    if (localStorage.getItem("userEmail")) {
      if (email === localStorage.getItem("userEmail")) {
        return [
          <button
            type="button"
            onClick={() => this.onChange(id, msg)}
            className="btn btn-success"
          >
            EDIT
          </button>,
          <button
            type="button"
            onClick={() => this.onDelete(id)}
            className="btn btn-danger"
          >
            Delete
          </button>,
        ];
      }
    }
  }

  //Event booking form
  render() {
    const { events } = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card"  style={{backgroundColor: '#82E0AA'}}>
              <div className="card-body" >
                <table className="table">
                  <tbody>
                    {events.map((event) => (
                      <tr>
                        <td className="tableTh" width="35%">
                          <img
                            width="400px"
                            alt=""
                            src={"/" + event.image}
                            className="img-thumbnail"
                          />
                        </td>
                        <td className="tableTh" width="65%">
                          <h3><b>{event.name }</b></h3>
                          <h4>{event.category + " " + event.duration + "  parties" }</h4>
                          <h5>{event.description}</h5>
                          <h6> Contact For Hall Arrangement : {event.contactDetails}</h6>                        
                          <h6>
                            Charge For Hall Arrangement : {event.price}
                          </h6>
                          <br />
                          <br />

                          <button
                            type="button"
                            onClick={() => this.bookingHotel()}
                            className="btn btn-success"
                          >
                            Book Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default oneEvent;
