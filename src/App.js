import React from 'react';
import { Button, List } from 'antd-mobile';
export default class App extends React.Component {
  render() {
    const boss = '李云龙';
    return (
      <div>
        <div>独立团，团长：{boss}</div>
        <Yiying boss='张大苗' />
        <Qibinglian boss='孙德胜' />
      </div>
    )
  }
};

function Qibinglian(props) {
  return <div>骑兵连连长：{props.boss}</div>
}
class Yiying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: ['小明', 'xiaohong', '嚣张']
    }
  }
  addSlider() {
    this.setState({
      slider: [...this.state.slider, '新兵蛋子' + Math.random()]
    });
  }
  render() {
    return (
      <div>
        <div>一营营长：{this.props.boss}</div>
        <Button type="primary" onClick={this.addSlider.bind(this)}>添加新兵</Button>
        <List renderHeader={()=>'士兵列表'}>
          {this.state.slider.map((item, index) => {
            return <List.Item key={index}>{item}</List.Item>
          })}
        </List>
      </div>
    )
  }
};