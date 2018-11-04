import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import axios from '../../helpers/axios'
import { notification } from 'antd';
//import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option

class viewCart extends Component {

    report = () => {
        axios.get(`report/cart/${this.props.cartsInfo.uuid}`)
        .then(response => {
            notification.success({message: 'Relatório criado com sucesso !'})
            setTimeout(() => {
                window.open("http://localhost/laragon/uploads/carreta.pdf")
            }, 3000);
           
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
            title='Visualizar Carreta'
            visible={this.props.open}
            onOk={this.props.addCart}
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
                      <FormItem label='Marca' hasFeedback>
                        {getFieldDecorator('brand', {
                            initialValue: this.props.cartsInfo.brand,
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
                        <FormItem label='Modelo' hasFeedback>
                            {getFieldDecorator('model', {
                                initialValue: this.props.cartsInfo.model,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',          
                                    }
                                ]
                            })(
                                <Input
                                    style={{color: 'black', fontWeight: 'bold'}}       
                                    type='text'
                                    placeholder='Modelo'
                                    name='model'
                                    disabled
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label={( <span>
                            Tipo&nbsp;
                            <Tooltip title="Exemplos: Três Eixos">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )} hasFeedback>
                            {getFieldDecorator('type', {
                                initialValue: this.props.cartsInfo.type,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório'
                                    }
                                ]
                            })(
                                <Select 
                                style={{color: 'black', fontWeight: 'bold'}}
                                placeholder='Tipo'
                                name='type'
                                disabled
                                >       
                                    <Option value='dois eixos'>Dois Eixos</Option>
                                    <Option value="tres eixos">Três Eixos</Option>
                                    <Option value="dolly">Dolly</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                 </Row>
                 <Row gutter={12}>
                    <Col sm={24} xs={24} md={14}>
                      <FormItem label='Descrição' hasFeedback>
                        {getFieldDecorator('description', {
                            initialValue: this.props.cartsInfo.description,
                        })(
                            <Input
                              style={{color: 'black', fontWeight: 'bold'}}
                              type='text'
                              placeholder='Descrição'
                              name='description'
                              disabled
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Capacidade' hasFeedback>
                                {getFieldDecorator('capacity', {
                                    initialValue: this.props.cartsInfo.capacity,
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Capacidade'
                                        name='capacity'
                                        disabled
                                    />
                                )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={4}>
                            <FormItem label='Ano' hasFeedback>
                                {getFieldDecorator('year', {
                                    initialValue: this.props.cartsInfo.year,
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Ano'
                                        name='year'
                                        disabled
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                            <FormItem label='KM atual' hasFeedback>
                                {getFieldDecorator('km_current', {
                                    initialValue: this.props.cartsInfo.km_current,
                                })(
                                    <Input 
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='KM atual'
                                        name='km_current'
                                        disabled
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label='Placa' hasFeedback>
                                {getFieldDecorator('plate', {
                                    initialValue: this.props.cartsInfo.plate,
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='text'
                                        placeholder='Placa'
                                        name='plate'
                                        disabled
                                    />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Número do Chassis' hasFeedback>
                                {getFieldDecorator('chassis_number', {
                                    initialValue: this.props.cartsInfo.chassis_number,
                                    rules: [
                                       {
                                           required: true,
                                           message: 'Campo obrigatório'
                                       }
                                    ]
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='text'
                                        maxLength={17}
                                        placeholder='Número do Chassis'
                                        name='chassis_number'
                                        disabled
                                    />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Preço de Compra' hasFeedback>
                                {getFieldDecorator('purchase_price', {
                                    initialValue: this.props.cartsInfo.purchase_price,
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        type='number'
                                        placeholder='Preço de Compra'
                                        name='purchase_price'
                                        disabled
                                        />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data da Compra' hasFeedback>
                                    {getFieldDecorator('purchase_date', {
                                        initialValue: this.props.cartsInfo.purchase_date,
                                    })(
                                       
                                        <Input
                                            style={{color: 'black', fontWeight: 'bold'}}
                                            type='date'
                                            placeholder='Data da Compra'
                                            name='purchase_date'
                                            disabled
                                    />
                                          
                                    )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='Preço de Venda' hasFeedback>
                                {getFieldDecorator('sale_value', {
                                    initialValue: this.props.cartsInfo.sale_value,
                                })(
                                    <Input
                                        style={{color: 'black', fontWeight: 'bold'}} 
                                        type='number'
                                        placeholder='Preço de Venda'
                                        name='sale_value'
                                        disabled
                                        />
                                )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        
                        <Switch
                        style={{color: 'black', fontWeight: 'bold'}}
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />}
                        defaultChecked = {this.props.cartsInfo.status === 1 ? this.defaultChecked = true : this.defaultChecked = false}
                        name='status'
                        disabled
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedViewCart = Form.create()(viewCart)
export default WrappedViewCart
