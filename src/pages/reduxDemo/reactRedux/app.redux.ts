// 引用redux-action简化action和reducer创建
import produce from 'immer';
import { handleActions } from 'redux-actions';

// state
const demo = {
  loading: true,
  name: 'wangWu',
};

// createActions简写actions
// export const actions = {
//   changeLoadingStatus: createActions('CHANGE_LOADING_STATUS'),
//   changeName: createActions('CHANGE_NAME')
// }

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
