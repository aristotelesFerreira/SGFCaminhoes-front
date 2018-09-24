import React, { Component } from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';

export default class extends Component {

  componentWillMount() {
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
    
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Sistema para Gerenciamento de Frotas de Caminhões</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
