import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import InputMask from 'react-input-mask'
import CurrencyInput from 'react-currency-input';

const FormItem = Form.Item
const Option = Select.Option

class addVehicle extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Adicionar Veículo'
            visible={this.props.openAddModal}
            onOk={this.props.addVehicle}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.addVehicle}> Salvar 
                 </Button>
            ]}
            >
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                      <FormItem label='Marca' hasFeedback>
                        {getFieldDecorator('brand', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <Input
                              type='text'
                              placeholder='Marca'
                              name='brand'
                              maxLength={50}
                              onChange={e => this.props.onChangeAddVehicleInfo('brand', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Modelo' hasFeedback>
                            {getFieldDecorator('model', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',          
                                    }
                                ]
                            })(
                                <Input              
                                    type='text'
                                    placeholder='Modelo'
                                    name='model'
                                    maxLength={50}
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
                            </span> )} hasFeedback>
                            {getFieldDecorator('type', {
                                
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
                                >       
                                    <Option value='Vuc'>VUC</Option>
                                    <Option value="Leve">3/4 (Leve)</Option>
                                    <Option value="Semi Pesado">Toco (Semi Pesado)</Option>
                                    <Option value="Pesado">Truck (Pesado)</Option>
                                    <Option value="Cavalo Mecanico">Cavalo Mecanico</Option>
                                    <Option value="Cavalo Mecanico Truck">Cavalo Mec. Truck</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={4}>
                            <FormItem label='Ano' hasFeedback>
                                {getFieldDecorator('year', {
                                    rules: [
                                        /*{
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }*/
                                    ]
                                })(
                                    <Input 
                                        type='number'
                                        placeholder='Ano'
                                        name='year'
                                        maxLength={4}
                                        onChange={e => this.props.onChangeAddVehicleInfo('year', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                            <FormItem label='KM atual' hasFeedback>
                                {getFieldDecorator('km_current', {
                                    initialValue: this.props.vehicleInfo.km_current,
                                    
                                })(
                                    <CurrencyInput  className="ant-input"
                                    decimalSeparator="," 
                                    placeholder='KM atual'
                                    name='km_current'
                                    thousandSeparator="."
                                    onChange={e => this.props.onChangeAddVehicleInfo('km_current', e)}
                                    maxLength={14}
                                    />
                                 
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label='Placa' hasFeedback>
                                {getFieldDecorator('plate', {
                                    initialValue: this.props.vehicleInfo.plate,
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <InputMask  className="ant-input"
                                            mask={'aaa-9999'} 
                                            type='text'
                                            placeholder='Placa'
                                            name='plate'
                                            onChange={e => this.props.onChangeAddVehicleInfo('plate', e.target.value)}
                                        />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Número do Chassis' hasFeedback>
                                {getFieldDecorator('chassis_number', {
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <Input 
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
                        <FormItem label='Preço de Compra R$' hasFeedback>
                                {getFieldDecorator('purchase_price', {
                                    initialValue: this.props.vehicleInfo.purchase_price,
                                   
                                })(
                                    
                                    <CurrencyInput  className="ant-input"
                                    decimalSeparator="," 
                                    placeholder='Preço de Compra'
                                    name='purchase_price'
                                    thousandSeparator="."
                                    onChange={e => this.props.onChangeAddVehicleInfo('purchase_price', e)}
                                    maxLength={14}
                                    />
                                  
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data da Compra' hasFeedback>
                                    {getFieldDecorator('purchase_date', {
                                         rules: [
                                            {
                                                required: true,
                                                message: 'Campo obrigatório'
                                            }
                                         ]
                                    })(
                                       
                                        <Input 
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
                        <FormItem label='Preço de Venda R$' hasFeedback>
                                {getFieldDecorator('sale_value', {
                                    initialValue: this.props.vehicleInfo.sale_value,
                                })(

                                    <CurrencyInput  className="ant-input"
                                    decimalSeparator="," 
                                    placeholder='Preço de Venda'
                                    name='sale_value'
                                    thousandSeparator="."
                                    onChange={e => this.props.onChangeAddVehicleInfo('sale_value', e)}
                                    maxLength={14}
                                    />
                                  
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} defaultChecked
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

const WrappedAddVehicle = Form.create()(addVehicle)
export default WrappedAddVehicle
