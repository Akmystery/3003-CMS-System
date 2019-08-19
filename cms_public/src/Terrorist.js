import React, { Component } from 'react';
import axios from 'axios';

var refresh;
class Dengue extends Component {
  constructor(){
    super();
    this.state = {
      emergency : []
    }
  }

  //Make a GET Request to server to retrieve emergency information from server
  getEmergencyRequest(){
    var emg;
    axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/getemergencies')
      .then(function (response) {
          emg = response.data;
      })
      .catch(function (error) {
      console.log(error);
      })
      .then(() => {
        this.setState({
          emergency : emg
        })
        console.log(this.state.emergency);
      })
  }

  componentDidMount(){
    this.getEmergencyRequest();
    refresh = setInterval(() => this.getEmergencyRequest(), 10000); //refresh every after 10 second
  }
  componentWillUnmount() {
    clearInterval(refresh);
  }
  render() {
    const fire = {
      fontSize : 16,
      backgroundColor: 'crimson',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }
    const rescue = {
      backgroundColor: 'dimgray',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }
    const ambulance = {
      backgroundColor: 'hotpink',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }
    const attack = {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }
    const gas = {
      backgroundColor: 'mediumaquamarine',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }

    const emergencies = this.state.emergency;
    const update = emergencies.map((emergency) =>{
      const element = (
        <div>
        <p>Location: {emergency.bldgNumber}</p>
        <p>Status: {emergency.status}</p>
        </div>
      );
      if(emergency.emergencyType === "ambulance"){
        return <div style={ambulance}><p>Emergency Ambulance</p>{element}</div>;
      }else if(emergency.emergencyType === "fire"){
        return <div style={fire}><p>Fire Fighting</p>{element}</div>;
      }else if(emergency.emergencyType === "gas"){
        return <div style={gas}><p>Gas Leak Control</p>{element}</div>;
      }else if(emergency.emergencyType === "terrorist"){
        return <div style={attack}><p>Terrorist Attack</p>{element}</div>;
      }else{
        return <div style={rescue}><p>Rescue and Evacuation</p>{element}</div>;
      }
    });

    return (
      <div className = "terrorist">
        <p className="text-center border-bottom">Update for {new Date().toLocaleTimeString('en-US')}</p>
        {update}
      </div>
    );
  }
}

export default Dengue;
