import React, {Component} from 'react';
import NavigationStack from './src/navigations/NavigationStack';
import { setRespInterceptor, setAuthHeader } from './src/utils/auth';


export default class App extends Component {
  render() {
    return <NavigationStack></NavigationStack>;
  }
}