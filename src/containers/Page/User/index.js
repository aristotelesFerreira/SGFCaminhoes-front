import React, { Component } from 'react';
import PageHeader from "../../../components/utility/pageHeader";
import IntlMessages from "../../../components/utility/intlMessages";
import { Button, message, Input, Icon } from "antd";
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import CardWrapper, { Box, StatusTagAtivo, StatusTagInativo } from "./index.style";
import Scrollbars from "../../../components/utility/customScrollBar";
import TableWrapper from "../../Tables/antTables/antTable.style";
import notification from "../../../components/notification";
import { Link } from 'react-router-dom'
import axios from '../../../helpers/axios'

export default class extends Component {
  
  state = {
      selected: [],
      visibleAddModal: false,
      visibleEditModal: false,
      list:[],
      searchText: '',
      initialInfo: {
        name: '',
        email: '',
        role: '',
        status: ''
      },
      userInfo: {
        name: '',
        email: '',
        role: '',
        status: ''
      }
  }

  componentWillMount() {
    axios.get('users')
    .then(response => {
        this.setState(state => {
            return {list: response.data.data}
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
      render: text => <span>{text}</span>
    },
    {
      title: "Permissão",
      dataIndex: "role",
      key: "role",
      width: "20%",
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
        if (status.status == "active" ) {
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
      render: (text, user) => (
        <div className="isoInvoiceBtnView">
          <Link to={`${this.props.match.path}/${user.id}`}>
            <Button type="primary" >
              Visualizar
            </Button>
          </Link>
          <Button color='primary'
            onClick={() => {
              this.showEditModal()
              this.setState({ secure_id: user.id, 
                userInfo: {
                    name: user.name,
                    //last_name: user.last_name,
                    email: user.email,
                   // phone_1: user.phone_1,
                    //phone_2: user.phone_2,
                    //password: user.password,
                    role: user.role,
                    status: 'active'
                    }
                })
            }}>
            Editar
          </Button>

          <Button
            className="invoiceDltBtn"
            // icon="delete"
            onClick={() => {
              notification("success", "1 invoice deleted");
              this.props.deleteInvoice([user.key]);
              this.setState({ selected: [] });
            }}
          >
            <i className="ion-android-delete" />
          </Button>
        </div>
      )
    }
  ];  
  
  render() {
    const { deleteInvoice } = this.props;
    const { list } = this.state
   // const index = list.map(userInfo => userInfo.id);
    const { selected } = this.state;
    //const { nome, priorit } = this.state
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys: selected,
      onChange: selected => this.setState({ selected }),
      selections: [
        {
         // key: 'index',
          text: "Select All Invoices",
          onSelect: () =>
            this.setState({
              selected: this.props.list.map(list => list.id)
            })
           
        },
        {
         // key: 'index1',
          text: "Unselect all",
          onSelect: () => this.setState({ selected: [] })
        },
        {
         // key: 'index3',
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
            <IntlMessages id='header.users'/>
        </PageHeader>
        <Box>
          <div className="BtnAdd" align="right">
          <Button
            type="primary"
            onClick={this.showModal}
            style={{ top: -10 }}
          >
            Adicionar Usuário
          </Button>
          </div>
          <CardWrapper title="Cardapio">
          <div className="isoInvoiceTable">
            <Scrollbars style={{ width: "100%" }}>
              <TableWrapper rowKey='id'
              
                rowSelection={rowSelection}
                dataSource={list}
                columns={this.columns}
                pagination={{pageSize: 5}}
                className="invoiceListTable"
              />
            </Scrollbars>
          </div>
          </CardWrapper>
        </Box>
      </LayoutWrapper>
    );
  }
}
