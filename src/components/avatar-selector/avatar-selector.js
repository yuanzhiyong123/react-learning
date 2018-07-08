import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';

export default class AvatarSelector extends Component {
  constructor() {
    super();
    this.state={
      text:''
    };
  }
  handleSelect(v) {
    this.props.selectAvatar(v);
    this.setState({
      text: v.text
    });
  }
  render() {
    const data = ['boy', 'bull', 'chick', 'crab', 'girl', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'man', 'pig', 'tiger', 'whale', 'woman', 'zebra'].map(item => {
      return ({
        icon: require(`../../img/${item}.png`),
        text: item
      })
    })
    const selectHeader = (this.state.text)?(<div><span>已选择：</span><img style={{width:'20px'}} src={require(`../../img/${this.state.text}.png`)} alt=""/></div>):'请选择头像';
    return (
      <div style={{paddingTop:'45px'}}>
        <List renderHeader={()=>selectHeader}>
          <Grid 
            data={data} columnNum={5}
            onClick={this.handleSelect.bind(this)}
          ></Grid>
        </List>
      </div>
    )
  }
}
