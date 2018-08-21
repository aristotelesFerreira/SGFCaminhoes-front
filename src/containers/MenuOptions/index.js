import React, { Component } from "react";
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import PageHeader from "../../components/utility/pageHeader";
import IntlMessages from "../../components/utility/intlMessages";
import { Button, message } from "antd";
import CardWrapper, { Box, StatusTag } from "./invoice.style";
import Scrollbars from "../../components/utility/customScrollBar";
import notification from "../../components/notification";
import TableWrapper from "../Tables/antTables/antTable.style";
import { Link } from "react-router-dom";
import AddMenuOptions from "./addMenuOptions";
import EditMenuOptions from './editMenuOptions'
import axios from '../../helpers/axios'


export default class Index extends Component {

  clear() {
    this.setState(state => { 
      return {menuOptionsInfo: this.initialState }
    });
  }

  state = {
    selected: [],
    visible: false,
    visibleEdit: false,
    confirmLoading: false,
    list: [],
    initialState: {
        name: "",
        slug: "",
        priority: ''
    },
    menuOptionsInfo: {
      name: "",
      slug: "",
      priority: "",
      secure_id: ''
    }
  };

  componentWillMount() {
    axios
      .get("menu-options")
      .then(response => {
        this.setState(state => { 
          return {list: response.data}
        });
        console.log('lista: '+this.state.list)
      })
      .catch(error => {
        console.log(error);
      });
     
  }
  
  updateField(event) {
    const menuOptionsInfo = { ...menuOptionsInfo };
    menuOptionsInfo[event.target.name] = event.target.value;
    this.setState({ menuOptionsInfo });
  }
  showModalEdit = () => {
    this.setState({
      visibleEdit:true
    })
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleClose = () => {
    this.setState({
      visible: false
    });
  }
  handleEditClose = () => {
    this.setState({
      visibleEdit: false
    })
  }
  addMenuOptions = () => {
    const { name } = this.state.menuOptionsInfo;
    if (name !== '') {
      let newMenuOptionsInfo = {
        ...this.state.menuOptionsInfo
      };
      axios.post("menu-options", newMenuOptionsInfo)
        .then(response => {
          this.setState({
            confirmLoading: true
          });
          setTimeout(() => {
            this.setState({
              confirmLoading: false
            });
            this.handleClose();
            this.componentWillMount()
          }, 2000);
          message.success("Cardápio inserido com sucesso !");
        })
        .catch(error => {
          message.error("Não foi possivel inserir o cardápio !");
          console.log(error);
        });
    } else {
      message.warning("Campo nome obrigatório !");
    }
  }
  editMenuOptions = () => {
    console.log(this.state.secure_id)
    const { name } = this.state.menuOptionsInfo
    if( name!= ''){
      let editMenuOptionsInfo = {
        ...this.state.menuOptionsInfo
      }
      axios.put(`menu-options/${this.state.secure_id}`, editMenuOptionsInfo)
      .then(response => {
        notification('success', 'Cardápio editado com sucesso')
      })
      .catch(error => {
        console.log(error)
        notification('error', 'Falha ao editar cardápio')
      })
    } else {
      notification('warning', "Campo 'nome' obrigatório !")
    }
  }
  onChangeAddMenuOptionsInfo(key, value) {
    this.setState({
      menuOptionsInfo: {
        ...this.state.menuOptionsInfo,
        [key]: value
      }
    });
  }
  columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: text => <span>{text}</span>
    
    },
    {
      title: "Prioridade",
      dataIndex: "priority",
      key: 'priority',
      width: "20%",
      render: text => <span>{text}</span>
    
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: 'orderStatus',
      width: "20%",
      render: (text, orderStatus) => {
        
        let className;
        if (text === "shipped" || text === "Shipped" || text === "SHIPPED") {
          className = "shipped";
        } else if (
          text === "delivered" ||
          text === "Delivered" ||
          text === "DELIVERED"
        ) {
          className = "delivered";
        } else if (
          text === "pending" ||
          text === "Pending" ||
          text === "PENDING"
        ) {
          className = "pending";
        }
        return <StatusTag className={className}>{text}</StatusTag>;
      }
    },
    {
      title: "Ações",
      dataIndex: "view",
      key: "view",
      width: "20%",
      render: (text, menuOptions) => (
        <div className="isoInvoiceBtnView">
          <Link to={`${this.props.match.path}/${menuOptions.secure_id}`}>
            <Button type="primary" >
              Visualizar
            </Button>
          </Link>
          <Button color='primary'
            onClick={() => {
              this.showModalEdit()
              this.setState({ nome: menuOptions.name, secure_id: menuOptions.secure_id })
            }}>
            Editar
          </Button>

          <Button
            className="invoiceDltBtn"
            // icon="delete"
            onClick={() => {
              notification("success", "1 invoice deleted");
              this.props.deleteInvoice([menuOptions.key]);
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
    //const index = list.map(menuOptionsInfo => menuOptionsInfo.id);
    const { selected } = this.state;
    const { nome, priorit } = this.state
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
          <IntlMessages id="header.menu-options" />
        </PageHeader>
        <Box>
          <div className="BtnAdd" align="right">
            <Button
              type="primary"
              onClick={this.showModal}
              style={{ top: -10 }}
            >
              Adicionar Cardápio
            </Button>
          </div>
          <ul>
        </ul>
          <CardWrapper title="Cardapio">
            <div className="isoInvoiceTable">
              <Scrollbars style={{ width: "100%" }}>
                <TableWrapper
                  rowSelection={rowSelection}
                  dataSource={list}
                  columns={this.columns}
                  pagination={true}
                  className="invoiceListTable"
                />
              </Scrollbars>
             
            </div>
          </CardWrapper>
        </Box>
        <AddMenuOptions
          open={this.state.visible}
          close={this.handleClose}
          addMenuOptions={this.addMenuOptions}
          onChangeAddMenuOptionsInfo={this.onChangeAddMenuOptionsInfo.bind(
            this
          )}
          confirmLoading={this.state.confirmLoading}
        />
        <EditMenuOptions
        name={nome}
        priority={priorit}
        open={this.state.visibleEdit}
        close={this.handleEditClose}
        addMenuOptions={this.editMenuOptions}
        onChangeAddMenuOptionsInfo={this.onChangeAddMenuOptionsInfo.bind(
          this
        )}
        confirmLoading={this.state.confirmLoading}
        />
      </LayoutWrapper>
    );
  }
}