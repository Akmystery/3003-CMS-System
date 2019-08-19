import React from "react";
import { Polygon } from "react-google-maps";

/**
 * DengueOverlay takes in a dengue object from the dengue array
 * It uses the dengue object to create a google map polygon 
 * with the dengue coordinates and returns the polygon object
 * 
 * @export
 * @class DengueOverlay
 * @extends {React.Component}
 */
export default class DengueOverlay extends React.Component {

  /**
   *Creates an instance of DengueOverlay.
   * @param {*} props
   * @memberof DengueOverlay
   */
  constructor(props){
    super(props);
    this.state={
      dengue:props.dengue,
    }
  }
/**
 * Uses dengue.paths which contains an array of coordinates 
 * which is supposed to form a polygon
 * @returns google maps polygon object
 * @memberof DengueOverlay
 */
render() {
    return (
      <Polygon
        paths={this.state.dengue.paths}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        }}
      >

      </Polygon>
    );
  }
}
