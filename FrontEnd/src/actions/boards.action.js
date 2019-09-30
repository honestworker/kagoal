import api from '../axios-config.js';

import { initResponseError, setResponseError, setResponseData  } from './common.action';

export const getBoardList = () => dispatch => {
  dispatch(initResponseError());
  api.get('/api/boards')
    .then(res => {
      dispatch(setResponseData('boardlist', res.data));
    })
    .catch(err => {
      // dispatch(setResponseError(err.response.data));
    });
}

export const createBoard = (data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/boards', data)
    .then(res => {
      dispatch(setResponseData('createboard', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}