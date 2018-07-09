import React from 'react';

export default function formHight(Comp) {
  return class NewForm extends React.Component {
    constructor() {
      super();
      this.state={}
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      });
    }
    render() {
      return (
        <Comp
          {...this.props}
          state={this.state}
          handleChange={this.handleChange.bind(this)}
        />
      )
    }
  };
}