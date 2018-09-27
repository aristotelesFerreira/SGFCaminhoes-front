import React, { Component}  from 'react';
import { mapPropsStreamWithConfig } from 'recompose';
const { compose, withProps, lifecycle } = require("recompose");

/*global google*/

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-ZSkQXDE7HBQf7a6umNX39pUnbB1kMhI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
 
  withScriptjs,
  withGoogleMap,
  lifecycle({
    setTeste() {
      if(this.props.update == true ){
        console.log('teste')
       // this.componentDidMount()
      }
    },
    componentDidUpdate() {
      //console.log(this.props.origin)
      if(this.props.origin.lat !== '' && this.props.destination.lat !== ''){
        const DirectionsService = new google.maps.DirectionsService();
       
        DirectionsService.route({
          origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),//{lat: this.props.origin.lat , lng: this.props.origin.lng} ,
          destination: new google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),//{lat: this.props.destination.lat, lng: this.props.destination.lng},
          travelMode: google.maps.TravelMode.DRIVING,
          
        }, (result, status) => {
          
          if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });

            this.props.setText(result.routes[0])
          } else {
            //console.error(`error fetching directions ${result}`);
          } 
        });
        } else {
          console.log('erro n entrou')
      }
    },
    /*componentDidUpdate(){
      this.props.update === true ? this.setTeste() : console.log('nao deu')
     
    }*/
  })
)(props =>

  <GoogleMap 
  //  -15.859545400000002 8882269
    defaultZoom={9}
    defaultCenter={{lat: props.currentLocation.lat , lng: props.currentLocation.lng}}
  //setCenter={{ lat: -15.859545400000002, lng: -50.8882269}}
  > 
  
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);


export default MapWithADirectionsRenderer