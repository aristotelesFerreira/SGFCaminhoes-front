import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import InputMask from 'react-input-mask'

const FormItem = Form.Item
const Option = Select.Option

class viewUser extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Visualizar Usuário'
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
               
            ]}
            >
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                      <FormItem label='Nome' hasFeedback>
                        {getFieldDecorator('name', {
                            initialValue:  this.props.userInfo.name,
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
                              disabled
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
                                  initialValue:  this.props.userInfo.acess,
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
                                        disabled
                                    />
                                )}
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label={( <span>
                            Senha&nbsp;
                            <Tooltip title="Para alterar a senha, basta selecionar 'recuperar senha' na tela de login">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )}hasFeedback>
                               
                            </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />}
                        defaultChecked = {this.props.userInfo.status === 1 ? this.defaultChecked = true : this.defaultChecked = false}
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

const WrappedViewUser = Form.create()(viewUser)
export default WrappedViewUser
