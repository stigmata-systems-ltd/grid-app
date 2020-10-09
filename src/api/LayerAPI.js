import Axios from 'axios';
import * as Constants from '../constants/APIConstants';
import FormData from 'form-data';

const GetLayerDetails = async () => {
  try {
    const {data} = await Axios.get(Constants.LayerDetailsAPI);
    return data;
  } catch (err) {
    console.log('Errr');
    return err;
  }
};

const GetLayerListDetails = async (layerDetailsId) => {
  try {
    const {data} = await Axios.get(Constants.LayerListAPI + "?layerDtlsId=" + layerDetailsId);
    return data;
  } catch (err) {
    console.log('Errr');
    return err;
  }
};

const LayerUpload = async (layerDetailsId, imageDetail, fileName) => {
  // var photo = {
  //   uri: imageDetail.sourceURL.replace("content://", "file://"),
  //   type: imageDetail.mime,
  //   name: imageDetail.filename,
  // };
  console.log("image",fileName)
  var formData = new FormData();
  formData.append('layerDtlsId', layerDetailsId);
  formData.append('uploadDocs', imageDetail);
  formData.append('fileName', fileName);


  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
  },
  };

  await Axios.post(Constants.LayerUploadAPI, formData, config)
  // const configHeader = {
  //   headers: { 'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";' },
  // };
  // try
  // {
  // const {data} = await Axios.post(Constants.LayerUploadAPI, formData, configHeader);
  // console.log(data);
  // }
  // catch(err){
  //   console.log(JSON.stringify(err));
  // }
  // // Axios({
  // //   url: Constants.LayerUploadAPI,
  // //   method: 'POST',
  // //   headers: {
  // //     'Content-Type': 'multipart/form-data',
  // //   },
  // //   data: formData,
  // // })
  // //   .then(function (response) {
  // //     console.log("Data reponse : " + response);
  // //   })
  // //   .catch((error) => {
  // //     console.log("Error in API : " + JSON.stringify(error));
  // //   });
};

export default {GetLayerDetails, LayerUpload, GetLayerListDetails};
