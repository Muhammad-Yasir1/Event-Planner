import React from 'react';
import ReactDOM from 'react-dom';
import   './index.css';
import config from './config/indexfirebase';
import App from './container/App';
import { Provider } from 'react-redux'
import { store } from './store/storeindex'

import TodoForm from './components/todoForm/todoForm';
import TodoItem from './components/todoItem/todoItem';




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
