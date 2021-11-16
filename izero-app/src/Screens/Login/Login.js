import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Container, AuthHeader, AuthInput, Button} from '../../Components';
import {Formik} from 'formik';
import {compose} from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import styles from './Styles';
import {BackArrow} from '../../Assets/Icons';
import {useDispatch} from 'react-redux';
import Api from '../../api';
import types from '../../Redux/types';
import {emailRegex} from '../../Constants/regex';

import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebaseConfig} from '../../Components/Config/config';
import * as firebase from 'firebase';

import DeviceInfo from 'react-native-device-info';
import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function Login({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    var uniqueId = DeviceInfo.getUniqueId();
    dispatch({
      type: types.DEVICE_TOCKEN,
      deviceTocken: uniqueId,
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const userType = useSelector((state) => state?.auth?.userType);
  const deviceTocken = useSelector((state) => state?.auth?.deviceTocken);
  const fcmTocken = useSelector((state) => state?.auth?.fcmTocken);

  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const loginRequest = useCallback(async (values) => {
    Keyboard.dismiss();

    let email = values.email;
    let password = values.password;

    if (email == '' || email == undefined) {
      alert('Please enter Email');
      setEmailCheck(true);
      setPasswordCheck(false);
    } else if (!emailRegex.test(email)) {
      alert('Please enter valid email');
      setEmailCheck(true);
      setPasswordCheck(false);
    } else if (password == '' || password == undefined) {
      alert('Please enter password');
      setPasswordCheck(true);
      setEmailCheck(false);
    } else {
      setLoading(true);
      setEmailCheck(false);
      setPasswordCheck(false);
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('type', userType);
      data.append('device_token', deviceTocken);
      data.append('fcm_token', fcmTocken);

      try {
        let res = await Api.post('/login', data);
        console.log('User login api response', res);
        
        dispatch({
          type: types.ADD_USER,
          accessToken: res?.data?.accessToken,
          user: res?.data?.data,
        });

        dispatch({
          type: types.LOGIN_USER_STATUS,
          loginUser: true,
          loginUserType: userType,
        });
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((e) => {
            console.log('firebase response with user already registered!', e);
            dispatch({
              type: types.USER_ID_MESSAGES,
              userIdMessage: e?.user?._user?.uid,
            });
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
        setLoading(false);
        if (userType === 'staff') {
          navigation.navigate('Tab');
        } else {
          navigation.navigate('ClientTab');
        }
      } catch (error) {
        setLoading(false);
        setEmailCheck(false);
        setPasswordCheck(false);
        if (error.response) {
          alert(error?.response?.data?.message);
        } else {
          alert('Something went wrong please try again.');
        }
        console.log({error});
      }
    }
  }, []);

  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>Login with email</AuthHeader>
      <Formik
        onSubmit={(values) => loginRequest(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Email"
                name="email"
                type="email"
                placeholder="Email"
                placeholderTextColor="#5C6778"
                onChangeText={() => setEmailCheck(false)}
                check={emailCheck ? true : false}
              />

              {emailCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter email
                </Text>
              ) : null}

              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              <MyInput
                //label="Password"
                name="password"
                type="password"
                placeholder="Password"
                placeholderTextColor="#5C6778"
                onChangeText={() => setPasswordCheck(false)}
                check={passwordCheck ? true : false}
              />

              {passwordCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter password
                </Text>
              ) : null}

              <Button
                onPress={() => navigation.navigate('ForgotPassword')}
                textStyle={styles.forgotButtonText}
                style={styles.forgotButton}>
                Forgotten Password?
              </Button>
              {loading ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : null}
              <Button
                disabled={loading ? true : false}
                style={styles.button}
                onPress={props.handleSubmit}
                icon={
                  <BackArrow
                    width={18.8}
                    height={18.8}
                    color={colors.pureWhite}
                    style={styles.icon}
                  />
                }
              />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
