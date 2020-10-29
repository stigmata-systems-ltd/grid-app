import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  Text,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import HeaderComponent from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  AnimatedRegion,
} from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import Geolocation from '@react-native-community/geolocation';
import GridAPI from '../api/GridAPI';
import AutoCompleteComponent from '../components/AutoCompleteComponent';
import LoaderComponent from '../components/LoaderComponent';
import Middleware from '../api/Middleware';

export default class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridNumber: '',
      isLoading: false,
      isRefreshing: false,
      initialRegion: {
        latitude: 10.391000434756279,
        longitude: 77.97916952213156,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      isCurrentLocationHandled: false,
      currLoc: null,
      gridData: [],
      watchId: '',
      dataForCenter: {},
      gridDetailsDropdown: [],
      gridId: '0',
      currentGridDetails: '',
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

  onPageRefresh = async () => {
    this.setState({isRefreshing: true});
    if (!Middleware.IsUserLoggedIn()) {
      this.setState({isRefreshing: false});
      this.props.navigation.navigate('Login');
    } else {
      await this.onPageLoad();
      this.setState({gridId: 0});
      this.setState({isRefreshing: false});
    }
  };

  onPageLoad = async () => {
    let access = await this.accessPermission();
    if (access) {
      await this.getGridDropdown();
      await this.getGridData();
    }
  };

  getGridDropdown = async () => {
    let {
      data,
      isSessionExpired,
      isRefreshed,
    } = await GridAPI.GetGridListDropdown();

    let gridDetailsDropdown = [];
    if (!isRefreshed) {
      if (!isSessionExpired) {
        if (
          data !== null &&
          data !== undefined &&
          Object.keys(data).length > 0
        ) {
          for (let item in data) {
            let gridDataItem = {
              label: data[item].gridName,
              value: data[item].id,
            };
            gridDetailsDropdown.push(gridDataItem);
          }
          this.setState({gridDetailsDropdown});
          this.setState({gridId: gridDetailsDropdown[0].value});
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
    let {
      gridData,
      dataForCenter,
      isSessionExpired,
      isRefreshed,
    } = await GridAPI.GetGridList();

    if (!isRefreshed) {
      if (!isSessionExpired) {
        if (gridData !== null && gridData !== undefined) {
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
            this.geoLocationHandler(
              position,
              polygonDetail,
              polygon.gridNumber,
            );
          });
          this.setState({isLoading: false});
        } else {
          this.setState({isLoading: false});
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

  // setCurrentLocation = () => {
  //   let watchId = Geolocation.watchPosition(
  //     (position) => {
  //       this.setState({currLoc: position});
  //     },
  //     (err) => {
  //       err;
  //     },
  //     {enableHighAccuracy: true, distanceFilter: 1},
  //   );
  //   this.setState({watchId: watchId});
  // };

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
          currentGridDetails:
            title !== undefined ? 'Currently in the grid : ' + title : '',
        });
        return;
      })
      .catch(() => {});
  };

  polygonHandler = (markerDetails) => {
    // console.log(markerDetails);
  };

  getDeltas = (lat, lng, distance = 5) => {
    const oneDegreeOfLatitudeInMeters = 90.32 * 25;

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
          gridData[item].gridFillColor = 'rgba(0, 230, 64, 0.3)';
          centerRegion = this.getDeltas(gridData[item].lat, gridData[item].lng);
        } else {
          gridData[item].gridFillColor =
            gridData[item].status === 'Completed'
              ? 'rgba(70, 254, 24, 0.3)'
              : gridData[item].status === 'InProgress'
              ? 'rgba(254, 247, 77, 0.3)'
              : gridData[item].status === 'Completed' && gridData[item].isBilled
              ? 'rgb(34,139,34, 0.3)'
              : 'rgba(255, 166, 32, 0.3)';
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

  locationHandler = async () => {
    if (!this.state.isCurrentLocationHandled) {
      this.getGridData();
      let access = await this.accessPermission();
      let initialPosition = null;
      if (access) {
        this.setState({isCurrentLocationHandled: true});
        await Geolocation.getCurrentPosition(
          (position) => {
            initialPosition = JSON.stringify(position);
            this.setState({
              initialRegion: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              },
            });
            this.state.gridData.map((polygon) => {
              let polygonDetail = [];
              polygon.rectCords.map((pot) => {
                let polypot = {
                  lat: pot.latitude,
                  lng: pot.longitude,
                };
                polygonDetail.push(polypot);
              });
              this.geoLocationHandler(
                position,
                polygonDetail,
                polygon.gridNumber,
              );
            });
            if (this.state.isCurrentLocationHandled) {
              let watchId = Geolocation.watchPosition(
                (position) => {
                  this.setState({currLoc: position});
                  this.state.gridData.map((polygon) => {
                    let polygonDetail = [];
                    polygon.rectCords.map((pot) => {
                      let polypot = {
                        lat: pot.latitude,
                        lng: pot.longitude,
                      };
                      polygonDetail.push(polypot);
                    });

                    this.geoLocationHandler(
                      position,
                      polygonDetail,
                      polygon.gridNumber,
                    );
                  });
                },
                (err) => {
                  err;
                },
                {enableHighAccuracy: true, distanceFilter: 1},
              );
              this.setState({watchId: watchId});
            }
          },
          (error) => alert(error.message),
          {
            timeout: 20000,
            distanceFilter: 0,
          },
        );
      }
    } else {
      this.setState({isCurrentLocationHandled: false, currLoc: null});
      this.ClearWatch();
      let access = await this.accessPermission();
      if (access) {
        this.getGridData();
        this.getGridDropdown();
      }
      Geolocation.stopObserving();
    }
  };

  logoutHandler = async () => {
    await Middleware.clearSession();
    this.props.navigation.navigate("Login");
  };

  onMapReadyHandler = () => {
    //console.log('Hitted On Map ready Handler ');
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <LoaderComponent></LoaderComponent>
        ) : (
          <ScrollView
            contentContainerStyle={{flex: 3, backgroundColor: '#FFFFFF'}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onPageRefresh}
              />
            }>
            <StatusBarComponent IsVisible={false}></StatusBarComponent>
            <HeaderComponent
              headingValue="Dashboard"
              IsDashboard={true}
              logoutHandler={this.logoutHandler}></HeaderComponent>
            <View
              style={{
                flex: 4,
                flexDirection: 'row',
                height: 70,
                marginTop: 5,
              }}>
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
                  <TouchableOpacity
                    onPress={() => {
                      this.locationHandler();
                      //this.onRefreshHandler();
                    }}>
                    <MaterialIcon
                      name="my-location"
                      size={35}
                      style={{padding: 5}}
                      color={
                        this.state.isCurrentLocationHandled ? 'green' : 'red'
                      }></MaterialIcon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {this.state.isCurrentLocationHandled ? (
              <View>
                <Text style={styles.blinkTwoStyle}>
                  {this.state.currentGridDetails}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            <View
              style={{
                flex: 28,
                backgroundColor: 'white',
                margin: 15,
              }}>
              <>
                {Object.keys(this.state.initialRegion).length > 0 ? (
                  <>
                    <MapView
                      region={this.state.initialRegion}
                      onMapReady={this.onMapReadyHandler}
                      style={styles.mapView}
                      provider={PROVIDER_GOOGLE}>
                      {this.state.currLoc !== null && (
                        <Marker
                          key={'test'}
                          coordinate={{
                            latitude: this.state.currLoc.coords.latitude,
                            longitude: this.state.currLoc.coords.longitude,
                          }}
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
                              <Marker
                                key={'marker' + marker.lat}
                                tracksViewChanges={false}
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
                                {/* <MaterialIcon
                                  name="location-pin"
                                  size={35}
                                  color={
                                    marker.status === 'Completed'
                                      ? '#46FE18'
                                      : marker.status === 'InProgress'
                                      ? '#FEF74D'
                                      : '#FFA620'
                                  }
                                /> */}
                              </Marker>
                            </>
                          );
                        })}
                      {this.state.gridData.length > 0 &&
                        this.state.gridData.map((marker) => {
                          return (
                            <>
                              <Polygon
                                key={'grid' + marker.lng}
                                coordinates={marker.rectCords}
                                strokeColor="#135801"
                                strokeWidth={1}
                                fillColor={marker.gridFillColor}
                                onPress={() => {
                                  this.props.navigation.navigate('GridView', {
                                    gridId: marker.gridId,
                                  });
                                }}
                                tappable={true}
                              />
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
          </ScrollView>
        )}
      </>
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
  blinkOneStyle: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Archivo-Regular',
    color: 'red',
  },
  blinkTwoStyle: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Archivo-Regular',
    color: 'green',
  },
});
