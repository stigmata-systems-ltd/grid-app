import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import GridViewScreen from '../screens/GridViewScreen';
import LayerUploadScreen from '../screens/LayerUploadScreen';

export default class NavigationStack extends Component {
  render() {
    let Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="GridView" component={GridViewScreen} />
          <Stack.Screen name="LayerUpload" component={LayerUploadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
