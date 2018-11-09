import React, { Component } from 'react'


import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification, Dropdown, Menu } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";
import axios from '../../helpers/axios'

import AddUser from './addUser'
import EditUser from './editUser'
import ViewUser from './viewUser'
import OpenFilters from './openFilters'

export default class index extends Component {
    state = {
        visible: false,
        visibleEdit: false,
        visibleView: false,
        confirmLoading: false,
        list: [],
        visibleCalendar: false,
        uuid: '',
        info: {
          key: 0,
          driver: '',
        },
        userInfo: {
            name: '',
            email: '',
            password: 'coisasnadaaver',
            acess: 'operator',
            status: 1
        },
        initialState: {
            name: '',
            email: '',
            password: 'coisasnadaaver',
            acess: 'operator',
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
    handleAddClose = () => {
        this.setState({
          visible: false,
          userInfo: {...this.state.initialState} 
        });
      }
    handleEditClose = () => {
        this.setState({
          visibleEdit: false,
          userInfo: {...this.state.initialState} 
        });
    }
    onChangeAddDateInfo(key, value) {
      this.setState({
          info: {
          ...this.state.info,
          [key]: value
        }
      });
  
    }
    handleCalendarOpen = () => {
      this.setState({
        visibleCalendar: true,
        info: {
          key: 1,
          driver: '',
        }
      })
      
    }
    handleCalendarClose = () => {
      this.setState({
        visibleCalendar: false,
        info: {
          key: 0,
          driver: '',
        }
      })
      
    }
    handleViewClose = () => {
        this.setState({
          visibleView: false,
          userInfo: {...this.state.initialState} 
        });
    }
    showAddModal = () => {
        this.setState({
          visible: true
        })
    }
    showModalEdit = () => {
        this.setState({
          visibleEdit:true
        })
    }
    showModalView = () => {
        this.setState({
          visibleView:true
        })
    }
    onChangeAddUserInfo(key, value) {
        this.setState({
          userInfo: {
            ...this.state.userInfo,
            [key]: value
          }
        });
    }
    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0]})
    }
    
      handleReset = clearFilters => () => {
        clearFilters()
        this.setState({searchText: ''})
    }
    addUser = () => {
        const { name, email, password, type, status } = this.state.userInfo;
        if (name !== '' && email !== '' && password !== '' && type !== '' && status !== '') {
          let emailUser = email
          let newUserInfo = {
            ...this.state.userInfo
          };
          axios.post("users", newUserInfo)
            .then(response => {
              this.setState({
                confirmLoading: true
              });
              setTimeout(() => {
                this.setState({
                  confirmLoading: false
                });
                this.handleAddClose();
                this.componentWillMount()
              }, 2000);
              
              notification.success({message: 'Cadastrado com sucesso !'})
              setTimeout(() => {
                axios.post("recovery", {email : emailUser})
                .then(response => {
                  if(response.data !== 'e-mail não encontrado'){
                  this.setState({
                    confirmLoading: true
                  });
                  notification.success({message: `Email enviado para ${emailUser}`})
                }
                else {
                  notification.warning({message: `${emailUser} não encontrado `})
                }
                })

              }, 5000);
              
            })
            .catch(error => {
              notification.error({message: 'Não foi possivel cadastrar !'})
              console.log(error);
            });
        } else {
          notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
        }
    }
    editUser = () => {
      const { name, email, password, type, status } = this.state.userInfo;
      if (name !== '' && email !== '' && password !== '' && type !== '' && status !== '') {
      
        let newUserInfo = {
          ...this.state.userInfo
        };
        axios.put(`users/uuid/${this.state.uuid}`, newUserInfo)
          .then(response => {
            this.setState({
              confirmLoading: true
            });
            setTimeout(() => {
              this.setState({
                confirmLoading: false
              });
              this.handleEditClose();
              this.componentWillMount()
            }, 2000);
            
            notification.success({message: 'Editado com sucesso !'})
            
          })
          .catch(error => {
            notification.error({message: 'Não foi possivel editar !'})
            console.log(error);
          });
      } else {
        notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
      }
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
          width: "10%",
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
          width: "10%",
          render: (text, userInfo) => (
            <div className="isoInvoiceBtnView">
              <Icon 
              type="search"  
              style={{ fontSize: 25, color: '#1890ff' }} 
              onClick={() => {
                
                this.showModalView()
                this.setState({ uuid: userInfo.uuid, userInfo:{
                  name: userInfo.name,
                  email: userInfo.email,
                  password: userInfo.password,
                  acess: userInfo.acess,
                  status: userInfo.status
                  }
                 
                })
              }}
              />
              <Icon 
              type="form"  
              style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
              onClick={() => {
               
                this.showModalEdit()
                this.setState({ uuid: userInfo.uuid, userInfo:{
                  name: userInfo.name,
                  email: userInfo.email,
                  password: userInfo.password,
                  acess: userInfo.acess,
                  status: userInfo.status
                  }
                 
                })
              }}
              />
            </div>
          )
        }
      ]
   
    render() {
      const menu = (
        <Menu >
          <Menu.Item key="1" onClick={ this.handleCalendarOpen}>Status</Menu.Item>
         
        </Menu>
        
      
      )
      const type = localStorage.getItem('type')
       const {list} = this.state
        return (
           
            <LayoutWrapper>
                <PageHeader>
                <IntlMessages id='header.users'/>
                </PageHeader>
               
                <Box>
                { type === 'admin' ? 
                <div>
                   <div>
                    <Dropdown overlay={menu}>
                      <Button style={{ marginLeft: 8 }}>
                        Relatórios <Icon type="down" />
                      </Button>
                    </Dropdown>
                    </div>

                    <div className='BtnAdd' align='right'>
                        <Button
                      
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
                    <AddUser 
                        openAddModal={this.state.visible}
                        userInfo={this.state.userInfo}
                        close={this.handleAddClose}
                        addUser={this.addUser}
                        onChangeAddUserInfo={this.onChangeAddUserInfo.bind(this)}
                        confirmLoading={this.state.confirmLoading}
                    />
                    <EditUser 
                        openAddModal={this.state.visibleEdit}
                        userInfo={this.state.userInfo}
                        close={this.handleEditClose}
                        addUser={this.editUser}
                        onChangeAddUserInfo={this.onChangeAddUserInfo.bind(this)}
                        confirmLoading={this.state.confirmLoading}
                    />
                    <ViewUser 
                        openAddModal={this.state.visibleView}
                        userInfo={this.state.userInfo}
                        close={this.handleViewClose}
                        confirmLoading={this.state.confirmLoading}
                    />
                     <OpenFilters
                      open={this.state.visibleCalendar}
                      info={this.state.info}
                      close={this.handleCalendarClose}
                      confirmLoading={this.state.confirmLoading}
                      onChangeAddDateInfo={this.onChangeAddDateInfo.bind(this)}
                      />
                </div>
                
                : <div>Você não tem permissão</div>}
                
                </Box>
            </LayoutWrapper>
        )
        
    }
};
