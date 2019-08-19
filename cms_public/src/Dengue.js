import React, { Component } from 'react';
import axios from 'axios';

var refresh;
class Dengue extends Component {
  constructor(){
    super();
    this.state = {
      case: '',
      dengue: [],
    }
  }

  componentDidMount(){
    this.getRequest();
    refresh = setInterval(() => this.getRequest(), 1800000); //refresh after 30 minutes
  }

  componentWillUnmount() {
    clearInterval(refresh);
  }

  //Make a GET Request to server to retrieve Dengue Information
  getRequest(){
    var i = 0;
    var cse = 0;
    var deg;
    axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/DengueInformation')
      .then(function (response) {
          while(i < response.data.length){
            cse += response.data[i].caseSize;
            i++;
          }
          deg = response.data;
      })
      .catch(function (error) {
      console.log(error);
    }).then(() => {
      this.setState({
        case : cse,
        dengue: deg
      })
    })
  }
  render() {
    const pop_up = {
      fontSize : 16,
      backgroundColor: 'dodgerblue',
      borderRadius: 20,
      padding: 10,
      margin: 10,
      color: 'white'
    }
    const detail = {
      fontSize: 14,
      backgroundColor: 'goldenrod',
      borderRadius: 20,
      padding: 8,
      paddingBottom : 2,
      margin: 10,
      color: 'white'
    }
    const dengue_cases = this.state.dengue;
    const dengue = dengue_cases.map((dengue) =>
      <div style={detail}>
        <p> There are {dengue.caseSize} dengue cases in {dengue.description} </p>
      </div>
    );
    return (
      <div className = "dengue">
      <div style={pop_up}>
      <p className="text-center border-bottom">Update for {new Date().toLocaleTimeString('en-US')}</p>
      <p>There are total {this.state.case} Degue Fever Outbreaks around Singapore</p>
      </div>
      <p className="text-center border-bottom">Detail Information</p>
      {dengue}
      </div>
    );
  }
}

export default Dengue;
