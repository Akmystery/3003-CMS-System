import React, {
  Component
} from "react";
import MapContainer from "./MapContainer";
import axios from "axios";

class Map extends Component {

  /**
   * Initialize variables
   * @param  {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      dengue: [],
      emergency: [],
      location: [],
      weather: [],
      psi: [],
      visibility_haze: props.visibility_haze,
      visibility_dengue: props.visibility_dengue,
      visibility_terrorist: props.visibility_terrorist
    };
  }

  /**
   * On render, invokes getLocation() and getVisibility()
   */
  componentDidMount() {
    this.getLocation();
    this.getVisibility();
  }

  /**
   * Update visibility when visibility props change
   * @param  {} prevProps
   */
  componentDidUpdate(prevProps) {
    if (
      this.props.visibility_haze !== prevProps.visibility_haze ||
      this.props.visibility_dengue !== prevProps.visibility_dengue ||
      this.props.visibility_terrorist !== prevProps.visibility_terrorist
    ) {
      this.getVisibility();
    }
  }

  /**
   * Set standard location for map to display
   */
  getLocation() {
    this.setState({
      location: {
        lat: 1.363734,
        lng: 103.793157
      }
    });
  }
  /**
   * Translates visibility props from 'checked' or NULL to boolean value
   * After setting new visibility states, invokes getDengueCoordinates() getWeatherCoordinates()
   * getPSICoordinates() getEmergencyCoordinates()
   */
  getVisibility() {
    var dengue, haze, terrorist;
    if (this.props.visibility_dengue === "checked") dengue = true;
    else dengue = false;

    if (this.props.visibility_haze === "checked") haze = true;
    else haze = false;

    if (this.props.visibility_terrorist === "checked") terrorist = true;
    else terrorist = false;

    this.setState({
        visibility_haze: haze,
        visibility_dengue: dengue,
        visibility_terrorist: terrorist
      },
      () => {
        this.getDengueCoordinates();
        this.getWeatherCoordinates();
        this.getPSICoordinates();
        this.getEmergencyCoordinates();
        var refresh = setInterval(() => this.getEmergencyCoordinates(), 10000); //refresh every after 10 second
      }
    );
  }

  /**
   * Sends a GET request to the server to retrieve dengue information
   * If dengue information is sent back, format the coordinates from dengue information
   * and rearrange them in an array with lat and lng attributes
   * After rearranging all the dengue coordinates, set the state of dengue
   */
  getDengueCoordinates() {
    var arr = [];
    var i;
    axios
      .get(
        "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/DengueInformation"
      )
      .then(function (response) {
        arr = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        for (var j = 0; j < arr.length; j++) {
          var clusters = arr[j].lat.split("|");
          for (i = 0; i < clusters.length; i++) {
            var latlng = clusters[i].split(",");
            clusters[i] = {
              lat: parseFloat(latlng[0]),
              lng: parseFloat(latlng[1])
            };
          }
          arr[j].paths = clusters;
        }

        this.setState({
          dengue: arr
        });
      });
  }

  /**
   * Send GET request to the server to retrieve weather station information and
   * stores it in an array
   * Send another GET request to the server to retrieve weather stations list
   * Compare the array with weather station information and the weather stations list
   * If given a index, the weather station information and weather stations list have
   * the same station ID, insert the station name and location into the array with that index
   * and set the state of weather
   */
  getWeatherCoordinates() {
    var arr = [];
    var i = 0;
    axios
      .get(
        "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationInformation"
      )
      .then(function (response) {
        arr = response.data;
      }).catch(function (error) {
        console.log(error);
      })
      .then(() => {
        var stations = [];
        axios
          .get(
            "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationsList"
          )
          .then(function (response) {
            stations = response.data;
          }).catch(function (error) {
            console.log(error);
          })
          .then(() => {

            for (i = 0; i < stations.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                if (stations[i].device_id === arr[j].stationID) {
                  arr[j].location = stations[i].location;
                  arr[j].station = stations[i].name;
                }
              }
            }

            this.setState({
              weather: arr
            });
          })

      })
  }

  /**
   * Send GET request to the server to retrieve PSI stations list and store it in an array
   * Loop through the array to find 'national' station and remove it from the array
   * Send another GET request to the server to retrieve PSI station information
   * Filter through the psi station information to get only 24-hr psi levels and add it to
   * the stations in the array and set the state of psi
   */
  getPSICoordinates() {
    var arr = [];
    var i = 0;
    axios
      .get(
        "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/PSIStationsList"
      )
      .then(function (response) {
        arr = response.data;
      }).catch(function (error) {
        console.log(error);
      })
      .then(() => {
        var j = 0;
        for (i; i < arr.length; i++) {
          if (arr[i].name === "national") {
            j = i;
          }
        }
        arr.splice(j, 1);

        var stations;
        axios
          .get(
            "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/PSIStationInformation"
          )
          .then(function (response) {
            stations = response.data;
          })
          .then(() => {


            for (i = 0; i < stations.length; i++) {
              if (stations[i].dataType === "psi_twenty_four_hourly") break;
            }
            var west = stations[i].values.west;
            var east = stations[i].values.east;
            var central = stations[i].values.central;
            var south = stations[i].values.south;
            var north = stations[i].values.north;

            for (i = 0; i < arr.length; i++) {
              if (arr[i].name === "west") arr[i].psi = west;
              else if (arr[i].name === "east") arr[i].psi = east;
              else if (arr[i].name === "central") arr[i].psi = central;
              else if (arr[i].name === "south") arr[i].psi = south;
              else if (arr[i].name === "north") arr[i].psi = north;
            }

            this.setState({
              psi: arr
            });
          })
      })
  }

  /**
   * Send GET request to the server to retrieve all emergencies, store it in an array
   * and set the state of emergency
   */
  getEmergencyCoordinates() {
    var arr = [];
    var i = 0;
    axios
      .get(
        "http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/getEmergencies"
      )
      .then(response => {
        return response.data;
      })
      .then(data => {
        var emergencyOverlays = Object.keys(data).map(key => {
          var emergencyOverlay = data[key];
          return emergencyOverlay;
        });

        for (i; i < emergencyOverlays.length; i++) {
          arr[i] = emergencyOverlays[i];
        }
        this.setState({
          emergency: arr
        });
      })
      .catch(error => console.log(error));
  }

  /**
   * Pass in dengue, weather, psi and emergency arrays and visibility of map components
   * and returns MapContainer
   */
  render() {
    return ( <
      MapContainer dengue = {
        this.state.dengue
      }
      weather = {
        this.state.weather
      }
      psi = {
        this.state.psi
      }
      emergency = {
        this.state.emergency
      }
      location = {
        this.state.location
      }
      visibility_dengue = {
        this.state.visibility_dengue
      }
      visibility_haze = {
        this.state.visibility_haze
      }
      visibility_terrorist = {
        this.state.visibility_terrorist
      }
      />
    );
  }
}
export default Map;
