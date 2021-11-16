import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Keyboard,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput3,
  Button,
  ProfileHeader,
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
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from '../../Helpers/Responsive';

import {heightPercentageToDP} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IconCross from 'react-native-vector-icons/Entypo';
import {useSelector, dispatch} from 'react-redux';
import Api from '../../api';
import colors from '../../Constants/colors';
import {EditIcon} from '../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import {ninRegex} from '../../Constants/ninRegex';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function CompleteProfileClient({navigation}) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const userType = useSelector((state) => state.auth.userType);
  const jwt = useSelector((state) => state.auth.accessToken);
  const id = useSelector((state) => state.auth.user.id);

  const firstName = useSelector((state) => state?.auth?.user?.first_name);
  const lastName = useSelector((state) => state?.auth?.user?.last_name);

  const [showModal, setShowModal] = useState(false);

  const [userImage, setUserImage] = useState('');

  const [userProfilePic, setUserProfilePic] = useState('');

  const [showModalScan, setShowModalScan] = useState(false);

  const [scanPicture, setScanPicture] = useState('');

  const [scanPictureShow, setScanPictureShow] = useState('');

  useEffect(() => {
    console.log('CompleteProfileClient'), [];
  });

  const selectPhotoFromCamera = () => {
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
        setImage(response);
      }
    });
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
        setUserImage(response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setUserProfilePic(sourceSend);
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
            console.log(`response`, response);
            return response;
          })
          .catch((error) => {
            console.log(`error`, error);
          });
      }
    });
  };

  const openGallery = () => {
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
        setUserImage(response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setUserProfilePic(sourceSend);
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
            console.log(`response`, response);
            return response;
          })
          .catch((error) => {
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

  const openCameraScan = () => {
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
        setScanPictureShow(response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setScanPicture(sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);
        setShowModalScan(false);
      }
    });
  };

  const openGalleryScan = () => {
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
        setScanPictureShow(response);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setScanPicture(sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);
        setShowModalScan(false);
      }
    });
  };

  const _showModalScan = () => {
    setShowModalScan(true);
  };

  const hideModalScan = () => {
    setShowModalScan(false);
  };

  const completeProfileRequest = (values) => {
    Keyboard.dismiss();
    let number = values.number;
    let address = values.address;

    if (number == '' || number == undefined) {
      alert('Please Enter Number');
    } else if (!ninRegex.test(number)) {
      alert('Please Enter Valid Number');
    } else if (address == '' || address == undefined) {
      alert('Please Enter Address');
    } else if (scanPicture == '') {
      alert('Please Scan Identification');
    } else {
      navigation.navigate('CompleteProfileClientSecond', {
        id,
        number,
        address,
        scanPicture,
        userType,
      });
    }
  };

  return (
    <Container safeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <TouchableOpacity
          onPress={() => _showModal()}
          style={{
            backgroundColor: colors.pureWhite,
            marginTop: heightPercentageToDP('4.5%'),
            marginBottom: heightPercentageToDP('2%'),
            alignItems: 'center',
          }}>
          <View
            style={{
              width: widthPercentageToDP('40%'),
              alignSelf: 'center',
            }}>
            <Image
              style={{
                width: widthPercentageToDP('40%'),
                height: widthPercentageToDP('40%'),
                alignSelf: 'center',
                marginBottom: heightPercentageToDP('2%'),
                borderRadius: 100,
              }}
              source={
                userImage
                  ? {uri: userImage?.uri}
                  : require('../../Assets/Images/avatar.png')
              }
            />

            <EditIcon
              width={35}
              height={35}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                right: 5,
                top: 10,
              }}
            />
          </View>

          {userImage ? (
            <Text
              style={{
                fontFamily: 'Europa-Bold',
                fontSize: RFValue(24, 812),
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                color: '#3eb561',
              }}>
              {firstName + '  ' + lastName}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'Europa-Bold',
                fontSize: RFValue(24, 812),
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                color: '#3eb561',
              }}>
              Edit Profile Picture
            </Text>
          )}
        </TouchableOpacity>
        <Formik
          onSubmit={(values) => completeProfileRequest(values)}
          initialValues={{star: true}}>
          {(props) => {
            return (
              <Form
                stickyHeaderIndices={[0]}
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                {/* <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
                style={{height: 10, width: widthPercentageToDP('88%')}}
              /> */}
                {/* <ImagePicker
                imageSize={widthPercentageToDP('28%')}
                check={true}
                edit={true}
              /> */}
                <Heading>National Insurance Number</Heading>
                <MyInput label="Enter number " name="number" type="number" />
                <Heading>Your home address</Heading>
                <MyInput label="Full address " name="address" type="address" />
                <Heading sub="This helps us update and secure your account info and verify your identity.">
                  Your Idenfitication
                </Heading>

                <Button
                  onPress={
                    () => _showModalScan() //</Form>selectPhotoFromCamera()
                  }
                  textStyle={styles.btnText}
                  style={[styles.button, {marginBottom: 20}]}>
                  Scan Identification
                </Button>

                {scanPictureShow ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {scanPictureShow?.uri ? (
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 10,
                              marginBottom: heightPercentageToDP('2%'),
                              marginTop: 10,
                              marginRight: -10,
                            }}
                            source={{uri: scanPictureShow?.uri}}
                          />
                          <View
                            style={{
                              backgroundColor: colors.darkBlue,
                              borderRadius: 20,
                              width: 20,
                              height: 20,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 3,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setScanPicture(''), setScanPictureShow('');
                              }}>
                              <IconCross
                                name="cross"
                                size={15}
                                color={colors.pureWhite}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </>
                ) : null}

                <Button
                  textStyle={styles.submitButtonText}
                  style={[styles.submitButton, {marginBottom: 20}]}
                  onPress={props.handleSubmit}>
                  {/* onPress={() => navigation.navigate('Tab')}> */}
                  Complete Step 1 of 2
                </Button>
              </Form>
            );
          }}
        </Formik>

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
              <IconCross name="cross" size={25} color={colors.pureWhite} />
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

        <Modal transparent animationType="fade" visible={showModalScan}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'flex-end',
            }}>
            <TouchableHighlight
              onPress={() => hideModalScan()}
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
              <IconCross name="cross" size={25} color={colors.pureWhite} />
            </TouchableHighlight>

            <View
              style={{
                backgroundColor: colors.pureWhite,
                paddingBottom: 25,
                paddingTop: 25,
              }}>
              <TouchableOpacity onPress={() => openCameraScan()}>
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
              <TouchableOpacity onPress={() => openGalleryScan()}>
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
      </ScrollView>
    </Container>
  );
}
