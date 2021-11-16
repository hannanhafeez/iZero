import React, {useState, useCallback} from 'react';
import {ScrollView, View, Text, TextInput} from 'react-native';
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
import color from '../../Constants/colors';
import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function SignUpDetails({navigation}) {
  
  const buttonPress = (values) => {
    let firstName = values.first_name;
    let lastName = values.last_name;

    if (firstName == '' || firstName == undefined) {
      alert('Please Enter First Name');
    } else if (lastName == '' || lastName == undefined) {
      alert('Please Enter Last Name');
    } else {
      navigation.navigate('SignUpEmail', {firstName, lastName});
    }
  };

  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>What’s your name?</AuthHeader>
      <Formik
        onSubmit={(values) => buttonPress(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form>
              {/* <MyInput label="First Name" name="firstname" type="name" />
              <MyInput label="Last Name" name="lastname" type="name" /> */}

              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
              <MyInput
                //label="First Name"
                name="first_name"
                type="name"
                placeholder="First Name"
                placeholderTextColor="#5C6778"
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />

              <MyInput
                //label="Last Name"
                name="last_name"
                type="name"
                placeholder="Last Name"
                placeholderTextColor="#5C6778"
              />
              <View style={{marginTop: Platform.OS === 'ios' ? 30 : 25}} />
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
