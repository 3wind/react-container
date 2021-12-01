import { get } from '@/axios/index';

export const getUserInfoAPI = () =>
  get({
    url: '/mock/getUserInfo',
  });
