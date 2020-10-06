import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Images from '../assets/index';
import StatusBarComponent from '../components/StatusBarComponent';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import ImagePicker from 'react-native-image-picker';
import LayerAPI from '../api/LayerAPI';
import {Image, ThemeConsumer} from 'react-native-elements';
import * as APIConstants from '../constants/APIConstants';

export default class LayerUploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Select Avatar',
        customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
        storageOptions: {skipBackup: true, path: 'images'},
      },
      imageResponse: {},
      layerImages: [],
      layerName: '',
      gridId: '0',
    };
  }

  componentDidMount = async () => {
    console.log("in mount");
    this.setState({
      layerName: this.props.route.params.layerName,
      gridId: this.props.route.params.gridId,
    });
    this.getLayerImages();
  };

  getLayerImages = async () => {
    let LayerListDetails = await LayerAPI.GetLayerListDetails(
      this.props.route.params.layerDetailsId,
    );

    if (
      LayerListDetails !== null &&
      LayerListDetails !== undefined &&
      LayerListDetails.length > 0
    ) {
      let layerImages = LayerListDetails[0].layerDocs.filter((layer) => {
        return layer.uploadType === 'Images';
      });
      this.setState({layerImages});
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (
      this.props.route.params.layerDetailsId.toString() !==
      prevProps.route.params.layerDetailsId.toString()
    ) {
      let LayerListDetails = await LayerAPI.GetLayerListDetails(
        this.props.route.params.layerDetailsId,
      );
      this.setState({
        layerName: this.props.route.params.layerName,
        gridId: this.props.route.params.gridId,
      });
      if (LayerListDetails !== null || LayerListDetails !== undefined) {
        let layerImages = LayerListDetails[0].layerDocs.filter((layer) => {
          return layer.uploadType === 'Images';
        });
        this.setState({layerImages});
      }
    }
  };

  imagePickerHandler = (options) => {
    ImagePicker.showImagePicker(options, (response) => {
      LayerAPI.LayerUpload(
        this.props.route.params.layerDetailsId, 
        response.data,
        response.fileName
      ).then(() => {
        console.log("in then")
        this.componentDidMount()
      })
    });
  };

  render() {
    let options = {
      title: 'Select Avatar',
      storageOptions: {skipBackup: true, path: 'images'},
    };
    let host = APIConstants.GLOBAL_VALUE;
    return (
      <ScrollView style={{flex: 4, backgroundColor: '#FFFFFF'}}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        <HeaderComponent
          headingValue={this.state.layerName}
          IsDashboard={false}
          onBackButtonHandler={() => {
            this.props.navigation.navigate('GridView', {
              gridId: this.state.gridId,
            });
          }}></HeaderComponent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 20,
          }}>
          <ButtonComponent
            titleValue="       Upload      "
            onPressHandler={() =>
              this.imagePickerHandler(options)
            }></ButtonComponent>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 20,
          }}>
          {this.state.layerImages.map((layer) => {
            let uri = host + '\\' + layer.filepath;
            return (
              <View>
                <Image
                  source={{uri: uri}}
                  style={{
                    resizeMode: 'cover',
                    height: 200,
                    width: Dimensions.get('window').width,
                    margin: 20,
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
