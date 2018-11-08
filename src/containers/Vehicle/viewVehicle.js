import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import axios from '../../helpers/axios'
import { notification } from 'antd';
import CurrencyInput from 'react-currency-input';
//import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option

class viewVehicle extends Component {

    report = () => {
        axios.get(`report/vehicle/${this.props.vehicleInfo.uuid}`)
        .then(response => {
            if(response.data === 'sucesso'){
            notification.success({message: 'Relatório criado com sucesso !'})
            setTimeout(() => {
                window.open("http://localhost/laragon/uploads/veiculo.pdf")
            }, 3000);
            }else {
                notification.warning({message: 'Não foi possivel gerar o relatório !'})
            }
        })
          .catch(error => {
            notification.success({error: 'Não foi possivel criar o relatório !'})
            console.log(error)
        })

    }
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Visualizar Veículo'
            visible={this.props.open}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='primary' type='primary' onClick={this.report}> Gerar Relatório </Button>,
            ]}
            >
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                      <FormItem label='Marca'>
                        {getFieldDecorator('brand', {
                            initialValue: this.props.vehicleInfo.brand,
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <Input
                              style={{color: 'black', fontWeight: 'bold'}}
                              disabled
                              type='text'
                              placeholder='Marca'
                              name='brand'
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Modelo' >
                            {getFieldDecorator('model', {
                                 initialValue: this.props.vehicleInfo.model,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',          
                                    }
                                ]
                            })(
                                <Input
                                    style={{color: 'black', fontWeight: 'bold'}} 
                                    disabled           
                                    type='text'
                                    placeholder='Modelo'
                                    name='model'
                                  
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label={( <span>
                            Tipo&nbsp;
                            <Tooltip title="Exemplos: Cavalo Mecanico">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )} >
                            {getFieldDecorator('type', {
                                 initialValue: this.props.vehicleInfo.type,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório'
                                    }
                                ]
                            })(
                                <Select 
                                placeholder='Tipo'
                                name='type'
                               
                                disabled
                                style={{color: 'black', fontWeight: 'bold'}}
                                >       
                                    <Option value='Vuc'>VUC</Option>
                                    <Option value="Leve">3/4 (Leve)</Option>
                                    <Option value="Semi Pesado">Toco (Semi Pesado)</Option>
                                    <Option value="Pesado">Truck (Pesado)</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={4}>
                            <FormItem label='Ano' >
                                {getFieldDecorator('year', {
                                    initialValue: this.props.vehicleInfo.year,
                                })(
                                    <Input
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Ano'
                                        name='year'
                                        
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                            <FormItem label='KM atual' >
                                {getFieldDecorator('km_current', {
                                    initialValue: this.props.vehicleInfo.km_current,
                                })(
                                    <CurrencyInput  className="ant-input"
                                    style={{color: 'black', fontWeight: 'bold'}}
                                    decimalSeparator="," 
                                    placeholder='KM atual'
                                    name='purchase_price'
                                    thousandSeparator="."
                                    disabled
                                    
                                    />
                                   
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label='Placa' >
                                {getFieldDecorator('plate', {
                                     initialValue: this.props.vehicleInfo.plate,
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <Input
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='text'
                                        placeholder='Placa'
                                        name='plate'
                                       
                                        />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Número do Chassis' >
                                {getFieldDecorator('chassis_number', {
                                     initialValue: this.props.vehicleInfo.chassis_number,
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <Input 
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='text'
                                        maxLength={17}
                                        placeholder='Número do Chassis'
                                        name='chassis_number'
                                       
                                        />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Preço de Compra' >
                                {getFieldDecorator('purchase_price', {
                                    initialValue: this.props.vehicleInfo.purchase_price,
                                })(
                                    <CurrencyInput  className="ant-input"
                                    style={{color: 'black', fontWeight: 'bold'}}
                                    decimalSeparator="," 
                                    prefix="R$"
                                    placeholder='Preço de Compra'
                                    name='purchase_price'
                                    thousandSeparator="."
                                    disabled
                                    />
                                   
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data da Compra' >
                                    {getFieldDecorator('purchase_date', {
                                        initialValue: this.props.vehicleInfo.purchase_date,
                                    })(
                                       
                                        <Input
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='date'
                                        placeholder='Data da Compra'
                                        name='purchase_date'
                                      
                                    />
                                          
                                    )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Preço de Venda' >
                                {getFieldDecorator('sale_value', {
                                    initialValue: this.props.vehicleInfo.sale_value,
                                })(
                                    <CurrencyInput  className="ant-input"
                                    style={{color: 'black', fontWeight: 'bold'}}
                                    decimalSeparator="," 
                                    prefix="R$"
                                    placeholder='Preço de Venda'
                                    name='purchase_price'
                                    thousandSeparator="."
                                    disabled
                                    />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        <Switch
                        style={{color: 'black', fontWeight: 'bold'}}
                        disabled
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />}
                        defaultChecked = {this.props.vehicleInfo.status === 1 ? this.defaultChecked = true : this.defaultChecked = false}
                        name='status'
                     
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedViewVehicle = Form.create()(viewVehicle)
export default WrappedViewVehicle
