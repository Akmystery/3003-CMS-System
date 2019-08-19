import React, { Component } from "react";
import { InfoWindow, Marker } from "react-google-maps";

/**
 * WeatherMarker takes in a weather object from the weather array 
 * It uses weather object to determine the location of the marker
 * and information displayed
 *
 * @export
 * @class WeatherMarker
 * @extends {Component}
 */
export default class WeatherMarker extends Component {
  /**
   *Creates an instance of WeatherMarker.
   * @param {*} props
   * @memberof WeatherMarker
   */
  constructor(props) {
    super(props);
    this.state = {
      weather: props.weather,
      isOpen: false
    };
  }

  /**
   *
   * Handles information window being opened
   * @memberof WeatherMarker
   */
  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  /**
   *
   * Handles information window being closed
   * @memberof WeatherMarker
   */
  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  /**
   * Creates a google map marker object at the weather station location and
   * an information window with the weather station name and weather information
   * @returns google maps marker object
   * @memberof WeatherMarker
   */
  render() {
    if (this.state.weather.temperature !== null) {
      return (
        <Marker
          defaultPosition={{
            lat: this.state.weather.location.latitude,
            lng: this.state.weather.location.longitude
          }}
          onClick={() => this.handleToggleOpen()}
        >
          {this.state.isOpen && (
            <InfoWindow onCloseClick={this.props.handleCloseCall}>
              <div>
                <h1>Station: {this.state.weather.station}</h1>
                <p>Temperature: {this.state.weather.temperature}</p>
                <p>Rainfall: {this.state.weather.rainfall}</p>
                <p>Humidity: {this.state.weather.humidity}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    }

    return null;
  }
}
