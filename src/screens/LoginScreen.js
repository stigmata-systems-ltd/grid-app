import React, {Component} from 'react';
import {View, Image, ToastAndroid, Text, ActivityIndicator} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import {LOGO} from '../assets/index';
import LoginStyle from '../styles/LoginStyle';
import LabelComponent from '../components/LabelComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import ButtonComponent from '../components/ButtonComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import * as LoginConstant from '../constants/LoginConstant';
import LoginAPI from '../api/LoginAPI';
import {decode as atob, encode as btoa} from 'base-64';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: 'admin',
      Password: 'admin',
      RememberMe: false,
      IsLoaded: false,
    };
  }

  showToast = (errorMessage) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  onSubmitHandler = async () => {
    if (this.state.Username == '') {
      this.showToast(LoginConstant.USER_NAME_IS_MANDATORY);
      return;
    } else if (this.state.Password == '') {
      this.showToast(LoginConstant.PASSWORD_IS_MANDATORY);
      return;
    } else {
      this.setState({IsLoaded: true})
      let userDetails = {
        Username: this.state.Username,
        Password: this.state.Password,
      };
      console.log(JSON.stringify(userDetails));
      let result = await LoginAPI.LoginValidation(userDetails);
      if (!result.isValidated) {
        this.showToast(result.message);
      } else {
        this.props.navigation.navigate('Dashboard');
      }
      this.setState({IsLoaded: false});
    }
  };

  render() {
    return (
      <View style={LoginStyle.loginContainerStyle}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        {this.state.IsLoaded && <ActivityIndicator size="large" color="blue" />}
        <View>
          <Image source={LOGO} style={LoginStyle.loginLogoStyle}></Image>
          <View>
            <Text> </Text>
          </View>
          <LabelComponent
            LabelValue={LoginConstant.USER_NAME}
            WhereFromValue="Login"></LabelComponent>
          <TextBoxComponent
            autoCapitalize="none"
            isSecureEntry={false}
            WhereFromValue="Login"
            textValue={this.state.Username}
            onChangeTextHandler={(text) => {
              this.setState({Username: text});
            }}></TextBoxComponent>
          <LabelComponent
            LabelValue={LoginConstant.PASSWORD}
            WhereFromValue="Login"></LabelComponent>
          <TextBoxComponent
            autoCapitalize="none"
            isSecureEntry={true}
            textValue={this.state.Password}
            WhereFromValue="Login"
            onChangeTextHandler={(text) => {
              this.setState({Password: text});
            }}></TextBoxComponent>
          <View style={LoginStyle.loginCheckboxContainerStyle}>
            <CheckBoxComponent
              checkBoxValue={this.state.RememberMe}
              onValueChangeHandler={(obj) => this.setState({RememberMe: obj})}
              labelValue={LoginConstant.REMEMBER_ME}></CheckBoxComponent>
          </View>
          <View style={{marginTop: 5}}>
            <ButtonComponent
              titleValue={LoginConstant.LOGIN}
              onPressHandler={() => this.onSubmitHandler()}></ButtonComponent>
          </View>
        </View>
      </View>
    );
  }
}
