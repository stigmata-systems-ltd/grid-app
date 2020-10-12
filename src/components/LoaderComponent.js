import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet }  from 'react-native';
import Animation from 'lottie-react-native';
import loader from '../assets/Loader.json';

export default class MenuLoader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 300,
              height: 300,
            }}
            loop={true}
            source={loader}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
  });
AppRegistry.registerComponent('MenuLoader', () => MenuLoader);
