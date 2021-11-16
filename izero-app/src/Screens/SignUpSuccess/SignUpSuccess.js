import React, {useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {Container, Carousel, Button} from '../../Components';
import {SuccessSlide} from '../../Constants/GetStarted';
import Styles from './Styles';
import {useSelector, useDispatch} from 'react-redux';
import Api from '../../api';
import types from '../../Redux/types';

import auth from '@react-native-firebase/auth';
import {firebaseConfig} from '../../Components/Config/config';
import * as firebase from 'firebase';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function SignUpSuccess({navigation, route}) {
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();

  console.log('SignUpSuccess');

  useEffect(() => {
    loginRequest();
  }, []);

  const loginRequest = useCallback(async () => {
    let email = route.params.email;
    let password = route.params.password;
    let id = route.params.id;
    try {
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('type', userType);

      let res = await Api.post('/login', data);
      console.log('User login api response', res);
      dispatch({
        type: types.ADD_USER,
        accessToken: res.data.accessToken,
        user: res.data.data,
      });
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          console.log('User account created & signed in!', e);
          let temp = {
            id: e?.user?._user?.uid,
            name:
              res?.data?.data?.first_name + ' ' + res?.data?.data?.last_name,
            avatar: res?.data?.data?.avatar,
          };
          //firebase.database().ref('User').ref.push(temp);
          firestore().collection('user').doc(e?.user?._user?.uid).set(temp);

          let data1 = new FormData();
          data1.append('firebase_msgId', e?.user?._user?.uid);
          data1.append('user_id', id);
          try {
            let res1 =  Api.post('/store_firebase_msgid', data1);
            console.log('User Sign up api response', res1);
          } catch (error1) {
            console.log({error1});
          }
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!', error);
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log({error});
    }
  }, []);
  return (
    <Container>
      <Carousel data={SuccessSlide} />
      {userType == 'staff' ? (
        <Button
          onPress={() => navigation.navigate('CompleteProfileTalent')}
          style={Styles.button}>
          BUILD YOUR PROFILE
        </Button>
      ) : (
        <Button
          onPress={() => navigation.navigate('CompleteProfileClientSecond')}
          style={[Styles.button, {width: widthPercentageToDP('75%')}]}>
          BUILD YOUR BUSINESS PROFILE
        </Button>
      )}
    </Container>
  );
}
