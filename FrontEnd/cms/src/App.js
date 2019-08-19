import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import 'reactstrap';
import Nav from './Nav';
import axios from 'axios';

class CallCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phoneNumber: '',
      location: '',
      postalCode:'',
      latitude:'',
      longitude:'',
      request: 'ambulance',
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRBChange = this.handleRBChange.bind(this);
    this.changeGeoCode = this.changeGeoCode.bind(this);
  }

  //Change the postalcode to longitude and latitude
  changeGeoCode(){
    var lat;
    var lng;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
        key : 'AIzaSyA7h4loYGke-97UO-ClXf4CHUj-66WdEeM',
        address : this.state.postalCode
      }
    })
   .then(function (response) {
       lat = response.data.results[0].geometry.location.lat;
       lng = response.data.results[0].geometry.location.lng;
   }).then(() => {
       this.setState({
         latitude : lat,
         longitude : lng
       })
   })
   .catch(function (error) {
    console.log(error);
   });
  }

  //Change the state based on User's input data
  handleInputChange(name,value){
    this.setState({
      [name]:value
    });
  }

  // Make a http post request to server
  postRequest(){
    axios.post('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/emergency',{
    name: this.state.name,
    mobile: this.state.phoneNumber,
    postcode: this.state.postalCode,
    bldgNumber: this.state.location,
    emergencyType: this.state.request,
    location: {
      latitude : this.state.latitude,
      longitude : this.state.longitude,
     }
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

//Clear all the states
  clearAll(){
    this.setState({
      name: '',
      phoneNumber: '',
      location: '',
      postalCode:'',
      latitude:'',
      longitude:'',
      request: 'ambulance',
    })
  }

//Validate the input form
  handleValidation(){
    let valid = true;
    if(this.state.name === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          name: 'Name should not be empty',
        }
      }))
    }else{
      if(!this.state.name.match(/^[A-Za-z\s]+$/)){ //CHECK FOR LETTER AND SPACE
              valid = false;
              this.setState(prevState => ({
                errors: {
                  ...prevState.errors,
                  name: 'Name should be only letters',
                }
              }))
        }else{
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              name: '',
            }
          }))
        }
    }
    if(this.state.phoneNumber === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ph: 'Phone Number should not be empty',
        }
      }))
    }else{
      if(this.state.phoneNumber.length != 8 || !this.state.phoneNumber.match(/^\d+$/)){ //CHECK FOR LENGTH AND DIGITS
        valid = false;
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ph: 'Please Enter Valid Singapore Phone Number',
          }
        }))
      }else{
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ph: '',
          }
        }))
      }
    }
    if(this.state.location === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          location: 'Location should not be empty',
        }
      }))
    }else{
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          location: '',
        }
      }))
    }
    if(this.state.postalCode === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          postcode: 'Postal Code should not be empty',
        }
      }))
    }else{
      if(this.state.postalCode.length != 6){ //CHECK FOR LENGTH
        valid = false;
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            postcode: 'Please Enter Valid Singapore Postal Code',
          }
        }))
      }else{
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            postcode: '',
          }
        }))
      }
    }
    if(this.state.latitude === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          lat: 'Latitude should not be empty',
        }
      }))
    }else{
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          lat: '',
        }
      }))
    }
    if(this.state.longitude === ''){
      valid = false;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          long: 'Longitude should not be empty',
        }
      }))
    }else{
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          long: '',
        }
      }))
    }

    return valid;
  }

  //Handle User's Submission
  handleSubmit(){
    if(this.handleValidation()){
      this.postRequest();
      this.clearAll();
      alert("Form is submitted successfully");
    }else{
      alert("Form Submission Failed")
    }

  }

  //Handle Radio button change
  handleRBChange(value,name){
    this.setState({
      request : value
    });
  }

  render() {
    return (
      <div className="CallCenter">
          <Nav/>
          <p className="text-center py-3" style={{fontSize: 32}}>Emergency Request Form</p>
          <Form
            name={this.state.name}
            phoneNumber={this.state.phoneNumber}
            location={this.state.location}
            postalCode = {this.state.postalCode}
            latitude = {this.state.latitude}
            longitude = {this.state.longitude}
            onChange={this.handleInputChange}
            onRadioButtonChange = {this.handleRBChange}
            onSubmit={this.handleSubmit}
            generateP = {this.changeGeoCode}
            errors={this.state.errors}/>
      </div>
    );
  }
}

export default CallCenter;
