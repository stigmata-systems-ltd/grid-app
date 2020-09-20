import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {DASHBOARD_LOGO} from '../assets/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComponentStyle from '../styles/ComponentStyle';

export default class HeaderComponent extends Component {
  render() {
    return (
      <View style={ComponentStyle.HeaderContainerStyle}>
        <View style={ComponentStyle.HeaderInnerContainerStyle}>
          <View style={ComponentStyle.HeaderLogoContainerStyle}>
            <Image
              source={DASHBOARD_LOGO}
              style={ComponentStyle.HeaderLogoStyle}></Image>
          </View>
          <View style={ComponentStyle.HeaderTextContainerStyle}>
            <Text style={ComponentStyle.HeaderTextStyle}>
              {this.props.headingValue}
            </Text>
          </View>
          <View style={ComponentStyle.HeaderUserContainerStyle}>
            <Icon
              name="user-circle"
              size={50}
              style={ComponentStyle.HeaderUserStyle}
            />
          </View>
        </View>
      </View>
    );
  }
}
