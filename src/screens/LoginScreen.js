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
import {isUserLoggedIn} from '../utils/auth';
import {AsyncStorage} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      RememberMe: false,
      IsLoaded: false,
    };
  }

  componentDidMount = async () => {
    if (await isUserLoggedIn()) {
      this.props.navigation.navigate('Dashboard');
    } else {
      console.log(await AsyncStorage.getItem('RememberMeOption'));
      let rememberUserName = await AsyncStorage.getItem('RememberUserName');
      let rememberPassword = await AsyncStorage.getItem('RememberPassword');
      let rememberMeOption = await AsyncStorage.getItem('RememberMeOption');
      if (rememberUserName !== null || rememberUserName !== undefined || rememberMeOption !== undefined)
        this.setState({
          Username: rememberUserName,
          Password: rememberPassword,
          RememberMe: rememberMeOption == "true" ? true: false,
        });
      else {
        this.setState({
          Username: "",
          Password: "",
          RememberMe: false,
        });
      }
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
    if (this.state.Username == '') {
      this.showToast(LoginConstant.USER_NAME_IS_MANDATORY);
      return;
    } else if (this.state.Password == '') {
      this.showToast(LoginConstant.PASSWORD_IS_MANDATORY);
      return;
    } else {
      this.setState({IsLoaded: true});
      let userDetails = {
        Username: this.state.Username,
        Password: btoa(this.state.Password),
      };
      if (this.state.RememberMe) {
        await AsyncStorage.removeItem('RememberUserName');
        await AsyncStorage.removeItem('RememberPassword');
        await AsyncStorage.removeItem('RememberMeOption');
        await AsyncStorage.setItem('RememberUserName', this.state.Username);
        await AsyncStorage.setItem('RememberPassword', this.state.Password);
        await AsyncStorage.setItem('RememberMeOption', this.state.RememberMe ? "true": "false");
      }
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
