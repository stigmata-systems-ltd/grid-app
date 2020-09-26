import React, {Component} from 'react';
import {TextInput} from 'react-native';
import ComponentStyle from '../styles/ComponentStyle';

export default class TextBoxComponent extends Component {
  render() {
    return (
      <TextInput
        style={this.props.WhereFromValue === "Login" ? ComponentStyle.Login_TextBoxComponentStyle : this.props.WhereFromValue === "Dashboard" ? ComponentStyle.Dashboard_TextBoxComponentStyle : ComponentStyle.GridView_TextBoxComponentStyle}
        onChangeText={this.props.onChangeTextHandler}
        autoCapitalize={this.props.autoCapitalize}
        value={this.props.textValue}
        secureTextEntry={this.props.isSecureEntry}
        editable={this.props.isEditable}
        ></TextInput>
    );
  }
}
