//Store for Home Component
import {  createStore } from 'redux';
import {reducers} from './homeReducers.js';

export function configureStore(initialState = {}) {  
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore(); 