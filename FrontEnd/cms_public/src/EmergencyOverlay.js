import React, { Component } from "react";
import fire from "./resources/fire2.png";
import emergency from "./resources/emergency.png";
import gasleak from "./resources/gasleak.png";
import terrorist from "./resources/terrorist.png"
import rescue from "./resources/rescue.png";
const { GroundOverlay } = require("react-google-maps");

/**
 * EmergencyOverlay takes in an emergency object from the emergency array
 * It uses the emergency object to determine which image to use and
 * calculates bounds so that the ground overlay will be a square shape
 *
 * @export
 * @class EmergencyOverlay
 * @extends {Component}
 */
export default class EmergencyOverlay extends Component {
  /**
   *Creates an instance of EmergencyOverlay.
   * @param {*} props
   * @memberof EmergencyOverlay
   */
  constructor(props) {
    super(props);
    this.state = {
      emergency: props.emergency
    };
  }

  /**
   * Determines which emergency image to use and calculates bounds
   * from the emergency coordinates for google map ground overlay
   * @returns google maps ground overlay object
   * @memberof EmergencyOverlay
   */
  render() {
    if (this.state.emergency.status === "Pending") {
      var url;
      if (this.state.emergency.emergencyType === "fire")
        url = fire;
      else if (this.state.emergency.emergencyType === "ambulance")
        url = emergency;
      else if (this.state.emergency.emergencyType === "terrorist")
        url = terrorist;
      else if (this.state.emergency.emergencyType === "gas")
        url = gasleak;
      else url = rescue;
      var df = 0.4/69;
      // unnecessary code
      // var dl = df / Math.cos(this.state.emergency.location.latitude);
      var north = this.state.emergency.location.latitude + df;
      var south = this.state.emergency.location.latitude - df;
      var east = this.state.emergency.location.longitude + df;
      var west = this.state.emergency.location.longitude - df;
      var bounds = {
        north: north,
        south: south,
        east: east,
        west: west
      };

      return (
        <div>
          {
            <GroundOverlay
              defaultUrl={url}
              defaultBounds={bounds}
              defaultOpacity={.8}
            />
          }
        </div>
      );
    } else return null;
  }
}
