import React, {useState, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Container, SelectHeader, Button, TextButton} from '../../Components';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';

import DeviceInfo from 'react-native-device-info';

import firebase from '@react-native-firebase/messaging';

export default function SelectSection({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    var uniqueId = DeviceInfo.getUniqueId();
    dispatch({
      type: types.DEVICE_TOCKEN,
      deviceTocken: uniqueId,
    });

    firebase()
      .getToken()
      .then((then) => {
        dispatch({
          type: types.FCM_TOCKEN,
          fcmTocken: then,
        });
      });
  }, []);

  const staff = useCallback(async () => {
    dispatch({
      type: types.USER_TYPE,
      userType: 'staff',
    });
    navigation.navigate('GetStarted');
  }, []);

  const employer = useCallback(async () => {
    dispatch({
      type: types.USER_TYPE,
      userType: 'client',
    });
    navigation.navigate('GetStartedEmployeer');
  }, []);

  return (
    <Container safeArea>
      <SelectHeader
        source={require('../../Assets/Images/SelectImageOne.png')}
      />

      <Button onPress={() => staff()} style={styles.firstButton}>
        STAFF
      </Button>

      <Button style={styles.lastButton} onPress={() => employer()}>
        EMPLOYER
      </Button>
      <TextButton seperator></TextButton>
    </Container>
  );
}
