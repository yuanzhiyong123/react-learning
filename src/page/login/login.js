import React from 'react';
import Logo from '../../components/logo/logo';
import { WhiteSpace, WingBlank, List, InputItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect} from 'react-router-dom';
import formHight from '../../components/form-high/form-high';

@connect(state => state, { login })
@formHight
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  redirectToRegister() {
    this.props.history.push('/register');
  }
  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   });
  // }
  handleLogin() {
    // console.log(this.poros)
    this.props.login(this.props.state);
  }
  render() {
    const redirectTo = this.props.user.redirectTo;
    return (
      <div>
        {/* 注册成功后判断页面跳转 */}
        {redirectTo&&redirectTo!='/login' ? <Redirect to={this.props.user.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={this.props.handleChange.bind(this,'username')}
            >用户</InputItem>
            <InputItem
              type="password"
              onChange={this.props.handleChange.bind(this,'password')}
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={this.handleLogin.bind(this)}
          >登陆</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.redirectToRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
};