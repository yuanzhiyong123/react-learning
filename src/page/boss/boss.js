import React from 'react';
// import axios from 'axios';
import { WingBlank} from 'antd-mobile';
import { connect } from 'react-redux';
import { getList } from '../../redux/chatuser.redux';
import UserItem from '../../components/user-item/user-item';

@connect(state => state.chatuser, { getList })
export default class Boss extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getList('genius');
  }
  render() {
    console.log(this.props);
    return (
      <WingBlank>
        {this.props.userList.map(v => (
          v.avatar ? (
            <UserItem key={v.username} data={v} />
          ) : null
        ))}
      </WingBlank>
    )
  }
}
