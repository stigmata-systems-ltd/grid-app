import React, {Component} from 'react';
import NavigationStack from './src/navigations/NavigationStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import { setAuthHeader, setRespInterceptor } from './src/utils/auth';

setAuthHeader();setRespInterceptor();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationStack></NavigationStack>
      </Provider>
    );
  }
}
