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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import Geolocation from '@react-native-community/geolocation';
import GridAPI from '../api/GridAPI';
import AutoCompleteComponent from '../components/AutoCompleteComponent';

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
      dataForCenter: {},
      gridDetailsDropdown: [],
      gridId: '0',
    };
  }

  componentDidMount = async () => {
    let access = await this.accessPermission();
    if (access) {
      this.getGridData();
      this.getGridDropdown();
    }
  };

  getGridDropdown = async () => {
    let gridDetailsForDropdown = await GridAPI.GetGridListDropdown();
    let gridDetailsDropdown = [];
    if (
      gridDetailsForDropdown !== null &&
      gridDetailsForDropdown !== undefined &&
      Object.keys(gridDetailsForDropdown).length > 0
    ) {
      for (let item in gridDetailsForDropdown) {
        let gridDataItem = {
          label: gridDetailsForDropdown[item].gridName,
          value: gridDetailsForDropdown[item].id,
        };
        gridDetailsDropdown.push(gridDataItem);
      }
      this.setState({gridDetailsDropdown});
      this.setState({gridId: gridDetailsDropdown[0].value});
    }
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
    if (gridData !== null) {
      let initialRegion = this.getDeltas(18.9651515, 72.8002582142857);
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
        return true;
      } else {
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

  getSearchGrid = () => {
    if (this.state.gridId !== 0) {
      let gridData = this.state.gridData;
      let centerRegion = {};

      for (let item in gridData) {
        if (gridData[item].gridId === this.state.gridId) {
          gridData[item].gridFillColor = '#2ABA06';
          centerRegion = this.getDeltas(gridData[item].lat, gridData[item].lng);
        } else {
          gridData[item].gridFillColor = '#D2FFC7';
        }
      }
      this.setState({gridData});
      this.setState({initialRegion: centerRegion});
    }
  };

  onChangeItemHandler = (item) => {
    this.setState({gridId: item.value});
    if (item.value === 0) {
      this.getGridData();
    }
  };

  render() {
    return (
      <View style={{flex: 3, backgroundColor: '#FFFFFF'}}>
        <StatusBarComponent IsVisible={false}></StatusBarComponent>
        <HeaderComponent
          headingValue="Dashboard"
          IsDashboard={true}></HeaderComponent>
        <View style={{flex: 4, flexDirection: 'row', height: 70, marginTop: 5}}>
          <View
            style={{
              flex: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flex: 4, marginTop: 5}}>
              {Object.keys(this.state.gridDetailsDropdown).length > 0 ? (
                <AutoCompleteComponent
                  WhereFromValue="Dashboard"
                  items={this.state.gridDetailsDropdown}
                  onChangeItemHandler={(item) => {
                    this.onChangeItemHandler(item);
                  }}></AutoCompleteComponent>
              ) : (
                <Text></Text>
              )}
            </View>
            <TouchableOpacity
              style={{flex: 0.7}}
              onPress={() => this.getSearchGrid()}>
              <Icon
                name="search"
                color="#FFFFFF"
                size={25}
                style={{
                  padding: 12,
                  backgroundColor: '#184589',
                  marginTop: 5,
                  alignSelf: 'center',
                  borderRadius: 3,
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
                            strokeColor="#135801"
                            strokeWidth={2}
                            fillColor={marker.gridFillColor}
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
                            onPress={() => {
                              this.props.navigation.navigate('GridView', {
                                gridId: marker.gridId,
                              });
                            }}>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: 'Archivo-Regular',
                              }}>
                              {marker.gridNumber}
                            </Text>
                            <MaterialIcon
                              name="location-pin"
                              size={35}
                              color={
                                marker.status === 'Completed'
                                  ? '#46FE18'
                                  : marker.status === 'InProgress'
                                  ? '#FEF74D'
                                  : '#FFA620'
                              }
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
