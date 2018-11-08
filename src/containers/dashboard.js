import React, { Component } from 'react';
import LayoutWrapper from "../components/utility/layoutWrapper.js";
import { Progress } from 'antd';
import axios from '../helpers/axios'
import { Box } from "./Cart/index.style";
import { Form, Row, Col } from 'antd'

export default class extends Component {

  state = {
    travelInProgress: [],
    travelFinished: [],
    travelCanceled: []
  }
  componentWillMount() {
    this.getLocalization()
    this.contTravelInProgress()
    this.contTravelFinished()
    this.contTravelCanceled()
  }
  contTravelInProgress(){
    axios.get('travels?status=in_progress')
    .then(response => {
      this.setState({
        travelInProgress: response.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  contTravelFinished(){
    axios.get('travels?status=finished')
    .then(response => {
      this.setState({
        travelFinished: response.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  contTravelCanceled(){
    axios.get('travels?status=canceled')
    .then(response => {
      this.setState({
        travelCanceled: response.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
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
        <LayoutWrapper>
          <h1>Olá, {localStorage.getItem('userName')}</h1>
          <Box>
            <Box>
              <h2>Informações sobre as viagens</h2>
             <Form>
                  <Row gutter={12}>
                      <Col sm={24} xs={24} md={8}>
                        <div>
                          <h2>Concluídas</h2>
                          <Progress 
                          type="circle" 
                          percent={100} 
                          format={percent =>  this.state.travelFinished.length }/>
                        </div>
                      </Col>
                      
                      <Col sm={24} xs={24} md={8}>
                        <div>
                          <h2>Em andamento</h2>
                          <Progress 
                          type="circle" 
                          percent={99}
                          format={percent =>  this.state.travelInProgress.length }/>

                        </div>
                      </Col>
                      <Col sm={24} xs={24} md={8}>
                        <div>
                          <h2>Canceladas</h2>
                          <Progress 
                          type="circle" 
                          percent={100} 
                          status="exception" 
                          format={percent =>  this.state.travelCanceled.length }/>
                        </div>
                      </Col>
                  </Row>
            </Form>
          </Box>
        </Box>
        </LayoutWrapper>
    );
  }
}
