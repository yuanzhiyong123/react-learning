import React from 'react';
import { NavBar } from 'antd-mobile';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import TabBarComponent from '../tabbar/tabbar'
import Boss from '../../page/boss/boss';
import Genius from '../../page/genius/genius';
import User from '../../page/usercenter/usercenter';
import { getMsgList, receiveMsg } from '../../redux/chat.redux';


function Msg() {
  return <div>Msg</div>
}
@connect(state => state, { getMsgList, receiveMsg })
export default class PageContainer extends React.Component {
  componentDidMount() {
    this.props.receiveMsg();
    this.props.getMsgList();
  }
  render() {
    const TabBarList = [
      {
        path: '/boss',
        text: '牛人',
        title: '牛人列表',
        icon: 'boss',
        component: Boss,
        hide: this.props.user.type != 'boss'
      },
      {
        path: '/genius',
        text: 'BOSS',
        title: 'BOSS列表',
        icon: 'job',
        component: Genius,
        hide: this.props.user.type != 'genius'
      },
      {
        path: '/msg',
        text: '消息',
        title: '消息列表',
        icon: 'msg',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        title: '个人中心',
        icon: 'user',
        component: User,
      }
    ];
    const path = this.props.location.pathname;
    return (
      <div>
        <NavBar>{(TabBarList.find(v => v.path === path)).title}</NavBar>
        <div className='page-container'>
          <Switch>
            {TabBarList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <TabBarComponent TabBarList={TabBarList} />
      </div>
    )
  }
}
