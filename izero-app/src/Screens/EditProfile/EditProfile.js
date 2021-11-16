import React, {useState, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput,
  Button,
  Header,
  ImagePicker,
  Heading,
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

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function EditProfile({navigation}) {
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.accessToken);

  const editProfile = useCallback(
    async (values) => {
      Keyboard.dismiss();
      setLoading(false);

      let currentPassword = values.currentpassword;
      let Password = values.password;

      let data = new FormData();
      // data.append('current_password', currentPassword);
      // data.append('password', Password);
      // data.append('password_confirmation', Password);

      try {
        // let res = await Api.post('/change_password', data, {
        //   headers: {
        //     Accept: 'application/json',
        //     Authorization: `Bearer ${jwt}`,
        //   },
        // });
        console.log('Edit Profile Api response', res);
        setLoading(true);
        //navigation.navigate('ClientTab');
      } catch (err) {
        setLoading(true);
        alert(err?.response?.data?.message);
        console.log({err});
      }
    },
    [Api, loading],
  );

  return (
    <Container safeArea>
      <Header backButton={() => navigation.goBack()}>Edit Profile</Header>

      {/* <Formik
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        initialValues={{star: true}}> */}
      <Formik
        onSubmit={(values) => editProfile(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form showsVerticalScrollIndicator={false}>
              <ImagePicker edit imageSize={widthPercentageToDP('28%')} />
              <Heading>Personal Details</Heading>
              <MyInput label="Name" name="name" type="name" />
              <MyInput label="Email" name="email" type="email" />
              <MyInput label="Tel" name="tel" type="tel" />
              <MyInput label="Gender" name="gender" type="Gender" />

              <Heading>Job Sector</Heading>
              <MyInput
                label=""
                name="Gender"
                placeholder="Add Bio"
                type="Gender"
              />
              <MyInput
                label=""
                name="Gender"
                placeholder="Add Bio"
                type="Gender"
              />
              <MyInput
                label=""
                name="Gender"
                placeholder="Add preferred rate"
                type="rate"
                inputType="rate"
              />

              <MyInput
                label="Add the job sectors you are involved in"
                name="Gender"
                placeholder="Add preferred rate"
                type="rate"
                // inputType="rate"
              />
              <MyInput
                label=""
                name="gender"
                placeholder="Add Bio"
                type="gender"
              />
              <MyInput
                label=""
                name="Gender"
                placeholder="Add preferred rate"
                type="rate"
                inputType="rate"
              />
              <Button
                style={styles.button}
                onPress={props.handleSubmit}
                //  onPress={() => navigation.navigate('SignUpDetails')}
              >
                {loading == false ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  'Edit Profile'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
