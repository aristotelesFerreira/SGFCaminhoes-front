import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip, Select } from 'antd'
import Form from '../../components/uielements/form'
import InputMask from 'react-input-mask'

import MapWithADirectionsRenderer from './teste'
import Places from './places'
import PlacesTwo from './placesTwo'

const FormItem = Form.Item
const Option = Select.Option


class addItinerary extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Adicionar Carreta'
            visible={this.props.open}
            onOk={this.props.addItinerary}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={1000}
            //height={1200}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.addItinerary}> Salvar 
                 </Button>
            ]}
            >
            <Form>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Origem" hasFeedback>
                        {getFieldDecorator('initial_point', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <Places  
                            setMarkerA={this.props.setMarkerA}
                           />
                        )}
                        </FormItem>
                    </Col>
                
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Destino" hasFeedback>

                         {getFieldDecorator('end_point', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <PlacesTwo 
                            setMarkerB={this.props.setMarkerB} 
                            />
                        )}

                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                      <FormItem label='Nome da rota' hasFeedback>
                        {getFieldDecorator('route_name', {
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
                              name='route_name'
                              onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                      <FormItem label='Observações' hasFeedback>
                        {getFieldDecorator('observation', {
                        })(
                            <Input
                              type='text'
                              placeholder='Observações'
                              name='observation'
                              onChange={e => this.props.onChangeAddItinerariesInfo('observation', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    </Row>
                    <Row gutter={12}>
                    <Col sm={24} xs={24} md={3}>
                      <FormItem label='Distância' hasFeedback>
                       
                        {getFieldDecorator('distance', {
                            initialValue: this.props.distance.text,
                        })(
                            <Input
                              disabled
                              type='text'
                              placeholder='Distância'
                              name='distance'
                             // onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                      <FormItem label='Tempo aprox.' hasFeedback>
                       
                        {getFieldDecorator('time', {
                            initialValue: this.props.time.text,
                        })(
                            <Input
                              disabled
                              type='text'
                              placeholder='Tempo Aprox.'
                              name='time'
                             // onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
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
                        onChange={e => this.props.onChangeAddItinerariesInfo('status', e)}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <MapWithADirectionsRenderer 
                origin={this.props.origin}
                destination={this.props.destination}
                currentLocation={this.props.currentLocation}
                setText={this.props.setText}
                //update={this.state.update}
               
            />
                            
            </Modal>
        )
    }
};

const WrappedAddItinerary = Form.create()(addItinerary)
export default WrappedAddItinerary
