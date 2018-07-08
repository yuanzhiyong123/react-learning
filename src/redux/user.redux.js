import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getRedirectTo } from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERR = 'REGISTER_ERR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const GET_USERINFO = 'GET_USERINFO';
const LOGOUT = 'LOGOUT';

const initState = {
  isAuth: false,
  msg: '',
  username: '',
  password: '',
  type: '',
  redirectTo: ''
}
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:  //注册成功
      return { ...state, ...action.payload, msg: '', isAuth: true, redirectTo: getRedirectTo(action.payload) };
    case LOGIN_SUCCESS:  //登陆成功
      return { ...state, ...action.payload, msg: '', isAuth: true, redirectTo: getRedirectTo(action.payload) };
    case GET_USERINFO:  //获取用户信息
      return { ...state, ...action.payload, msg: '', isAuth: true };
    case REGISTER_ERR:  //失败
      return { ...state, ...action.payload, isAuth: false };
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state;
  }
}

export function logout() {
  return { type: LOGOUT }
}
export function update(payload) {
  return dispatch => {
    axios.post('/user/update', payload).then(res => {
      if (res.data.code === 0) {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.data })
      } else {
        Toast.fail(res.data.msg, 1);
        dispatch({ type: REGISTER_ERR, payload: { msg: res.data.msg } })
      }
    });
  }
}
export function getUserInfo(payload) {
  return { type: GET_USERINFO, payload }
}
export function register({ username, password, repeatpassword, type }) {
  if (!username || !password || !repeatpassword) {
    const errMsg = '用户名或者密码不能为空';
    Toast.fail(errMsg, 1)
    return {
      type: REGISTER_ERR, payload: { msg: errMsg }
    }
  }
  if (password !== repeatpassword) {
    const errMsg = '两次密码不一致';
    Toast.fail(errMsg, 1);
    return {
      type: REGISTER_ERR, payload: { msg: errMsg }
    }
  }
  return dispatch => {
    axios.post('/user/register', { username, password, type }).then(res => {
      if (res.data.code === 0) {
        Toast.success('注册成功', 1);  //成功提示框
        dispatch({
          type: REGISTER_SUCCESS, payload: { username, password, type }
        });
      } else {
        Toast.fail(res.data.msg, 1);
        dispatch({
          type: REGISTER_ERR, payload: { msg: res.data.msg }
        });
      }
    }).catch(err => {
      const errMsg = '出错了';
      Toast.fail(errMsg, 1);
      dispatch({
        type: REGISTER_ERR, payload: { msg: errMsg }
      });
    });
  }
}

export function login({ username, password }) {
  if (!username || !password) {
    const errMsg = '用户名和密码不能为空';
    Toast.fail(errMsg, 1);  //错误提示
    return { type: REGISTER_ERR, payload: { msg: errMsg } }
  }
  return dispatch => {
    axios.post('/user/login', { username, password }).then(res => {
      if (res.data.code === 0) {
        Toast.success('登陆成功', 1);  //成功提示框
        dispatch({
          type: LOGIN_SUCCESS, payload: res.data.data
        });
      } else {
        Toast.fail(res.data.msg, 1);
        dispatch({
          type: REGISTER_ERR, payload: { msg: res.data.msg }
        });
      }
    }).catch(err => {
      const errMsg = '出错了';
      Toast.fail(errMsg, 1);
      dispatch({
        type: REGISTER_ERR, payload: { msg: errMsg }
      });
    });
  }
}