import { SET_CURRENT_USER } from './types';
import api from '../axios-config.js';
import setAuthToken from '../setAuthToken';
import { initResponseError, setResponseError, requestInfo, setResponseData } from './common.action';
import jwt_decode from 'jwt-decode';

export const registerUser = (user) => dispatch => {
  dispatch(initResponseError());
  dispatch(requestInfo(user));
  api.post('/api/users/register', user)
    .then(res => {
      dispatch(setResponseData('register', 'Success'));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const inviteMember = (data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/users/invite', data)
    .then(res => {
      dispatch(storeToken(res, 'invite'), window.location.href = '/');
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const gotoDashboard = (data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/users/login', data)
    .then(res => {
      dispatch(storeToken(res, 'login'), window.location.href = '/');
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const loginUser = (user) => dispatch => {
  dispatch(initResponseError());
  dispatch(requestInfo(user));
  api.post('/api/users/login', user)
    .then(res => {
      dispatch(storeToken(res, 'login'), window.location.href = '/');      
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const storeToken = (res, res_type) => {
  const { token } = res.data;
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
  setResponseData(res_type, 'Success');
  const decoded = jwt_decode(token);
  return setCurrentUser(decoded);
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}