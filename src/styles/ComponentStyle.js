import {StyleSheet} from 'react-native';

const ComponentStyles = StyleSheet.create({
  Login_LabelComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
    left: 8,
    color: '#184589',
  },
  GridView_LabelComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#000000',
  },
  Layer_LabelComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: '#000000',
  },
  CleaningAndGrubbing_LabelComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 20,
    color: '#000000',
  },
  GridArea_LabelComponentStyle: {
    padding: 15,
    fontSize: 18,
    fontFamily: 'Archivo',
  },
  Login_TextBoxComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    backgroundColor: '#F1F4F8',
    marginVertical: 5,
    height: 50,
    padding: 10,
    marginBottom: 15,
  },
  Dashboard_TextBoxComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 18,
    backgroundColor: '#F1F4F8',
    marginVertical: 5,
    height: 50,
    padding: 10,
    marginBottom: 15,
  },
  GridView_TextBoxComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: 'black',
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    height: 35,
    padding: 5,
    marginBottom: 15,
  },
  Layer_TextBoxComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 14,
    color: 'black',
    backgroundColor: '#F1F4F8',
    marginVertical: 5,
    height: 35,
    padding: 5,
    marginBottom: 15,
  },
  LayerLong_TextBoxComponentStyle: {
    fontFamily: 'Archivo-Regular',
    fontSize: 10,
    color: 'black',
    backgroundColor: '#F1F4F8',
    marginVertical: 5,
    height: 35,
    padding: 5,
    marginBottom: 15,
  },
  TouchableOpacityOuterStyle: {
    backgroundColor: '#184589',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableOpacityInnerStyle: {
    fontSize: 20,
    fontFamily: 'Archivo-Regular',
    color: '#FFFFFF',
  },
  CheckBoxContainerStyle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  CheckBoxStyle: {
    alignSelf: 'center',
  },
  CheckBoxLabelStyle: {
    margin: 8,
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
  },
  HeaderContainerStyle: {
    height: 75,
    marginTop: -7,
    marginLeft: -7,
    marginRight: -7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 0,
  },
  HeaderInnerContainerStyle: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HeaderLogoContainerStyle: {
    flex: 1,
    alignContent: 'center',
  },
  HeaderLeftStyle: {
    width: 60,
  },
  HeaderCenterStyle: {
    marginVertical: 20,
  },
  HeaderRightStyle: {
    width: 90,
    marginVertical: 20,
  },
  HeaderLogoutStyle: {
    zIndex: 10000,
    marginLeft: 20,
  },
  HeaderProgressContainerStyle: {
    marginLeft: -20,
    marginVertical: -10,
    alignContent:'center'
  },
  HeaderLogoStyle: {
    height: 47,
    width: 66,
    marginVertical: 13,
    marginHorizontal: 15,
  },
  HeaderTextContainerStyle: {
    flex: 1,
    marginVertical: 32,
    marginLeft: -20,
  },
  HeaderTextStyle: {
    fontSize: 20,
    fontFamily: 'Archivo-Regular',
    textAlign: 'center',
  },
  HeaderUserContainerStyle: {
    flex: 1,
    marginVertical: 32,
    marginLeft: -20,
  },
  HeaderUserStyle: {
    marginRight: -30,
    marginTop: 10,
  },
  HeaderLeftArrowStyle: {
    marginLeft: 20,
    marginTop: 15,
  },
  HeaderInProgressOuterContainerStyle: {
    width: 80,
    height: 15,
    borderWidth: 1,
    borderColor: '#184589',
    marginTop: 2,
  },
  HeaderInProgressInnerContainerStyle: {
    width: 40,
    height: 15,
    backgroundColor: '#184589',
  },
  HeaderNewContainerStyle: {
    width: 80,
    height: 15,
    borderWidth: 1,
    borderColor: '#184589',
    marginTop: 2,
  },
  HeaderCompletedContainerStyle: {
    width: 80,
    height: 15,
    borderWidth: 1,
    borderColor: '#184589',
    backgroundColor: '#184589',
    marginTop: 2,
  },
  AutoCompleteComponentStyle: {
    backgroundColor: '#F1F4F8',
    borderColor: '#F1F4F8',
  },
  AutoCompleteComponentItemStyle: {
    justifyContent: 'flex-start',
  },
  AutoCompleteComponentDropDownStyle: {
    backgroundColor: '#F1F4F8',
    position: 'absolute',
  },
  LayerCount_CompletedStyle: {
    padding: 3,
  },
  View_OuterContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
  },
  View_OuterLayerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  View_InnerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginRight: 10,
  },
});

export default ComponentStyles;
