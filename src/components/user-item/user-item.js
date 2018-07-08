import React from 'react';
import { WhiteSpace, Card } from 'antd-mobile';

export default class UserItem extends React.Component {
  render() {
    const v= this.props.data;
    return (
      <div>
        <WhiteSpace />
        <Card>
          <Card.Header
            title={v.title}
            extra={v.username}
            thumb={require(`../../img/${v.avatar}`)}
          ></Card.Header>
          <Card.Body>{v.desc.split('\n').map((i, index) => <div key={index}>{i}</div>)}</Card.Body>
          {v.type==='boss'?(
            <Card.Footer
              content={'工资:'+v.money}
              extra={'公司:'+v.company}
            ></Card.Footer>
          ):null}
        </Card>
      </div>
    )
  }
}
