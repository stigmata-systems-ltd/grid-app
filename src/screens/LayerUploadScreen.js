import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import ImagePicker from 'react-native-image-picker';
import LayerAPI from '../api/LayerAPI';
import {Image, ThemeConsumer} from 'react-native-elements';
import * as APIConstants from '../constants/APIConstants';
import {isUserLoggedIn} from '../utils/auth';
import LoaderComponent from '../components/LoaderComponent';
import {setRespInterceptor, setAuthHeader} from '../utils/auth';
setAuthHeader();
setRespInterceptor();

export default class LayerUploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Select Avatar',
        storageOptions: {skipBackup: true, path: 'images'},
      },
      imageResponse: {},
      layerImages: [],
      layerName: '',
      gridId: '0',
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({isLoading: true});
    if ((await AsyncStorage.getItem('accessToken')) === null) {
      this.setState({isLoading: false});
      this.props.navigation.navigate('Login');
    } else {
      await this.onPageLoad();
      this.setState({isLoading: false});
    }
  };

  onPageLoad = async () => {
    this.setState({
      layerName: this.props.route.params.layerName,
      gridId: this.props.route.params.gridId,
      isLoading: true,
    });
    await this.getLayerImages();
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
      this.setState({layerImages: layerImages, isLoading: false});
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (
      this.props.route.params.layerDetailsId.toString() !==
      prevProps.route.params.layerDetailsId.toString()
    ) {
      if (!isUserLoggedIn()) {
        this.props.navigation.navigate('Login');
      } else {
        this.onPageLoad();
      }
    }
  };

  imagePickerHandler = (options) => {
    this.setState({isLoading: true});
    ImagePicker.showImagePicker(options, (response) => {
      LayerAPI.LayerUpload(
        this.props.route.params.layerDetailsId,
        response.data,
        response.fileName,
      ).then(() => {
        this.onPageLoad();
      });
    });
  };

  render() {
    let options = {
      title: 'Select Avatar',
      storageOptions: {skipBackup: true, path: 'images'},
    };
    let host = APIConstants.GLOBAL_VALUE;
    return (
      <>
        {this.state.isLoading ? (
          <LoaderComponent></LoaderComponent>
        ) : (
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
        )}
      </>
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
