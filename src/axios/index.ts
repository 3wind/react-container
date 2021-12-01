import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const service = axios.create({
  baseURL: '/',
  timeout: 1000 * 10,
});

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);

interface RequestProps {
  url: string;
  params?: any;
  config?: AxiosRequestConfig;
}

export const get = ({ url, params, config }: RequestProps) =>
  service.get(url, { ...config, params });

export const post = ({ url, params, config }: RequestProps) =>
  service.post(url, qs.stringify(params), {
    ...config,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

export const postJson = ({ url, params, config }: RequestProps) =>
  service.post(url, JSON.stringify(params), {
    ...config,
    headers: { 'Content-Type': 'application/json' },
  });

export const upload = ({ url, params }: RequestProps) =>
  service.post(url, params, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 0,
  });
