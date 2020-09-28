/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe("Sample" , () => {
  it('renders correctly', () => {
    let LoginData = renderer.create(<App />).getInstance();
    console.log(LoginData);
  });
})

