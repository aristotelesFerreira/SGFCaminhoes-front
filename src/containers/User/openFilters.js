import React, { Component } from 'react'
import { Button, Modal, notification, Radio  } from 'antd'
import Form from '../../components/uielements/form'
import axios from '../../helpers/axios'

const RadioGroup = Radio.Group;

class openFilters extends Component {
    state = {
        confirmLoading: false,
        value: 2,
        valueStatus: 1,
        driversData: []
       
    }
    report = () => {
        if(this.state.valueStatus === 1){
            var status = 'status=1'
        } else if (this.state.valueStatus === 2){
            status = 'status=0'
        }else {
            status = ''
        }

        if(this.props.info.key === 1) {
            var url = this.state.value === 1 ? `report/users/?${status}` :
        `report/users/?${status}`
        }
          axios.get(url)
            .then(response => {
                if(response.data === 'sucesso'){
                notification.success({message: 'Relatório criado com sucesso !'})
                this.setState({
                    confirmLoading: true
                })
                setTimeout(() => {
                    this.setState({
                        confirmLoading: false
                    })
                    window.open("http://localhost/laragon/uploads/usuarios_filtros.pdf")
                }, 4000);
            
                } else if (response.data === 'Não existe dados'){
                    notification.warning({message: 'Não existe dados !'})
                } else {
                    notification.error({message: 'Erro ao gerar relatório !'})
                }
            })
            
            .catch(error => {
                notification.error({error: 'Não foi possivel criar o relatório !'})
                console.log(error)
            })
    }
    onChange = (e) => {
        this.setState({
          value: e.target.value,
        });
    }
    onChangeStatus = (e) => {
        this.setState({
          valueStatus: e.target.value,
        });
    }

    
    render() {
       
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <Modal
            title='Emitir relatório'
            visible={this.props.open}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={300}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Voltar </Button>,
                <Button key='primary' type='primary' onClick={this.report} loading={this.state.confirmLoading}> Emitir </Button>,
            
                ]}
            >
            
             <div> Status: </div>
             <RadioGroup onChange={this.onChangeStatus} value={this.state.valueStatus}>
                <Radio style={radioStyle} value={1}>Ativos </Radio>
                <Radio style={radioStyle} value={2} >Inativos</Radio>
                <Radio style={radioStyle} value={3}>Todos</Radio>
             </RadioGroup>

            </Modal>
        )
    }
};

const WrappedOpenFilters = Form.create()(openFilters)
export default WrappedOpenFilters
