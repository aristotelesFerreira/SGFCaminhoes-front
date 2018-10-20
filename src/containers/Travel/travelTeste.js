import React, {Component} from 'react'

import axios from '../../helpers/axios'

class travelTeste extends Component {

    state = {
        data: null
    }

    componentDidMount = () => {
        axios.get(`travels/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                data: response.data
            })
        })
        console.log(this.state.data)
    }

    render() {
        const { data } = this.state
        return(
            <div>
             
              
            </div>
           
        )
    }
};



export default travelTeste