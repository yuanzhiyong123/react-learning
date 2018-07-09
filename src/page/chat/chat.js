import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, Button } from 'antd-mobile';
const socket = io.connect('ws://localhost:9090');



export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    socket.on('sendAll', (data)=> {
      this.setState({
        msg:[...this.state.msg, data.data]
      });
    })
  }
  handleChange(v) {
    this.setState({
      text: v
    });
  }
  handleSend() {
    // console.log(this.state.text);
    socket.emit('sendMsg', { data: this.state.text });
    this.setState({
      text: ''
    });
  }
  render() {
    const Item = List.Item;
    return (
      <div>
        <List>
          {this.state.msg.map((v, index) => (
            <Item key={index}>{v}</Item>
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