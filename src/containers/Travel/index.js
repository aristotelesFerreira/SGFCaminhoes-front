import React, { Component } from 'react'

import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification, Menu, Dropdown } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";
import { Link } from "react-router-dom";

import axios from '../../helpers/axios'
import OpenCalendar from './openCalendar'



export default class index extends Component {
  state = {
    //selected: [],
    visibleCalendar: false,
    info: {
      data1 : '',
      data2: '',
      key: 0,
      driver: '',
      vehicle: '',
      itinerary: '',
      cart: '',
    },
  
    confirmLoading: false,
    list: [],
    initialState: {
      description: '',
      brand: '',
      model: '',
      type: '',
      capacity: '0',
      km_current: '0',
      year: '0',
      plate: '',
      chassis_number: '',
      purchase_price: '0',
      purchase_date: null,
      sale_value: '0',
      status: true
    },
    travelInfo: {
      driver_id: '',
      vehicle_id: '',
      carts_id: [],
      itinerary_id: '',
      departureDate: '',
      arrivalDate: '',
      description: '',
      status: '',
    },

  }
  
  componentWillMount = () => {
    axios.get('travels')
    .then(response => {
      this.setState({
        list: response.data,
      })
      //this.teste()
     
    })
    .catch(error => {
      console.log(error)
    })
   
  }

  onChangeAddCartInfo(key, value) {
    this.setState({
      cartsInfo: {
        ...this.state.cartsInfo,
        [key]: value
      }
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
  
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0]})
  }
  handleReset = clearFilters => () => {
    clearFilters()
    this.setState({searchText: ''})
  }
  handleEditTravel = () => {
    return (
    <Link to='edit_travel/'> </Link>
    )
    
  }
  
handleCalendarOpen = (e) => {
  this.setState({
    info: {
      data1: '',
      data2: '',
      key: e.key,
      driver: '',
      vehicle: '',
      itinerary: '',
      cart: '',
    },
    visibleCalendar: true

  })
  
}
handleCalendarClose = () => {
  this.setState({
    visibleCalendar: false,
    info: {
      data1: '',
      data2: '',
      key: 0,
      driver: '',
      vehicle: '',
      itinerary: '',
      cart: '',
    }
  })
  
}


  columns = [
    
    {
      title: "Motorista",
      dataIndex: "driver.name",
      key: "driver",
      width: "20%",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Motorista"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.driver.name.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Itinerário',
      dataIndex: 'itinerary.route_name',
      key: 'itinerary.route_name',
      width: '10%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Placa"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.itinerary.route_name.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Veículo',
      dataIndex: 'vehicle.plate',
      key: 'vehicle.plate',
      width: '10%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Placa"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.vehicle.plate.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Primeira Carreta',
      dataIndex: 'carts.0.plate',
      key: 'carts.0.plate',
      width: '10%',
      /*filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Placa"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.carts[0].plate.toLowerCase().includes(value.toLowerCase()),
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
      }*/
    },
    {
      title: 'Segunda Carreta',
      dataIndex: 'carts.1.plate',
      key: 'carts.1.plate',
      width: '10%',
      /*filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Placa"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.carts[0].plate.toLowerCase().includes(value.toLowerCase()),
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
      }*/
    },
   
    {
      title: 'Data de Partida',
      dataIndex: 'departureDate', //arrumar isso
      key: 'departureDate',
      width: '10%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Placa"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.departureDate,
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
        if (status.status === 'finished' ) {
           userStatus =  <Icon type="check-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
        }
        else if (status.status === 'in_progress')  {
          userStatus = <Icon type="clock-circle"  style={{ fontSize: 20, color: '#307af2'}}/>
        }
        else {
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
      render: (text, travelInfo) => (
        <div className="isoInvoiceBtnView">
          <Icon 
          type="search"  
          style={{ fontSize: 25, color: '#1890ff' }} 
          onClick={() => {
            this.props.history.push(`view_travel/${travelInfo.uuid}`)
            
          }}
          />
          
         
          <Icon 
          type="form"  
          style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
          onClick={() => {
           if(travelInfo.status === 'in_progress'){
            this.props.history.push(`edit_travel/${travelInfo.uuid}`);
           }
           else if(travelInfo.status === 'finished'){
            notification.warning({message: 'Não é possivel editar uma viagem concluída !'})
           }
           else{
            notification.warning({message: 'Não é possivel editar uma viagem cancelada !'})
           }
           
          }}
          />
        
        </div>
      )
    }
  ]
  


  render() {
    const menu = (
      <Menu >
        <Menu.Item key="1" onClick={ this.handleCalendarOpen}>Por data</Menu.Item>
        <Menu.Item key="5" onClick={ this.handleCalendarOpen}>Por motorista</Menu.Item>
        <Menu.Item key="6" onClick={ this.handleCalendarOpen}>Por veículo</Menu.Item>
        <Menu.Item key="8" onClick={ this.handleCalendarOpen}>Por carreta</Menu.Item>
        <Menu.Item key="7" onClick={ this.handleCalendarOpen}>Por itinerário</Menu.Item>
       
      </Menu>
      
    
    )
    const { list } = this.state
    const rowSelection = {
     
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='header.travels'/>
      </PageHeader>
      <Box>
      
      <div>
      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }}>
          Relatórios <Icon type="down" />
        </Button>
      </Dropdown>
      </div>

        <div className='BtnAdd' align='right'>
          <Link to='new_travel'>
              <Button
              onClick={this.showAddModal}
              style={{ top: -10 }}
              >
              <Icon type="plus-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
            
              Adicionar
            
              </Button>
            </Link>
        </div>
        <CardWrapper title='Viagens'>
          <div className='isoInvoiceTable'>
            <Scrollbars style={{ width: '100%'}}>
              <TableWrapper rowKey='id'
                rowSelection={rowSelection}
                dataSource={list}
                columns={this.columns}
                pagination={true}
                className='invoiceListTable'
                />
            </Scrollbars>
          </div>
        </CardWrapper>
       
        {
        <OpenCalendar
        open={this.state.visibleCalendar}
        info={this.state.info}
        close={this.handleCalendarClose}
        confirmLoading={this.state.confirmLoading}
        onChangeAddDateInfo={this.onChangeAddDateInfo.bind(this)}
        />

        
        }
      </Box>
      </LayoutWrapper>

    )
  }
}