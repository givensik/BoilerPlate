import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

//import antd framework
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'

//connect redux
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import Reducer from './_reducers';//index.js를 경로에 안써도 알아서 가져감

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);






// 기존 react DOM 임
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//New reactDOM (Test)

// ReactDOM.render(

//     <Provider 
//         store = {createStoreWithMiddleware(
//           Reducer,
//           window.__REDUX_DEVTOOLS_EXTENSION__ &&
//           window.__REDUX_DEVTOOLS_EXTENSION__()
//         )}>

//     </Provider>
//     , document.getElementById('root')

// // );



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
