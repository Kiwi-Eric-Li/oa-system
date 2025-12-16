import axios from 'axios';

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000, // 请求超时时间
  withCredentials: true, // 是否携带 cookie
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    if(response.headers.authorization){
        localStorage.setItem("token", response.headers.authorization);
    }
    const res = response.data;
    if (res.code !== 0) {
      console.error(res.message || '请求失败');
      return Promise.reject(res);
    }

    return res;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error('未登录或登录已过期');
          localStorage.removeItem('token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('没有权限');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('请求错误');
      }
    } else {
      console.error('网络异常');
    }

    return Promise.reject(error);
  }
);

export default service;
