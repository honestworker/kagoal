import api from '../axios-config.js';

import { initResponseError, setResponseError, setResponseData  } from './common.action';

export const getTeamList = () => dispatch => {
  dispatch(initResponseError());
  api.get('/api/teams')
    .then(res => {
      dispatch(setResponseData('teamlist' , res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const getTeamTreeList = () => dispatch => {
  dispatch(initResponseError());
  api.get('/api/teams/tree')
    .then(res => {
      dispatch(setResponseData('teamtree' , res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const getTeamTreeListById = (id) => dispatch => {
  dispatch(initResponseError());
  api.get('/api/teams/' + id + '/tree')
    .then(res => {
      dispatch(setResponseData('teamtreebyid' , res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const getTeamInfo = (id) => dispatch => {
  dispatch(initResponseError());
  api.get('/api/teams/' + id)
    .then(res => {
      dispatch(setResponseData('getteam', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const setTeamInfo = (data) => dispatch => {
  dispatch(initResponseError());
  api.patch('/api/teams/' + data.id, data)
    .then(res => {
      dispatch(setResponseData('updateteam', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const createTeam = (data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/teams', data)
    .then(res => {
      dispatch(setResponseData('createteam', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const deleteTeam = (id) => dispatch => {
  dispatch(initResponseError());
  api.delete('/api/teams/' + id)
    .then(res => {
      dispatch(setResponseData('deleteteam', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}