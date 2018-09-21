import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";

export default class index extends Component {
    state = {

    }

    render() {
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.itineraries'/>
            </PageHeader>
            <Box>
            
            </Box>
            </LayoutWrapper>
        )
    }
};
