import React, { Component } from 'react';


import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box, StatusTagAtivo, StatusTagInativo } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import Scrollbars from "../../components/utility/customScrollBar";
import { Link } from "react-router-dom";


import { Button, mesage, Input, Icon, notification } from 'antd';

import axios from '../../helpers/axios'
import AddDriver from './addDriver'
import EditDriver from './editDriver'


export default class index extends Component {

  state = {
    selected: [],
    visible: false,
    visibleEdit: false,
    confirmLoading: false,
    list: [],
    initialState: {
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: null,
        resignation_date: null,
        salary: null,
        phone_1: '',
        phone_2: '',
        status: true
    },
    driversInfo: {
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: null,
        resignation_date: null,
        salary: null,
        phone_1: '',
        phone_2: '',
        status: true
    }
  }
  componentWillMount = () => {
    axios.get('drivers')
    .then(response => {
      this.setState({
        list: response.data
      })
      console.log(this.state.list)
    })
    .catch(error => {
      console.log(error)
    })
  }
  addDriver = () => {
    const { name } = this.state.driversInfo;
    if (name !== '') {
      let newDriverInfo = {
        ...this.state.driversInfo
      };
      axios.post("drivers", newDriverInfo)
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
  editDriver = () => {
    const { name } = this.state.driversInfo
    if( name!== ''){
      let newDriverInfo = {
        ...this.state.driversInfo
      }
      axios.put(`drivers/${this.state.uuid}`, newDriverInfo)
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
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0]})
  }

  handleReset = clearFilters => () => {
    clearFilters()
    this.setState({searchText: ''})
  }

  handleAddClose = () => {
    this.setState({
      visible: false,
      driversInfo: {...this.state.initialState} 
    });
  }
  handleEditClose = () => {
    this.setState({
      visibleEdit: false,
      driversInfo: {...this.state.initialState} 
    });
  }
  showModalEdit = () => {
    this.setState({
      visibleEdit:true
    })
  }
  onChangeAddDriverInfo(key, value) {
    this.setState({
      driversInfo: {
        ...this.state.driversInfo,
        [key]: value
      }
    });
  }
  showAddModal = () => {
    this.setState({
      visible: true
    })
  }

  columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "30%",
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
      title: 'CPF',
      dataIndex: 'cpf_number',
      key: 'cpf_number',
      width: '30%',
      render: text => <span>{text}</span>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 'status',
      width: "20%",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status -b.status,
      render: (text, status) => {
        let className, userStatus;
        if (status.status !== 0 ) {
          className = "Ativo";
           userStatus = <StatusTagAtivo>{className}</StatusTagAtivo>
        } else{
          className = "Inativo";
          userStatus = <StatusTagInativo>{className}</StatusTagInativo>
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
          <Link to={`${this.props.match.path}/${driversInfo.uuid}/products`}>
            <Button type="primary" >
              Visualizar
            </Button>
          </Link>
          <Button color='primary'
            onClick={() => {
              console.log(driversInfo)
              this.showModalEdit()
              this.setState({ uuid: driversInfo.uuid, driversInfo:{
                name: driversInfo.name,
                cpf_number: driversInfo.cpf_number,
                drivers_license: driversInfo.drivers_license,
                admission_date: driversInfo.admission_date,
                resignation_date: driversInfo.resignation_date,
                salary: driversInfo.salary,
                phone_1: driversInfo.phone_1,
                phone_2: driversInfo.phone_2,
                status: driversInfo.status
               
                } 
              })
              console.log(this.state.driversInfo.name)
            }}>
            Editar
          </Button>

          <Button
            className="invoiceDltBtn"
            // icon="delete"
            onClick={() => {
              notification.success({message: 'Excluido com sucesso !'})
              this.props.deleteInvoice([driversInfo.key]);
              this.setState({ selected: [] });
            }}
          >
            <i className="ion-android-delete" />
          </Button>
        </div>
      )
    }
  ]
  
  render() {
    const { list } = this.state
    const { selected } = this.state
    const { deleteInvoice } = this.props;
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
        {
          key: 'index3',
          text: "Delete selected",
          onSelect: changableRowKeys => {
            if (selected.length > 0) {
              deleteInvoice(selected);
              this.setState({ selected: [] });
              notification("error", `${selected.length} invoices deleted`);
            }
          }
        }
      ],
      onSelection: selected => this.setState({ selected })
    };
    return (
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id='header.drivers'/>
        </PageHeader>
        <Box>
          <div className='BtnAdd' align='right'>
            <Button
             type='primary'
             onClick={this.showAddModal}
             style={{ top: -10 }}
             >
             Adicionar Motorista
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
        <AddDriver 
        openAddModal={this.state.visible}
        close={this.handleAddClose}
        addDriver={this.addDriver}
        onChangeAddDriverInfo={this.onChangeAddDriverInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        <EditDriver 
        driversInfo={this.state.driversInfo}
        open={this.state.visibleEdit}
        close={this.handleEditClose}
        editDriver={this.editDriver}
        onChangeAddDriverInfo={this.onChangeAddDriverInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        </Box>
      </LayoutWrapper>
    );
  }
}
