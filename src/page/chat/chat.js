import React from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux';



@connect(state => state, { getMsgList, sendMsg, receiveMsg })
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if (this.props.chat.msgList.length == 0) {
      this.props.receiveMsg();
      this.props.getMsgList();
    }
  }
  handleChange(v) {
    this.setState({
      text: v
    });
  }
  handleSend() {
    console.log('click');
    const from = this.props.user._id;
    const to = this.props.match.params.id;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: ''
    });
  }
  render() {
    console.log(this.props)
    const Item = List.Item;
    const userId = this.props.user._id;
    const target = this.props.match.params.id;
    const chatId = [userId, target].sort().join('_');
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => { this.props.history.goBack() }}
        >
          {this.props.chat.users[target] ? this.props.chat.users[target].username : ''}
        </NavBar>
        <div style={{ position: 'absolute', top: '45px', bottom: '45px', overflow: 'auto', width: '100%' }}>
          <List>
            {this.props.chat.msgList.map((v, index) => {
              return (
                v.chatid === chatId ? (v.from == userId ? (
                  <div id='msg-right' key={index}>
                    <Item extra={<img src={require(`../../img/${this.props.user.avatar}`)} alt='' />}>{v.content}</Item>
                  </div>
                ) : (<Item thumb={this.props.chat.users[v.from].avatar ? <img src={require(`../../img/${this.props.chat.users[v.from].avatar}`)} alt='' /> : ''} key={index}>{v.content}</Item>)) : ''
              )
            })}
          </List>
        </div>
        <div style={{ position: 'fixed', 'bottom': 0, width: '100%' }}>
          <List>
            <InputItem
              placeholder='请输入消息..'
              value={this.state.text}
              onChange={this.handleChange.bind(this)}
              extra={<span>发送</span>}
              onExtraClick={this.handleSend.bind(this)}
            />
          </List>
        </div>
      </div>
    )
  }
};