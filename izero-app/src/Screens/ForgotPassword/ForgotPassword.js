import React, {useState, useCallback, useEffect} from 'react';
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

import {emailRegex} from '../../Constants/regex';
import Api from '../../api/index';
import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function ForgotPassword({navigation}) {
  const [loading, setLoading] = useState(false);

  const [emailCheck, setEmailCheck] = useState(false);




  const forgotPasswordRequest = async (values) => {
    Keyboard.dismiss();

    let email = values?.email;

    if (email == ''||email == undefined) {
      alert('Please enter email');
      setEmailCheck(true);
    }  else if (!emailRegex?.test(email)) {
      setEmailCheck(true);
      alert('Please enter valid email');
    } else {
      setLoading(true);
      setEmailCheck(false);
      let data = new FormData();
      data.append('email_or_phone', email);
      try {
        let res = await Api.post('/send_forgot_otp', data);
        console.log('Email check and OTP send api response', res);

        let otpCode = res?.data?.otp;
        navigation.navigate('PhoneVerificationForget', {
          otpCode: otpCode,
          email: email,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setEmailCheck(true);
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea>
      <AuthHeader
        navigaton={navigation}
        //sub="Please enter your email or mobile number below"
        sub="Please enter your email below">
        forgotten your password?
      </AuthHeader>
      <Formik
        onSubmit={(values) => forgotPasswordRequest(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
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

              <Button
                disabled={loading ? true : false}
                style={styles.button}
                onPress={props.handleSubmit}>
                {loading ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  'Send Verification'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
