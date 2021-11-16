import axios from 'axios';
import {dev} from '../Constants/environment';

const Api = axios.create({
  baseURL: dev.api,
  timeout: 20000,
});

export default Api;
