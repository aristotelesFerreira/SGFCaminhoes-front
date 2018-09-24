import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



class map extends Component {
    constructor(props) {
        super(props);
        const {lat, lng} = this.props.currentLocation;
        console.log(lat +' '+ lng)
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }

    
   
    render() {
        return (
            <Map
            initialCenter={{lat: this.state.currentLocation.lat , lng: this.state.currentLocation.lng}}
            google={this.props.google} 
            zoom={15}
            
            >
                <Marker 
                    onClick={this.onMarkerClick}
                    name={'Current location'} />

               {/* <InfoWindow onClose={this.onInfoWindowClose}>
                   
        </InfoWindow> */}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC-ZSkQXDE7HBQf7a6umNX39pUnbB1kMhI')
  })(map)