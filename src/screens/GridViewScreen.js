import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import StatusBarComponent from '../components/StatusBarComponent';
import GridAPI from '../api/GridAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextBoxComponent from '../components/TextBoxComponent';
import LabelComponent from '../components/LabelComponent';
import TabViewComponent from '../components/TabViewComponent';
import Picker from '@react-native-community/picker';

export default class GridViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridDetail: {},
      tabViewIndex: 0,
      layerName: '0'
    };
  }

  componentDidMount = async () => {
    let gridDataBasedOnId = await GridAPI.GetGridListDetailsById(101);
    if (gridDataBasedOnId != null && gridDataBasedOnId != undefined) {
      this.setState({gridDetail: gridDataBasedOnId});
    }
  };

  render() {
    return (
      <View style={{flex: 3, backgroundColor: '#FFFFFF'}}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        <HeaderComponent
          headingValue={this.state.gridDetail.gridno}
          IsDashboard={false}
          gridStatus={this.state.gridDetail.status}></HeaderComponent>
        <ScrollView>
          <View style={{flex: 3}}>
            <View style={{flex: 0.4}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  margin: 20,
                  marginTop: 0,
                  marginBottom: 0,
                }}>
                <Text
                  style={{padding: 15, fontSize: 18, fontFamily: 'Archivo'}}>
                  Grid Area
                </Text>
                <Text
                  style={{padding: 15, fontSize: 18, fontFamily: 'Archivo'}}>
                  {'------------------->'}
                </Text>
                <Text
                  style={{padding: 15, fontSize: 18, fontFamily: 'Archivo'}}>
                  1000sqm
                </Text>
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{alignSelf: 'center'}}>
                  5 out of 15 Layers Completed
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                <Icon
                  name="check-circle"
                  size={20}
                  style={{padding: 5}}
                  color="#184589"></Icon>
                <Icon
                  name="check-circle"
                  size={20}
                  style={{padding: 5}}
                  color="#184589"></Icon>
                <Icon
                  name="check-circle"
                  size={20}
                  style={{padding: 5}}
                  color="#184589"></Icon>
                <Icon
                  name="check-circle"
                  size={20}
                  style={{padding: 5}}
                  color="#184589"></Icon>
                <Icon
                  name="check-circle"
                  size={20}
                  style={{padding: 5}}
                  color="#184589"></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
                <Icon
                  name="check-circle-o"
                  size={20}
                  style={{padding: 5}}></Icon>
              </View>
            </View>
            <View style={{height: 190, backgroundColor: '#EFEDFD'}}>
              <View style={{margin: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 22, fontFamily: 'Archivo'}}>
                  Cleaning and Grubbing
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 0,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginRight: 10,
                  }}>
                  <LabelComponent
                    WhereFromValue="GridView"
                    LabelValue="RFI Number"></LabelComponent>
                  <TextBoxComponent
                    textValue={this.state.gridDetail.cG_RFIno}
                    isEditable={false}
                    WhereFromValue="GridView"></TextBoxComponent>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginRight: 10,
                  }}>
                  <LabelComponent
                    WhereFromValue="GridView"
                    LabelValue="RFI Status"></LabelComponent>
                  <TextBoxComponent
                    textValue={this.state.gridDetail.cG_RFI_status}
                    isEditable={false}
                    WhereFromValue="GridView"></TextBoxComponent>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 0,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginRight: 10,
                  }}>
                  <LabelComponent
                    WhereFromValue="GridView"
                    LabelValue="Inspection Date"></LabelComponent>
                  <TextBoxComponent
                    textValue={this.state.gridDetail.cG_inspection_date}
                    isEditable={false}
                    WhereFromValue="GridView"></TextBoxComponent>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginRight: 10,
                  }}>
                  <LabelComponent
                    WhereFromValue="GridView"
                    LabelValue="Approval Date"></LabelComponent>
                  <TextBoxComponent
                    textValue={this.state.gridDetail.cG_approval_date}
                    isEditable={false}
                    WhereFromValue="GridView"></TextBoxComponent>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{margin: 5, alignItems: 'center'}}>
              <Text style={{fontSize: 22, fontFamily: 'Archivo'}}>
                Layer Details
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Picker
                selectedValue={this.state.layerName}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({layerName: itemValue})
                }>
                <Picker.Item label="At +4.67m CD" value="At +4.67m CD" />
                <Picker.Item label="At +4.74m CD" value="At +4.74m CD" />
                <Picker.Item label="At +4.92m CD" value="At +4.92m CD" />
                <Picker.Item label="At +5.10m CD" value="At +5.10m CD" />
                <Picker.Item label="At +5.35m CD" value="At +5.35m CD" />
                <Picker.Item label="At +5.6m CD" value="At +5.6m CD" />
                <Picker.Item label="At +5.85m CD" value="At +5.85m CD" />
              </Picker>
            </View>
            <TabViewComponent></TabViewComponent>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
