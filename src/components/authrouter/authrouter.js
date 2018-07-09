import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../redux/user.redux';

@withRouter //不是路由组件 可以通过react-router-dom 提供的接口进行包裹  模拟路由
@connect(state=>state, {getUserInfo})
export default class AuthRouter extends Component {
  componentDidMount() {
    const pathArr = ['/login', '/register'];
    const pathName = this.props.location.pathname;  //获取当前匹配路由
    if(pathArr.indexOf(pathName) > -1) {  //如果实在登陆页或者注册页 不再往下执行
      return;
    }
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) { //如果有登陆信息
        this.props.getUserInfo(res.data.data);
      } else {
        //没有登陆信息 跳转到登陆页面
        this.props.history.push('/login');
      }
    });
  }
  render() {
    return (
      null
    )
  }
}
