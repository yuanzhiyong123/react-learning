import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux'
@connect(state => ({ num: state }), { addGun, removeGun, addGunAsync })
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>现在有机枪{this.props.num.counter}把</h1>
        <Button type="primary" onClick={()=>this.props.addGun()}>添加机枪</Button>
        <Button type="ghost" onClick={()=>this.props.removeGun()}>上缴机枪</Button>
        <Button type="warning" onClick={() => this.props.addGunAsync()}>延迟添加机枪</Button>
      </div>
    )
  }
};
export default App;