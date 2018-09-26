import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
//import { Text } from 'react-elemenents'

import MapWithADirectionsRenderer from './teste'
import Places from './places'
import PlacesTwo from './placesTwo'

export default class index extends Component {
    newLat = parseFloat(localStorage.getItem('latitude'))
    newLng = parseFloat(localStorage.getItem('longitude'))
    state = {
        currentLocation: {
            lat: this.newLat,
            lng: this.newLng,
        },
        markerA: {
            lat: '',
            lng: '',
           // teste: []
        },
        markerB: {
            lat: '',
            lng: ''
        },
        teste: ''
    }
    
    componentWillMount() {
        //this.showCurrentLocation()
        this.getLocalization()
    }
   
    getLocalization() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
               
                localStorage.setItem('latitude', coords.latitude)
                localStorage.setItem('longitude', coords.longitude)
                
                /*this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })*/
            })
        } else {
            console.log("Não há suporte para esta versão do navegador !")
        }
       
    }
    setMarkerB = (geocodedPrediction) => {
        this.setState({ 
        markerB: {
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng()
            }
        })
    }
    setMarkerA = (geocodedPrediction) => {
        this.setState({ 
        markerA: {
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng(),
            }
        })
    }
    setText = (text) => {
        this.setState({
            teste: text
        })
    }

    render() {
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.itineraries'/>
            </PageHeader>
            <Box >
    
                <Places setMarkerA={this.setMarkerA.bind(this)}/>
                <PlacesTwo setMarkerB={this.setMarkerB.bind(this)} />
                <h1>{this.state.teste}</h1>
            
              
                <MapWithADirectionsRenderer 
                origin={{lat: this.state.markerA.lat, lng: this.state.markerA.lng}}
                destination={{lat: this.state.markerB.lat, lng: this.state.markerB.lng }}
                currentLocation={this.state.currentLocation}
                setText={this.setText.bind(this)}
               
               
                />
         
          </Box>
          </LayoutWrapper>
        )
    }
};


