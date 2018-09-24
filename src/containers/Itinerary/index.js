import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";

import Map from './map'

export default class index extends Component {
    newLat = localStorage.getItem('latitude')
    newLng = localStorage.getItem('longitude')
    state = {
        currentLocation: {
            lat: this.newLat,
            lng: this.newLng,
        },
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
 
    render() {
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.itineraries'/>
            </PageHeader>
            <Box>
            <Map
            currentLocation={this.state.currentLocation}
        
           
           />
            
            </Box>
            </LayoutWrapper>
        )
    }
};


