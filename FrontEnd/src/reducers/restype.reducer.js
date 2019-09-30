import { GET_RESPONSE_TYPE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_RESPONSE_TYPE:
      return action.payload;
    default: 
      return state;
  }
}