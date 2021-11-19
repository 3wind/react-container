import { combineReducers, createStore } from 'redux';
import { demoReducer } from './app.redux';

const reducer = combineReducers({ demo: demoReducer });
const store = createStore(reducer);

export default store;
