import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { AutoComplete, Button, Form, Row, Col, Input, Switch, Icon, Tooltip, Select, notification } from 'antd'
import axios from '../../helpers/axios'

const Option = AutoComplete.Option;
const FormItem = Form.Item

class addTravel extends Component {
    state = {
        travelInfo: {
            driver_id: '',
            vehicle_id: '',
            carts_id: [],
            itinerary_id: '',
            departureDate: '',
            arrivalDate: '',
            description: '',
            status: 'canceled',
        },
        driversData: [],
        vehiclesData: [],
        cartsData: [],
        itinerariesData: [],
        name: '',
        confirmLoading: false
    }

    componentWillMount = () => {
       this.getAllDrivers()
       this.getAllVehicles()
       this.getAllCarts()
       this.getAllItineraries()
    }
    onChangeAddTravelInfo(key, value) {
        this.setState({
          travelInfo: {
            ...this.state.travelInfo,
            [key]: value
          }
          
        });

    }
    addTravel = () => {
        const { driver_id } = this.state.travelInfo;
        if (driver_id !== '' /*&& cpf_number !== '' && drivers_license !== '' && driversLicense_validate !== ''*/) {
          let newTravelInfo = {
            ...this.state.travelInfo
          };
          axios.post("travels", newTravelInfo)
            .then(response => {
              this.setState({
                confirmLoading: true
              });
              setTimeout(() => {
                this.setState({
                  confirmLoading: false
                });
                //this.handleAddClose();
                //this.componentWillMount()
              }, 2000);
              notification.success({message: 'Cadastrado com sucesso !'})
              
            })
            .catch(error => {
              notification.error({message: 'Não foi possivel cadastrar !'})
              console.log(error);
            });
        } else {
          notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
        }
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

    handleSearch = (value) => {
        fetch(value, data => this.setState({ data }));
    }
    

    render() {
        const { getFieldDecorator } = this.props.form;
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
                                showSearch
                                optionFilterProp="children"
                                placeholder={'Escolha o motorista'}
                                onChange={e => this.onChangeAddTravelInfo('driver_id', e) }
                                >
                               
                                {this.state.driversData.map(driver => 
                                <Option key={driver.id} >
                                
                                
                                {driver.name} 
                                 | CPF: {driver.cpf_number}

                                 </Option>
 
                                )}
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
                                showSearch
                                optionFilterProp="children"
                                onChange={e => this.onChangeAddTravelInfo('vehicle_id', e) }
                                >
                                {this.state.vehiclesData.map(vehicle => 
                                <Option key={vehicle.id}>
                                {vehicle.brand} 
                                 | Modelo: {vehicle.model} 
                                 | Placa: {vehicle.plate}
                                
                                </Option>
                                )}
                                    
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
                                showSearch
                                optionFilterProp="children"
                                placeholder={'Escolha a carreta'}
                                mode='multiple'
                                onChange={e => this.onChangeAddTravelInfo('carts_id', e) }
                                >
                                  {this.state.cartsData.map(cart => 
                                  <Option key={cart.id}>
                                  {cart.brand} 
                                  | Modelo: {cart.model} 
                                  | Placa: {cart.plate}
                                  
                                  </Option>)}
                                    
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
                                showSearch
                                optionFilterProp="children"
                                onChange={e => this.onChangeAddTravelInfo('itinerary_id', e) }
                                >
                                {this.state.itinerariesData.map(itinerary => 
                                    <Option 
                                    key={itinerary.id}>
                                    {itinerary.route_name} | 
                                    {itinerary.initial_point} até {itinerary.end_point}
                                    
                                    </Option>
                                      
                                )}
                                </Select> 
                                    
                                )}
                            </FormItem>
                            </Col>
                            </Row>
                        </Form> 
                    </Box>
                    <Box>
                        <h3>Informações complementares</h3>
                        <Form>
                        <Row gutter={12}>
                                <Col sm={24} xs={24} md={7}>
                                        <FormItem label='Data de partida' hasFeedback>
                                                {getFieldDecorator('departureDate', {
                                                     rules: [
                                                        {
                                                            required: true,
                                                            message: 'Campo obrigatório'
                                                        }
                                                    ]
                                                })(
                                                
                                                    <Input 
                                                    type='date'
                                                    placeholder='Data de partida'
                                                    name='departureDate'
                                                    onChange={e => this.onChangeAddTravelInfo('departureDate', e.target.value)}
                                                />
                                                    
                                                )}
                                        </FormItem>
                                </Col>
                                <Col sm={24} xs={24} md={7}>
                                        <FormItem label='Data de chegada' hasFeedback>
                                                {getFieldDecorator('arrivalDate', {
                                                     rules: [
                                                        {
                                                            required: true,
                                                            message: 'Campo obrigatório'
                                                        }
                                                    ]
                                                })(
                                                
                                                    <Input 
                                                    type='date'
                                                    placeholder='Data de chegada'
                                                    name='departureDate'
                                                    onChange={e => this.onChangeAddTravelInfo('arrivalDate', e.target.value)}
                                                />
                                                    
                                                )}
                                        </FormItem>
                                </Col>
                       
                            <Col sm={24} xs={24} md={7}>
                            <FormItem label='Status' hasFeedback>
                                {getFieldDecorator('status', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
 
                                <Select
                                placeholder={'Status'}
                                showSearch
                                optionFilterProp="children"
                                onChange={e => this.onChangeAddTravelInfo('status', e) }
                                >
                                <Option value='in_progress'>Em andamento </Option>
                                <Option value='finished'>Concluída </Option>
                                <Option value='canceled'>Cancelada </Option>
                                </Select> 
                                    
                                )}
                            </FormItem>
                            </Col>
                            </Row>
                        </Form>  
                    </Box>
                    
                    <Button key='submit' type='primary' loading={this.state.confirmLoading} 
                        onClick={this.addTravel}> Cadastrar 
                 </Button>
            </Box>
            </LayoutWrapper>
        )
    }
};
const WrappedAddTravel = Form.create()(addTravel)
export default WrappedAddTravel
