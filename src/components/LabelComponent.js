import React, {Component} from 'react';
import {Text} from 'react-native';
import ComponentStyle from '../styles/ComponentStyle';

export default class LabelComponent extends Component{
    render(){
        return(
        <Text style={this.props.WhereFromValue == "Login" ? ComponentStyle.Login_LabelComponentStyle : ""}>{this.props.LabelValue}</Text>
        );
    }
}