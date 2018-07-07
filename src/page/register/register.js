import React from 'react';
import Logo from '../../components/logo/logo';
import { WhiteSpace, WingBlank, List, InputItem, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

const RadioItem = Radio.RadioItem;
@connect(state => state, { register })
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatpassword: '',
      type: 'genius'
    };
  }

  handleChange(key, val) {  //获取输入框的内容
    this.setState({
      [key]: val
    });
  }
  handleRegister() {  //注册
    this.props.register(this.state);
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
            >用户名</InputItem>
            <InputItem
              type="password"
              onChange={this.handleChange.bind(this, 'password')}
            >密码</InputItem>
            <InputItem
              type="password"
              onChange={this.handleChange.bind(this, 'repeatpassword')}
            >确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={this.handleChange.bind(this, 'type', 'genius')}
            >我是牛人</RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={this.handleChange.bind(this, 'type', 'boss')}
            >我是BOSS</RadioItem>
          </List>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={this.handleRegister.bind(this)}
          >注册</Button>
        </WingBlank>
      </div>
    )
  }
};