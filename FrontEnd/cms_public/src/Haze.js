import React, {Component} from 'react';
import axios from 'axios';

var refresh;
class Haze extends Component {

  constructor(props) {
    super(props);
    this.state = {
      north: 0,
      south: 0,
      east: 0,
      west: 0,
      central: 0,
      n_condition: 'normal',
      s_condition: 'normal',
      e_condition: 'normal',
      w_condition: 'normal',
      c_condition: 'normal',
      weather: []
    }
  }

  //Make a GET Request to server to retrieve PSI data
  getPSIRequest() {
    var n,
      e,
      w,
      s,
      c;
    axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/PSIStationInformation').then(function(response) {
      var i;
      for (i=0; i < response.data.length; i++) {
        if (response.data[i].dataType === "psi_twenty_four_hourly") break;
      }
      n = response.data[i].values.north;
      s = response.data[i].values.south;
      e = response.data[i].values.east;
      w = response.data[i].values.west;
      c = response.data[i].values.central;
    }).catch(function(error) {
      console.log(error);
    }).then(() => {
      this.setState({north: n, south: s, east: e, west: w, central: c});
      this.changeStatus();
    })
  }

  //change the status of the PSI
  changeStatus() {
    if (this.state.north > 100) {
      this.setState({n_condition: 'moderate'})
    }else{
      this.setState({n_condition: 'normal'})
    }
    if (this.state.south > 100) {
      this.setState({s_condition: 'moderate'})
    }else{
      this.setState({s_condition: 'normal'})
    }
    if (this.state.east > 100) {
      this.setState({e_condition: 'moderate'})
    }else{
      this.setState({e_condition: 'normal'})
    }
    if (this.state.west > 100) {
      this.setState({w_condition: 'moderate'})
    }else{
      this.setState({w_condition: 'normal'})
    }
    if (this.state.central > 100) {
      this.setState({c_condition: 'moderate'})
    }else{
      this.setState({c_condition: 'normal'})
    }
  }

  //Make a GET Request to server to retrieve weather data
  getWeatherRequest() {
    var info;
    var stations;
    axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationInformation').then(function(response) {
      info = response.data;
    }).catch(function(error) {
      console.log(error);
    }).then(() => {
      axios.get("http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationsList").then(function(response) {
        stations = response.data;
        console.log(stations);
      }).catch(function(error) {
        console.log(error);
      }).then(() => {
        for (var i = 0; i < stations.length; i++) {
          for (var j = 0; j < info.length; j++) {
            if (stations[i].device_id === info[j].stationID) {
              info[j].station = stations[i].name;
            }
          }
        }
        this.setState({weather: info})
        console.log(this.state.weather);
      })
    })
  }

  componentDidMount() {
    this.getPSIRequest();
    refresh = setInterval(() => this.getPSIRequest(), 1800000); //refresh after 30 minutes
  }

  componentWillUnmount() {
    clearInterval(refresh); //clear interval
  }

  render() {
    const pop_up = {
      fontSize: 16,
      backgroundColor: 'dodgerblue',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }

    const station = {
      fontSize: 12,
      backgroundColor: 'dodgerblue',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }

    return (<div className="haze">
      <div style={pop_up}>
        <p className="text-center border-bottom">PSI Update for {new Date().toLocaleTimeString('en-US')}</p>
        <p>PSI condition for north: {this.state.north}
          ({this.state.n_condition})</p>
        <p>PSI condition for south: {this.state.south}
          ({this.state.s_condition})</p>
        <p>PSI condition for east: {this.state.east}
          ({this.state.e_condition})</p>
        <p>PSI condition for west: {this.state.west}
          ({this.state.w_condition})</p>
        <p>PSI condition for central: {this.state.central}
          ({this.state.c_condition})</p>
      </div>
    </div>);
  }
}

export default Haze;
