import React, { Component } from "react";
import { InfoWindow, Marker } from "react-google-maps";

/**
 * PSIMarker takes in a psi object from the psi array 
 * It uses psi object to determine the location of the marker
 * and information displayed
 *
 * @export
 * @class PSIMarker
 * @extends {Component}
 */
export default class PSIMarker extends Component {
  /**
   *Creates an instance of PSIMarker.
   * @param {*} props
   * @memberof PSIMarker
   */
  constructor(props) {
    super(props);
    this.state = {
      psi: props.psi,
      isOpen: false
    };
  }

  /**
   *
   *Handles information window being opened
   * @memberof PSIMarker
   */
  handleToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  /**
   *
   *Handles information window being closed
   * @memberof PSIMarker
   */
  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  /**
   * Creates a google map marker object at the psi station location and 
   * an information window with psi station name and psi information
   * @returns google maps marker object
   * @memberof PSIMarker
   */
  render() {
    return (
      <Marker
        defaultPosition={{
          lat: this.state.psi.location.latitude,
          lng: this.state.psi.location.longitude
        }}
        onClick={() => this.handleToggleOpen()}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.props.handleCloseCall}>
            <div>
              <h1>Station: {this.state.psi.name}</h1>
              <p> PSI: {this.state.psi.psi} </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
