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
    fontSize: 15,
    color: '#000000',
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
  Dashboard_TextBoxComponentStyle:{
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
    color:'black',
    backgroundColor: '#FFFFFF',
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
    flex: 0.2,
    flexDirection: 'row',
  },
  HeaderLogoContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  HeaderLogoStyle: {
    height: 47,
    width: 66,
    marginVertical: 13,
    marginHorizontal: 15,
  },
  HeaderTextContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 32,
  },
  HeaderTextStyle: {
    fontSize: 25,
    fontFamily: 'Archivo-Regular',
    textAlign: 'center',
  },
  HeaderUserContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  HeaderUserStyle:{
    marginRight: -30
  },
  HeaderLeftArrowStyle:{
    marginLeft: 20,
    marginTop:10
  }
});

export default ComponentStyles;
