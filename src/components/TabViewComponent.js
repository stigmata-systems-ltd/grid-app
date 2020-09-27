import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#FFFFFF'}]}>
    <Text>qwerty</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#FFFFFF'}]}>
    <Text></Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#FFFFFF'}]}>
    <Text></Text>
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Details'},
    {key: 'second', title: 'RFI Level Verification'},
    {key: 'third', title: 'RFI Compaction Testing'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      swipeEnabled={true}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    
  },
});
