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
import {decode as atob, encode as btoa} from 'base-64';
import {isUserLoggedIn} from '../utils/utils';
import {
  authenticateLogin,
  setUsername,
  setPassword,
  setRememberOption,
  getRememberOption,
} from '../redux/actions/authenticateActions';
import {connect} from 'react-redux';
import store from '../redux/store';

class LoginScreen extends Component {
  componentDidMount = async () => {
    if (await isUserLoggedIn()) {
      this.props.navigation.navigate('Dashboard');
    } else {
      console.log("Hitted");
      this.props.getRememberOption();
    }
  };

  showToast = (errorMessage) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  onSubmitHandler = async () => {
    if (this.props.auth.username == '') {
      this.showToast(LoginConstant.USER_NAME_IS_MANDATORY);
      return;
    } else if (this.props.auth.password == '') {
      this.showToast(LoginConstant.PASSWORD_IS_MANDATORY);
      return;
    } else {
      let userDetail = {
        Username: this.props.auth.username,
        Password: btoa(this.props.auth.password),
      };
      await this.props.authenticateLogin(userDetail);
      if(this.props.auth.errorMessage !== ""){
        this.showToast(this.props.auth.errorMessage);
      }
      else{
        this.props.navigation.navigate('Dashboard');
      }
      
    }
  };

  render() {
    return (
      <View style={LoginStyle.loginContainerStyle}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        {this.props.auth.isLoading && (
          <ActivityIndicator size="large" color="blue" />
        )}
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
            textValue={this.props.auth.username}
            onChangeTextHandler={(text) =>
              this.props.setUsername(text)
            }></TextBoxComponent>
          <LabelComponent
            LabelValue={LoginConstant.PASSWORD}
            WhereFromValue="Login"></LabelComponent>
          <TextBoxComponent
            autoCapitalize="none"
            isSecureEntry={true}
            textValue={this.props.auth.password}
            WhereFromValue="Login"
            onChangeTextHandler={(text) =>
              this.props.setPassword(text)
            }></TextBoxComponent>
          <View style={LoginStyle.loginCheckboxContainerStyle}>
            <CheckBoxComponent
              checkBoxValue={this.props.auth.rememberme}
              onValueChangeHandler={(obj) => this.props.setRememberOption(obj)}
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

const mapStateToProps = (state) => {
  const auth = store.getState().auth;
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  authenticateLogin,
  getRememberOption,
  setUsername,
  setPassword,
  setRememberOption,
})(LoginScreen);
