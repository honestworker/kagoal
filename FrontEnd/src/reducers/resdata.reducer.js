import { GET_RESPONSE_DATA } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_RESPONSE_DATA:
      return { data: action.payload, api: action.api };
    default: 
      return state;
  }
}