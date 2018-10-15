import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
//import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option

class viewVehicle extends Component {
    
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
                <Button key='primary' type='primary' onClick={window.print}> Imprimir </Button>,
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
                                    onChange={e => this.props.onChangeAddVehicleInfo('model', e.target.value)}
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
                                onChange={e => this.props.onChangeAddVehicleInfo('type', e)}
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
                                        onChange={e => this.props.onChangeAddVehicleInfo('year', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                            <FormItem label='KM atual' >
                                {getFieldDecorator('km_current', {
                                    initialValue: this.props.vehicleInfo.km_current,
                                })(
                                    <Input 
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='KM atual'
                                        name='km_current'
                                        onChange={e => this.props.onChangeAddVehicleInfo('km_current', e.target.value)}
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
                                        onChange={e => this.props.onChangeAddVehicleInfo('plate', e.target.value)}
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
                                        onChange={e => this.props.onChangeAddVehicleInfo('chassis_number', e.target.value)}
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
                                    <Input 
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Preço de Compra'
                                        name='purchase_price'
                                        onChange={e => this.props.onChangeAddVehicleInfo('purchase_price', e.target.value)}
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
                                        onChange={e => this.props.onChangeAddVehicleInfo('purchase_date', e.target.value)}
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
                                    <Input 
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Preço de Venda'
                                        name='sale_value'
                                        onChange={e => this.props.onChangeAddVehicleInfo('sale_value', e.target.value)}
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
                        onChange={e => this.props.onChangeAddVehicleInfo('status', e)}
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
