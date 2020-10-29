import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {DASHBOARD_LOGO} from '../assets/index';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ComponentStyle from '../styles/ComponentStyle';

export default class HeaderComponent extends Component {
  render() {
    return (
      <View style={ComponentStyle.HeaderContainerStyle}>
        <View style={ComponentStyle.HeaderInnerContainerStyle}>
          <View style={ComponentStyle.HeaderLeftStyle}>
            {this.props.IsDashboard === true ? (
              <Image
                source={DASHBOARD_LOGO}
                style={ComponentStyle.HeaderLogoStyle}></Image>
            ) : (
              <TouchableOpacity onPress={this.props.onBackButtonHandler}>
                <MaterialIcon
                  name="arrow-back"
                  size={40}
                  style={ComponentStyle.HeaderLeftArrowStyle}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={ComponentStyle.HeaderCenterStyle}>
            <Text style={ComponentStyle.HeaderTextStyle}>
              {this.props.headingValue}
            </Text>
          </View>
          <View style={ComponentStyle.HeaderRightStyle}>
            {this.props.IsDashboard === true ? (
              <View style={ComponentStyle.HeaderLogoutStyle}>
                <TouchableOpacity onPress={this.props.logoutHandler}>
                  <MaterialIcon name="logout" size={30} />
                </TouchableOpacity>
              </View>
            ) : this.props.gridStatus == 'InProgress' ? (
              <View style={ComponentStyle.HeaderProgressContainerStyle}>
                <Text>In Progress</Text>
                <View
                  style={ComponentStyle.HeaderInProgressOuterContainerStyle}>
                  <View
                    style={
                      ComponentStyle.HeaderInProgressInnerContainerStyle
                    }></View>
                </View>
              </View>
            ) : this.props.gridStatus == 'New' ? (
              <View style={ComponentStyle.HeaderProgressContainerStyle}>
                <Text style={{marginLeft:20}}>New</Text>
                <View style={ComponentStyle.HeaderNewContainerStyle}></View>
              </View>
            ) : this.props.gridStatus == 'Completed' ? (
              <View style={ComponentStyle.HeaderProgressContainerStyle}>
                <Text>Completed</Text>
                <View
                  style={ComponentStyle.HeaderCompletedContainerStyle}></View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
