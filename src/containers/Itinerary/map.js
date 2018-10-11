import React  from 'react';
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
    
    componentDidMount() {
      if(this.props.itinerariesInfo.lat_initial !== '' && this.props.itinerariesInfo.lat_end !== ''){
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: new google.maps.LatLng(this.props.itinerariesInfo.lat_initial, this.props.itinerariesInfo.lng_initial),//{lat: this.props.origin.lat , lng: this.props.origin.lng} ,
          destination: new google.maps.LatLng(this.props.itinerariesInfo.lat_end, this.props.itinerariesInfo.lng_end),//{lat: this.props.destination.lat, lng: this.props.destination.lng},
          travelMode: google.maps.TravelMode.DRIVING,
          
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
           
            this.setState({
              directions: result,
            });
           
            this.props.setText(result.routes[0])
            setTimeout(() => {
              if(this.props.itinerariesInfo.lat_initial !== '')
              this.componentDidMount()
            }, 10000)
         
          } else {
            console.error(`error fetching directions ${result}`);
          } 
        });
        } 
        else {
          setTimeout(() => {
            this.componentDidMount()
          }, 5000)
      }
     
    },
    componentWillUnmount(){
      this.props.itinerariesInfo.lat_initial = ''
    },

  })
)(props =>

  <GoogleMap 
    defaultZoom={9}
    defaultCenter={{lat: props.currentLocation.lat , lng: props.currentLocation.lng}}
  > 
  
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);


export default MapWithADirectionsRenderer