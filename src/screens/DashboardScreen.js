import React, { Component } from 'react';
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
import {
  getGridData,
  getInitialRegionData,
  getGridDropDownData,
  setIsCurrentLocationDisabled,
  setInitialRegion,
  setCurrentGridDetails,
  setCurrentLoc,
  setWatchId,
  searchSpecificGrid,
  setGridId
} from '../redux/actions/gridActions';
import { connect } from 'react-redux';
import store from '../redux/store';

export class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.onPageLoad();
  };

  onPageLoad = async () => {
    let access = await this.accessPermission();
    if (access) {
      await this.props.getGridDropDownData();
      await this.props.getGridData();
      this.props.grid.gridData.map((polygon) => {
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
          latitude: this.props.grid.gridData[0].lat,
          longitude: this.props.grid.gridData[0].lng,
        };
        position.coords = coords;
        this.geoLocationHandler(
          position,
          polygonDetail,
          polygon.gridNumber,
        );
      });
    }
  };

  getCurrentPositionData = async () => {
    let access = await this.accessPermission();
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

  geoLocationHandler = (point, polygon, title) => {
    var pointDetail = {
      lat: point.coords.latitude,
      lng: point.coords.longitude,
    };

    GeoFencing.containsLocation(pointDetail, polygon)
      .then(() => {
        this.props.grid.setCurrentGridDetails(title !== undefined ? 'Currently in the grid : ' + title : '');
        return;
      })
      .catch(() => { });
  };

  locationHandler = async () => {
    if (!this.props.isCurrentLocationHandled) {
      this.props.getGridData();
      let access = await this.accessPermission();
      if (access) {
        this.props.setIsCurrentLocationDisabled(true);
        await Geolocation.getCurrentPosition(
          (position) => {
            initialPosition = JSON.stringify(position);
            this.props.setInitialRegion(initialPosition);
            this.props.grid.gridData.map((polygon) => {
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
            if (this.props.grid.isCurrentLocationHandled) {
              let watchId = Geolocation.watchPosition(
                (position) => {
                  this.props.setCurrentLoc(position);
                  this.props.grid.gridData.map((polygon) => {
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
                { enableHighAccuracy: true, distanceFilter: 1 },
              );
              this.props.setWatchId(watchId);
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
      this.props.setIsCurrentLocationDisabled(false);
      this.props.setCurrentLoc(null);
      this.ClearWatch();
      let access = await this.accessPermission();
      if (access) {
        this.props.getGridData();
        this.props.getGridDropdown();
      }
      Geolocation.stopObserving();
    }
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
        this.props.setCurrentGridDetails(title !== undefined ? 'Currently in the grid : ' + title : '');
        return;
      })
      .catch(() => { });
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
    Geolocation.clearWatch(this.props.grid.watchId);
  };

  getSearchGrid = () => {
    if (this.props.grid.gridId !== 0) {
      this.props.searchSpecificGrid(this.props.grid.gridData, this.props.grid.gridId);
    }
  };

  onChangeItemHandler = (item) => {
    this.props.setGridId(item.value);
    if (item.value === 0) {
      this.props.getGridData();
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
        {this.props.grid.isLoading ? (
          <LoaderComponent></LoaderComponent>
        ) : (
            <ScrollView
              contentContainerStyle={{ flex: 3, backgroundColor: '#FFFFFF' }}
              refreshControl={
                <RefreshControl
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
                  <View style={{ flex: 4, marginTop: 5 }}>
                    {this.props.grid.gridDetailsDropdown !== undefined && Object.keys(this.props.grid.gridDetailsDropdown).length > 0 ? (
                      <AutoCompleteComponent
                        WhereFromValue="Dashboard"
                        items={this.props.grid.gridDetailsDropdown}
                        onChangeItemHandler={(item) => {
                          this.onChangeItemHandler(item);
                        }}></AutoCompleteComponent>
                    ) : (
                        <Text></Text>
                      )}
                  </View>
                  <TouchableOpacity
                    style={{ flex: 0.7 }}
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
                <View style={{ flex: 1 }}>
                  <View style={{ marginTop: 17 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.locationHandler();
                        //this.onRefreshHandler();
                      }}>
                      <MaterialIcon
                        name="my-location"
                        size={35}
                        style={{ padding: 5 }}
                        color={'red'
                          //this.props.db.isCurrentLocationHandled ? 'green' : 'red'
                        }></MaterialIcon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this.props.grid.isCurrentLocationHandled ? (
                <View>
                  <Text style={styles.blinkTwoStyle}>
                    {this.props.grid.currentGridDetails}
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
                  {this.props.grid.initialRegion !== undefined && Object.keys(this.props.grid.initialRegion).length > 0 ? (
                    <>
                      <MapView
                        region={this.props.grid.initialRegion}
                        onMapReady={this.onMapReadyHandler}
                        style={styles.mapView}
                        provider={PROVIDER_GOOGLE}>
                        {this.props.grid.currLoc !== null && (
                          <Marker
                            key={'test'}
                            coordinate={{
                              latitude: this.props.grid.currLoc.coords.latitude,
                              longitude: this.props.grid.currLoc.coords.longitude,
                            }}
                            draggable={true}>
                            <MaterialIcon
                              name="location-pin"
                              size={50}
                              color="green"
                            />
                          </Marker>
                        )}
                        {this.props.grid.gridData.length > 0 &&
                          this.props.grid.gridData.map((marker) => {
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
                        {this.props.grid.gridData.length > 0 &&
                          this.props.grid.gridData.map((marker) => {
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

const mapStateToProps = (state) => {
  const grid = store.getState().grid;
  return {
    grid,
  };
};

export default connect(mapStateToProps,
  {
    getGridData,
    getInitialRegionData,
    getGridDropDownData,
    setIsCurrentLocationDisabled,
    setInitialRegion,
    setCurrentGridDetails,
    setCurrentLoc,
    setWatchId,
    searchSpecificGrid,
    setGridId
  })(DashBoardScreen);