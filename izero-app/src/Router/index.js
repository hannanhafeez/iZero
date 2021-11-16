import React, {useEffect} from 'react';
import {View, Text, useColorScheme, AsyncStorage, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import GetStartedStack from './GetStartedStack';
import TalentStack from './TalentStack';

import ClientStackRoute from '../Router/ClientStack/ClientStack';
import TalentStackRoute from '../Router/TalentStack/TalentStack';

import {Light} from '../Theme';
import {Dark} from '../Theme/Dark';

import {useDispatch, useSelector} from 'react-redux';

import types from '../Redux/types';

import DeviceInfo from 'react-native-device-info';

import firebase from '@react-native-firebase/messaging';

import { navigationRef } from '../Router/navigation/RootNavigation';


export default function Router() {
  const scheme = useColorScheme();
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state?.app?.loginUser);
  const loginUserType = useSelector((state) => state?.app?.loginUserType);

  useEffect(() => {
    var uniqueId = DeviceInfo?.getUniqueId();
    dispatch({
      type: types.DEVICE_TOCKEN,
      deviceTocken: uniqueId,
    });

    requestUserPermissions();
    notificationsListener();
  }, []);

  const requestUserPermissions = async () => {
    let check = await firebase().registerDeviceForRemoteMessages();
    console.log('check', check);

    await messaging().requestPermission({
      sound: false,
      announcement: true,
      sound: true,
      provisional: true,
      badge: true,
      announcement: true,
      alert: true,
    });

    const authStatus = await firebase().requestPermission();

    const enabled =
      authStatus === firebase.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('fcmToken1');
      getToken();
    } else {
      console.log('fcmToken12');
      getToken();
    }
  };

  const getToken = async () => {
    try {
      const enabled = await firebase().hasPermission();
      if (!enabled) {
        await firebase().requestUserPermissions();
      }

      const fcmToken = await firebase().getToken();

      console.log('fcmToken', fcmToken);

      if (fcmToken) {
        dispatch({
          type: types.FCM_TOCKEN,
          fcmTocken: fcmToken,
        });
        return fcmToken;
      }
    } catch (error) {
      console.warn('notification token error', error);
    }
  };

  const notificationsListener = async () => {
    firebase().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state',
        remoteMessage.notification,
      );
      Alert.alert(`${remoteMessage?.notification?.title}`,
         `${remoteMessage.notification?.body}`, [
        {
          text: 'OK',
        },
      ]);
      // alert(
      //   remoteMessage?.notification?.title +
      //     '  ' +
      //     remoteMessage.notification?.body,
      // );
    });

    firebase().onMessage(async (remoteMessage) => {
      console.log('received in foreground', remoteMessage);
      // alert(
      //   remoteMessage?.notification?.title +
      //     '  ' +
      //     remoteMessage.notification?.body,
      // );
          Alert.alert(`${remoteMessage?.notification?.title}`,
          `${remoteMessage.notification?.body}`, [
         {
           text: 'OK',
         },
       ]);
    });

    firebase()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from background state navigation',
            remoteMessage.notification,
          );
          // alert(
          //   remoteMessage?.notification?.title +
          //     '  ' +
          //     remoteMessage.notification?.body,
          // );
              Alert.alert(`${remoteMessage?.notification?.title}`,
              `${remoteMessage.notification?.body}`, [
             {
               text: 'OK',
             },
           ]);
        }
      });
  };

  const linking = {
    prefixes: ['demo://'],
    config: {
      src: {
        CreateJobClient: {
          path: 'Router/ClientStack/CreateJobClient',
        },

        NotificationsClient: {
          path: 'Router/ClientStack/NotificationsClient',
        },

        FinanceClient: {
          path: 'Router/ClientStack/FinanceClient',
        },

        ChangePassword: {
          path: 'Router/ClientStack/ChangePassword',
        },
      },
    },
  };

  return (
    <NavigationContainer
    ref={navigationRef}
      linking={linking}
      theme={scheme === 'dark' ? Dark : Light}>
      {loginUser == true && loginUserType === 'staff' ? (
        <TalentStackRoute />
      ) : loginUser == true && loginUserType === 'client' ? (
        <ClientStackRoute />
      ) : (
        <TalentStack />
      )}
    </NavigationContainer>
  );
}
