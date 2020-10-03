import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {DASHBOARD_LOGO} from '../assets/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ComponentStyle from '../styles/ComponentStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HeaderComponent extends Component {
  render() {
    return (
      <View style={ComponentStyle.HeaderContainerStyle}>
        <View style={ComponentStyle.HeaderInnerContainerStyle}>
          <View style={ComponentStyle.HeaderLogoContainerStyle}>
            {this.props.IsDashboard === true ? (
              <Image
                source={DASHBOARD_LOGO}
                style={ComponentStyle.HeaderLogoStyle}></Image>
            ) : (
              <TouchableOpacity onPress={this.props.onBackButtonHandler}>
              <MaterialIcon
                name="arrow-back"
                size={50}
                style={ComponentStyle.HeaderLeftArrowStyle}
              />
              </TouchableOpacity>
            )}
          </View>
          <View style={ComponentStyle.HeaderTextContainerStyle}>
            <Text style={ComponentStyle.HeaderTextStyle}>
              {this.props.headingValue}
            </Text>
          </View>
          <View style={ComponentStyle.HeaderUserContainerStyle}>
            {this.props.IsDashboard === true ? (
              <Icon
                name="user-circle"
                size={50}
                style={ComponentStyle.HeaderUserStyle}
              />
            ) : (
              this.props.gridStatus == "InProgress" ? (<View>
                <Text>In Progress</Text>
                <View
                  style={{
                    width: 80,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#184589',
                    marginTop: 2,
                  }}>
                  <View
                    style={{
                      width: 40,
                      height: 15,
                      backgroundColor: '#184589',
                    }}></View>
                </View>
              </View>) : this.props.gridStatus == "New" ? (<View>
                <Text>New</Text>
                <View
                  style={{
                    width: 80,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#184589',
                    marginTop: 2,
                  }}>
                </View>
              </View>) : 
              this.props.gridStatus == "Completed" ? (<View>
                <Text>Completed</Text>
                <View
                  style={{
                    width: 80,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#184589',
                    backgroundColor: '#184589',
                    marginTop: 2,
                  }}>
                </View>
              </View>) : (<View></View>)
            )}
          </View>
        </View>
      </View>
    );
  }
}
