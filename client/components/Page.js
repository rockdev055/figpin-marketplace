import React, { Component } from 'react';
import Header from './Header';
import Metadata from './Metadata';

export default class Page extends Component {
  render() {
    return (
      <div>
        <Metadata />
        <Header />
        {this.props.children}
      </div>
    );
  }
}
