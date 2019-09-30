import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import themeReducer from './reducers/theme.reducer';
import layoutReducer from './reducers/layout.reducer';
import authReducer from './reducers/auth.reducer';
import errorReducer from './reducers/error.reducer';
import reqinfoReducer from './reducers/reqinfo.reducer';
import resdataReducer from './reducers/resdata.reducer';

const inititalState = {};

const store = createStore(
  combineReducers({
    theme: themeReducer,
    layout: layoutReducer,
    auth: authReducer,
    errors: errorReducer,
    req_info: reqinfoReducer,
    res_data: resdataReducer,
  }),
  inititalState, 
  compose(applyMiddleware(thunk))
);

export default store;
