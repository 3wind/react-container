import axios from 'axios';
import { message, notification } from 'antd';
import { Method, AxiosRequestHeaders, ResponseType, AxiosRequestTransformer } from 'axios';

interface OPTION_TYPE {
  loading?: boolean;
  mock?: boolean;
  error?: boolean;
}

const Y_API = 'http://**/mock/1/';

function httpErrorStatusHandle(errcode: any, url?: string) {
  const errorMessage: any = {
    302: '接口重定向了！',
    400: '参数不正确！',
    // 402: '您未登录，或者登录已经超时，请先登录！',
    // 403: '您没有权限操作！',
    404: `请求地址出错！`,
    408: '请求超时！',
    413: '请求实体太大',
    431: '请求头字段太大',
    // 409: '系统已存在相同数据！',
    500: '服务器内部错误！',
    // 501: '服务未实现！',
    // 502: '网关错误！',
    // 503: '服务不可用！',
    // 504: '服务暂时无法访问，请稍后再试！',
    // 505: 'HTTP版本不受支持！',
  };
  let message: string = '网络错误，请稍后重试！';
  if (errcode) message = `接口${url}请求失败，${errorMessage[errcode]}状态码为${errcode}`;
  notification.error({
    message,
  });
}

// 创建axios实例
const service = axios.create({
  baseURL: '/', // 代理地址前缀
  timeout: 20000, // 超时时间
  withCredentials: true, // 跨域是否携带cookie
});

// 取消请求的基本流程
// 配置 cancelToken 对象
// 缓存用于取消请求的 cancel 函数
// 在后面特定时机调用 cancel 函数取消请求
// 在错误回调中判断如果 error 是cancel ，做相应处理

// let cancel: any;
// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    // 部分接口在params中传了 'sftcwl-request-type' ,需要加在header中，并把params中的对应删除
    if (config.params) {
      if (config.params.sftcwl_request_type) {
        config.headers = {
          'sftcwl-request-type': config.params.sftcwl_request_type,
        };
        delete config.params.sftcwl_request_type;
      }
    }
    // if (typeof cancel === 'function') {
    //   cancel('强制取消了请求');
    // }
    // config['cancelToken'] = new axios.CancelToken(function (c) {
    //   cancel = c;
    // });
    return config;
  },
  (err: any) => {
    // 请求拦截失败
    return Promise.reject(err);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    // cancel = null;
    // 响应拦截成功
    const { status } = response;
    if (status === 200 || status < 300 || status === 304) {
      // 接口返回成功
      return response;
    }
    return Promise.reject(response);
  },
  (err: any) => {
    // cancel = null;
    // if (axios.isCancel(err)) {
    //   // console.log('取消上一个请求');
    //   // 中断promise链接
    //   return new Promise(() => {});
    // } else {
    // 处理响应拦截失败
    const {
      status,
      config: { url },
    } = err.toJSON();
    httpErrorStatusHandle(status, url);
    return Promise.reject(err);
    // }
  }
);

interface IProps {
  url: string;
  method: Method;
  data?: any;
  options?: OPTION_TYPE;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
}
// 统一的请求处理
function request(props: IProps) {
  return new Promise((resolve, reject) => {
    const {
      url,
      data,
      method,
      options = { loading: false, mock: false, error: true },
      headers,
      responseType,
      transformRequest,
    } = props;
    let loadingInstance: any;
    if (options.loading) loadingInstance = message.loading('请求加载中', 0);
    const serviceParams: any = {
      url: options.mock ? Y_API : url,
      method,
    };
    // get方法传params
    if (method === 'get' && data) serviceParams.params = data;
    if (method === 'post' && data) serviceParams.data = data;
    if (headers) serviceParams.headers = headers;
    if (responseType) serviceParams.responseType = responseType;
    if (transformRequest) serviceParams.transformRequest = transformRequest;

    service(serviceParams)
      .then((res: any) => {
        const { data, status, headers } = res;
        if (status === 200) {
          if (data.errno === 0 || data.errno) {
            resolve(data);
          } else {
            const fileName: string = headers['content-disposition']
              ?.split('filename=')[1]
              ?.split('name')[1];
            resolve({ blob: data, fileName });
          }
        } else {
          if (options.error) {
            // 接口请求成功 但是errno 不为 0
            notification.error({
              message: data.errmsg,
            });
          }
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        setTimeout(loadingInstance, 0);
      });
  });
}

export const getRequest = (url: string, params?: any, options?: OPTION_TYPE) => {
  return request({
    url,
    options,
    method: 'get',
    data: params,
  });
};

export const postRequest = (url: string, params: any, options?: OPTION_TYPE) => {
  return request({
    url,
    options,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [
      function (data) {
        let ret = '';
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      },
    ],
  });
};

export const postRequestFormData = (url: string, params?: any, options?: OPTION_TYPE) => {
  return request({
    url,
    options,
    method: 'post',
    data: params,
  });
};

export const postRequestWithJSON = (url: string, params?: string, options?: OPTION_TYPE) => {
  return request({
    url,
    options,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const postRequestWithJSONBlob = (url: string, params?: string, options?: OPTION_TYPE) => {
  return request({
    url,
    options,
    method: 'post',
    data: params,
    responseType: 'blob',
  });
};
