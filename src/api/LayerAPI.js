import Axios from 'axios';
import * as Constants from '../constants/APIConstants';
import FormData from 'form-data';

const GetLayerDetails = async () => {
  try {
    const {data} = await Axios.get(Constants.LayerDetailsAPI);
    return data;
  } catch (err) {
    return err;
  }
};

const GetLayerListDetails = async (layerDetailsId) => {
  try {
    const {data} = await Axios.get(
      Constants.LayerListAPI + '?layerDtlsId=' + layerDetailsId,
    );
    return data;
  } catch (err) {
    return err;
  }
};

const LayerUpload = async (layerDetailsId, imageDetail, fileName) => {
  try {
    var formData = new FormData();
    formData.append('layerDtlsId', layerDetailsId);
    formData.append('uploadDocs', imageDetail);
    formData.append('fileName', fileName);
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    let {data} = await Axios.post(Constants.LayerUploadAPI, formData, config);
    
    return data;
  } catch (err) {
    return err;
  }
};

export default {GetLayerDetails, LayerUpload, GetLayerListDetails};
