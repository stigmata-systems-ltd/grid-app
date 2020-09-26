import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  Text,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import HeaderComponent from '../components/HeaderComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import Geolocation from '@react-native-community/geolocation';
import GridAPI from '../api/GridAPI';

export default class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridNumber: '',
      IsLoaded: false,
      initialRegion: {
        latitude: 10.391000434756279,
        longitude: 77.97916952213156,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      currLoc: null,
      gridData: [],
      watchId: '',
      dataForCenter:{}
    };
  }

  componentDidMount = async () => {
    this.getGridData();
  };

  getCurrentPositionData = async () => {
    let access = await this.accessPermission();
    let initialPosition = null;
    if (access) {
      await Geolocation.getCurrentPosition(
        (position) => {
          initialPosition = JSON.stringify(position);
        },
        (error) => alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 0,
        },
      );
    }
  };

  getGridData = async () => {
    let {gridData, dataForCenter} = await GridAPI.GetGridList();
    console.log("Date for center" + JSON.stringify(dataForCenter));
    if (gridData !== null) {
      let initialRegion = this.getDeltas(dataForCenter.lat, dataForCenter.lng);
      this.setState({initialRegion: initialRegion});
      this.setState({gridData: gridData, dataForCenter: dataForCenter});
      gridData.map((polygon) => {
        let polygonDetail = [];
        polygon.rectCords.map((pot) => {
          let polypot = {
            lat: pot.latitude,
            lng: pot.longitude,
          };
          polygonDetail.push(polypot);
        });
        let position = {};
        let coords = {
          latitude: gridData[0].lat,
          longitude: gridData[0].lng,
        };
        position.coords = coords;
        this.geoLocationHandler(position, polygonDetail, polygon.title);
      });
    }
  };

  setCurrentLocation = () => {
    let watchId = Geolocation.watchPosition(
      (position) => {
        this.setState({currLoc: position});
      },
      (err) => {
        err;
      },
      {enableHighAccuracy: true, distanceFilter: 1},
    );
    this.setState({watchId: watchId});
  };

  accessPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access to use your location',
          message:
            'location can able to view grid ' +
            'location can able to view grid',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  geoLocationHandler = (point, polygon, title) => {
    var pointDetail = {
      lat: point.coords.latitude,
      lng: point.coords.longitude,
    };

    GeoFencing.containsLocation(pointDetail, polygon)
      .then(() => {
        this.setState({
          currentGridDetails: 'within area. Grid Name :' + title,
        });
        return;
      })
      .catch(() => {});
  };

  polygonHandler = (markerDetails) => {
    console.log(markerDetails);
  };

  getDeltas = (lat, lng, distance = 5) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 50;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      distance /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta,
      longitudeDelta,
    };
  };

  ClearWatch = () => {
    Geolocation.clearWatch(this.state.watchId);
  };

  render() {
    return (
      <View style={{flex: 3, backgroundColor: '#FFFFFF'}}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        <HeaderComponent headingValue="Dashboard"></HeaderComponent>
        <View style={{flex: 4, flexDirection: 'row', height: 70, marginTop: 5}}>
          <View
            style={{
              flex: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flex: 4}}>
            <TextBoxComponent
                WhereFromValue="Dashboard"
                onChangeTextHandler={(text) => {
                  this.setState({GridNumber: text});
                }}
                textValue={this.state.GridNumber}
                autoCapitalize="none"
                secureTextEntry={false}></TextBoxComponent>
            </View>
            <TouchableOpacity
              style={{flex: 0.7}}
              onPress={() => this.props.navigation.navigate("GridView")}>
              <Icon
                name="search"
                color="#FFFFFF"
                size={25}
                style={{
                  padding: 12,
                  backgroundColor: '#184589',
                  marginTop: 5,
                  alignSelf: 'center',
                }}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <View style={{marginTop: 17}}>
              <MaterialIcon
                name="my-location"
                size={35}
                style={{padding: 5}}></MaterialIcon>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 28,
            backgroundColor: 'red',
            margin: 15,
          }}>
          <>
            {Object.keys(this.state.initialRegion).length > 0 ? (
              <>
                <MapView
                  region={this.state.initialRegion}
                  style={styles.mapView}
                  provider={PROVIDER_GOOGLE}>
                  {this.state.currLoc !== null && (
                    <Marker
                      key={'test'}
                      coordinate={{
                        latitude: this.state.currLoc.coords.latitude,
                        longitude: this.state.currLoc.coords.longitude,
                      }}
                      title={'My Location'}
                      description={'Location Test'}
                      draggable={true}>
                      <MaterialIcon
                        name="location-pin"
                        size={50}
                        color="green"
                      />
                    </Marker>
                  )}
                  {this.state.gridData.length > 0 &&
                    this.state.gridData.map((marker) => {
                      return (
                        <>
                          <Polygon
                            key={'grid' + marker.lng}
                            coordinates={marker.rectCords}
                            strokeColor="red"
                            strokeWidth={3}
                            fillColor="green"
                            onPress={() => {
                              this.polygonHandler(marker);
                            }}
                            tappable={true}
                          />
                          <Marker
                            key={'marker' + marker.lat}
                            coordinate={{
                              latitude: marker.lat,
                              longitude: marker.lng,
                            }}
                            title={marker.gridNumber}>
                            <MaterialIcon
                              name="location-pin"
                              size={50}
                              color="blue"
                            />
                          </Marker>
                        </>
                      );
                    })}
                </MapView>
              </>
            ) : (
              <Text>No Render</Text>
            )}
          </>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    height: '100%',
  },
});
