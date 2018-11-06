import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option

class addUser extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Adicionar Motorista'
            visible={this.props.openAddModal}
            onOk={this.props.addUser}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.addUser}> Salvar 
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
                              maxLength={60}
                              type='text'
                              placeholder='Nome'
                              name='name'
                              onChange={e => this.props.onChangeAddUserInfo('name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label={( <span>
                            Tipo&nbsp;
                            <Tooltip title="Permissão para o usuário">
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
                                onChange={e => this.props.onChangeAddUserInfo('acess', e)}
                                >       
                                    <Option value='operator'>Operador</Option>
                                    <Option value="admin">Admin</Option>
                                   
                                    
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={10}>
                            <FormItem label='E-mail' hasFeedback>
                                {getFieldDecorator('email', {
                                    initialValue:  this.props.userInfo.email,
                                   rules: [{
                                    type: 'email', message: 'E-mail inválido!',
                                  }, {
                                    required: true, message: 'Preencha o e-mail!',
                                  }],
                                })(
                                    <InputMask className="ant-input"
                                        type='text'
                                       
                                        placeholder='E-mail'
                                        name='email'
                                        onChange={e => this.props.onChangeAddUserInfo('email', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label={( <span>
                            Senha&nbsp;
                            <Tooltip title="Será enviado e-mail contendo um link para gerar a senha">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )}hasFeedback>
                                {getFieldDecorator('password', {
                                    initialValue:  this.props.userInfo.password,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }
                                    ]
                                })(
                                    <InputMask className="ant-input"
                                        type='password'
                                        placeholder='Senha'
                                        name='password'
                                        disabled
                                        onChange={e => this.props.onChangeAddUserInfo('password', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} defaultChecked
                        name='status'
                        onChange={e => this.props.onChangeAddUserInfo('status', e)}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedAddUser = Form.create()(addUser)
export default WrappedAddUser
