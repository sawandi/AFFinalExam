import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";
import axios from "axios";

//define variables
const initialState = {
  id: "",
  name: "",
  nameError: "",
  price: "",
  priceError: "",
  contactDetails: "",
  contactDetailsError: "",
  description: "",
  descriptionError: "",
  duration: "",
  durationError: "",
  category: "",
  categoryError: "",
  confirmButton: "ADD",
  //categories: [],
  events: [],
  selectedFile: "",
  image: "",
};

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/event";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ events: json }));
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //update event details
  onChange(id) {
    const url = "/event/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const ev = json.filter((ev) => ev._id === id);
        this.setState({
          name: ev[0]["name"],
          category: ev[0]["category"],
          duration: ev[0]["duration"],
          price:ev[0]["price"],
          contactDetails: ev[0]["contactDetails"],     
          description: ev[0]["description"],  
          id: ev[0]["_id"],
          image: ev[0]["image"],
        });
      });
    this.setState({ confirmButton: "EDIT" });
  }

  //to clear input fields
  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  //for delete events
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .event()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Event Planning systems"
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

  //for upload a hall image
  onChangeHandler = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
        loaded: 0,
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios.post("/event/upload", data, {}).then((res) => {
          this.setState({ image: res.data.filename });
        });
      }
    );
  };

  //function for handle submit button in form
  handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state);
    const isValid = this.validate();
    console.log(isValid)
    //if (isValid) {
      console.log(this.state);
      api
        .event()
        .fetchAll()
        .then((res) => {
          const ev = res.data.filter(
            (event) =>
              event.name === this.state.name 
          );
          if (ev.length > 0 || this.state.id !== "") {
            if (ev.length === 0) {
              api
                .event()
                .update(this.state.id, this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Event Planning systems"
                        content="Event Details Edit successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
            } else if ((this.state.id !== "" && ev[0].name === this.state.name ) || ev[0].length === 0){
                api
                  .event()
                  .update(this.state.id, this.state)
                  .then((res) => {
                    ButterToast.raise({
                      content: (
                        <Cinnamon.Crisp
                          title="Event Planning systems"
                          content="Event Details Edit successfully"
                          scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                          icon={<AssignmentTurnedIn />}
                        />
                      ),
                    });
                    this.setState(initialState);
                    this.componentDidMount();
                  });
            }else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Online Store"
                    content="This Product Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<ExtensionSharp />}
                  />
                ),
              });
            }
          }else {
              console.log(this.state)
              api
                .event()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Event Planning systems"
                        content="Event Details Added successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
          }
        });
    //}
  };

  //validate form input fields
  validate = () => {
    let nameError = "";
    let priceError = "";
    let contactDetailsError = "";
    let descriptionError = "";
    let categoryError = "";
    let durationError = "";
    let imageError = "";

    if (!this.state.name) {
      nameError = "Event Name Cannot Be Blank";
    }
  
    if (!this.state.description) {
      descriptionError = "Event Description Cannot Be Blank";
    }

    if (!this.state.duration) {
      durationError = "Event Duration Cannot Be Blank";
    }

    if (!this.state.image) {
      imageError = "Image Required!";
    }

    if (!this.state.price) {
      priceError = "Price Cannot Be Blank";
    }else if (isNaN(this.state.price)) {
      priceError = "Use only digits!";
    }

    if (!this.state.contactDetails) {
      contactDetailsError = "Contact Details Cannot Be Blank";
    } else if (this.state.contactDetails.length !== 10) {
      contactDetailsError = "Invalid Phone Number!";
    } else if (isNaN(this.state.contactDetails)) {
      contactDetailsError = "Use only digits!";
    }

    if (!this.state.category) {
      categoryError = "seelect category!";
    }

    if (
      nameError ||
      priceError ||
      contactDetailsError ||
      descriptionError ||
      durationError ||
      categoryError ||
      imageError
    ) {
      console.log("Wrong")
      this.setState({
        nameError,
        contactDetailsError,
        descriptionError,
        durationError,
        priceError ,
        categoryError,
        imageError,
      });
      console.log(this.state)
      return false;
    } else {
      console.log("Come")
      this.setState({
        nameError,
        priceError ,
        contactDetailsError,
        descriptionError,
        durationError,
        categoryError,
        imageError,
      });
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { events } = this.state;
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card" style={{backgroundColor: '#82E0AA'}}>
                <div className="card-header text-white bg-success mb-3" style={{maxWidth: '58rem'}}><h2>Event</h2></div>
                <div className="card-body" >
                  {/*form for add event details*/}
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Event Name
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.nameError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Event Category
                      </label>
                      <div className="col-md-6">
                        <select
                          className="form-control"
                          name="category"
                          onChange={this.handleChange}
                          value={this.state.category}
                        >
                          <option >~select~</option>
                          <option >Indoor </option>
                          <option >Outdoor </option>
                        </select>
                        <div style={{ color: "red" }}>
                          {this.state.categoryError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Event Duration
                      </label>
                      <div className="col-md-6">
                        <select
                          className="form-control"
                          name="duration"
                          onChange={this.handleChange}
                          value={this.state.duration}
                        >
                          <option >~select~</option>
                          <option >Day </option>
                          <option >Night </option>
                        </select>
                        <div style={{ color: "red" }}>
                          {this.state.durationError}
                        </div>
                      </div>
                    </div>


                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Charge
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.priceError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Contact Details(Phone no)
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="contactDetails"
                          value={this.state.contactDetails}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.contactDetailsError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Event Description
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.descriptionError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Hall Type
                      </label>
                      <div className="col-md-6">
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          onChange={this.onChangeHandler}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.imageError}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 offset-md-4">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={this.state.confirmButton}
                      />
                      <input
                        type="button"
                        className="btn btn-danger"
                        value="Clear"
                        onClick={() => this.onClear()}
                      />
                    </div>
                  </form>

                  <br></br>

                  <div className="x_scroll">
                    {/*table for display event details*/}
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="tableTh">name</th>
                          <th className="tableTh">Category</th> 
                          <th className="tableTh">Duration</th> 
                          <th className="tableTh">Charge</th>
                          <th className="tableTh">Contact Details</th>
                          <th className="tableTh">Event Description</th>
                          <th className="tableTh">Hall Type</th>
                          <th className="tableTh">Edit</th>
                          <th className="tableTh">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr>
                            <td className="tableTh">{event.name}</td>
                            <td className="tableTh">{event.category}</td>  
                            <td className="tableTh">{event.duration}</td>  
                            <td className="tableTh">{event.price}</td>
                            <td className="tableTh">{event.contactDetails}</td>
                            <td className="tableTh">{event.description}</td>
                               
                            <td className="tableTh">
                              <img
                                width="100px"
                                alt=""
                                src={"/" + event.image}
                                className="img-thumbnail"
                              />
                            </td>
                            <td className="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onChange(event._id)}
                                className="btn btn-success"
                              >
                                Edit
                              </button>
                            </td>
                            <td className="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onDelete(event._id)}
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
        </div>
      );
    }
  }
}

export default Event;
