import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
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

const CELL_COUNT = 4;
export default function PhoneVerification({navigation, route}) {
  let data = route.params;
  console.log({data});

  let firstName = data.firstName;
  let lastName = data.lastName;
  let email = data.email;
  let phone = data.phone;
  let otp = data.optCode;
  console.log(otp);

  const [value, setValue] = useState(`${otp}`);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    sendData();
  }, []);

  const sendData = async () => {
    let data = new FormData();
    data.append('phone_number', phone);
    data.append('otp', otp);
    if (otp !== '') {
      try {
        let res = await Api.post('/verify_otp', data);
        console.log('Send OTP api response', res);
        let otp = res?.data?.message?.split(' ');
        let optCode = otp[1];
        console.log(optCode);
        navigation.navigate('SignUpPassword', {
          firstName,
          lastName,
          email,
          phone,
        });
      } catch (error) {
        alert(error?.response?.data?.errors?.email[0]);
        console.log({error});
      }
    } else {
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
        {`We have sent you a verification to ${phone}, please enter below`}
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
        defaultValue={otp}
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
          style={{
            height: heightPercentageToDP('6%'),
            width: widthPercentageToDP('70%'),
            alignItems: 'center',
            backgroundColor: colors.blue,
            padding: 10,
            borderRadius: 40,
            justifyContent: 'center',
          }}
          // onPress={() => buttonPress()}
        >
          <Text
            style={{
              color: colors.pureWhite,
              fontWeight: 'bold',
              alignContent: 'center',
            }}>
            Resend Verification
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
