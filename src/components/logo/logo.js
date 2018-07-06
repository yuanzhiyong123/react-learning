import React, { Component } from 'react'
import logImg from './job.png';
import './logo.css';
export default class Logo extends Component {
  render() {
    return (
      <div className="logo-wrap">
        <img src={logImg} alt=""/>
      </div>
    )
  }
}
