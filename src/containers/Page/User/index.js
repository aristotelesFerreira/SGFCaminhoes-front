import React, { Component } from 'react';
import PageHeader from "../../../components/utility/pageHeader";
import IntlMessages from "../../../components/utility/intlMessages";
import { Button, message } from "antd";
import CardWrapper, { Box, StatusTag } from "./index.style";
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import axios from '../../../helpers/axios'

export default class extends Component {
  
  state = {
      selected: [],
      visibleAddModal: false,
      visibleEditModal: false,
      list: [],
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
        this.setState({
            list: response.data
        })
    })
    .catch(error => {
        console.log(error)
    })
  }
  
  render() {
    return (
      <LayoutWrapper>
        <PageHeader>
            <IntlMessages id='header.users'/>
        </PageHeader>
        <Box>
        
        </Box>
      </LayoutWrapper>
    );
  }
}
