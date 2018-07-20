import React from 'react';
import { List, WhiteSpace, Result, Button, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import BrowserCookie from 'browser-cookies';
import { logout } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { logout })
export default class User extends React.Component {
  logout() {
    const alert = Modal.alert;
    alert('注销', '确定要注销吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          BrowserCookie.erase('userid');  //清空 cookie
          // window.location.reload();
          // console.log(this.props);
          this.props.logout();
        }
      }]
    )
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      <div>
        {props.redirectTo && props.redirectTo === '/login' ? <Redirect to='/login' /> : null}
        {props.avatar ? (
          <div>
            <Result
              title={props.username}
              img={<img src={require(`../../img/${props.avatar}`)} style={{ width: '100%' }} alt="" />}
              message={props.type === 'boss' ? props.company : props.title}
            />
            <List renderHeader={() => '简介'}>
              <Item>
                {props.title}
                <Brief>{props.desc.split('\n').map((v, index) => <div key={index}>{v}</div>)}</Brief>
              </Item>
            </List>
            <WhiteSpace />
            <Button type="warning" onClick={this.logout.bind(this)} >退出登录</Button>
          </div>
        ) : null}
      </div>
    )
  }
};