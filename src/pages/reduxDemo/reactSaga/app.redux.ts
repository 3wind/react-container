import produce from 'immer';
import { handleActions } from 'redux-actions';
import { put, delay, takeEvery } from 'redux-saga/effects';

// state
const demo = {
  loading: true,
  name: 'wangWu',
};

function* updateName({ payload }: any): Generator {
  yield delay(2000);
  yield put({
    type: 'CHANGE_NAME',
    payload: { name: payload.name },
  });
}

function* updateLoadStatus({ payload }: any) {
  yield delay(2000);
  yield put({
    type: 'CHANGE_LOADING_STATUS',
    payload: { loading: payload.loading },
  });
}

export function* watchUpdateName() {
  // 监听类型为UPDATE_NAME的action，监听到调用updateName
  yield takeEvery('UPDATE_NAME_SAGA', updateName);
  yield takeEvery('UPDATE_LOADING_STATUS_SAGA', updateLoadStatus);
}

// handleActions简写reducer写法，immer的produce简写state处理
export const demoReducer = handleActions(
  {
    CHANGE_LOADING_STATUS: (state, { payload }) =>
      produce(state, (draft) => {
        draft.loading = payload.loading;
      }),
    CHANGE_NAME: (state, { payload }) =>
      produce(state, (draft) => {
        draft.name = payload.name;
      }),
  },
  demo,
);
