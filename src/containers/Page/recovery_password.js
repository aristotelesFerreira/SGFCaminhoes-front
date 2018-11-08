import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import axios from 'axios'
import {notification} from 'antd'

export default class RecoveryPassword extends Component {
  state = {
    password: '',
    recovery_uuid: null,
    confirmLoading: false
  };


  sendEmail = () => {
      const { password, recovery_uuid } = this.state
      if (password !== '') {
        axios.put(`http://127.0.0.1:3333/users/recovery_uuid/${this.props.match.params.id}`, {password : password, recovery_uuid: recovery_uuid })
          .then(response => {
            if(response.data !== 'Filtro não encontrado'){
            this.setState({
              confirmLoading: true
            });
            setTimeout(() => {
              this.setState({
                confirmLoading: false
              });
              this.handleSignIn()
            }, 3000);
            notification.success({message: `Senha cadastrada com sucesso !`})
          }
          else {
            notification.warning({message: ` Token expirado `})
          }
          })
          .catch(error => {
            notification.error({message: `Não foi possivel cadastrar a senha !`})
            console.log(error);
          });
      } else {
        notification.warning({message: 'Campos inválidos', description: 'Preencha o e-mail !'})
      }
  }
  handleSignIn = () => {
    this.props.history.push('/signin');
  }
  onChange = (e) => {
    this.setState({
      password: e.target.value,
    });
   
  }

  render() {
   
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/signin">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large"  type="password" placeholder="Nova senha" id="inputEmail" onChange={this.onChange}/>
              </div>
             
               <div className="isoInputWrapper isoLeftRightComponent">
               <div></div>
                <Button type="primary" onClick={this.sendEmail} loading={this.state.confirmLoading}>
                  Salvar
                </Button>
              </div>



             
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

