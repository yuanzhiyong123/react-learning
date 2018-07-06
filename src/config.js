import axios from 'axios';
import { Toast } from 'antd-mobile';

//拦截请求统一加载loading
axios.interceptors.request.use(config => {
  Toast.loading('加载中', 0);
  return config;
});

//拦截响应  统一隐藏loading
axios.interceptors.response.use(config => {
  Toast.hide();
  return config;
});