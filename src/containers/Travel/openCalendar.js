import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Select, notification, Radio  } from 'antd'
import Form from '../../components/uielements/form'
import axios from '../../helpers/axios'



const FormItem = Form.Item
const Option = Select.Option;
const RadioGroup = Radio.Group;

class openCalendar extends Component {
    state = {
        confirmLoading: false,
        value: 2,
        valueStatus: 1,
        driversData: [],
        vehiclesData: [],
        itinerariesData: [],
        cartsData: [],
       
    }
    componentDidMount = () => {
        this.getAllDrivers()
        this.getAllVehicles()
        this.getAllCarts()
        this.getAllItineraries()
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
    report = () => {
        if(this.state.valueStatus === 1){
            var status = 'travels.status=finished'
        } else if (this.state.valueStatus === 2){
             status = 'travels.status=in_progress'
        } else if (this.state.valueStatus === 3 ){
             status = 'travels.status=canceled'
        }else {
             status = ''
        }

        if(this.props.info.key === '1') {
            var url = this.state.value === 2 ? `report/traveldate/arrivalDate/${this.props.info.data1}/${this.props.info.data2}/?${status}` :
        `report/traveldate/departureDate/${this.props.info.data1}/${this.props.info.data2}/?${status}`
        } else if (this.props.info.key === '5') {
             url = this.state.value === 2 ? `report/traveldate/arrivalDate/${this.props.info.data1}/${this.props.info.data2}/?travels.driver_id=${this.props.info.driver}&${status}` :
            `report/traveldate/departureDate/${this.props.info.data1}/${this.props.info.data2}/?travels.driver_id=${this.props.info.driver}&${status}`
        } else if (this.props.info.key === '6') {
             url = this.state.value === 2 ? `report/traveldate/arrivalDate/${this.props.info.data1}/${this.props.info.data2}/?travels.vehicle_id=${this.props.info.vehicle}&${status}` :
            `report/traveldate/departureDate/${this.props.info.data1}/${this.props.info.data2}/?travels.vehicle_id=${this.props.info.vehicle}&${status}`
        } else if (this.props.info.key === '7') {
             url = this.state.value === 2 ? `report/traveldate/arrivalDate/${this.props.info.data1}/${this.props.info.data2}/?travels.itinerary_id=${this.props.info.itinerary}&${status}` :
            `report/traveldate/departureDate/${this.props.info.data1}/${this.props.info.data2}/?travels.itinerary_id=${this.props.info.itinerary}&${status}`
        } else if (this.props.info.key === '8') {
            if(this.state.valueStatus === 1){
                 status = 'travels_status=finished'
            } else if (this.state.valueStatus === 2){
                 status = 'travels_status=in_progress'
            } else if (this.state.valueStatus === 3 ){
                 status = 'travels_status=canceled' //arrumar status na api
            }else {
                 status = ''
            }
             url = this.state.value === 2 ? `report/traveldate/arrivalDate/${this.props.info.data1}/${this.props.info.data2}/?cart_id=${this.props.info.cart}&${status}` :
            `report/traveldate/departureDate/${this.props.info.data1}/${this.props.info.data2}/?cart_id=${this.props.info.cart}&${status}`
        }

        
        if(this.props.info.data1 !== '' && this.props.info.data2 !== ''){
            if(this.props.info.key === 5 &&this.props.info.driver === ''){
                notification.warning({message: 'Selecione um motorista !'})
            }else if(this.props.info.key === 6 && this.props.info.vehicle === ''){
                notification.warning({message: 'Selecione um veículo !'})
            }
            else{
            axios.get(url)
            .then(response => {
                if(response.data === 'sucesso'){
                notification.success({message: 'Relatório criado com sucesso !'})
                this.setState({
                    confirmLoading: true
                })
                setTimeout(() => {
                    this.setState({
                        confirmLoading: false
                    })
                    window.open("http://localhost/laragon/uploads/viagem_data.pdf")
                }, 4000);
            
                } else if (response.data === 'Não existe dados'){
                    notification.warning({message: 'Não existe dados !'})
                } else {
                    notification.error({message: 'Erro ao gerar relatório !'})
                }
            })
            
            
            .catch(error => {
                notification.error({error: 'Não foi possivel criar o relatório !'})
                console.log(error)
            })
            }
        }else {
            notification.warning({message: 'Selecione uma data !'})
        }
     
    }
    onChange = (e) => {
        this.setState({
          value: e.target.value,
        });
    }
    onChangeStatus = (e) => {
        this.setState({
          valueStatus: e.target.value,
        });
    }

    
    render() {
       
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <Modal
            title='Emitir relatório'
            visible={this.props.open}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={400}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Voltar </Button>,
                <Button key='primary' type='primary' onClick={this.report} loading={this.state.confirmLoading}> Emitir </Button>,
            
                ]}
            >
             <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio  style={radioStyle} value={1}>Data de Partida</Radio>
                <Radio  style={radioStyle} value={2}>Data de Chegada</Radio>
             </RadioGroup>
             <div> Status: </div>
             <RadioGroup onChange={this.onChangeStatus} value={this.state.valueStatus}>
                <Radio style={radioStyle} value={1}>Concluída </Radio>
                <Radio style={radioStyle} value={2} >Em andamento</Radio>
                <Radio style={radioStyle} value={3}>Cancelada</Radio>
                <Radio style={radioStyle} value={4}>Todas</Radio>
             </RadioGroup>
            
             
            <Form>
                
          
                <Row> {this.props.info.key === '5' ? 
                <Col sm={20} xs={24} md={24}> 
                <FormItem label='Motorista' >
                <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha o motorista'}
                        onChange={e => this.props.onChangeAddDateInfo('driver', e) }
                        >
                     
                        {this.state.driversData.map(driver => 
                        <Option key={driver.id} >
                        
                        
                        {driver.name+' '} 
                         | CPF: {driver.cpf_number}

                         </Option>

                        )}
                        </Select> 
                            
                </FormItem>
                </Col>
                :
                    <div> </div>
                }
                {this.props.info.key === '6' ? 
                <Col sm={20} xs={24} md={24}> 
                <FormItem label='Veículo' >
                <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha um veículo'}
                        onChange={e => this.props.onChangeAddDateInfo('vehicle', e) }
                        >
                       
                       {this.state.vehiclesData.map(vehicle => 
                        <Option key={vehicle.id}>
                        {vehicle.brand+' '} 
                         | Modelo: {vehicle.model+' '} 
                         | Placa: {vehicle.plate+' '}
                        
                        </Option>
                        )}
                        </Select> 
                            
                </FormItem>
                </Col>
                :
                    <div> </div>
                }
                {this.props.info.key === '7' ? 
                <Col sm={20} xs={24} md={24}> 
                <FormItem label='Itinerário' >
                <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha um itinerário'}
                        onChange={e => this.props.onChangeAddDateInfo('itinerary', e) }
                        >
                       
                       {this.state.itinerariesData.map(itinerary => 
                        <Option 
                        key={itinerary.id}>
                        {itinerary.route_name+' '} | 
                        {itinerary.initial_point} até {itinerary.end_point}
                        
                        </Option>
                          
                    )}
                        </Select> 
                        
                        
                            
                </FormItem>
                </Col>
                :
                    <div> </div>
                }
                {this.props.info.key === '8' ? 
                <Col sm={20} xs={24} md={24}> 
                <FormItem label='Carreta' >
                <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha uma carreta'}
                        onChange={e => this.props.onChangeAddDateInfo('cart', e)}
                        >
                       
                       {this.state.cartsData.map(cart => 
                          <Option key={cart.id}>
                          {cart.brand+' '} 
                          | Modelo: {cart.model+' '}
                          | Tipo: {cart.type+' '}
                          | Placa: {cart.plate+' '}
                        </Option>
                    )}  
                
                        </Select> 
                        
                        
                            
                </FormItem>
                </Col>
                :
                    <div> </div>
                }
                
                 <Col sm={24} xs={24} md={16}> 
                            <FormItem label='Data Inicial' >
                                        <Input 
                                            type='date'
                                            placeholder='Data inicial'
                                            name='initial_date'
                                            onChange={e => this.props.onChangeAddDateInfo('data1', e.target.value)}
                                        />
                            </FormItem>
                    </Col>
                    
                     
                    <Col sm={24} xs={24} md={16}> 
                            <FormItem label='Data Final' >
                                        <Input 
                                            type='date'
                                            placeholder='Data final'
                                            name='final_date'
                                            onChange={e => this.props.onChangeAddDateInfo('data2', e.target.value)}
                                        />
                            </FormItem>
                    </Col>
                    
                   
                   
                 </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedOpenCalendar = Form.create()(openCalendar)
export default WrappedOpenCalendar
