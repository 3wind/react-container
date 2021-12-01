import { get } from '@/axios/index';

export const getReduxTestDataAPI = () =>
  get({
    url: '/mock/reduxTest',
  });
