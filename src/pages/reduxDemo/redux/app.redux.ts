const demo = {
  loading: true,
  name: 'wangWu',
};

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
