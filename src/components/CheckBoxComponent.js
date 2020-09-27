import React, {Component} from 'react';
import {CheckBox, View, Text, StyleSheet} from 'react-native';
import ComponentStyle from '../styles/ComponentStyle';

export default class CheckBoxComponent extends Component {
  render() {
    return (
      <View style={ComponentStyle.CheckBoxContainerStyle}>
        <CheckBox
          value={this.props.checkBoxValue}
          onValueChange={(obj) => this.props.onValueChangeHandler(obj)}
          style={ComponentStyle.CheckBoxStyle}
        />
        <Text style={ComponentStyle.CheckBoxLabelStyle}>{this.props.labelValue}</Text>
      </View>
    );
  }
}
