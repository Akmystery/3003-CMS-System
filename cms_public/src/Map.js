import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DengueOverlay from "./DengueOverlay.js";
import EmergencyOverlay from "./EmergencyOverlay.js"
import PSIMarker from "./PSIMarker.js"
import WeatherMarker from "./WeatherMarker.js"

/**
 * Initialize a google map with the visible google map components and a standard location
 */
const Map = withScriptjs(withGoogleMap((props) =>{

  /**
   * Iterate through each dengue array object and passes
   * the object to DengueOverlay
   */
  const dengueClusters = props.dengue.map(dengue =>{
    let dengueCluster = <DengueOverlay
                          dengue={dengue}
                          key={dengue._id}
                          ></DengueOverlay>
      return dengueCluster
  })

  /**
   * Iterate through each emergency array object and passes
   * the obejct to EmergencyOverlay
   */
  const emergencyOverlays = props.emergency.map(emergency =>{
    let emergencyOverlay = <EmergencyOverlay
                            emergency={emergency}
                            key={emergency._id}
                            ></EmergencyOverlay>
      return emergencyOverlay
  })

  /**
   * Iterate through each psi array object and passes
   * the object to PSIMarker
   */
  const PSIMarkers = props.psi.map(psi =>{
    let psiMarker = <PSIMarker
                      psi={psi}
                      key={psi._id}
                      ></PSIMarker>
        return psiMarker
  })

  /**
   * Iterate through each weather array object and passes
   * the object to WeatherMarker
   */
  const weatherMarkers = props.weather.map(weather =>{
     let weatherMarker = <WeatherMarker
                          weather={weather}
                           key={weather._id}
                           ></WeatherMarker>
         return weatherMarker
   })

   
   let current;
   let weather =null;
   if(props.visibility_dengue)
   current = dengueClusters;
   else if(props.visibility_haze){
    current = PSIMarkers;
    weather = weatherMarkers;
   }
   else if(props.visibility_terrorist)
   current = emergencyOverlays;

   /**
    * Create the google map object with the standard location
    * Add in google map components that should be shown based on visibility
    * Returns google map object
    */
  return (

      <GoogleMap
        defaultZoom={13}
        center={ props.location }
        >
        {current}
        {weather}
        
      </GoogleMap>
    );
  }
))

export default Map;