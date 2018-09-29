import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import { Button, Input, Icon, notification } from 'antd';
import Scrollbars from "../../components/utility/customScrollBar";

import axios from '../../helpers/axios'
import AddItinerary from './addItinerary'
import EditItinerary from './editItinerary' 
import ViewItinerary from './viewItinerary'


export default class index extends Component {

    newLat = parseFloat(localStorage.getItem('latitude'))
    newLng = parseFloat(localStorage.getItem('longitude'))
    state = {
        selected: [],
        visible: false,
        visibleEdit: false,
        visibleView: false,
        confirmLoading: false,
        list: [],
        initialState: {
            route_name: '',
            initial_point: '',
            lat_initial: '',
            lng_initial: '',
            end_point: '',
            lat_end: '',
            lng_end: '',
            distance: '',
            observation: '',
            status: true
        },
        itinerariesInfo: {
            route_name: '',
            initial_point: '',
            lat_initial: '',
            lng_initial: '',
            end_point: '',
            lat_end: '',
            lng_end: '',
            distance: '',
            observation: '',
            status: true
        },
        currentLocation: {
            lat: this.newLat,
            lng: this.newLng,
        },
        distance: [],
        time: [],
        
    }

    componentWillMount = () => {
        axios.get('itineraries')
        .then(response => {
          this.setState({
            list: response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
        this.getLocalization()
    }
    getLocalization() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
               
                localStorage.setItem('latitude', coords.latitude)
                localStorage.setItem('longitude', coords.longitude)
                
                /*this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })*/
            })
        } else {
            console.log("Não há suporte para esta versão do navegador !")
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
    showAddModal = () => {
        this.setState({
          visible: true
        })
    }
    handleAddClose = () => {
        this.setState({
          visible: false,
          distance: [''],
          time: [''],
          itinerariesInfo: {...this.state.initialState} 
        });
    }
    showModalEdit = () => {
      this.setState({
        visibleEdit: true
      })
    }
    handleEditClose = () => {
      this.setState({
        visibleEdit: false,
        distance: [''],
        time: [''],
        itinerariesInfo: {...this.state.initialState} 
      });
    }
    showModalView = () => {
      this.setState({
        visibleView:true
      })
    }
    handleViewClose = () => {
      this.setState({
        visibleView: false,
        distance: [''],
        time: [''],
        itinerariesInfo: {...this.state.initialState} 
      });
    }
    onChangeAddItinerariesInfo(key, value) {
        this.setState({
          itinerariesInfo: {
            ...this.state.itinerariesInfo,
            [key]: value
          }
        });
    }
    addItinerary = () => {
      console.log(this.state)
        if(this.state.itinerariesInfo.route_name !== '' && this.state.itinerariesInfo.lat_initial !== '' && this.state.itinerariesInfo.lat_end !== ''){
        let newItineraryInfo = {
            ...this.state.itinerariesInfo
        }
        axios.post('itineraries', newItineraryInfo)
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
                notification.error({message: 'Não foi possivel cadastrar'})
                console.log(error)
            })
        } else {
            notification.warning({message: 'Preencha os campos obrigatórios'})
        }
    }
    editItinerary = () => {
      if(this.state.itinerariesInfo.route_name !== '' && this.state.itinerariesInfo.lat_initial !== '' && this.state.itinerariesInfo.lat_end !== ''){
      let newItineraryInfo = {
        ...this.state.itinerariesInfo
      }
      axios.put(`itineraries/${this.state.uuid}`, newItineraryInfo)
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
              notification.error({message: 'Não foi possivel Editar'})
              console.log(error)
          })
      } else {
          notification.warning({message: 'Preencha os campos obrigatórios'})
      }

  }
    
    setMarkerA = (geocodedPrediction) => {
        this.setState({ 
        itinerariesInfo: {
            ...this.state.itinerariesInfo,
            initial_point: geocodedPrediction.formatted_address,
            lat_initial: geocodedPrediction.geometry.location.lat(),
            lng_initial: geocodedPrediction.geometry.location.lng(),
            },
        buscar: true
        })
       
    }
    setMarkerB = (geocodedPrediction) => {
        this.setState({ 
        itinerariesInfo: {
            ...this.state.itinerariesInfo,
            end_point: geocodedPrediction.formatted_address,
            lat_end: geocodedPrediction.geometry.location.lat(),
            lng_end: geocodedPrediction.geometry.location.lng()
            },
        buscar: true
        })
    }

    setText = (text) => {
        this.setState({
            distance: text.legs[0].distance,
            time: text.legs[0].duration,
            itinerariesInfo: {
              ...this.state.itinerariesInfo,
              distance: text.legs[0].distance.value
            }
        })
    }
    
    
    columns = [
        {
          title: "Nome da rota",
          dataIndex: "route_name",
          key: "route_name",
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
          onFilter: (value, record) => record.route_name.toLowerCase().includes(value.toLowerCase()),
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
        title: 'Origem',
        dataIndex: 'initial_point',
        key: 'initial_point',
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
            onFilter: (value, record) => record.initial_point.toLowerCase().includes(value.toLowerCase()),
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
          title: 'Destino',
          dataIndex: 'end_point',
          key: 'end_point',
          width: '10%',
          filterDropdown: ({ setSelectedKeys , selectedKeys, confirm, clearFilters }) => (
            <div className='custom-filter-dropdown' xs={5} sm={5}>
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Placa"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                //onChange={setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}         
              /> 
              <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
              <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
          onFilter: (value, record) => record.end_point.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            
            const { searchText } = this.state
            return  searchText ? (
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
          width: "20%",
          render: (text, itinerariesInfo) => (
            <div className="isoInvoiceBtnView">
              <Icon 
              type="search"  
              style={{ fontSize: 25, color: '#1890ff' }} 
              onClick={() => {
                console.log(itinerariesInfo)
                this.showModalView()
                this.setState({ uuid: itinerariesInfo.uuid, itinerariesInfo:{
                  route_name: itinerariesInfo.route_name,
                  initial_point: itinerariesInfo.initial_point,
                  lat_initial: itinerariesInfo.lat_initial,
                  lng_initial: itinerariesInfo.lng_initial,
                  end_point: itinerariesInfo.end_point,
                  lat_end: itinerariesInfo.lat_end,
                  lng_end: itinerariesInfo.lng_end,
                  observation: itinerariesInfo.observation,
                  status: itinerariesInfo.status
                  },
                  distance: this.state.distance,
                 
                })
              }}
              />
              <Icon 
              type="form"  
              style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
              onClick={() => {
               // console.log(itinerariesInfo)
                this.showModalEdit()
                this.setState({ uuid: itinerariesInfo.uuid, itinerariesInfo:{
                  route_name: itinerariesInfo.route_name,
                  initial_point: itinerariesInfo.initial_point,
                  lat_initial: itinerariesInfo.lat_initial,
                  lng_initial: itinerariesInfo.lng_initial,
                  end_point: itinerariesInfo.end_point,
                  lat_end: itinerariesInfo.lat_end,
                  lng_end: itinerariesInfo.lng_end,
                  observation: itinerariesInfo.observation,
                  status: itinerariesInfo.status
                  },
                  distance: this.state.distance,
                  
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
        return(
           
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.itineraries'/>
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
                <AddItinerary
                 setMarkerA={this.setMarkerA.bind(this)}
                 setMarkerB={this.setMarkerB.bind(this)}
                 open={this.state.visible}
                 close={this.handleAddClose}
                 addItinerary={this.addItinerary}
                 onChangeAddItinerariesInfo={this.onChangeAddItinerariesInfo.bind(this)}
                 confirmLoading={this.state.confirmLoading}
                 currentLocation={this.state.currentLocation}
                 setText={this.setText.bind(this)}
                 itinerariesInfo={this.state.itinerariesInfo}
                 distance={this.state.distance}
                 time={this.state.time}//update={this.state.update}
                 />
                 <EditItinerary 
                setMarkerA={this.setMarkerA.bind(this)}
                setMarkerB={this.setMarkerB.bind(this)}
                open={this.state.visibleEdit}
                close={this.handleEditClose}
                editItinerary={this.editItinerary}
                onChangeAddItinerariesInfo={this.onChangeAddItinerariesInfo.bind(this)}
                confirmLoading={this.state.confirmLoading}
                currentLocation={this.state.currentLocation}
                setText={this.setText.bind(this)}
                itinerariesInfo={this.state.itinerariesInfo}
                distance={this.state.distance}
                time={this.state.time}//update={this.state.update}
                markerA={this.state.markerA}
                markerB={this.state.markerB}
                />
                <ViewItinerary 
                 open={this.state.visibleView}
                 close={this.handleViewClose}
                 //editItinerary={this.editItinerary}
                 onChangeAddItinerariesInfo={this.onChangeAddItinerariesInfo.bind(this)}
                 confirmLoading={this.state.confirmLoading}
                 currentLocation={this.state.currentLocation}
                 setText={this.setText.bind(this)}
                 itinerariesInfo={this.state.itinerariesInfo}
                 distance={this.state.distance}
                 time={this.state.time}//update={this.state.update}
                /> 
              
            </Box>
              </LayoutWrapper> 
        )
    }
};
