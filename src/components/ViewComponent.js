import React, {Component} from 'react';
import {View} from 'react-native';
import LabelComponent from '../components/LabelComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import ComponentStyle from '../styles/ComponentStyle';

export default class ViewComponent extends Component {
  render() {
    let viewValue = [];
    if (this.props.columnCount === 2) {
      viewValue.push(
        <>
          <View style={ComponentStyle.View_InnerContainerStyle}>
            <LabelComponent
              WhereFromValue={this.props.labelWhereFromValue_1}
              LabelValue={this.props.labelValue_1}></LabelComponent>
            <TextBoxComponent
              textValue={this.props.textValue_1}
              isEditable={false}
              WhereFromValue={
                this.props.textWhereFromValue_1
              }></TextBoxComponent>
          </View>
          <View style={ComponentStyle.View_InnerContainerStyle}>
            <LabelComponent
              WhereFromValue={this.props.labelWhereFromValue_2}
              LabelValue={this.props.labelValue_2}></LabelComponent>
            <TextBoxComponent
              textValue={this.props.textValue_2}
              isEditable={false}
              WhereFromValue={
                this.props.textWhereFromValue_2
              }></TextBoxComponent>
          </View>
        </>,
      );
    } else {
      viewValue.push(
        <View style={ComponentStyle.View_InnerContainerStyle}>
          <LabelComponent
            WhereFromValue={this.props.labelWhereFromValue_1}
            LabelValue={this.props.labelValue_1}></LabelComponent>
          <TextBoxComponent
            textValue={this.props.textValue_1}
            isEditable={false}
            WhereFromValue={this.props.textWhereFromValue_1}></TextBoxComponent>
        </View>,
      );
    }
    return (
      <View
        style={
          this.props.isLayer
            ? ComponentStyle.View_OuterLayerContainerStyle
            : ComponentStyle.View_OuterContainerStyle
        }>
        {viewValue}
      </View>
    );
  }
}
