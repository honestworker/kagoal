import { GET_ERRORS, GET_REQUEST_INFO, GET_RESPONSE_DATA } from './types';

export const initResponseError = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  }
}

export const setResponseError = (error) => {
  if (error === "Unauthorized") {
    window.location.href = "/login";
  }
  return {
    type: GET_ERRORS,
    payload: error
  }
}

export const requestInfo = info => {
  return {
    type: GET_REQUEST_INFO,
    payload: info
  }
}

export const setResponseData = (api, data) => {
  return {
    type: GET_RESPONSE_DATA,
    payload: data,
    api: api
  }
}