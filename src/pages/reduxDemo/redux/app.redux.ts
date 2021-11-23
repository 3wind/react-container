// state
const demo = {
  loading: true,
  name: 'wangWu',
};

// action
export const demoActionSetName = (name: string) => {
  return { type: 'CHANGE_NAME', payload: { name } };
};

// reducer
export const demoReducer = (
  state = demo,
  action: {
    type: string;
    payload: {
      loading?: boolean;
      name: string;
    };
  },
) => {
  switch (action.type) {
    case `CHANGE_NAME`:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
