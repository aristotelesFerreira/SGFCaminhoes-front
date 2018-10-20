import React, { Component } from 'react'

import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";
import { Link } from "react-router-dom";

import axios from '../../helpers/axios'
import moment from 'moment-timezone';

//import AddCart from './addCart'
//import ViewCart from './viewCart'
//moment.tz(value, 'America/Sao_Paulo').format('DD/MM/YYYY')

export default class index extends Component {
  state = {
    selected: [],
    visible: false,
    visibleEdit: false,
    visibleView: false,
    confirmLoading: false,
    alts: [],
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
      this.teste()
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

  teste = () => {
      const newDate = []
      for (let i = 0; i < this.state.list.length; i++){
        
        newDate.push(moment.tz(this.state.list[i].departureDate, 'America/Sao_Paulo').format('DD/MM/YYYY'))
        let list = {...this.state.list}
        this.setState({
          alts: {...this.state.list[i], departureDate: newDate.toString()}
        })
     }
     console.log(this.state.alts)
    
  
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
      dataIndex: 'newDate', //arrumar isso
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
      onFilter: (value, record) => record.departureDate.route_name,
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
        if (status.status == 'finished' ) {
           userStatus =  <Icon type="check-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
        }
        else if (status.status == 'in_progress')  {
          userStatus = <Icon type="clock-circle"  style={{ fontSize: 20, color: '#ff9900'}}/>
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
            console.log(travelInfo)
            this.showModalView()
            
          }}
          />
          
          <Link to={`edit_travel/${travelInfo.uuid}`}>
          <Icon 
          type="form"  
          style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
          onClick={() => {
           
          }}
          />
          </Link>
        </div>
      )
    }
  ]

  render() {
    const { list } = this.state
    const { selected } = this.state
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys: selected,
      onChange: selected => this.setState({ selected }),
      selections: [
        {
          key: 'index',
          text: "Select All Invoices",
          onSelect: () =>
            this.setState({
              selected: this.props.list.map(list => list.id)
            })
           
        },
        {
          key: 'index1',
          text: "Unselect all",
          onSelect: () => this.setState({ selected: [] })
        },
       
      ],
      onSelection: selected => this.setState({ selected })
    };
    return (
      <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='header.travels'/>
      </PageHeader>
      <Box>
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
               // dataSource={list}
                columns={this.columns}
                pagination={true}
                className='invoiceListTable'
                />
            </Scrollbars>
          </div>
        </CardWrapper>
       
        {/*<AddCart 
        open={this.state.visible}
        close={this.handleAddClose}
        addCart={this.addCart}
        onChangeAddCartInfo={this.onChangeAddCartInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        <EditCart 
        cartsInfo={this.state.cartsInfo}
        open={this.state.visibleEdit}
        close={this.handleEditClose}
        editCart={this.editCart}
        onChangeAddCartInfo={this.onChangeAddCartInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        <ViewCart
        cartsInfo={this.state.cartsInfo}
        open={this.state.visibleView}
        close={this.handleViewClose}
        confirmLoading={this.state.confirmLoading} 
        />*/}
      </Box>
      </LayoutWrapper>

    )
  }
}