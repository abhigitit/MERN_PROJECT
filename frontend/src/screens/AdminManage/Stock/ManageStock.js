import React, { Component } from "react";
import "./ManageStock.css";
import Axios from "axios";
import { Container, Row, Button } from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
export default class ManageStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vaccineName: [],
      vaccineCenters: [],
      vaccineNameControl: "",
      vaccineCenterControl: "",
      appointmentDate: "",
      stockAvailable: 0,
    };
  }

  componentDidMount(props) {
    let vaccineNameUrl = "http://localhost:5000/slotbookingfetch/vaccine";
    let vaccineCenterUrl =
      "http://localhost:5000/slotbookingfetch/vaccinationcenter";
    Axios.all([Axios.get(vaccineNameUrl), Axios.get(vaccineCenterUrl)]).then(
      (res) => {
        this.setState({
          vaccineName: res[0].data,
          vaccineCenters: res[1].data,
          vaccineNameControl: res[0].data[0]?.v_name,
          vaccineCenterControl: res[1].data[0]?.vc_name,
        });
      }
    );
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    // alert(this.state.vaccineCenterControl);
    console.log(this.state.vaccineNameControl);
    console.log(this.state.appointmentDate);

    let data = {
      vaccine: this.state.vaccineNameControl,
      vaccinationCenter: this.state.vaccineCenterControl,
      stockAvailable: this.state.stockAvailable,
    };
    Axios.post("http://localhost:5000/admin/manage", data).then((response) => {
      // alert(response.data.message);
      if (response.data) {
        this.setState({
          message: response.data.message,
        });
      }
    });
  };

  handleVaccineName = (e) => {
    console.log(e.target.value);
    this.setState({ vaccineNameControl: e.target.value });
  };
  handleVaccineCenter = (e) => {
    console.log(e.target.value);
    this.setState({ vaccineCenterControl: e.target.value });
  };
  handleQuantity = (e) => {
    console.log(e.target.value);
    this.setState({ stockAvailable: e.target.value });
  };
  render() {
    return (
      <div className="container mt-2">
        <form name="">
          <label id="label">Vaccine Name</label>
          <select
            className="form-control"
            name="vaccineName"
            onChange={this.handleVaccineName}
          >
            {this.state.vaccineName.map((i) => {
              return (
                <option value={i.v_name} key={i.v_name}>
                  {i.v_name}
                </option>
              );
            })}
          </select>

          <label class="labelSlot">Vaccine Center</label>
          <select
            className="form-control"
            name="vaccineCenter"
            onChange={this.handleVaccineCenter}
          >
            {this.state.vaccineCenters.map((i) => {
              return (
                <option value={i.vc_name} key={i.vc_name}>
                  {i.vc_name}
                </option>
              );
            })}
          </select>

          <label class="labelSlot">Quantity</label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            onChange={this.handleQuantity}
          ></input>

          <div>
            <div className="buttonContainer">
              <Button
                type="Submit"
                size="lg"
                className="landingButton"
                variant="outline-primary"
                onClick={this.handleOnSubmit}
              >
                {" "}
                Submit{" "}
              </Button>
              <a href="/">
                <Button size="lg" className="landingButton">
                  {" "}
                  Logout{" "}
                </Button>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
