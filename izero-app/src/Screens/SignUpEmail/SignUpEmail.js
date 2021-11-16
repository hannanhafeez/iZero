import React, {useState, useCallback} from 'react';
import {ScrollView, TextInput, View, Text, Keyboard} from 'react-native';
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
import  colors  from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function SignUpEmail({navigation, route}) {
  let data = route.params;
  let firstName = data.firstName;
  let lastName = data.lastName;

  const buttonPress = (values) => {
    Keyboard.dismiss();
    let valid = true;
    let email = values.email;
    if (!emailRegex.test(email)) {
      valid = false;
      if (email == '') {
        alert('Please Enter Email');
      } else {
        alert('Please Enter Valid Email');
      }
    }
    if (valid) {
      navigation.navigate('SignUpPhone', {firstName, lastName, email});
    }
  };
  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>and your email address?</AuthHeader>
      <Formik
        onSubmit={(values) => buttonPress(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              {/* <MyInput label="Email Address" name="email" type="email" /> */}
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="Email Address"
                name="email"
                type="email"
                placeholder="Email Address"
                placeholderTextColor={colors.darkGrey}
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <TextSwitch />
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
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
