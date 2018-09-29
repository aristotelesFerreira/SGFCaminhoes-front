//import PropTypes from "prop-types"
import React from "react"
import GoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { Input } from 'antd'

const MY_API_KEY = "AIzaSyC-ZSkQXDE7HBQf7a6umNX39pUnbB1kMhI" // fake

export default class GoogleSuggest extends React.Component {
    
    state = {
        search: "",
        value: "",
        lat: "",
        lng: ""
    }

    handleInputChange = e => {
        this.setState({
            search: e.target.value, value: e.target.value}) 
    }

      handleSelectSuggest = (geocodedPrediction) => {
        //console.log(this.state.value)
        this.setState({search: "", value: geocodedPrediction.formatted_address,
                        lat: geocodedPrediction.geometry.location.lat(),
                        lng: geocodedPrediction.geometry.location.lng()
                    })
            this.props.setMarkerA(geocodedPrediction)
    }
    
    render() {
        const {search, value } = this.state
        return (
           
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                       
                        <ReactGooglePlacesSuggest 
                            googleMaps={googleMaps}
                            autocompletionRequest={{ input: search}}
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="Nenhum resultado encontrado" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <Input style={{marginBottom: '10px'}}
                                type="text"
                                value={value}
                                placeholder="Cidade Inicial"
                                onChange={this.handleInputChange}
                        />
                        </ReactGooglePlacesSuggest >
                        
                    )
                }
            />
            
            
        )
    }
}
