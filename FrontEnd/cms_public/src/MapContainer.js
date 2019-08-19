import React from "react";
import Map from "./Map";

export default class MapContainer extends React.Component {

    /**
     *Creates an instance of MapContainer.
     * @param {*} props
     * @memberof MapContainer
     */
    constructor(props) {
      super(props);
      this.state = {
        dengue: [],
        weather: [],
        emergency: [],
        psi: [],
        location: []
      };
    }

/**
 *Initialize variables that has been passed from MapUI
 * @memberof MapContainer
 */
    componentWillReceiveProps(nextProps) {
      if (nextProps.dengue !== this.props.dengue) {
        this.setState({
          dengue: nextProps.dengue
        });
      }

      if (nextProps.weather !== this.props.weather) {
        this.setState({
          weather: nextProps.weather
        });
      }

      if (nextProps.location !== this.props.location) {
        this.setState({
          location: nextProps.location
        });
      }

      if (nextProps.emergency !== this.props.emergency) {
        this.setState({
          emergency: nextProps.emergency
        });
      }

      if (nextProps.psi !== this.props.psi) {
        this.setState({
          psi: nextProps.psi
        });
      }
    }
    
    /**
     * Passes in all the states into Map
     * Contains all required google map variables
     * @returns map object
     * @memberof MapContainer
     */
    render() {
      return ( <
        Map dengue = {
          this.state.dengue
        }
        weather = {
          this.state.weather
        }
        emergency = {
          this.state.emergency
        }
        psi = {
          this.state.psi
        }
        location = {
          this.state.location
        }
        visibility_dengue = {
          this.props.visibility_dengue
        }
        visibility_haze = {
          this.props.visibility_haze
        }
        visibility_terrorist = {
          this.props.visibility_terrorist
        }
        googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNHvJn8yIInqkN3UN30WpNoj3H7gpwfYE"
        loadingElement = { <
          div
          style = {
            {
              height: "100%",
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "center",
              padding: 0
            }
          }
          />
        }
        containerElement = { < div style = {
            {
              width: "100%",
              marginLeft: 0
            }
          }
          />}
          mapElement = { <
            div
            style = {
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }
            }
            />
          }
          />
        );
      }
    }