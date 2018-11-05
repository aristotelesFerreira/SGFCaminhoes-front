import React, { Component } from 'react'


import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";
import axios from '../../helpers/axios'

const type = localStorage.getItem('type')
export default class index extends Component {
    state = {
        visible: false,
        visibleEdit: false,
        visibleView: false,
        confirmLoading: false,
        list: [],
        userInfo: {
            name: '',
            email: '',
            password: '',
            acess: '',
            status: 1
        }

    }
    componentWillMount = () => {
        axios.get('users')
        .then(response => {
          this.setState({
            list: response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
      
      }
    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0]})
      }
    
      handleReset = clearFilters => () => {
        clearFilters()
        this.setState({searchText: ''})
      }
    
    columns = [
        {
          title: "Nome",
          dataIndex: "name",
          key: "name",
          width: "20%",
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className='custom-filter-dropdown' xs={5} sm={5}>
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Nome"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}         
              /> 
              <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
              <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
          onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            const { searchText } = this.state
            return searchText ? (
              <span>
              {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                fragment.toLowerCase() === searchText.toLowerCase()
                  ? <span key={i} style={{ color: 'red'}} className="highlight">{fragment}</span> : fragment // eslint-disable-line
              ))}
            </span>
            ) : text
          }
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: "30%",
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className='custom-filter-dropdown' xs={5} sm={5}>
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Email"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}         
              /> 
              <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
              <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
          onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            const { searchText } = this.state
            return searchText ? (
              <span>
              {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                fragment.toLowerCase() === searchText.toLowerCase()
                  ? <span key={i} style={{ color: 'red'}} className="highlight">{fragment}</span> : fragment // eslint-disable-line
              ))}
            </span>
            ) : text
          }
        },
       
        {
          title: "Status",
          dataIndex: "status",
          key: 'status',
          width: "20%",
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.status -b.status,
          render: (text, status) => {
            let userStatus;
            if (status.status !== 0 ) {
               userStatus =  <Icon type="check-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
            } else{
              userStatus = <Icon type="close-circle"  style={{ fontSize: 20, color: '#f5222d'}}/>
            }
            return userStatus
          }
        },
        {
          title: "Ações",
          dataIndex: "view",
          key: "view",
          width: "20%",
          render: (text, driversInfo) => (
            <div className="isoInvoiceBtnView">
              <Icon 
              type="search"  
              style={{ fontSize: 25, color: '#1890ff' }} 
              onClick={() => {
                console.log(driversInfo)
                this.showModalView()
                /*this.setState({ uuid: driversInfo.uuid, driversInfo:{
                  name: driversInfo.name,
                  cpf_number: driversInfo.cpf_number,
                  drivers_license: driversInfo.drivers_license,
                  admission_date:  moment(new Date(driversInfo.admission_date)).format('YYYY-MM-DD'),
                  resignation_date:  moment(new Date(driversInfo.resignation_date)).format('YYYY-MM-DD'),
                  driversLicense_validate:  moment(new Date(driversInfo.driversLicense_validate)).format('YYYY-MM-DD'),
                  phone_1: driversInfo.phone_1,
                  phone_2: driversInfo.phone_2,
                  status: driversInfo.status,
                  }
                 
                })*/
              }}
              />
              <Icon 
              type="form"  
              style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
              onClick={() => {
                this.showModalEdit()
               /* this.setState({ uuid: driversInfo.uuid, driversInfo:{
                  name: driversInfo.name,
                  cpf_number: driversInfo.cpf_number,
                  drivers_license: driversInfo.drivers_license,
                  admission_date:  moment(new Date(driversInfo.admission_date)).format('YYYY-MM-DD'),
                  resignation_date:  moment(new Date(driversInfo.resignation_date)).format('YYYY-MM-DD'),
                  driversLicense_validate:  moment(new Date(driversInfo.driversLicense_validate)).format('YYYY-MM-DD'),
                  phone_1: driversInfo.phone_1,
                  phone_2: driversInfo.phone_2,
                  status: driversInfo.status,
                  }
                 
                })*/
              }}
              />
            </div>
          )
        }
      ]
   
    render() {

       const {list} = this.state
        return (
           
            <LayoutWrapper>
                <PageHeader>
                <IntlMessages id='header.users'/>
                </PageHeader>
               
                <Box>
                { type == 'admin' ? 
                <div>

                    <div className='BtnAdd' align='right'>
                        <Button
                        // style={{ background: '#1890ff' }}
                        // color='#1890ff'
                        //ghost
                        // type='primary'
                        onClick={this.showAddModal}
                        style={{ top: -10 }}
                        >
                        <Icon type="plus-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
                        Adicionar
                        
                        </Button>
                    </div>
                    <CardWrapper title='Veículos'>
                    <div className='isoInvoiceTable'>
                        <Scrollbars style={{ width: '100%'}}>
                        <TableWrapper rowKey='id'
                            //rowSelection={rowSelection}
                            dataSource={list}
                            columns={this.columns}
                            pagination={true}
                            className='invoiceListTable'
                            />
                        </Scrollbars>
                    </div>
                    </CardWrapper>
                </div>
                
                : <div>Você não tem permissão</div>}
                </Box>
            </LayoutWrapper>
        )
        
    }
};
