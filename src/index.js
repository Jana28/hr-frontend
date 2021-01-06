import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {Provider} from 'react-redux';
import axios from 'axios';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer'
import { combineReducers } from 'redux'
console.log(process.env.REACT_APP_BACKEND_BASEURL)
axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_BASEURL}api/`;
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('hrtoken');
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use( request => {
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

axios.interceptors.response.use( response => {
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

const rootReducer = combineReducers({
  auth: authReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))

const history = createBrowserHistory();

const renderApp = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && (module).hot) {
  (module).hot.accept('./App', renderApp)
}

renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


