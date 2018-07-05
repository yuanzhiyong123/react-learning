import React, { Component } from 'react';
import {connect } from 'react-redux';
import {login} from './login.redux';
import {Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';

@connect(state=>state.user, {login})
export default class Login extends Component {
  render() {
    return (
      <div>
        {this.props.isLogin?<Redirect to='/page' />: null}
        <h2>登陆后才能访问</h2>
        <Button type="primary" onClick={this.props.login}>登陆</Button>
      </div>
    )
  }
}
