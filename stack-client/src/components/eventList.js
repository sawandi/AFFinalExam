import React from "react";
import "../App.css";

const initialState = {
  events: [],
};

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const eurl = "/event";
    fetch(eurl)
      .then((response) => response.json())
      .then((json) => this.setState({ events: json }));
  }

  moreInfo(id) {
    localStorage.setItem("itemId", id);
    window.location.href = "/oneEvent";
  }

  render() {
    const { events } = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card" style={{backgroundColor: '#82E0AA'}}>
              <div className="card-header text-white bg-success mb-3" style={{maxWidth: '75rem'}}><h2>Event Details</h2></div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    {events.map((event) => (
                      // table for display event details
                      <tr key={event._id}>
                        <td className="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + event.image}
                            className="img-thumbnail"
                          />
                        </td>
                        <td className="tableTh" width="60%">
                          <h3>{event.name }</h3>
                          <h4>{event.category + " " + event.duration + "  parties" }</h4>
                          <br />
                          <h5>
                            Hall Arrangement Charges : {event.price + "/="} 
                          </h5>
                          {/* <h5>
                            Contact For Hall Arrangement : {event.contactDetails}
                          </h5> */}
                        </td>
                        <td className="tableTh" width="15%">
                          <button
                            type="button"
                            onClick={() => this.moreInfo(event._id)}
                            className="btn btn-success"
                          >
                            More Info
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

export default EventList;
