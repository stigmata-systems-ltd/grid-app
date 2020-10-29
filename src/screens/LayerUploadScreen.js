import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
  ToastAndroid
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import ImagePicker from 'react-native-image-picker';
import LayerAPI from '../api/LayerAPI';
import {Image, ThemeConsumer} from 'react-native-elements';
import * as APIConstants from '../constants/APIConstants';
import Middleware from '../api/Middleware';
import LoaderComponent from '../components/LoaderComponent';

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
    if (!Middleware.IsUserLoggedIn()) {
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

  showToast = (errorMessage) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  getLayerImages = async () => {
    let {
      LayerListDetails,
      isSessionExpired,
      isRefreshed,
    } = await LayerAPI.GetLayerListDetails(
      this.props.route.params.layerDetailsId,
    );
    if (!isRefreshed) {
      if (!isSessionExpired) {
        if (
          LayerListDetails !== null &&
          LayerListDetails !== undefined &&
          LayerListDetails.length > 0
        ) {
          let layerImagesOriginal = LayerListDetails[0].layerDocs.filter((layer) => {
            return layer.uploadType === 'Images';
          });
          let layerImages = layerImagesOriginal.reverse();
          this.setState({layerImages: layerImages, isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
        await Middleware.clearSession();
        this.props.navigation.navigate('Login');
      }
    } else {
      this.onPageLoad();
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (
      this.props.route.params.layerDetailsId.toString() !==
      prevProps.route.params.layerDetailsId.toString()
    ) {
      this.setState({isLoading: true});
      if (!Middleware.IsUserLoggedIn()) {
        this.setState({isLoading: false});
        this.props.navigation.navigate('Login');
      } else {
        await this.onPageLoad();
        this.setState({isLoading: false});
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
        this.showToast("Image uploaded successfully");
        this.onPageLoad();
      }).catch(() => {
        this.showToast("Error in uploading the image. Please try again later");
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
                      PlaceholderContent={<ActivityIndicator />}
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
