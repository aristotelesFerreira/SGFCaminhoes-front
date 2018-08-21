import jwtDecode from 'jwt-decode';
import axios from 'axios'

class AuthHelper {
    login = async userInfo => {
        if(!userInfo.email || !userInfo.password) {
            return { error: 'preencha os campos'}
        }
        return await axios.post('http://127.0.0.1:3333/api/v1/login/token', userInfo)
            .then(response => {
            return this.checkExpirity(response.data.token);
           
          }).catch(error => {
              return { error: 'Dados inválidos'}
          })
    }
    
    checkExpirity = token => {
        if (!token) {
          return {
            error: 'Não correspondido',
          };
        }
        try {

          const profile = jwtDecode(token);
          const expiredAt = profile.expiredAt || profile.exp * 1000;
          return {
            ...profile,
            token,
            expiredAt: new Date(expiredAt),
          };
    /*       if (expiredAt > new Date().getTime()) {
            return {
              ...profile,
              token,
              expiredAt: new Date(expiredAt),
            };
          } else {
            return { error: 'Token expired' };
          } */
        } catch (e) {
          console.log(e);
    
          return { error: 'Server Error' };
        }
      };

}
export default new AuthHelper();