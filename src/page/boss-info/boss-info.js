import React from 'react';
import { NavBar, List, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state, { update })
export default class BossInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    };
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  selectAvatar(el) {
    this.setState({
      avatar: el.text + '.png'
    });
  }
  handleSave() {
    // console.log(this.state);
    this.props.update(this.state);
  }
  render() {
    const path = this.props.location.pathname;
    const redirectTo = this.props.user.redirectTo;
    return (
      <div>
        {(redirectTo && redirectTo !== path) ? <Redirect to={this.props.user.redirectTo} /> : null}
        <NavBar
          mode="dark"
        >Boss信息完善</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar.bind(this)} />
        <WhiteSpace />
        <List>
          <InputItem
            onChange={this.handleChange.bind(this, 'company')}
          >公司名称</InputItem>
          <InputItem
            onChange={this.handleChange.bind(this, 'title')}
          >职位</InputItem>
          <InputItem
            onChange={this.handleChange.bind(this, 'money')}
          >薪资范围</InputItem>
          <TextareaItem
            title="任职要求"
            onChange={this.handleChange.bind(this, 'desc')}
            rows={5}
            autoHeight
          ></TextareaItem>
        </List>
        <WhiteSpace />
        <Button type="primary"
          onClick={this.handleSave.bind(this)}
        >保存</Button>
      </div>
    )
  }
}
