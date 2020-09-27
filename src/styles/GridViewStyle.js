import {StyleSheet} from 'react-native';

const GridViewStyles = StyleSheet.create({
  gridViewContainerStyle: {
    flex: 3,
    backgroundColor: '#FFFFFF',
  },
  gridViewUpperContainerStyle: {
    flex: 0.4,
  },
  gridViewGridAreaStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  gridView_LayerCompletedTextStyle: {
    flex: 0.3,
  },
  gridView_LayerCompletedInnerTextStyle: {
    alignSelf: 'center',
  },
  gridView_LayerCountContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
  },
  gridView_DetailButtonOuterContainerStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  gridView_DetailButtonInnerContainerStyle: {
    flex: 3,
    flexDirection: 'row',
  },
  gridView_DetailButtonFontStyle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Archivo-Regular',
  },
  gridView_DetailsButtonStyleClicked: {
    backgroundColor: '#7FA9E8',
    padding: 10,
    width: 120,
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  gridView_DetailsButtonStyleNotClicked: {
    backgroundColor: '#184589',
    padding: 10,
    width: 120,
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  gridView_RFIButtonStyleClicked: {
    backgroundColor: '#7FA9E8',
    width: 120,
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    paddingTop: 3,
  },
  gridView_RFIButtonStyleNotClicked: {
    backgroundColor: '#184589',
    width: 120,
    height: 45,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    paddingTop: 3,
  },
  gridView_LayerDetailsContainerStyle: {
    margin: 5,
    alignItems: 'center',
  },
  gridView_LayerDetailsTextStyle: {
    fontSize: 20,
    fontFamily: 'Archivo-Regular',
  },
  gridView_DropDownOuterContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  gridView_DropDownInnerContainerStyle: {
    flex: 0.5,
    margin: 15,
  },
  gridView_UploadImageOuterContainerStyle: {
    flex: 0.5,
    margin: 15,
  },
  gridView_UploadImageInnerContainerStyle: {
    backgroundColor: '#C4C4C4',
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
});

export default GridViewStyles;
