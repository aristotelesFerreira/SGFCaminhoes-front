import React, { Component } from 'react';


import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box, StatusTagAtivo, StatusTagInativo } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import Scrollbars from "../../components/utility/customScrollBar";
import notification from "../../components/notification";

import { Button, mesage, Input, Icon } from 'antd';

import axios from '../../helpers/axios'


export default class index extends Component {

  state = {
    selected: [],
    visible: false,
    visibleEdit: false,
    confirmLoading: false,
    list: [],
    initialSatte: {
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: '',
        resignation_date: '',
        salary: '',
        phone_1: '',
        phone_2: '',
        status: ''
    },
    driversInfo: {
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: '',
        resignation_date: '',
        salary: '',
        phone_1: '',
        phone_2: '',
        status: ''
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
        if (status.status === 'active' ) {
          className = "Ativo";
           userStatus = <StatusTagAtivo>{className}</StatusTagAtivo>
        } else{
          className = "Inativo";
          userStatus = <StatusTagInativo>{className}</StatusTagInativo>
        }
        return userStatus
      }
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
             onClick={this.showModal}
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

        </Box>
      </LayoutWrapper>
    );
  }
}
