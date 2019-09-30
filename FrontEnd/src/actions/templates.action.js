import api from '../axios-config.js';

import { initResponseError, setResponseError, setResponseData  } from './common.action';

export const getTemplateList = () => dispatch => {
  dispatch(initResponseError());
  api.get('/api/templates')
    .then(res => {
      dispatch(setResponseData('templatelist', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}