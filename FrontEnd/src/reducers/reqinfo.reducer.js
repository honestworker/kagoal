import { GET_REQUEST_INFO } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_REQUEST_INFO:
      return action.payload;
    default: 
      return state;
  }
}