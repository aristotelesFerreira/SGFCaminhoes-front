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
import { Button, notification } from 'antd';
import axios from '../../helpers/axios'

export default class index extends Component {
    newLat = parseFloat(localStorage.getItem('latitude'))
    newLng = parseFloat(localStorage.getItem('longitude'))
    state = {
        currentLocation: {
            lat: this.newLat,
            lng: this.newLng,
        },
        markerA: {
            address: '',
            lat: '',
            lng: '',
           // teste: []
        },
        markerB: {
            address: '',
            lat: '',
            lng: ''
        },
        distance: [],
        time: [],
        update: false,
        status: true
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
    setMarkerA = (geocodedPrediction) => {
        this.setState({ 
        markerA: {
            address: geocodedPrediction.formatted_address,
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng(),
            }
        })
        //console.log(this.state.markerA)
    }
    setMarkerB = (geocodedPrediction) => {
        this.setState({ 
        markerB: {
            address: geocodedPrediction.formatted_address,
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng()
            }
        })
    }
   
    setText = (text) => {
        this.setState({
            distance: text.legs[0].distance,
            time: text.legs[0].duration
        })
       // console.log(this.state.distance)
    }
    addItinerary = () => {
        console.log(this.state.markerA)
        console.log(this.state.markerB)
        console.log(this.state.distance)
        console.log(this.state.time)
        let newItineraryInfo = {
            route_name: this.state.markerA.address +' A '+ this.state.markerB.address,
            initial_point: this.state.markerA.address,
            lat_initial: this.state.markerA.lat,
            lng_initial: this.state.markerA.lng,
            end_point: this.state.markerB.address,
            lat_end: this.state.markerB.lat,
            lng_end: this.state.markerB.lng,
            distance: this.state.distance.value,
            observation: this.state.markerA.lat,
            status: this.state.status
        }
        axios.post('itineraries', newItineraryInfo)
            .then(response => {
                notification.success({message: 'Cadastrado com sucesso'})
            })
            .catch(error => {
                notification.error({message: 'Não foi possivel cadastrar'})
                console.log(error)
            })
    }

    /*setTeste = () => {
        this.setState({
            update: true
        })
        setTimeout(() => {
            this.setState({
            update: false
            })
          }, 5000);
    }*/

    render() {
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.itineraries'/>
            </PageHeader>
            <Box >
               
                <Places setMarkerA={this.setMarkerA.bind(this)}/>
                <PlacesTwo setMarkerB={this.setMarkerB.bind(this)} />
                <h4  style={{marginLeft: '10px'}}>Distância: {this.state.distance.text}</h4>
                <h4  style={{marginLeft: '10px'}}>Tempo Aprox: {this.state.time.text}</h4>
            
                <Button onClick={this.addItinerary}> Adicionar </Button>
                <MapWithADirectionsRenderer 
                origin={this.state.markerA}
                destination={this.state.markerB}
                currentLocation={this.state.currentLocation}
                setText={this.setText.bind(this)}
                update={this.state.update}
               
                />
               
          </Box>
          </LayoutWrapper>
        )
    }
};


