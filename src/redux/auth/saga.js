import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import notification from '../../components/notification';
import AuthHelper from '../../helpers/authHelper';
import { push } from 'react-router-redux';
import { setToken, getToken, clearToken } from '../../helpers/utility';
import actions from './actions';
import axios from 'axios'

//const URL = 'http://127.0.0.1:3333/api/v1/';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    
    const { history, userInfo } = payload;
    
    const result = yield call(AuthHelper.login, userInfo);
    if (result.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: result,
        token: result.token,
        history
      });
    } else {
      notification('error', result.error || result);
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*({ payload, history }) {
    yield setToken(payload.token);
    if (history) {
      history.push('/dashboard');
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const { token } = AuthHelper.checkExpirity(getToken());
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: { token },
        token,
        profile: 'Profile'
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
