/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import firebase from '@react-native-firebase/messaging';
//import 'react-native-gesture-handler';
//import 'react-native-get-random-values';

firebase().setBackgroundMessageHandler(async remoteMessage=>{
    console.log('message handle in background',remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;