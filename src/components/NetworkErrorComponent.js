import React, {Component} from 'react';
import {View, Text, TouchableOpacity   } from 'react-native';
import {Overlay} from 'react-native-elements';

export default class NetworkErrorComponent extends Component {
  render() {
    let isModalVisible = true;
    return (
     <View>
       <Overlay isVisible={this.props.isConnected}>
        <View style={{justifyContent: 'center'}}>
          <Text>No Internet</Text>
          <TouchableOpacity onPress={() => {isModalVisible= false}}>
            <View style={{height:150, width:150}}>
              <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
        </Overlay>
        </View>
    );
  }
}
