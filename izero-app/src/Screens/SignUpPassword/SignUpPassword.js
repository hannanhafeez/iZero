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

export default function SignUpPassword({navigation, route}) {
  let getData = route?.params;
  let firstName = getData?.firstName;
  let lastName = getData?.lastName;
  let email = getData?.email;
  let phone = getData?.phone;

  const [loading, setLoading] = useState(true);
  const userType = useSelector((state) => state.auth.userType);

  const signUpRequest = async (values) => {
    Keyboard.dismiss();
    let password = values.password;
    let confirmPassword = values.conpassword;

    if (password == '' || password == undefined) {
      alert('Please enter password');
    } else if (!passwordRegex.test(password)) {
      alert(
        'Your password must include at least one symbol and be 6 or more characters long',
      );
    } else if (confirmPassword == '' || confirmPassword == undefined) {
      alert('Please enter confirm password');
    } else if (password !== confirmPassword) {
      alert('Password does not match');
    } else {
      setLoading(false);
      let data = new FormData();
      data.append('user_title', 'Mr');
      data.append('first_name', firstName);
      data.append('last_name', lastName);
      data.append('email', email);
      data.append('password', password);
      data.append('password_confirmation', confirmPassword);
      data.append('phone', phone);
      data.append('type', userType);
      console.log({data});
      try {
        let res = await Api.post('/signup', data);
        console.log('User Sign up api response', res);
        setLoading(true);
        Alert.alert('', 'You have successfully Signup.', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('SignUpSuccess', {
                email,
                password,
                id: res?.data?.data?.id,
              }),
          },
        ]);
      } catch (error) {
        setLoading(true);
        alert(
          error?.response
            ? error?.response?.data?.errors?.email
              ? error?.response?.data?.errors?.email[0]
              : error?.response?.data?.errors?.first_name +
                ' ' +
                error?.response?.data?.errors?.first_name
            : 'Something went wrong try again',
        );
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>Create a password</AuthHeader>
      <Formik
        onSubmit={(values) => signUpRequest(values)}
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
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Confirm password"
                name="conpassword"
                type="password"
                placeholder="Confirm password"
                placeholderTextColor={colors.darkGrey}
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              {loading == false ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : null}
              <View style={styles.row}>
                <Text style={styles.text}>
                  Your password must include at least one symbol and be 6 or
                  more characters long.
                </Text>
                <Button
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
              </View>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
