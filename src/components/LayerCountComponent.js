import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComponentStyle from '../styles/ComponentStyle';

export default class LayerCountComponent extends Component {
  render() {
    let layerfinished = [];
    for (var i = 1; i <= 16; i++) {
      if (this.props.layerCountDetails >= i) {
        layerfinished.push(
          <Icon
            name="check-circle"
            size={20}
            style={ComponentStyle.LayerCount_CompletedStyle}
            color="#184589"></Icon>,
        );
      } else {
        layerfinished.push(<Icon name="check-circle-o" size={20} style={ComponentStyle.LayerCount_CompletedStyle}></Icon>);
      }
    }
    return <>{layerfinished}</>;
  }
}
