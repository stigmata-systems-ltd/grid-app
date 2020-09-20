import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import ComponentStyle from '../styles/ComponentStyle';

export default class ButtonComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPressHandler} style={ComponentStyle.TouchableOpacityOuterStyle}>
            <Text style={ComponentStyle.TouchableOpacityInnerStyle}>{this.props.titleValue}</Text>
        </TouchableOpacity>
    );
  }
}
