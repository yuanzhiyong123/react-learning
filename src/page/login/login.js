import React from 'react';
import Logo from '../../components/logo/logo';
import { WhiteSpace, WingBlank, List, InputItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect} from 'react-router-dom';

@connect(state => state, { login })
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
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  handleLogin() {
    this.props.login(this.state);
  }
  render() {
    return (
      <div>
        {/* 注册成功后判断页面跳转 */}
        {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={this.handleChange.bind(this, 'username')}
            >用户</InputItem>
            <InputItem
              type="password"
              onChange={this.handleChange.bind(this, 'password')}
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