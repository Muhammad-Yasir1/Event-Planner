import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import   './index.css';
import  App  from "./container/app.js";
import { Provider } from 'react-redux'
import { store } from './store/index'
import * as firebase from "firebase";
import "./components/bootstrap.css";
import {BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Navbar, NavDropdown, NavItem, Nav, MenuItem, Item } from "react-bootstrap";
import Favicon from 'react-favicon';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
, document.getElementById('root'));
