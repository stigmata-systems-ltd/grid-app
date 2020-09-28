import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import StatusBarComponent from '../components/StatusBarComponent';
import GridAPI from '../api/GridAPI';
import LayerAPI from '../api/LayerAPI';
import LabelComponent from '../components/LabelComponent';
import AutoCompleteComponent from '../components/AutoCompleteComponent';
import GridViewStyles from '../styles/GridViewStyle';
import LayerCountComponent from '../components/LayerCountComponent';
import ViewComponent from '../components/ViewComponent';
import * as GridViewConstant from '../constants/GridViewConstants';

export default class GridViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridDetail: {},
      tabViewIndex: 0,
      layerId: '0',
      currentLayerDetail: {},
      layerDetails: [],
      layerCount: 0,
      tabViewIndex: 1,
    };
  }

  componentDidMount = async () => {
    let gridDataBasedOnId = await GridAPI.GetGridListDetailsById(110);
    let layerDetailsOriginal = await LayerAPI.GetLayerDetails();
    let layerDetails = [];
    if (layerDetailsOriginal !== undefined && layerDetailsOriginal !== null) {
      for (var item in layerDetailsOriginal) {
        let grid = null;
        grid = gridDataBasedOnId.lyrDtls.filter((g) => {
          return g.layerId === layerDetailsOriginal[item].id;
        });
        if (Object.keys(grid).length > 0) {
          let layer = {
            label: layerDetailsOriginal[item].layerName,
            value: layerDetailsOriginal[item].id,
          };
          layerDetails.push(layer);
        }
      }
    }
    if (gridDataBasedOnId != null && gridDataBasedOnId != undefined) {
      let layerCountDetails = gridDataBasedOnId.lyrDtls.filter((item) => {
        return item.status === 'InProgress';
      });
      this.setState({
        gridDetail: gridDataBasedOnId,
        layerDetails: layerDetails,
        layerId: layerDetails[0].value,
        currentLayerDetail: gridDataBasedOnId.lyrDtls[0],
        layerCount: layerCountDetails.length,
      });
    }
  };

  uploadImageHandler = () => {
    console.log(this.state.layerId);
  };

  onChangeItemHandler = (item) => {
    let layerDetails = this.state.gridDetail.lyrDtls.filter((layer) => {
      return layer.layerId === item.value;
    });
    if (layerDetails !== null) {
      this.setState({currentLayerDetail: layerDetails[0], layerId: item.value});
    }
  };

  render() {
    return (
      <View style={GridViewStyles.gridViewContainerStyle}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        <HeaderComponent
          headingValue={this.state.gridDetail.gridno}
          IsDashboard={false}
          onBackButtonHandler={() => {
            this.props.navigation.navigate('Dashboard');
          }}
          gridStatus={this.state.gridDetail.status}></HeaderComponent>
        <ScrollView>
          <View style={GridViewStyles.gridViewUpperContainerStyle}>
            <View style={GridViewStyles.gridViewGridAreaStyle}>
              <LabelComponent
                WhereFromValue="GridArea"
                LabelValue={GridViewConstant.GRID_AREA_TEXT}></LabelComponent>
              <LabelComponent
                WhereFromValue="GridArea"
                LabelValue={GridViewConstant.GRID_AREA_ARROW}></LabelComponent>
              <LabelComponent
                WhereFromValue="GridArea"
                LabelValue={
                  this.state.gridDetail.grid_area + ' sqm'
                }></LabelComponent>
            </View>
            <View style={GridViewStyles.gridView_LayerCompletedTextStyle}>
              <Text
                style={GridViewStyles.gridView_LayerCompletedInnerTextStyle}>
                {this.state.layerCount +
                  ' ' +
                  GridViewConstant.GRID_AREA_COMPLETED_TEXT}
              </Text>
            </View>
            <View style={GridViewStyles.gridView_LayerCountContainerStyle}>
              <LayerCountComponent
                layerCountDetails={this.state.layerCount}></LayerCountComponent>
            </View>
          </View>
          <View style={{height: 190, backgroundColor: '#EFEDFD'}}>
            <View style={{margin: 5, alignItems: 'center'}}>
              <LabelComponent
                WhereFromValue="CleaningAndGrubbing"
                LabelValue={
                  GridViewConstant.CLEANING_AND_GRUBBING
                }></LabelComponent>
            </View>
            <ViewComponent
              columnCount={2}
              labelWhereFromValue_1="GridView"
              labelValue_1={GridViewConstant.RFI_NUMBER}
              textValue_1={this.state.gridDetail.cG_RFIno}
              textWhereFromValue_1="GridView"
              labelWhereFromValue_2="GridView"
              labelValue_2={GridViewConstant.RFI_STATUS}
              textValue_2={this.state.gridDetail.cG_RFI_status}
              textWhereFromValue_2="GridView"
              isLayer={false}></ViewComponent>
            <ViewComponent
              columnCount={2}
              labelWhereFromValue_1="GridView"
              labelValue_1={GridViewConstant.INSPECTION_DATE}
              textValue_1={this.state.gridDetail.cG_inspection_date}
              textWhereFromValue_1="GridView"
              labelWhereFromValue_2="GridView"
              labelValue_2={GridViewConstant.APPROVAL_DATE}
              textValue_2={this.state.gridDetail.cG_approval_date}
              textWhereFromValue_2="GridView"
              isLayer={false}></ViewComponent>
          </View>
          <View>
            <View style={GridViewStyles.gridView_LayerDetailsContainerStyle}>
              <Text style={GridViewStyles.gridView_LayerDetailsTextStyle}>
                {GridViewConstant.LAYER_DETAILS}
              </Text>
            </View>
            <View style={GridViewStyles.gridView_DropDownOuterContainerStyle}>
              <View style={GridViewStyles.gridView_DropDownInnerContainerStyle}>
                {Object.keys(this.state.layerDetails).length > 0 ? (
                  <AutoCompleteComponent
                    items={this.state.layerDetails}
                    onChangeItemHandler={(item) => {
                      this.onChangeItemHandler(item);
                    }}></AutoCompleteComponent>
                ) : (
                  <Text></Text>
                )}
              </View>
              <View
                style={GridViewStyles.gridView_UploadImageOuterContainerStyle}>
                <TouchableOpacity onPress={this.uploadImageHandler}>
                  <View
                    style={
                      GridViewStyles.gridView_UploadImageInnerContainerStyle
                    }>
                    <Text>{GridViewConstant.UPLOAD_BUTTON}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={GridViewStyles.gridView_DetailButtonOuterContainerStyle}>
              <View
                style={GridViewStyles.gridView_DetailButtonInnerContainerStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({tabViewIndex: 1});
                  }}>
                  <View
                    style={
                      this.state.tabViewIndex === 1
                        ? GridViewStyles.gridView_DetailsButtonStyleClicked
                        : GridViewStyles.gridView_DetailsButtonStyleNotClicked
                    }>
                    <Text style={GridViewStyles.gridView_DetailButtonFontStyle}>
                      {GridViewConstant.DETAILS_BUTTON}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({tabViewIndex: 2});
                  }}>
                  <View
                    style={
                      this.state.tabViewIndex === 2
                        ? GridViewStyles.gridView_RFIButtonStyleClicked
                        : GridViewStyles.gridView_RFIButtonStyleNotClicked
                    }>
                    <Text style={GridViewStyles.gridView_DetailButtonFontStyle}>
                      {GridViewConstant.RFI_LEVEL}
                    </Text>
                    <Text style={GridViewStyles.gridView_DetailButtonFontStyle}>
                      {GridViewConstant.VERIFICATION}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({tabViewIndex: 3});
                  }}>
                  <View
                    style={
                      this.state.tabViewIndex === 3
                        ? GridViewStyles.gridView_RFIButtonStyleClicked
                        : GridViewStyles.gridView_RFIButtonStyleNotClicked
                    }>
                    <Text style={GridViewStyles.gridView_DetailButtonFontStyle}>
                      {GridViewConstant.RFI_COMPACTION}
                    </Text>
                    <Text style={GridViewStyles.gridView_DetailButtonFontStyle}>
                      {GridViewConstant.TESTING}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {this.state.tabViewIndex === 1 ? (
                <>
                  <ViewComponent
                    columnCount={2}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.DATE_OF_FILLING}
                    textValue_1={this.state.currentLayerDetail.fillingDate}
                    textWhereFromValue_1="Layer"
                    labelWhereFromValue_2="Layer"
                    labelValue_2={GridViewConstant.AREA_OF_LAYER}
                    textValue_2={parseInt(
                      this.state.currentLayerDetail.area_layer,
                    ).toString()}
                    textWhereFromValue_2="Layer"
                    isLayer={true}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.FILL_TYPE}
                    textValue_1={this.state.currentLayerDetail.fillType}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.MATERIAL_DESCRIPTION}
                    textValue_1={this.state.currentLayerDetail.fillingMaterial}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={2}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.TOP_FILL_MATERIAL}
                    textValue_1={this.state.currentLayerDetail.topFillMaterial}
                    textWhereFromValue_1="Layer"
                    labelWhereFromValue_2="Layer"
                    labelValue_2={GridViewConstant.LAYER_STATUS}
                    textValue_2={this.state.currentLayerDetail.status}
                    textWhereFromValue_2="Layer"
                    isLayer={false}></ViewComponent>

                  <ViewComponent
                    columnCount={2}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.TOTAL_QUANTITY}
                    textValue_1={parseInt(
                      this.state.currentLayerDetail.totalQuantity,
                    ).toString()}
                    textWhereFromValue_1="Layer"
                    labelWhereFromValue_2="Layer"
                    labelValue_2={GridViewConstant.NO_OF_SUB_CONTRACTOR}
                    textValue_2={1}
                    textWhereFromValue_2="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.REMARKS}
                    textValue_1={this.state.currentLayerDetail.remarks}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                </>
              ) : this.state.tabViewIndex === 2 ? (
                <>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.RFI_NUMBER}
                    textValue_1={this.state.currentLayerDetail.lV_RFIno}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.INSPECTION_DATE}
                    textValue_1={
                      this.state.currentLayerDetail.lV_inspection_date
                    }
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.APPROVAL_DATE}
                    textValue_1={this.state.currentLayerDetail.lV_approval_date}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.RFI_STATUS}
                    textValue_1={this.state.currentLayerDetail.lV_RFI_status}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                </>
              ) : (
                <>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.RFI_NUMBER}
                    textValue_1={this.state.currentLayerDetail.cT_RFIno}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.INSPECTION_DATE}
                    textValue_1={
                      this.state.currentLayerDetail.cT_inspection_date
                    }
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.APPROVAL_DATE}
                    textValue_1={this.state.currentLayerDetail.cT_approval_date}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                  <ViewComponent
                    columnCount={1}
                    labelWhereFromValue_1="Layer"
                    labelValue_1={GridViewConstant.RFI_STATUS}
                    textValue_1={this.state.currentLayerDetail.cT_RFI_status}
                    textWhereFromValue_1="Layer"
                    isLayer={false}></ViewComponent>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
