import React from 'react';
import { connect } from 'react-redux';

@connect(state => state)
export default class Msg extends React.Component {

  render() {
    console.log(this.props);
    let group = {};
    this.props.chat.msgList.forEach(v => {
      if (!group[v.chatid]) {
        group[v.chatid] = [];
      }else{
        group[v.chatid].push(v);
      }
    });
    console.log(group);
    return (
      <div>MSG</div>
    )
  }
};