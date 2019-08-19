import React, { Component } from 'react';
import Haze from './Haze';
import Dengue from './Dengue';
import Terrorist from './Terrorist';

class LiveFeed extends Component {
  constructor(props){
    super(props);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
  }

  //Handle Radio button change
  handleRadioButtonChange(event){
    this.props.handleRBChange(event);
  }
  render() {

    let update;
    //Display data according to radio button change
    if(this.props.haze){
      update = <Haze />;
    }else if(this.props.dengue){
      update = <Dengue />;
    }else if(this.props.terrorist){
      update = <Terrorist />
    }

    return (

      <div className="liveFeed container">
        <p className="text-center my-2"> Live Feeds for {new Date().toLocaleDateString()} </p>

        <div className="form-group ml-2" onChange={this.handleRadioButtonChange}>
          <div className = "row justify-content-center">
            <div className = "col">
            <div className="form-check">
            <input className="form-check-input" type="radio" name="dengue" value="dengue" checked={this.props.dengue}/>
            <label className="form-check-label" htmlFor="dengue">Dengue</label>
            </div>
            </div>
            <div className = "col">
            <div className="form-check">
            <input className="form-check-input" type="radio" name="haze" value="haze" checked={this.props.haze}/>
            <label className="form-check-label" htmlFor="haze">Weather</label>
            </div>
            </div>
            <div className = "col">
            <div className="form-check">
            <input className="form-check-input" type="radio" name="terrorist" value="terrorist" checked={this.props.terrorist}/>
            <label className="form-check-label" htmlFor="terrorist">Emergencies</label>
            </div>
            </div>
          </div>
        </div>
        <hr/>
        {update}
      </div>
    );
  }
}

export default LiveFeed;
