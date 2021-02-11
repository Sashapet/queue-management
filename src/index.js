import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext'
import {CustomerProvider} from './context/CustomerContext'

ReactDOM.render(
  <Router>
    <AuthProvider>
      <DashboardProvider>
        <CustomerProvider>
          <App />
        </CustomerProvider>
      </DashboardProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
