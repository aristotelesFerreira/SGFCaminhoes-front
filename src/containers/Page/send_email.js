import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import {notification} from 'antd'
import axios from 'axios'

export default class SendEmail extends Component {
  state = {
    email: '',
    confirmLoading: false
  };

  sendEmail = () => {
      const { email } = this.state
      if (email !== '') {
        axios.post("http://127.0.0.1:3333/recovery", {email : email})
          .then(response => {
            if(response.data !== 'e-mail não encontrado'){
            this.setState({
              confirmLoading: true
            });
            setTimeout(() => {
              this.setState({
                confirmLoading: false
              });
              this.handleSignIn()
            }, 3000);
            notification.success({message: `Email enviado para ${email}`})
          }
          else {
            notification.warning({message: `${email} não encontrado `})
          }
          })
          .catch(error => {
            notification.error({message: `Não foi possivel enviar o email para ${email}`})
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
      email: e.target.value,
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
                <Input size="large" placeholder="E-mail" id="inputEmail" onChange={this.onChange}/>
              </div>

               <div className="isoInputWrapper isoLeftRightComponent">
               <div></div>
                <Button type="primary" onClick={this.sendEmail} loading={this.state.confirmLoading}>
                  Recuperar senha
                </Button>
              </div>



             
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

