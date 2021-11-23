import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { demoReducer, watchUpdateName } from './app.redux';

const rootReducer = combineReducers({ demo: demoReducer });

// 启动Effects
function* rootSaga() {
  yield all([watchUpdateName()]);
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 声明state类型
export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
}
