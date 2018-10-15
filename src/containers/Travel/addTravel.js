import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { AutoComplete, Button, Form, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import axios from '../../helpers/axios'

const Option = AutoComplete.Option;
const FormItem = Form.Item

function renderOption(item) {
    return (
      <Option key={item.category} text={item.category}>
        {item.query} 在
        <a
          href={`https://s.taobao.com/search?q=${item.query}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.category}
        </a>
        区块中
        <span className="global-search-item-count">约 {item.count} 个结果</span>
      </Option>
    );
}

function onSelect(value) {
    console.log(value);
  }

class addTravel extends Component {
    state = {
        travelInfo: {
            driver_name: ''
        },
        driversData: [],
        vehiclesData: [],
        cartsData: [],
        itinerariesData: []
    }

    componentWillMount = () => {
       this.getAllDrivers()
       this.getAllVehicles()
       this.getAllCarts()
       this.getAllItineraries()
    }
    onChangeAddTravelInfo(key, value) {
        this.setState({
          driversInfo: {
            ...this.state.travelInfo,
            [key]: value
          }
        });
    }
    getAllDrivers() {
        axios.get('drivers')
        .then(response => {
          this.setState({
            driversData:  response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
    getAllVehicles() {
        axios.get('vehicles')
        .then(response => {
            this.setState({
                vehiclesData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    getAllCarts() {
        axios.get('carts')
        .then(response => {
            this.setState({
                cartsData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    getAllItineraries() {
        axios.get('itineraries')
        .then(response => {
            this.setState({
                itinerariesData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const drivers = this.state.driversData.map(driver => <Option key={driver.id}>{driver.name} | CPF: {driver.cpf_number}</Option>);
        const vehicles = this.state.vehiclesData.map(vehicle => <Option key={vehicle.id}>{vehicle.brand} | Modelo: {vehicle.model} | Placa: {vehicle.plate}</Option>);
        const carts = this.state.cartsData.map(cart => <Option key={cart.id}>{cart.brand} | Modelo: {cart.model} | Placa: {cart.plate}</Option>);
        const itineraries = this.state.itinerariesData.map(itinerary => <Option key={itinerary.id}>{itinerary.route_name} | {itinerary.initial_point} até {itinerary.end_point}</Option>);
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.new_travel'/>
            </PageHeader>
            <Box>
                <h3>Motorista</h3>
                    <Box>
                        <Form>
                        <Row gutter={12}>
                            <Col sm={24} xs={24} md={12}>
                            <FormItem label='Nome' hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
 
                                <Select
                                placeholder={'Escolha o motorista'}
                                >
                                    {drivers}
                                </Select> 
                                    
                                )}
                              
                            </FormItem>
                            </Col>
                            </Row>
                        </Form>
                    </Box>
                <h3>Veículo</h3>
                    <Box>
                    <Form>
                        <Row gutter={12}>
                            <Col sm={24} xs={24} md={12}>
                            <FormItem label='Veículo' hasFeedback>
                                {getFieldDecorator('vehicle', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
 
                                <Select
                                placeholder={'Escolha o veículo'}
                                >
                                    {vehicles}
                                    
                                </Select> 
                                    
                                )}
                              
                            </FormItem>
                            </Col>
                            </Row>
                        </Form>

                    </Box>
                <h3>Carretas</h3>
                    <Box>
                    <Form>
                        <Row gutter={12}>
                            <Col sm={24} xs={24} md={12}>
                            <FormItem label='Carretas' hasFeedback>
                                {getFieldDecorator('carts', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
 
                                <Select
                                placeholder={'Escolha a carreta'}
                                >
                                    {carts}
                                    
                                </Select> 
                                    
                                )}
                              
                            </FormItem>
                            </Col>
                            </Row>
                        </Form>

                    </Box>
                      <Box>
                        <h3>Itinerário</h3>
                        <Form>
                        <Row gutter={12}>
                            <Col sm={24} xs={24} md={12}>
                            <FormItem label='Itinerário' hasFeedback>
                                {getFieldDecorator('itinerary', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
 
                                <Select
                                placeholder={'Escolha a rota'}
                                >
                                    {itineraries}
                                    
                                </Select> 
                                    
                                )}
                              
                            </FormItem>
                            </Col>
                            </Row>
                        </Form> 
                    </Box>
            </Box>
            </LayoutWrapper>
        )
    }
};
const WrappedAddTravel = Form.create()(addTravel)
export default WrappedAddTravel
