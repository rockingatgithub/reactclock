// ===============================this is main app component===================================================

import React, { Component } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import ClockScreen from "./ClockScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoggedOut: true,
      userEmail: "",
      userPassword: "",
    };
  }

  emailHandler = (e) => {
    this.setState({
      userEmail: e.target.value,
    });
  };

  passwordHandler = (e) => {
    this.setState({
      userPassword: e.target.value,
    });
  };

  // ===================================to sign in user==============================================================

  signInHandler = () => {
    let self = this;
    const { userEmail, userPassword } = this.state;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, userPassword)
          .then(function () {
            self.setState({
              isLoggedIn: true,
              isLoggedOut: false,
            });
            console.log("signed in");
          })
          .catch(function (error) {
            alert("Invalid user id password Or You need to signup");
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // ====================================to signup user=========================================================

  signUpHandler = () => {
    const { userEmail, userPassword } = this.state;
    let self = this;
    if (userPassword.length < 6) {
      alert("Password must be 6 characters long!");
      return;
    }

    console.log("clicked");

    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(function () {
        self.setState({
          isLoggedIn: true,
          isLoggedOut: false,
        });
        console.log("signed up");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  resetHandler = () => {
    this.setState({
      userEmail: "",
      userPassword: "",
    });
  };

  // =====================================render method================================================================

  render() {
    const { isLoggedIn, isLoggedOut, userEmail, userPassword } = this.state;
    return (
      <div>
        {isLoggedOut && (
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username/Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={this.emailHandler}
                      value={userEmail}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={this.passwordHandler}
                      value={userPassword}
                    />
                  </Form.Group>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={this.signInHandler}
                      style={{ marginLeft: "5px", marginTop: "5px" }}
                    >
                      Signin
                    </Button>
                    <Button
                      variant="primary"
                      onClick={this.signUpHandler}
                      style={{ marginLeft: "5px", marginTop: "5px" }}
                    >
                      Signup
                    </Button>
                    <Button
                      variant="primary"
                      type="reset"
                      onClick={this.resetHandler}
                      style={{ marginLeft: "5px", marginTop: "5px" }}
                    >
                      Reset
                    </Button>
                  </Col>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        )}
        {isLoggedIn && <ClockScreen />}
      </div>
    );
  }
}

export default App;
