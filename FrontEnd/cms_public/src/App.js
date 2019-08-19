import React, { Component } from "react";
import "./App.css";
import Nav from "./Nav";
import LiveFeed from "./LiveFeed";
import MapUI from "./MapUI";
import "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haze: "",
      dengue: "checked",
      terrorist: ""
    };
    this.handleRBChange = this.handleRBChange.bind(this);
  }

  //Handle Radio Button Change
  handleRBChange(event) {
    const name = event.target.name;
    this.setState({
      haze: "",
      dengue: "",
      terrorist: "",
      [name]: "checked"
    });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div className="row">
          <div className="col-4 bg-light">
            <LiveFeed
              handleRBChange={this.handleRBChange}
              haze={this.state.haze}
              dengue={this.state.dengue}
              terrorist={this.state.terrorist}
            />
          </div>
          <div className="col-8">
            <MapUI
              visibility_haze={this.state.haze}
              visibility_dengue={this.state.dengue}
              visibility_terrorist={this.state.terrorist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
