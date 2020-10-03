import React, {Component} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import ComponentStyle from '../styles/ComponentStyle';

export default class AutoCompleteComponent extends Component {
  render() {
    return (
      <>
        {this.props.items.length > 0 ? (
          <DropDownPicker
            items={this.props.items}
            defaultValue={this.props.items[0].value}
            containerStyle={{height: 50}}
            style={ComponentStyle.GridView_AutoCompleteComponentStyle}
            itemStyle={ComponentStyle.GridView_AutoCompleteComponentItemStyle}
            dropDownStyle={
              ComponentStyle.GridView_AutoCompleteComponentDropDownStyle
            }
            dropDownMaxHeight={200}
            onChangeItem={(item) => this.props.onChangeItemHandler(item)}
            searchable={true}></DropDownPicker>
        ) : (
          ''
        )}
      </>
    );
  }
}
