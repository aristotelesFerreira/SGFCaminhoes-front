import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option;

class viewDriver extends Component {
    
    render() {
        
        const { getFieldDecorator } = this.props.form;
       
        return (
            <Modal
            title='Visualizar Motorista'
            visible={this.props.open}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Voltar </Button>,
                <Button key='primary' type='primary' onClick={window.print}> Imprimir </Button>,
            ]}
            >
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                      <FormItem label='Nome'>
                        {getFieldDecorator('name', {
                            initialValue: this.props.driversInfo.name,
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
                              placeholder='Nome'
                              name='name'
                             
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='CPF' >
                            {getFieldDecorator('cpf_number', {
                                initialValue: this.props.driversInfo.cpf_number,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',
                                       
                                    }
                                ]
                            })(
                                <InputMask className="ant-input"
                                    mask={'999.999.999-99'}
                                    disabled
                                    style={{color: 'black', fontWeight: 'bold'}}
                                    type='text'
                                    placeholder='CPF'
                                    name='cpf_number'
                                   
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label={( <span>
                            CNH&nbsp;
                            <Tooltip title="Exemplos: AD">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )} >
                            {getFieldDecorator('drivers_license', {
                                initialValue: this.props.driversInfo.drivers_license,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório'
                                    }
                                ]
                              
                            })(
                             
                                <Select 
                                placeholder='CNH'
                                name='drivers_license'
                                disabled
                                style={{color: 'black', fontWeight: 'bold'}}
                                >
                                    <Option value="a">A</Option>
                                    <Option value="ab">AB</Option>
                                    <Option value="ac">AC</Option>
                                    <Option value="ad">AD</Option>
                                    <Option value="ae">AE</Option>
                                    
                                </Select>
                                
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone'>
                                {getFieldDecorator('phone_1', {
                                    initialValue: this.props.driversInfo.phone_1,
                                })(
                                    <InputMask className="ant-input"
                                        mask={'(99) 9-9999-9999'}
                                        type='text'
                                        placeholder='Telefone'
                                        name='phone_1'
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone Opcional' >
                                {getFieldDecorator('phone_2', {
                                    initialValue: this.props.driversInfo.phone_2,
                                })(
                                    <InputMask className="ant-input"
                                        mask={'(99) 9-9999-9999'} 
                                        type='text'
                                        placeholder='Telefone Opcional'
                                        name='phone_2'
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                    <FormItem label='Validade da CNH'>
                                {getFieldDecorator('driversLicense_validate', {
                                    initialValue: this.props.driversInfo.driversLicense_validate,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
                                    <Input 
                                        type='date'
                                        placeholder='Validade da CNH'
                                        name='driversLicense_validate'
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                        />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de admissão'>
                                    {getFieldDecorator('admission_date', {
                                        initialValue: this.props.driversInfo.admission_date
                                      })(
                                        <Input 
                                        type='date'
                                        placeholder='Data de admissão'
                                        name='admission_date'
                                        disabled
                                        style={{color: 'black', fontWeight: 'bold'}}
                                    />     
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de demissão' >
                                    {getFieldDecorator('resignation_date', {
                                       initialValue: this.props.driversInfo.resignation_date,
                                    })(
                                        <Input 
                                            type='date'
                                            placeholder='Data de demissão'
                                            name='resignation_date'
                                            disabled
                                            style={{color: 'black', fontWeight: 'bold'}}
                                        />
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" >
                        
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} 
                        defaultChecked = {this.props.driversInfo.status === 1 ? this.defaultChecked = true : this.defaultChecked = false}
                        name='status'
                        disabled
                        style={{color: 'black', fontWeight: 'bold'}}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedViewDriver = Form.create()(viewDriver)
export default WrappedViewDriver
