// ===============================================this is clock sceern component====================================

import React, { Component } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

class ClockScreen extends Component {
  constructor(props) {
    super(props);
    this.houref = React.createRef();
    this.minref = React.createRef();
    this.secref = React.createRef();
    this.state = {
      time: "",
      secTime: 0,
      minTime: 0,
      hourTime: 0,
      inHourTime: 0,
      lnHourTime: 0,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.increaseTime();
    }, 5000);
  };

  increaseTime = () => {
    const { secTime, minTime, hourTime } = this.state;
    if (secTime + 5 < 60) {
      this.setState((prevState) => ({
        secTime: prevState.secTime + 5,
      }));
    } else if (minTime + 1 < 60) {
      this.setState((prevState) => ({
        minTime: prevState.minTime + 1,
        secTime: 0,
      }));
    } else if (hourTime + 1 < 60) {
      this.setState((prevState) => ({
        minTime: 0,
        hourTime: prevState.hourTime + 1,
        secTime: 0,
      }));
    } else {
      this.setState((prevState) => ({
        minTime: 1,
        hourTime: 1,
        secTime: 1,
      }));
    }
  };

  setHour = (e) => {
    this.setState(
      {
        hourTime: e.target.value,
        lnHourTime: e.target.value,
        inHourTime: e.target.value,
      },
      this.validateTime
    );
  };

  setMinute = (e) => {
    this.setState(
      {
        minTime: e.target.value,
      },
      this.validateTime
    );
  };

  setSecond = (e) => {
    this.setState(
      {
        secTime: e.target.value,
      },
      this.validateTime
    );
  };

  // ===========================================validate date and time================================================

  validateTime = () => {
    const {
      time,
      secTime,
      minTime,
      hourTime,
      inHourTime,
      lnHourTime,
    } = this.state;
    if (secTime > 59) {
      this.setState({
        secTime: 59,
      });
    }
    if (secTime < 0) {
      this.setState({
        secTime: 0,
      });
    }
    if (minTime > 59) {
      this.setState({
        minTime: 59,
      });
    }
    if (minTime < 0) {
      this.setState({
        minTime: 0,
      });
    }
    if (hourTime > 23) {
      this.setState({
        hourTime: 23,
      });
    }
    if (hourTime < 0) {
      this.setState({
        hourTime: 0,
      });
    }
    if (lnHourTime > 23) {
      this.setState({
        lnHourTime: 23,
      });
    }
    if (lnHourTime < 0) {
      this.setState({
        lnHourTime: 0,
      });
    }
    if (inHourTime > 23) {
      this.setState({
        inHourTime: 23,
      });
    }
    if (inHourTime < 0) {
      this.setState({
        inHourTime: 0,
      });
    }
  };

  // ==========================================================set time difference for london======================================

  setLNDiff = (e) => {
    const { hourTime } = this.state;
    if (e === undefined) {
      this.setState(
        {
          lnHourTime: hourTime,
        },
        this.validateTime
      );
      return;
    }
    let val = e.target.value;
    // console.log(val + " " + hourTime);
    let fval = eval(hourTime + val);

    if (fval < 0) {
      let num = eval(24 + fval);
      this.setState(
        {
          lnHourTime: num,
        },
        this.validateTime
      );
    } else if (fval > 23) {
      let num = eval(24 + fval);
      let fnum = eval(num % 24);
      this.setState(
        {
          lnHourTime: fnum,
        },
        this.validateTime
      );
    } else {
      let num = eval(24 + fval);
      this.setState(
        {
          lnHourTime: num,
        },
        this.validateTime
      );
    }
  };

  // =======================================================set time difference for india==================================

  setINDiff = (e) => {
    const { hourTime } = this.state;
    if (e === undefined) {
      this.setState(
        {
          inHourTime: hourTime,
        },
        this.validateTime
      );
      return;
    }
    // console.log(typeof Number(e.target.value));
    let val = e.target.value;

    if (eval(hourTime + val) < 0) {
      this.setState(
        {
          inHourTime: eval(24 + eval(hourTime + val)),
        },
        this.validateTime
      );
    } else if (eval(hourTime + val) > 23) {
      this.setState(
        {
          inHourTime: eval((hourTime + val) % 24),
        },
        this.validateTime
      );
    } else {
      this.setState(
        {
          inHourTime: eval(hourTime + val),
        },
        this.validateTime
      );
    }
  };

  render() {
    const {
      time,
      secTime,
      minTime,
      hourTime,
      inHourTime,
      lnHourTime,
    } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col lg={3} md={2} sm={0}></Col>
            <Col lg={6} md={8} sm={12}>
              <Form inline className="mainform">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Set United States time</Form.Label>
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setHour}
                    min="0"
                    max="23"
                    step="1"
                  />{" "}
                  :
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setMinute}
                    min="0"
                    max="59"
                    step="1"
                  />{" "}
                  :
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setSecond}
                    min="0"
                    max="59"
                    step="1"
                  />
                </Form.Group>
              </Form>
              <div id="clockbox">
                <span className="countryclocks">
                  United States: {hourTime}:{minTime}:{secTime}
                </span>
                <span className="countryclocks">
                  London: {lnHourTime}:{minTime}:{secTime}
                </span>
                <span className="countryclocks">
                  India: {inHourTime}:{minTime}:{secTime}
                </span>
              </div>
              <Form className="diffform">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Time difference for LONDON:</Form.Label>
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setLNDiff}
                    min="-23"
                    max="23"
                    step="1"
                  />
                  <Form.Label>Time difference for INDIA:</Form.Label>
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setINDiff}
                    min="-23"
                    max="23"
                    step="1"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg={3} md={2} sm={0}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ClockScreen;
