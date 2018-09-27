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
        markerA: {
            address: '',
            lat: '',
            lng: '',
           // teste: []
        },
        markerB: {
            address: '',
            lat: '',
            lng: ''
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
        if(this.state.itinerariesInfo.route_name !== '' && this.state.markerA.lat !== '' && this.state.markerB.lat !== ''){
        let newItineraryInfo = {
            route_name: this.state.itinerariesInfo.route_name,
            initial_point: this.state.markerA.address,
            lat_initial: this.state.markerA.lat,
            lng_initial: this.state.markerA.lng,
            end_point: this.state.markerB.address,
            lat_end: this.state.markerB.lat,
            lng_end: this.state.markerB.lng,
            distance: this.state.distance.value,
            observation: this.state.itinerariesInfo.observation,
            status: this.state.itinerariesInfo.status
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
    
    setMarkerA = (geocodedPrediction) => {
        this.setState({ 
        markerA: {
            address: geocodedPrediction.formatted_address,
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng(),
            }
        })
        console.log(this.state.markerA)
    }
    setMarkerB = (geocodedPrediction) => {
        this.setState({ 
        markerB: {
            address: geocodedPrediction.formatted_address,
            lat: geocodedPrediction.geometry.location.lat(),
            lng: geocodedPrediction.geometry.location.lng()
            }
        })
    }

    setText = (text) => {
        this.setState({
            distance: text.legs[0].distance,
            time: text.legs[0].duration
        })
       // console.log(this.state.distance)
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
            let className, userStatus;
            if (status.status !== 0 ) {
              className = "Ativo";
               userStatus =  <Icon type="check-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
               /*<StatusTagAtivo>{className}</StatusTagAtivo>*/
            } else{
              className = "Inativo";
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
                  //purchase_date:  moment(new Date(cartsInfo.purchase_date)).format('YYYY-MM-DD'),
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
                  //purchase_date:  moment(new Date(cartsInfo.purchase_date)).format('YYYY-MM-DD'),
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
                        //rowSelection={rowSelection}
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
                 origin={this.state.markerA}
                 destination={this.state.markerB}
                 currentLocation={this.state.currentLocation}
                 setText={this.setText.bind(this)}
                 itinerariesInfo={this.state.itinerariesInfo}
                 distance={this.state.distance}
                 time={this.state.time}//update={this.state.update}
                 markerA={this.state.markerA}
                 markerB={this.state.markerB}
                 />
            </Box>
            </LayoutWrapper>
        )
    }
};
