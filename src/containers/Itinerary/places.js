import React, {Component} from "react"
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"

const MY_API_KEY = "AIzaSyC-ZSkQXDE7HBQf7a6umNX39pUnbB1kMhI" // fake

export default class GoogleSuggest extends React.Component {
    state = {
        search: "",
        value: "",
        lat: "",
        lng: ""
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest = (geocodedPrediction) => {
        this.setState({search: "", value: geocodedPrediction.formatted_address,
                        lat: geocodedPrediction.geometry.location.lat(),
                        lng: geocodedPrediction.geometry.location.lng()
                    })
        this.props.setMarkerA(geocodedPrediction)
    }
    
    render() {
        const {search, value, searchB, valueB } = this.state
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <GooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search, searchB
                                
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input style={{marginBottom: '10px', marginLeft: '10px'}}
                                type="text"
                                value={value}
                                placeholder="Cidade Inicial"
                                onChange={this.handleInputChange}
                            />
                        </GooglePlacesSuggest>
                        
                    )
                }
            />
            
            
        )
    }
}