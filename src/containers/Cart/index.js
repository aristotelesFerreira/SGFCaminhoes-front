import React, { Component } from 'react'

import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";

import axios from '../../helpers/axios'
import moment from 'moment';

import AddCart from './addCart'
import ViewCart from './viewCart'
import EditCart from './editCart'

export default class index extends Component {
  state = {
    selected: [],
    visible: false,
    visibleEdit: false,
    visibleView: false,
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
    cartsInfo: {
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
    }
  }

  componentWillMount = () => {
    axios.get('carts')
    .then(response => {
      this.setState({
        list: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  addCart = () => {
    const { brand, model, type, plate, chassis_number } = this.state.cartsInfo;
    if (brand !== '' && model !== '' && type !== '' && plate !== '' && chassis_number !== '') {
      let newCartInfo = {
        ...this.state.cartsInfo
      };
      axios.post("carts", newCartInfo)
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
          
        })
        .catch(error => {
          notification.error({message: 'Não foi possivel cadastrar !'})
          console.log(error);
        });
    } else {
      notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
    }
  }
  editCart = () => {
    const { brand, model, type, plate, chassis_number } = this.state.cartsInfo;
    if (brand !== '' && model !== '' && type !== '' && plate !== '' && chassis_number !== '') {
      let newCartInfo = {
        ...this.state.cartsInfo
      };
      axios.put(`carts/${this.state.uuid}`, newCartInfo)
      .then(response => {
        notification.success({message: 'Editado com sucesso'})
        this.handleEditClose()
        this.componentWillMount()
      })
      .catch(error => {
        console.log(error)
        notification.error({message:'Não foi possivel editar !'})
      })
    } else {
      notification.warning({message: "Campo 'nome' obrigatório !"})
    }
  }

  handleAddClose = () => {
    this.setState({
      visible: false,
      cartsInfo: {...this.state.initialState} 
    });
  }
  handleEditClose = () => {
    this.setState({
      visibleEdit: false,
      cartsInfo: {...this.state.initialState} 
    });
  }
  handleViewClose = () => {
    this.setState({
      visibleView: false,
      cartsInfo: {...this.state.initialState} 
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

  columns = [
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      width: "20%",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Modelo"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.model.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
      width: '20%',
      render: text => <span>{text}</span>
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      render: text => <span>{text}</span>
    },
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
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
      onFilter: (value, record) => record.plate.toLowerCase().includes(value.toLowerCase()),
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
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: text => <span>{text}</span>
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
      width: "20%",
      render: (text, cartsInfo) => (
        <div className="isoInvoiceBtnView">
          <Icon 
          type="search"  
          style={{ fontSize: 25, color: '#1890ff' }} 
          onClick={() => {
            console.log(cartsInfo)
            this.showModalView()
            this.setState({ uuid: cartsInfo.uuid, cartsInfo:{
              brand: cartsInfo.brand,
              model: cartsInfo.model,
              description: cartsInfo.description,
              capacity: cartsInfo.capacity,
              type: cartsInfo.type,
              km_current: cartsInfo.km_current,
              year: cartsInfo.year,
              plate: cartsInfo.plate,
              chassis_number: cartsInfo.chassis_number,
              purchase_price: cartsInfo.purchase_price,
              purchase_date:  moment(new Date(cartsInfo.purchase_date)).format('YYYY-MM-DD'),
              sale_value: cartsInfo.sale_value,
              status: cartsInfo.status,
              }
             
            })
          }}
          />
          <Icon 
          type="form"  
          style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
          onClick={() => {
            console.log(cartsInfo)
            this.showModalEdit()
            this.setState({ uuid: cartsInfo.uuid, cartsInfo:{
              brand: cartsInfo.brand,
              model: cartsInfo.model,
              description: cartsInfo.description,
              capacity: cartsInfo.capacity,
              type: cartsInfo.type,
              km_current: cartsInfo.km_current,
              year: cartsInfo.year,
              plate: cartsInfo.plate,
              chassis_number: cartsInfo.chassis_number,
              purchase_price: cartsInfo.purchase_price,
              purchase_date:  moment(new Date(cartsInfo.purchase_date)).format('YYYY-MM-DD'),
              sale_value: cartsInfo.sale_value,
              status: cartsInfo.status,
              } 
            })
          }}
          />
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
        <IntlMessages id='header.carts'/>
      </PageHeader>
      <Box>
        <div className='BtnAdd' align='right'>
            <Button
             onClick={this.showAddModal}
             style={{ top: -10 }}
             >
            <Icon type="plus-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
             Adicionar
            
             </Button>
        </div>
        <CardWrapper title='Motorista'>
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
        <AddCart 
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
        />
      </Box>
      </LayoutWrapper>

    )
  }
}