import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Keyboard,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput,
  Button,
  TextSwitch,
} from '../../Components';

import {Formik} from 'formik';
import {compose} from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import styles from './Styles';
import {BackArrow} from '../../Assets/Icons';
import Api from '../../api/index';
import {useSelector} from 'react-redux';

import auth from '@react-native-firebase/auth';
import {firebaseConfig} from '../../Components/Config/config';
import * as firebase from 'firebase';
import colors from '../../Constants/colors';

import {passwordRegex} from '../../Constants/passwordRegex';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function ForgotPasswordEnter({navigation, route}) {
  let getData = route?.params;

  let email = getData?.email;
  let otpCode = getData?.otpCode;

  const [loading, setLoading] = useState(false);

  const userType = useSelector((state) => state?.auth?.userType);

  const [passwordCheck, setPasswordCheck] = useState(false);
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);

  const forgetPasswordRequest = async (values) => {
    Keyboard.dismiss();

    let password = values.password;
    let confirmPassword = values.conpassword;

    if (password == '' || password == undefined) {
      setPasswordCheck(true);
      setConfirmPasswordCheck(false);
      alert('Please enter password');
    } else if (!passwordRegex.test(password)) {
      setPasswordCheck(true);
      setConfirmPasswordCheck(false);
      alert(
        'Your password must include at least one symbol and be 6 or more characters long',
      );
    } else if (confirmPassword == '' || confirmPassword == undefined) {
      setConfirmPasswordCheck(true);
      setPasswordCheck(false);
      alert('Please enter confirm password');
    } else if (password !== confirmPassword) {
      setConfirmPasswordCheck(true);
      setPasswordCheck(true);
      alert('Password does not match');
    } else {
      setConfirmPasswordCheck(false);
      setPasswordCheck(false);
      setLoading(true);
      let data = new FormData();
      data.append('email', email);
      data.append('otp', otpCode);
      data.append('password', password);
      data.append('password_confirmation', confirmPassword);

      try {
        let res = await Api.post('/new_password', data);
        console.log('Password successfully updated api response', res);

        setLoading(false);
        Alert.alert('', 'You have successfully change your password.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } catch (error) {
        setLoading(false);
        setConfirmPasswordCheck(false);
        setPasswordCheck(false);
        alert(
          error?.response?.data?.errors?.email[0]
            ? error?.response?.data?.errors?.email[0]
            : 'Something went wrong please try again',
        );
        // navigation.navigate('Login')
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>Create a password</AuthHeader>
      <Formik
        onSubmit={(values) => forgetPasswordRequest(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              {/* <MyInput label="Password" name="password" type="password" />
              <MyInput
                label="Confirm password"
                name="conpassword"
                type="password"
              /> */}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Password"
                name="password"
                type="password"
                placeholder="Password"
                placeholderTextColor={colors.darkGrey}
                onChangeText={() => setPasswordCheck(false)}
                check={passwordCheck ? true : false}
              />
              {passwordCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter password
                </Text>
              ) : null}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Confirm password"
                name="conpassword"
                type="password"
                placeholder="Confirm password"
                placeholderTextColor={colors.darkGrey}
                onChangeText={() => {
                  setConfirmPasswordCheck(false), setPasswordCheck(false);
                }}
                check={confirmPasswordCheck ? true : false}
              />
              {confirmPasswordCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter confirm email
                </Text>
              ) : null}

              {/* <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              {loading == false ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : null} */}

              <View style={styles.row}>
                <Text style={styles.text}>
                  Your password must include at least one symbol and be 6 or
                  more characters long.
                </Text>
                <Button
                  disabled={loading ? true : false}
                  style={styles.button}
                  onPress={props.handleSubmit}
                  icon={
                    <>
                      {loading ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.darkBlueHigh}
                        />
                      ) : (
                        <>
                          <BackArrow
                            width={18.8}
                            height={18.8}
                            color={colors.pureWhite}
                            style={styles.icon}
                          />
                        </>
                      )}
                    </>
                  }
                />
              </View>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
