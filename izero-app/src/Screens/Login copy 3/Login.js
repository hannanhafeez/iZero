import React from 'react';
import {ScrollView} from 'react-native';
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
import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function Login() {
  return (
    <Container safeArea>
      <AuthHeader />
      <Formik
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form >
              <MyInput label="Email Address" name="email" type="email" />
              <MyInput label="Last Name" name="password" type="password" />
              <Button
                style={styles.button}
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
