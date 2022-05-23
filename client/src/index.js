import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import antd framework
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'

// //connect redux
// import { Provider } from "react-redux";
// import {applyMiddleware, configureStore } from "redux";
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(configureStore);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
