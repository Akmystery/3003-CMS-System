import React, { Component } from 'react';
import 'reactstrap';

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      emergency: 'checked',
      rNE: '',
      firefighting: '',
      gLC: '',
      tAttack: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);

  }

  //Handle the change in user's input
  handleChange(event) {
    this.props.onChange(event.target.name,event.target.value)
  }

  //handleRadioButtonChange
  handleRadioButtonChange(event){
    this.props.onRadioButtonChange(event.target.value);
    const name = event.target.name;
    if(event.target.type === "radio")
    {
      this.setState({
        emergency: '',
        rNE:'',
        firefighting:'',
        gLC:'',
        tAttack: '',
        [name]: 'checked'
      });
    }
  }

  //Handle User's submit action
  handleSubmit(event) {
    this.props.onSubmit();
  }

  render() {
    const form_length = {
      width : 400
    }
    const form_postal = {
      width: 200
    }
    const form_geoCode = {
      width: 150
    }
    const red ={
      color: 'red'
    }
    return (
      <div className="row justify-content-center">
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label>
          Name
          <input className="form-control" name="name" type="text" value={this.props.name} onChange={this.handleChange} style={form_length}/>
        </label>
        <p style={red}>{this.props.errors.name}</p>
      </div>
      <div className="form-group">
        <label>
          Phone Number
          <input className="form-control" name="phoneNumber" type="text" value={this.props.phoneNumber} onChange={this.handleChange} style={form_length}/>
          </label>
        <p style={red}>{this.props.errors.ph}</p>
      </div>
      <div className="form-group">
        <label>
          Location
          <input className="form-control" name="location" type="text" value={this.props.location} onChange={this.handleChange} style={form_length}/>
          </label>
          <p style={red}>{this.props.errors.location}</p>
      </div>
      <div className="form-group">
        <div className="row">
        <div className = "col">
        <label>
          Postal Code
          <input className="form-control" name="postalCode" type="text" value={this.props.postalCode} onChange={this.handleChange} style={form_postal}/>
          </label>
          <p style={red}>{this.props.errors.postcode}</p>
         </div>
         <div className="col mt-4 ml-0">
          <button className="btn ml-2 btn-primary" type="button" onClick={this.props.generateP}>Generate Geocode</button>
         </div>
        </div>
      </div>
      <div className="form-group">
          <div className = "row">
          <div className = "col">
              Latitude<input className="form-control" name="location" type="text" value={this.props.latitude} onChange={this.handleChange} style={form_geoCode}/>
              <p style={red}>{this.props.errors.lat}</p>
          </div>
          <div className = "col">
              Longitude<input className="form-control" name="location" type="text" value={this.props.longitude} onChange={this.handleChange} style={form_geoCode}/>
              <p style={red}>{this.props.errors.long}</p>
          </div>

      </div>
      </div>
      <div className="form-group" onChange={this.handleRadioButtonChange}>
      Type of Assistance Requested

      <div className="form-check">
      <input className="form-check-input" type="radio" name="emergency" value="ambulance" checked={this.state.emergency}/> Emergency Ambulance
      </div>

      <div className="form-check">
      <input className="form-check-input" type="radio" name="rNE" value="rescue" checked={this.state.rNE}/> Rescue and Evacuation
      </div>

      <div className="form-check">
      <input className="form-check-input" type="radio" name="firefighting" value="fire" checked={this.state.firefighting}/> Fire Fighting
      </div>

      <div className="form-check">
      <input className="form-check-input" type="radio" name="gLC" value="gas" checked={this.state.gLC}/> Gas Leak Control
      </div>

      <div className="form-check">
      <input className="form-check-input" type="radio" name="tAttack" value="terrorist" checked={this.state.tAttack}/> Terrorist Attack
      </div>

      </div>
      <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
      </div>
    );
  }
}

export default Form;
