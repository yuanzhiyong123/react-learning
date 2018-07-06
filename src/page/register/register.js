import React from 'react';
import Logo from '../../components/logo/logo';
import { WhiteSpace, WingBlank, List, InputItem, Button, Radio } from 'antd-mobile';
import { EAFNOSUPPORT } from 'constants';

const RadioItem = Radio.RadioItem;
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius'
    };
  }
  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem type="password">密码</InputItem>
            <InputItem type="password">确认密码</InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem checked={this.state.type === 'genius'}>我是牛人</RadioItem>
            <RadioItem checked={this.state.type === 'boss'}>我是BOSS</RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
};