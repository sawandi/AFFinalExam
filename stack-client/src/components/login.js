import React from "react";
import "../App.css";
import { Base64 } from "js-base64";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

//defines variables
const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
};

class Login extends React.Component {
  state = initialState;

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      api
        .registerUser()
        .fetchAll()
        .then((res) => {
          const user = res.data.filter(
            (user) => user.email === this.state.email
          );
          if (user.length === 1) {
            console.log(user.length)
            if (user[0]["password"] === Base64.encode(this.state.password)) {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Event Planning systems"
                    content="Wellcome Back!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                  />
                ),
              });
              this.setState(initialState);
              localStorage.setItem("userName", user[0]["fname"]);
              localStorage.setItem("userEmail", user[0]["email"]);
              localStorage.setItem("userType", user[0]["type"]);
              window.location.href = "/";
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Password Error"
                    content="Wrong Password!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<ExtensionSharp />}
                  />
                ),
              });
            }
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Email Error"
                  content="This Email No Register!"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<ExtensionSharp />}
                />
              ),
            });
          }
        });
    }
  };

  /*---------------validating the login edtails-------------------------*/
  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.password) {
      passwordError = "Password Cannot Be Blank";
    }

    if (!this.state.email) {
      emailError = "Email Cannot Be Blank";
    } else if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".")
    ) {
      emailError = "Invalid Email!";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{backgroundColor: '#82E0AA'}}>
              <div className="card-header text-white bg-success mb-3" style={{maxWidth: '58rem'}}><h2>Login</h2></div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label
                      for="email_address"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Email
                    </label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <div style={{ color: "red" }}>
                        {this.state.emailError}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      for="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Password
                    </label>
                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <div style={{ color: "red" }}>
                        {this.state.passwordError}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
