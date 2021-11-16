import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput2,
  AuthInput3,
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

import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import types from '../../Redux/types';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';
import IconCross from 'react-native-vector-icons/Entypo';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../Constants/colors';

import EditIcon from 'react-native-vector-icons/AntDesign';
import {emailRegex} from '../../Constants/regex';
import {phoneNumberRegex} from '../../Constants/phoneNumberRegex';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function EditProfileClient({navigation}) {
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [tel, setTel] = useState(user?.phone);
  const [gender, setGender] = useState(user?.gender);
  const [genderInput, setGenderInput] = useState('');

  const [vissible, setVissible] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const [editableTextInput, setEditableTextInput] = useState(false);

  let data = [
    {
      label: 'Male',
      value: 'Male',
    },
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  useEffect(() => {
    console.log('EditProfileClient');
    //getData();
    //getDataUserDetails();

    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, []);

  const selectPhotoFromLibaray = () => {
    let source;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      var responseImage = {};
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('respon', response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);

        axios({
          url: 'https://obstechnologia.com/izero/api/update_profile_pic',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => {
            console.log(`response`, response);
            return response;
          })
          .catch((error) => {
            console.log(`error`, error);
          });
      }
    });
  };

  const getData = async () => {
    setLoading(true);
    try {
      let res = await Api.get('/user_detail', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get Edit Profile Api Response', res);
      setLoading(false);
      setFirstName(res?.data?.data?.first_name);
      setLastName(res?.data?.data?.last_name);
      setEmail(res?.data?.data?.email);
      setTel(res?.data?.data?.phone);
      setGender(res?.data?.data?.gender);
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const getDataUserDetails = async () => {
    try {
      let res = await Api.get('/user_detail', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get User Details Api Response', res);

      dispatch({
        type: types.ADD_USER,
        accessToken: jwt,
        user: res?.data?.data,
      });
    } catch (error) {
      console.log({error});
    }
  };

  const allowPermissionsCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'iZero App Camera Permission',
          message:
            'iZero App needs access to your camera ' +
            'so you can uploads your pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    allowPermissionsCamera();
    setLoadingImage(false);
    let source;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchCamera(options, (response) => {
      var responseImage = {};
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('respon', response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);
        setShowModal(false);
        axios({
          url: 'https://obstechnologia.com/izero/api/update_profile_pic',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => {
            setLoadingImage(true);
            console.log(`response`, response);
            return response;
          })
          .catch((error) => {
            setLoadingImage(true);
            console.log(`error`, error);
          });
      }
    });
  };

  const openGallery = () => {
    setLoadingImage(false);
    let source;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      var responseImage = {};
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('respon', response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);
        setShowModal(false);
        axios({
          url: 'https://obstechnologia.com/izero/api/update_profile_pic',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => {
            setLoadingImage(true);
            console.log(`response`, response);
            return response;
          })
          .catch((error) => {
            setLoadingImage(true);
            console.log(`error`, error);
          });
      }
    });
  };

  const _showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const editProfile = useCallback(async (values) => {
    Keyboard.dismiss();

    let firstNameInput = values.firstname;
    let lastNameInput = values.lastname;
    let emailInput = values.email;
    let telInput = values.tel;

    let data = new FormData();
    data.append(
      'first_name',
      firstNameInput == '' || firstNameInput == undefined
        ? firstName
        : firstNameInput,
    );

    data.append(
      'last_name',
      lastNameInput == '' || lastNameInput == undefined
        ? lastName
        : lastNameInput,
    );
    data.append(
      'email',
      emailInput == '' || emailInput == undefined ? email : emailInput,
    );
    data.append(
      'phone',
      telInput == '' || telInput == undefined ? tel : telInput,
    );
    data.append(
      'gender',
      genderInput == '' || genderInput == undefined ? gender : genderInput,
    );
    console.log({data});

    if (firstName === '') {
      alert('Please enter first name');
    } else if (lastName === '') {
      alert('Please enter last name');
    } else if (email === '') {
      alert('Please enter email');
    } else if (!emailRegex.test(email)) {
      alert('Please enter valid email');
    } else if (tel === '') {
      alert('Please enter tel name');
    } else if (!phoneNumberRegex.test(tel)) {
      alert('Please enter valid number');
    } else if (gender === '') {
      alert('Please select gender');
    } else {
      setLoading(true);
      try {
        let res = await Api.post('/edit_user', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Edit Profile Api response', res);
        console.log('res?.data?.data',res?.data?.user)
        dispatch({
          type: types.ADD_USER,
          accessToken: jwt,
          user: res?.data?.user,
        });
        setLoading(false);
        Alert.alert('Congratulations', 'Your profile successfully updated.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              getDataUserDetails();
            },
          },
        ]);
      } catch (err) {
        setLoading(false);
        alert('Something went wrong please try again later');
        console.log({err});
      }
    }
  });

  return (
    <Container safeArea>
      <Formik
        onSubmit={(values) => editProfile(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <>
              <Header
                backButton={() => navigation.goBack()}
                save={() => props.handleSubmit()}>
                Edit Profile
              </Header>

              <Form showsVerticalScrollIndicator={false}>
                {loadingImage == false ? (
                  <View style={{marginTop: 40}}>
                    <ActivityIndicator
                      size="large"
                      color={colors.darkBlueHigh}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => _showModal()}>
                    <ImagePicker
                      edit
                      imageSize={widthPercentageToDP('28%')}
                      check={true}
                    />
                  </TouchableOpacity>
                )}

                <Modal transparent animationType="fade" visible={showModal}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableHighlight
                      onPress={() => hideModal()}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        backgroundColor: colors.green,
                        alignSelf: 'flex-end',
                        marginRight: 10,
                        marginBottom: -20,
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconCross
                        name="cross"
                        size={25}
                        color={colors.pureWhite}
                      />
                    </TouchableHighlight>

                    <View
                      style={{
                        backgroundColor: colors.pureWhite,
                        paddingBottom: 25,
                        paddingTop: 25,
                      }}>
                      <TouchableOpacity onPress={() => openCamera()}>
                        <Text
                          style={{
                            fontFamily: 'Europa-Bold',
                            color: colors.darkBlue,
                            marginLeft: 30,
                            fontSize: RFValue(16, 812),
                            fontWeight: 'bold',
                          }}>
                          Open Camera
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: colors.darkGreyLow,
                          paddingTop: 10,
                          marginBottom: 10,
                        }}
                      />
                      <TouchableOpacity onPress={() => openGallery()}>
                        <Text
                          style={{
                            fontFamily: 'Europa-Bold',
                            color: colors.darkBlue,
                            marginLeft: 30,
                            fontSize: RFValue(16, 812),
                            fontWeight: 'bold',
                          }}>
                          Open Gallery
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {loading ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  <>
                    <View
                      style={{
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(22, 812),
                          fontWeight: 'bold',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: colors.darkBlue,
                        }}>
                        Personal Details
                      </Text>
                      <TouchableHighlight
                        underlayColor=""
                        onPress={() =>
                          setEditableTextInput(!editableTextInput)
                        }>
                        <EditIcon name="edit" size={30} color={colors.green} />
                      </TouchableHighlight>
                    </View>

                    <MyInput
                      label="First Name"
                      name="firstname"
                      type="firstname"
                      value={firstName}
                      onChangeText={(val) => setFirstName(val)}
                      placeholder="First Name"
                      // placeholder={editableTextInput ? 'First Name' : firstName}
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                      style={{
                        borderBottomColor: colors.green,
                      }}
                    />
                    <MyInput
                      label="Last Name"
                      name="lastname"
                      type="lastname"
                      value={lastName}
                      onChangeText={(val) => setLastName(val)}
                      placeholder="Last Name"
                      // placeholder={editableTextInput ? 'Last Name' : lastName}
                      editable={editableTextInput}
                      placeholderTextColor={colors.darkBlue}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />
                    <MyInput
                      label="Email"
                      name="email"
                      type="email"
                      value={email}
                      onChangeText={(val) => setEmail(val)}
                      placeholder="Email"
                      // placeholder={editableTextInput ? 'Email' : email}
                      editable={editableTextInput}
                      placeholderTextColor={colors.darkBlue}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />
                    <MyInput
                      label="Tel"
                      name="tel"
                      type="tel"
                      value={tel}
                      onChangeText={(val) => setTel(val)}
                      placeholder="Tel"
                      // placeholder={editableTextInput ? 'Tel' : tel}
                      editable={editableTextInput}
                      placeholderTextColor={colors.darkBlue}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />
                    <Text
                      style={{
                        marginTop: 20,
                        fontFamily: 'Europa',
                        fontSize: RFValue(18, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0,
                        color: colors.darkGrey,
                      }}>
                      Gender
                    </Text>

                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'row',
                        marginBottom: 20,
                      }}>
                      <Dropdown
                        data={data}
                        placeholder="gender"
                        placeholderTextColor={
                          gender == null || gender == ''
                            ? colors.darkWhiteLow
                            : colors.darkBlue
                        }
                        onChangeText={(item) => {
                          setGenderInput(item);
                        }}
                        style={{
                          height: 35,
                          flex: 1,
                          backgroundColor: colors.pureWhite,
                          width: widthPercentageToDP(79),
                          fontSize: 13.5,
                        }}
                        pickerStyle={{marginTop: 10, marginLeft: 15}}
                      />
                      <View
                        style={{
                          paddingTop: 5,
                          borderBottomWidth: 0.7,
                          borderBottomColor: colors.darkGreyLow,
                          marginBottom: 0.5,
                        }}>
                        <FontAwesome5
                          name="angle-down"
                          size={18}
                          color={colors.green}
                        />
                      </View>
                    </View>

                    <Button
                      style={[
                        styles.button,
                        {
                          marginTop: heightPercentageToDP('3%'),
                          marginBottom: heightPercentageToDP('3.5%'),
                        },
                      ]}
                      onPress={() =>
                        navigation.navigate('EditBusinessProfileClient')
                      }>
                      Edit Business Profile
                    </Button>
                  </>
                )}
              </Form>
            </>
          );
        }}
      </Formik>
    </Container>
  );
}
