import React from 'react';

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
    this.state={
      slider: ['小明','xiaohong' ,'嚣张']
    }
  }
  addSlider() {
    this.setState({
      slider:[...this.state.slider, '新兵蛋子'+Math.random()]
    });
  }
  render() {
    return (
      <div>
        <div>一营营长：{this.props.boss}</div> 
        <button onClick={this.addSlider.bind(this)}>添加新兵</button>
        <ul>
          {this.state.slider.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
};