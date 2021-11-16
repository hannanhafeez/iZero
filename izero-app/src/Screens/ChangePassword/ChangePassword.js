import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Alert,
  Text,
  View,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput,
  AuthInput3,
  Button,
  Header,
  ImagePicker,
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
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api';
import {passwordRegex} from '../../Constants/passwordRegex';

import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function ChangePassword({navigation}) {
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state?.auth?.accessToken);

  const [currentPasswordCheck, setCurrentPasswordCheck] = useState(false);
  
  const [newPasswordCheck, setNewPasswordCheck] = useState(false);

  const changePasswordSend = useCallback(async (values) => {
    Keyboard.dismiss();

    let currentPassword = values.currentpassword;
    let Password = values.password;

    let data = new FormData();
    data.append('current_password', currentPassword);
    data.append('password', Password);
    data.append('password_confirmation', Password);

    if (currentPassword == '' || currentPassword == undefined) {
      setCurrentPasswordCheck(true);
      setNewPasswordCheck(false);
      alert('Please enter current password');
    } else if (Password == '' || Password == undefined) {
      setNewPasswordCheck(true);
      setCurrentPasswordCheck(false);
      alert('Please enter New password');
    } else if (!passwordRegex.test(Password)) {
      setNewPasswordCheck(true);
      alert(
        'Your password must include at least one symbol and be 6 or more characters long',
      );
    } else {
      setLoading(false);
      setCurrentPasswordCheck(false);
      setNewPasswordCheck(false);
      try {
        let res = await Api.post('/change_password', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Change Password api response', res);
        setLoading(true);
        //navigation.navigate('ClientTab');
        Alert.alert(
          'Congratulations',
          'Your password is successfully updated.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ],
        );
      } catch (err) {
        setLoading(true);
        setCurrentPasswordCheck(false);
        setNewPasswordCheck(false);
        alert(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : 'Something went wrong please try again',
        );
        console.log({err});
      }
    }
  }, []);

  return (
    <Container safeArea>
      <Header backButton={() => navigation.goBack()}>Change Password</Header>
      <ImagePicker imageSize={widthPercentageToDP('28%')} />
      {/* <Formik
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        initialValues={{star: true}}> */}
      <Formik
        onSubmit={(values) => changePasswordSend(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              {/* <MyInput
                label="Current password"
                name="currentpassword"
                type="password"
              /> */}

              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Current password"
                name="currentpassword"
                type="password"
                placeholder="Current Password"
                placeholderTextColor="#5C6778"
                onChangeText={() => setCurrentPasswordCheck(false)}
                check={currentPasswordCheck ? true : false}
              />
              {currentPasswordCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter current password
                </Text>
              ) : null}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              <MyInput
                //label="New Password"
                name="password"
                type="password"
                placeholder="New Password"
                placeholderTextColor="#5C6778"
                onChangeText={() => setNewPasswordCheck(false)}
                check={newPasswordCheck ? true : false}
              />
              {newPasswordCheck ? (
                <Text style={{color: colors.red, marginTop: 2, fontSize: 10}}>
                  Enter new password
                </Text>
              ) : null}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              {/* 
              <Button
                textStyle={styles.forgotButtonText}
                style={styles.forgotButton}
                >
                Forgotten Password?
              </Button> */}
              <Button style={styles.button} onPress={props.handleSubmit}>
                {loading == false ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  'Change Password'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
