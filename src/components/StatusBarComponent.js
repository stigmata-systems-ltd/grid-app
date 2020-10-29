import React, {Component} from 'react';
import {StatusBar} from 'react-native';

export default class StatusBarComponent extends Component {
  render() {
    return (
      <StatusBar
        hidden={this.props.IsVisible}
        barStyle={'dark-content'}
        backgroundColor="white"></StatusBar>
    );
  }
}
