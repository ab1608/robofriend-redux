import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import App from './containers/App.js'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {searchRobots, requestRobots} from "./reducers";
import 'tachyons';

// Middleware
const logger = createLogger();
const middle = applyMiddleware(thunkMiddleware, logger);
const rootReducer = combineReducers({searchRobots, requestRobots})
const store = createStore(rootReducer, middle);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <App></App>
        </Provider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();