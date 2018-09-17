import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip } from 'antd'
import Form from '../../components/uielements/form'

import locale from 'antd/lib/date-picker/locale/pt_BR';
import pt_BR from 'antd/lib/locale-provider/pt_BR';
import moment from 'moment';

import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const FormItem = Form.Item

class addDriver extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Adicionar Motorista'
            visible={this.props.openAddModal}
            onOk={this.props.addDriver}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.addDriver}> Salvar 
                 </Button>
            ]}
            >
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
                            <Input
                              type='text'
                              placeholder='Nome'
                              name='name'
                              onChange={e => this.props.onChangeAddDriverInfo('name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='CPF' hasFeedback>
                            {getFieldDecorator('cpf_number', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',
                                       
                                    }
                                ]
                            })(
                                <Input 
                                    type='text'
                                    maxLength={11}
                                    placeholder='CPF'
                                    name='cpf_number'
                                    onChange={e => this.props.onChangeAddDriverInfo('cpf_number', e.target.value)}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={3}>
                        <FormItem label={( <span>
                            CNH&nbsp;
                            <Tooltip title="Exemplos: ABCD">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )} hasFeedback>
                            {getFieldDecorator('drivers_license', {
                                
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório'
                                    }
                                ]
                              
                            })(
                             
                                <Input 
                                    type='text'
                                    placeholder='CNH'
                                    name='drivers_license'
                                    onChange={e => this.props.onChangeAddDriverInfo('drivers_license', e.target.value)}
                                />
                                
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone' hasFeedback>
                                {getFieldDecorator('phone_1', {
                                    rules: [
                                        /*{
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }*/
                                    ]
                                })(
                                    <Input 
                                        type='text'
                                        placeholder='Telefone'
                                        name='phone_1'
                                        onChange={e => this.props.onChangeAddDriverInfo('phone_1', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone Opcional' hasFeedback>
                                {getFieldDecorator('phone_2', {
                                    rules: [
                                        /*{
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }*/
                                    ]
                                })(
                                    <Input 
                                        type='text'
                                        placeholder='Telefone Opcional'
                                        name='phone_2'
                                        onChange={e => this.props.onChangeAddDriverInfo('phone_2', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={4}>
                        <FormItem label='Salário' hasFeedback>
                                {getFieldDecorator('salary', {
                                    rules: [
                                       
                                    ]
                                })(
                                    <Input 
                                        type='number'
                                        placeholder='Salário'
                                        name='salary'
                                        onChange={e => this.props.onChangeAddDriverInfo('salary', e.target.value)}
                                    />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de admissão' hasFeedback>
                                    {getFieldDecorator('admission_date', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Campo obrigatório',
                                               
                                            },
                                            
                                           
                                        ]
                                    })(
                                       
                                        <Input 
                                        type='date'
                                       
                                        placeholder='Data de admissão'
                                        name='admission_date'
                                        onChange={e => this.props.onChangeAddDriverInfo('admission_date', e.target.value)}
                                    />
                                          
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de demissão' hasFeedback>
                                    {getFieldDecorator('resignation_date', {
                                        rules: [
                                            /*{
                                                required: true,
                                                message: 'Campo obrigatório'
                                            }*/
                                        ]
                                    })(
                                        <Input 
                                            type='date'
                                            placeholder='Data de demissão'
                                            name='resignation_date'
                                            onChange={e => this.props.onChangeAddDriverInfo('resignation_date', e.target.value)}
                                        />
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Status" hasFeedback>
                        
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} defaultChecked
                        name='status'
                        onChange={e => this.props.onChangeAddDriverInfo('status', e)}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedAddDriver = Form.create()(addDriver)
export default WrappedAddDriver
