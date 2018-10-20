import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { AutoComplete, Button, Form, Row, Col, Input, Switch, Icon, Tooltip, Select, message, notification, Steps } from 'antd'
import axios from '../../helpers/axios'

const Option = AutoComplete.Option;
const FormItem = Form.Item
const Step = Steps.Step;


class editTravel extends Component {
    state = {
        novo: [],
        current: 0,
        driver: [],
        vehicle: [],
        carts: [],
        itinerary: [],
        travelInfo: {
            driver_id: '',
            vehicle_id: '',
            carts_id: [],
            itinerary_id: '',
            departureDate: '',
            arrivalDate: '',
            description: '',
            status: '',
        },
        driversData: [],
        vehiclesData: [],
        cartsData: [],
        itinerariesData: [],
        confirmLoading: false
    }

    componentWillMount = () => {
        axios.get(`travels/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            travelInfo: {
                driver_id: response.data.driver.id,
                vehicle_id: response.data.vehicle.id,
                carts_id: response.data.carts,
                itinerary_id: response.data.itinerary.id,
                departureDate: response.data.departureDate,
                arrivalDate: response.data.arrivalDate,
                status: response.data.status
            },
            /*driver: response.data.driver,
            vehicle: response.data.vehicle,
            carts: response.data.carts,
            itinerary: response.data.itinerary*/
          })
        })
        .catch(error => {
          console.log(error)
        })
       this.getAllDrivers()
       this.getAllVehicles()
       this.getAllCarts()
       this.getAllItineraries()
       
       
    }
    next() {
        if(this.state.travelInfo.driver_id !== '') {
            const current = this.state.current + 1;
            this.setState({ current });
        }
        else{
            notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
        }
        
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
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
        const { driver_id, vehicle_id, itinerary_id, departureDate, arrivalDate, status } = this.state.travelInfo;
        if (driver_id !== '' && vehicle_id !== '' && itinerary_id !== '' && departureDate !== '' && arrivalDate !== '' && status !== '') {
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
                this.handleIndex()
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
        axios.get('drivers?status=1')
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
        axios.get('vehicles?status=1')
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
        axios.get('carts?status=1')
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
        axios.get('itineraries?status=1')
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
    handleIndex() {
        this.props.history.push("travels");
    }
   

    render() {

        const driversOptions = []
        const cartsOptions = []
        const vehicleOptions = []
        const cartsIds = []

        for (let i = 0; i < this.state.travelInfo.carts_id.length; i++){
           cartsIds.push(this.state.travelInfo.carts_id[i].id)
          
          
        }
        console.log(this.state.travelInfo.carts_id)
       
        for (let i = 0; i < this.state.driversData.length; i++) {
            driversOptions.push(<Option key={this.state.driversData[i].id} value={this.state.driversData[i].id}>
            { this.state.driversData[i].name+' '} 
            | CPF: {this.state.driversData[i].cpf_number}
            </Option>);
        }
 
        for (let i = 0; i < this.state.vehiclesData.length; i++) {
            vehicleOptions.push(<Option key={this.state.vehiclesData[i].id} value={this.state.vehiclesData[i].id}>
             {this.state.vehiclesData[i].brand+' '} 
            | Modelo: {this.state.vehiclesData[i].model+' '}
            | Placa: {this.state.vehiclesData[i].plate+' '}
            </Option>);
        }

        for (let i = 0; i < this.state.cartsData.length; i++) {
            cartsOptions.push(<Option key={this.state.cartsData[i].id} value={this.state.cartsData[i].id}>
             {this.state.cartsData[i].brand+' '} 
            | Modelo: {this.state.cartsData[i].model+' '}
            | Tipo: {this.state.cartsData[i].type+' '}
            | Placa: {this.state.cartsData[i].plate+' '}
            </Option>);
        }

     
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const steps = [{
            title: 'Escolha o Motorista',
            content: 
           
                <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Motorista' hasFeedback>
                        
                    {getFieldDecorator('driver', {
                            initialValue: this.state.travelInfo.driver_id,
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
                        onChange={e => this.onChangeAddTravelInfo('driver_id', e)}
                        >
                       
                       {driversOptions}
                        
                        </Select> 
                         )}   
                      
                      
                    </FormItem>
                    </Col>
                    </Row>
                </Form>
            
          }, {
            title: 'Escolha o Veículo',
            content:
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Veículo' hasFeedback>
                        {getFieldDecorator('vehicle', {
                            initialValue: this.state.travelInfo.vehicle_id,
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
                        {vehicleOptions}
                        </Select>    
                        )}
                    </FormItem>
                    </Col>
                    </Row>  
                </Form>      
          }, 
          {
            title: 'Escolha as Carretas',
            content: 
           
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Carretas' hasFeedback>
                        {getFieldDecorator('carts', {
                            initialValue:cartsIds
                            //initialValue:[4,3],
                        
                           
                        })(
                        <Select
                        
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha a carreta'}
                        mode='multiple'
                        onChange={e => this.onChangeAddTravelInfo('carts_id', e) }
                       
                        >
                        {cartsOptions}
                         
                            
                        </Select> 
                        )} 
                    
                      
                    </FormItem>
                    </Col>
                    </Row>
                </Form>

          
          },
          {
            title: 'Escolha o Itinerário',
            content: 
            
            <Form>
            <Row gutter={12}>
                <Col sm={24} xs={24} md={12}>
                <FormItem label='Itinerário' hasFeedback>
                    {getFieldDecorator('itinerary', {
                        initialValue: this.state.itinerary.route_name+' | '+this.state.itinerary.initial_point+ 'até '+this.state.itinerary.end_point,
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
                    onChange={e => this.onChangeAddTravelInfo('itinerary_id', e)}
                    >
                    {this.state.itinerariesData.map(itinerary => 
                        <Option 
                        key={itinerary.id}>
                        {itinerary.route_name+' '} | 
                        {itinerary.initial_point} até {itinerary.end_point}
                        
                        </Option>
                          
                    )}
                    </Select> 
                        
                    )}
                </FormItem>
                </Col>
                </Row>
            </Form> 
       
          },
          {
            title: 'Informações complementares',
            content: 
            
            <Form>
            <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de partida' hasFeedback>
                                    {getFieldDecorator('departureDate', {
                                         initialValue: this.state.travelInfo.departureDate,
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
                                         initialValue: this.state.travelInfo.arrivalDate,
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
                         initialValue: this.state.travelInfo.status,
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
       
          }
          
          
        ]
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.new_travel'/>
            </PageHeader>
            <Box>
            <div>
        <Steps current={current} >
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Próximo</Button>
          }
          {
            current === steps.length - 1
            &&  <Button key='submit' type='primary' loading={this.state.confirmLoading} 
                onClick={this.addTravel}> Cadastrar
                </Button>
                /*
                 <Link to ="travels">
                <Button key='submit' type='default'> 
                    Cancelar
                
                 </Button>
                </Link>
                */
          }
         
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Voltar
            </Button>
            )
          }
        </div>
      </div>
                
                      
                    </Box>
            </LayoutWrapper>
        )
    }
};
const WrappedEditTravel = Form.create()(editTravel)
export default WrappedEditTravel
