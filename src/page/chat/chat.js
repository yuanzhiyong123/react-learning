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
      console.log('没有数据');
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
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={()=>{this.props.history.goBack()}}
        >
          {this.props.match.params.id}
        </NavBar>
        <List>
          {this.props.chat.msgList.map((v, index) => (

            v.from == this.props.user._id ? (
              <div id='msg-right' key={index}>
                <Item extra={<img src={require(`../../img/${this.props.user.avatar}`)} alt='' />}>{v.content}</Item>
              </div>
            ) : (<Item key={index}>{v.content}</Item>)

          ))}
        </List>
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