import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './login.redux'
import {Button} from 'antd-mobile';
import App from './App';

function Erying() {
  return <div>二营</div>
}
function Qibinglian() {
  return <div>骑兵连</div>
}
@connect(state => state.user, { logout })
export default class Page extends Component {
  render() {
    const match = this.props.match.path;
    const app = (<div>
      <ul>
        <li>
          <Link to={`${match}/`}>一营</Link>
        </li>
        <li>
          <Link to={`${match}/erying`}>二营</Link>
        </li>
        <li>
          <Link to={`${match}/qibinglian`}>骑兵连</Link>
        </li>
      </ul>
      <Button type="primary" onClick={this.props.logout}>推出登陆</Button>
      <Route path={`${match}/`} exact component={App} />
      <Route path={`${match}/erying`} component={Erying} />
      <Route path={`${match}/qibinglian`} component={Qibinglian} />
    </div>);
    const redirect = <Redirect to='/login' />
    return (
      this.props.isLogin ? app : redirect
    )
  }
}
