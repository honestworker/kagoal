import api from '../axios-config.js';

import { initResponseError, setResponseError, setResponseData  } from './common.action';

export const getBoardList = () => dispatch => {
  dispatch(initResponseError());
  api.get('/api/boards')
    .then(res => {
      dispatch(setResponseData('boardlist', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
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

export const cloneBoard = (id) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/boards/clone/' + id)
    .then(res => {
      dispatch(setResponseData('cloneboard', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const getBoardDetail = (team_id, board_id) => dispatch => {
  dispatch(initResponseError());
  api.get('/api/boards/' + team_id + '/' + board_id)
    .then(res => {
      dispatch(setResponseData('detailboard', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const updateBoard = (id, data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/boards/' + id, data)
    .then(res => {
      dispatch(setResponseData('updateboard', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const deleteBoard = (id) => dispatch => {
  dispatch(initResponseError());
  api.delete('/api/boards/' + id)
    .then(res => {
      dispatch(setResponseData('deleteboard', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const updateBoardItem = (id, data) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/boards/items/' + id, data)
    .then(res => {
      dispatch(setResponseData('updateboarditem', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const deleteBoardItem = (bid, cid, iid) => dispatch => {
  dispatch(initResponseError());
  api.delete('/api/boards/items/' + bid + '/' + cid + '/' + iid)
    .then(res => {
      dispatch(setResponseData('deleteboarditem', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}

export const createBoardColumn = (id, name) => dispatch => {
  dispatch(initResponseError());
  api.post('/api/boards/columns/' + id, name)
    .then(res => {
      dispatch(setResponseData('createboardcolumn', res.data));
    })
    .catch(err => {
      dispatch(setResponseError(err.response.data));
    });
}