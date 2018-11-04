import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon } from 'antd'
import Form from '../../components/uielements/form'
//import InputMask from 'react-input-mask'

import MapWithADirectionsRenderer from './map'
import Places from './places'
import PlacesTwo from './placesTwo'

const FormItem = Form.Item


class viewItinerary extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Visualizar Itinerário'
            visible={this.props.open}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={1000}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='primary' type='primary' onClick={window.print}> Gerar Relatório </Button>,
            ]}
            >
            <Form>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={6}>
                        <FormItem label="Origem" hasFeedback>
                        
                         {this.props.itinerariesInfo.initial_point}
                        </FormItem>
                    </Col>
                
                    <Col sm={24} xs={24} md={6}>
                        <FormItem label="Destino" hasFeedback>
                        
                           
                         {this.props.itinerariesInfo.end_point}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={3}>
                      <FormItem label='Distância' hasFeedback>

                         {this.props.distance.text}

                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                      <FormItem label='Tempo aprox.' hasFeedback>

                        {this.props.time.text}

                      </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={9}>
                      <FormItem label='Nome da rota' hasFeedback>
                     
                        {this.props.itinerariesInfo.route_name}

                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={10}>
                      <FormItem label='Observações' hasFeedback>

                        {this.props.itinerariesInfo.observation}

                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        <Switch
                        disabled
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

const WrappedViewItinerary = Form.create()(viewItinerary)
export default WrappedViewItinerary
