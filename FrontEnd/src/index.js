import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './app.component';
import { Provider } from 'react-redux';
import store from './reducers';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authentication';

WebFont.load({
  google: {
    families: ['Barlow:300,400,400i,500,600,700']
  }
});

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
} else {
  if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
