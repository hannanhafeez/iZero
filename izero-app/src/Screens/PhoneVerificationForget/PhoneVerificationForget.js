import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
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
  withPickerValues,
} from 'react-native-formik';
import styles from './Styles';
import {BackArrow} from '../../Assets/Icons';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';

import {RFValue} from 'react-native-responsive-fontsize';

import Api from '../../api/index';

import colors from '../../Constants/colors';

export default function PhoneVerificationForget({navigation, route}) {

  const CELL_COUNT = 4;
  const [loading, setLoading] = useState(false);
  let data = route?.params;

  let otpCode = data?.otpCode;
  let email = data?.email;

  const [value, setValue] = useState(`${otpCode}`);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submitVerificationCode = async () => {
    let data = new FormData();
    data.append('email_or_phone', email);
    data.append('otp', otpCode);

    if (otpCode !== '') {
      setLoading(true);

      try {
        let res = await Api.post('/verify_fogot_otp', data);
        console.log('Check OTP api response', res);
        setLoading(false);

        // let otp = res?.data?.message?.split(' ');

        // let optCode = otp[1];

        navigation.navigate('ForgotPasswordEnter', {
          otpCode: otpCode,
          email: email,
        });
      } catch (error) {
        setLoading(false);
        alert(
          error?.response?.data?.errors?.email[0]
            ? error?.response?.data?.errors?.email[0]
            : 'Something went wrong please try again',
        );
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea>
      <AuthHeader navigaton={navigation}>Add verifiction code</AuthHeader>
      <Text
        style={{
          fontFamily: 'Europa',
          fontSize: RFValue(16, 812),
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0,
          color: colors.darkGrey,
          width: widthPercentageToDP('82%'),
        }}>
        {`We have sent you a verification to ${email}, please enter below`}
      </Text>

      {/* <Formik
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form >
              
              <Button
                style={styles.button}
                onPress={() => navigation.navigate('SignUpPassword')}
                icon={
                  <BackArrow
                    width={18.8}
                    height={18.8}
                    color="white"
                    style={styles.icon}
                  />
                }
              />
            </Form>
          );
        }}
      </Formik> */}
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't  paste a text value, because context menu doesn't appear
        value={value}
        defaultValue={otpCode}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          disabled={loading ? true : false}
          style={{
            height: heightPercentageToDP('6%'),
            width: widthPercentageToDP('70%'),
            alignItems: 'center',
            backgroundColor: colors.blue,
            padding: 10,
            borderRadius: 40,
            justifyContent: 'center',
          }}
          onPress={() => submitVerificationCode()}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          ) : (
            <Text
              style={{
                color: colors.pureWhite,
                fontWeight: 'bold',
                alignContent: 'center',
              }}>
              SUBMIT CODE
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Container>
  );
}
