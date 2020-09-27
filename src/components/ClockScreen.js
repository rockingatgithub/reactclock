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

  setLNDiff = (e) => {
    const { hourTime } = this.state;
    if (e === undefined) {
      this.setState({
        lnHourTime: hourTime,
      });
      return;
    }
    let val = Number(e.target.value);
    let fval = val + hourTime;

    if (fval < 0) {
      let num = 24 + fval;
      this.setState({
        lnHourTime: num,
      });
    } else if (fval > 23) {
      let num = Number(24 + fval);
      let fnum = Number(num % 24);
      this.setState({
        lnHourTime: fnum,
      });
    } else {
      let num = 24 + fval;
      this.setState({
        lnHourTime: num,
      });
    }
  };

  setINDiff = (e) => {
    const { hourTime } = this.state;
    if (e === undefined) {
      this.setState({
        inHourTime: hourTime,
      });
      return;
    }
    // console.log(typeof Number(e.target.value));
    let val = e.target.value;

    if (val + hourTime < 0) {
      this.setState({
        inHourTime: 24 + (val + hourTime),
      });
    } else if (val + hourTime > 23) {
      this.setState({
        inHourTime: (val + hourTime) % 24,
      });
    } else {
      this.setState({
        inHourTime: val + hourTime,
      });
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
            <Col></Col>
            <Col>
              <Form inline>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Set United States time</Form.Label>
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setHour}
                    min="0"
                    max="23"
                    step="1"
                  />
                  :
                  <Form.Control
                    className="timeinput"
                    type="number"
                    onChange={this.setMinute}
                    min="0"
                    max="59"
                    step="1"
                  />
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

              <div>
                United States:{" "}
                <h4>
                  {hourTime}:{minTime}:{secTime}
                </h4>
              </div>
              <div>
                London:{" "}
                <h4>
                  {lnHourTime}:{minTime}:{secTime}
                </h4>
              </div>
              <div>
                India:{" "}
                <h4>
                  {inHourTime}:{minTime}:{secTime}
                </h4>
              </div>

              <Form>
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
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ClockScreen;
