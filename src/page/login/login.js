import React from 'react';
import Logo from '../../components/logo/logo';
import {WhiteSpace,WingBlank, List, InputItem, Button} from 'antd-mobile';

export default class Login extends React.Component{

  redirectToRegister() {
    this.props.history.push('/register');
  }
  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem type="password">密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登陆</Button>
          <WhiteSpace />
          <Button type="primary"  onClick={this.redirectToRegister.bind(this)}>注册</Button>
        </WingBlank>
      </div>
    )
  }
};