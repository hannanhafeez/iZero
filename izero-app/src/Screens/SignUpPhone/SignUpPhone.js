import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Keyboard,
  ActivityIndicator,
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

import colors from '../../Constants/colors';
import {phoneNumberRegex} from '../../Constants/phoneNumberRegex';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function SignUpPhone({navigation, route}) {
  let data = route.params;
  console.log({data});

  let firstName = data.firstName;
  let lastName = data.lastName;
  let email = data.email;

  const [loading, setLoading] = useState(true);

  const buttonPress = async (values) => {
    Keyboard.dismiss();
    let phone = values.phone;
    if (phone == '' || phone == undefined) {
      alert('Please enter phone number');
    } else if (!phoneNumberRegex.test(phone)) {
      alert('Please enter valid phone number');
    } else {
      setLoading(false);
      let data = new FormData();
      data.append('phone_number', phone);
      try {
        let res = await Api.post('/send_otp', data);
        console.log('Send OTP api response', res);
        let otp = res?.data?.message?.split(' ');
        let optCode = otp[1];
        console.log(otp[1]);
        setLoading(true);
        navigation.navigate('PhoneVerification', {
          firstName,
          lastName,
          email,
          phone,
          optCode,
        });
      } catch (error) {
        setLoading(true);
        alert(
          error?.response
            ? error?.response?.data?.errors?.email[0]
            : 'Something went wrong try again',
        );
        console.log({error});
      }
    }
  };
  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>and phone number?</AuthHeader>
      <Formik
        onSubmit={(values) => buttonPress(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              {/* <MyInput label="Phone Number" name="phone" type="phone" /> */}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Phone Number"
                name="phone"
                type="phone"
                placeholder="Phone Number"
                placeholderTextColor="#5C6778"
                keyboardType="phone-pad"
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <TextSwitch />
              {loading == false ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : null}
              <Button
                disabled={loading ? false : true}
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
