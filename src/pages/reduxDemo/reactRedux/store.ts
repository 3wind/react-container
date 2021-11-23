import { combineReducers, createStore } from 'redux';
import { demoReducer } from './app.redux';

const rootReducer = combineReducers({ demo: demoReducer });

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
