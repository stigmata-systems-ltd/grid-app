import React, {Component} from 'react';
import {Text} from 'react-native';
import ComponentStyle from '../styles/ComponentStyle';

export default class LabelComponent extends Component {
  render() {
    return (
      <Text
        style={
          this.props.WhereFromValue === 'Login'
            ? ComponentStyle.Login_LabelComponentStyle
            : this.props.WhereFromValue === 'GridView'
            ? ComponentStyle.GridView_LabelComponentStyle
            : this.props.WhereFromValue === 'Layer'
            ? ComponentStyle.Layer_LabelComponentStyle
            : this.props.WhereFromValue === 'GridArea'
            ? ComponentStyle.GridArea_LabelComponentStyle
            : ComponentStyle.CleaningAndGrubbing_LabelComponentStyle
        }>
        {this.props.LabelValue}
      </Text>
    );
  }
}
