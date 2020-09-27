import Axios from 'axios';
import * as Constants from '../constants/APIConstants';

const GetLayerDetails = async () => {
    try {
      const {data} = await Axios.get(Constants.LayerDetailsAPI);
      return data;
    } catch (err) {
      console.log('Errr');
      return err;
    }
  };

export default {GetLayerDetails};