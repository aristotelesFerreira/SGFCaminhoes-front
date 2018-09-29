import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon } from 'antd'
import Form from '../../components/uielements/form'
//import InputMask from 'react-input-mask'

import MapWithADirectionsRenderer from './map'
import Places from './places'
import PlacesTwo from './placesTwo'

const FormItem = Form.Item


class editItinerary extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Editar Itinerário'
            visible={this.props.open}
            onOk={this.props.editItinerary}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={1000}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.editItinerary}> Salvar 
                 </Button>
            ]}
            >
            <Form>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={6}>
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
                            itinerariesInfo={this.props.itinerariesInfo}
                            
                           />
                          
                        )}
                         {this.props.itinerariesInfo.initial_point}
                        </FormItem>
                    </Col>
                
                    <Col sm={24} xs={24} md={6}>
                        <FormItem label="Destino" hasFeedback>
                        {getFieldDecorator('end_point', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <PlacesTwo style={{borderWidth: 50}}
                            itinerariesInfo={this.props.itinerariesInfo}
                            setMarkerB={this.props.setMarkerB}
                            //value={this.props.itinerariesInfo.end_point} 
                            />
                          
                        )}
                           
                         {this.props.itinerariesInfo.end_point}
                        </FormItem>
                    </Col>
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
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={9}>
                      <FormItem label='Nome da rota' hasFeedback>
                        {getFieldDecorator('route_name', {
                            initialValue: this.props.itinerariesInfo.route_name,
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
                    <Col sm={24} xs={24} md={10}>
                      <FormItem label='Observações' hasFeedback>
                        {getFieldDecorator('observation', {
                             initialValue: this.props.itinerariesInfo.observation,
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
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />}
                        name='status'
                        onChange={e => this.props.onChangeAddItinerariesInfo('status', e)}
                        defaultChecked = {this.props.itinerariesInfo.status === 1 ? this.defaultChecked = true : this.defaultChecked = false}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <MapWithADirectionsRenderer 
                itinerariesInfo={this.props.itinerariesInfo}
                currentLocation={this.props.currentLocation}
                setText={this.props.setText}
                
               
            />
                            
            </Modal>
        )
    }
};

const WrappedEditItinerary = Form.create()(editItinerary)
export default WrappedEditItinerary
