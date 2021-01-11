import 'react-native';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';
import renderer from 'react-test-renderer';

test('Login Snapshot', () =>{
    const snap = renderer.create(<LoginScreen />).toJSON();
    expect(snap).toMatchSnapshot(); 
})