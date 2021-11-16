import React, {useEffect, useCallback, useState} from 'react';
import {
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Text,
  View,
  Modal,
  FlatList,
  Image,
  Platform,
  TouchableHighlight,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput3,
  Button,
  Header,
  ProfileHeader,
  ImagePicker,
  CheckBox,
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

import Api from '../../api';
import types from '../../Redux/types';

import {useSelector, useDispatch} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import IconCross from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import colors from '../../Constants/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {EditIcon} from '../../Assets/Icons';
import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.setListMode('SCROLLVIEW');

import IconArrow from 'react-native-vector-icons/AntDesign';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

let jobRoleData = [];

export default function CompleteProfileClientSecond({navigation, route}) {
  const id = useSelector((state) => state.auth.user.id);
  const userType = useSelector((state) => state.auth.userType);
  const jwt = useSelector((state) => state.auth.accessToken);

  const [loading, setLoading] = useState(true);

  const [loadingDropDown, setLoadingDropDown] = useState(false);

  const [termCondition, setTermCondition] = useState(false);

  const [jobSectorArrShow, setJobSectorArrShow] = useState([]);

  const dispatch = useDispatch();

  // let address = route?.params?.address;
  // let number = route?.params?.number;
  // let scanPicture = route?.params?.scanPicture;

  const [val, setVal] = useState('');

  const [jobSector, setJobSector] = useState('');

  const [jobSectorArr, setJobSectorArr] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [loadingImage, setLoadingImage] = useState(true);

  const [userBusinessProfilePic, setUserBusinessProfilePic] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [showModalScan, setShowModalScan] = useState(false);

  const [scanImage, setScanImage] = useState('');

  const [image, setImage] = useState('');

  useEffect(() => {
    console.log('CompleteProfileClientSecond');
    getJobSector();
  }, []);

  const getJobSector = async () => {
    try {
      let res = await Api.get('/job_sectors', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Job Sector Api Response', res);
      for (var i = 0; i < res.data.data.length - 1; i++) {
        jobRoleData[i] = {
          label: res.data.data[i].title,
          value: {
            label: res.data.data[i].title,
            value: parseInt(res.data.data[i].id),
          },
        };
      }
      setItems(jobRoleData);
    } catch (error) {
      console.log({error});
    }
  };

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
        let data = new FormData();
        data.append('image', sourceSend);

        //   axios({
        //     url: 'https://obstechnologia.com/izero/api/business_profile_pic',
        //     method: 'POST',
        //     data: data,
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       Accept: 'application/json',
        //       Authorization: `Bearer ${jwt}`,
        //     },
        //   })
        //     .then((response) => {
        //       console.log('response', response);
        //       return response;
        //     })
        //     .catch((error) => {
        //       console.log('error', error);
        //     });
      }
    });
  };

  const _showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
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
        // let sourceSend = response.base64;
        // console.log('respon send', sourceSend);
        setUserBusinessProfilePic(response);
        //let data = new FormData();
        //data.append('image', sourceSend);
        setShowModal(false);
        // axios({
        //   url: 'https://obstechnologia.com/izero/api/update_profile_pic',
        //   method: 'POST',
        //   data: data,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Accept: 'application/json',
        //     Authorization: `Bearer ${jwt}`,
        //   },
        // })
        //   .then((response) => {
        //     setLoadingImage(true);
        //     console.log(`response`, response);
        //     return response;
        //   })
        //   .catch((error) => {
        //     setLoadingImage(true);
        //     console.log(`error`, error);
        //   });
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
        // let sourceSend = response.base64;
        // console.log('respon send', sourceSend);
        setUserBusinessProfilePic(response);
        //let data = new FormData();
        //data.append('image', sourceSend);
        setShowModal(false);
        // axios({
        //   url: 'https://obstechnologia.com/izero/api/update_profile_pic',
        //   method: 'POST',
        //   data: data,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Accept: 'application/json',
        //     Authorization: `Bearer ${jwt}`,
        //   },
        // })
        //   .then((response) => {
        //     setLoadingImage(true);
        //     console.log(`response`, response);
        //     return response;
        //   })
        //   .catch((error) => {
        //     setLoadingImage(true);
        //     console.log(`error`, error);
        //   });
      }
    });
  };

  const onSubmitTextInput = (item, title) => {
    let temp = {title: title, item: item};
    const data = jobSectorArrShow;
    let filterArray = data.filter((val, i) => {
      if (val?.title == title) {
        return val;
      }
    });
    if (filterArray == false) {
      setJobSectorArrShow([...jobSectorArrShow, temp]);
    }
  };

  const onRemove = (item, index) => {
    const data = jobSectorArrShow;
    let filterArray = data.filter((val, i) => {
      if (val?.title !== item?.title) {
        return val;
      }
    });

    setJobSectorArrShow(filterArray);
  };

  const _showModalScan = () => {
    setShowModalScan(true);
  };

  const _hideModalScan = () => {
    setShowModalScan(false);
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
        setShowModalScan(false);
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setScanImage(sourceSend);
        setImage(response);
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
        setShowModalScan(false);
        let sourceSend = response.base64;
        setScanImage(sourceSend);
        setImage(response);
      }
    });
  };

  const completeProfileRequest = async (values) => {
    let temp = [];

    for (var i = 0; i < jobSectorArrShow.length; i++) {
      temp.push(jobSectorArrShow[i].item);
    }

    console.log('temp', temp);

    Keyboard.dismiss();
    let addressHome = values.address;

    let businessEmail = values.email;
    let businessAddress = values.fulladress;
    let businessWebsite = values.website;
    let businessTelephone = values.telephone;
    let businessName = values.name;
    let businessCompanyNumber = values.companynumber;

    let data = new FormData();

    data.append('user_id', id);
    data.append('national_insurance_number', '');
    data.append('home_address', addressHome);
    for (var i = 0; i < temp?.length; i++) {
      data.append('job_sectors[' + i + ']', temp[i]);
    }
    data.append('type', userType);
    data.append('identification_card', scanImage);
    data.append('business_name', businessName);
    data.append('business_company_number', businessCompanyNumber);
    data.append('business_telephone', businessTelephone);
    data.append('business_email', businessEmail);
    data.append('business_website', businessWebsite);
    data.append('business_address', businessAddress);
    data.append('term_condition', termCondition);
    console.log({data});

    if (addressHome == '' || addressHome == undefined) {
      alert('Please enter home address');
    } else if (scanImage == '') {
      alert('Please scan identification');
    } else if (businessName == '' || businessName == undefined) {
      alert('Please enter business Name');
    } else if (
      businessCompanyNumber == '' ||
      businessCompanyNumber == undefined
    ) {
      alert('Please enter business company number');
    } else if (businessTelephone == '' || businessTelephone == undefined) {
      alert('Please enter telephone number');
    } else if (businessTelephone == '' || businessTelephone == undefined) {
      alert('Please enter business telephone');
    } else if (businessEmail == '' || businessEmail == undefined) {
      alert('Please enter email');
    } else if (businessWebsite == '' || businessWebsite == undefined) {
      alert('Please enter website');
    } else if (businessAddress == '' || businessAddress == undefined) {
      alert('Please enter business address');
    } else if (temp.length == 0) {
      alert('Please enter business jobSector');
    } else {
      setLoading(false);
      try {
        let res = await Api.post('/create_profile', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Complete Profile API response', res);
        Alert.alert('', 'You have successfully created business profile', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SelectSection'),
          },
        ]);
        setLoading(true);
      } catch (error) {
        setLoading(true);
        alert(error?.response?.data?.message);
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea>
      <ProfileHeader />
      <TouchableOpacity
        onPress={() => _showModal()}
        style={{
          backgroundColor: colors.pureWhite,
          marginTop: heightPercentageToDP('4.5%'),
          alignItems: 'center',
        }}>
        <View
          style={{
            width: widthPercentageToDP('30%'),
            alignSelf: 'center',
          }}>
          <Image
            style={{
              width: widthPercentageToDP('30%'),
              height: widthPercentageToDP('30%'),
              alignSelf: 'center',
              marginBottom: heightPercentageToDP('2%'),
              borderRadius: 100,
            }}
            source={
              userBusinessProfilePic
                ? {uri: userBusinessProfilePic?.uri}
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
              top: 5,
            }}
          />
        </View>
      </TouchableOpacity>

      <Formik
        onSubmit={(values) => completeProfileRequest(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form showsVerticalScrollIndicator={false}>
              <Heading>Your Home Address</Heading>
              <MyInput
                label="Full address "
                name="address"
                type="address"
                placeholder="Address"
                placeholderTextColor={'#DCDFE3'}
              />
              <Heading sub="This helps us update and secure your account info and verify your identity.">
                Your Idenfitication
              </Heading>

              <Button
                onPress={() => _showModalScan()}
                textStyle={{
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(20, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: colors.darkBlue,
                }}
                style={{
                  marginTop: heightPercentageToDP('5%'),
                  width: widthPercentageToDP('82%'),
                  borderColor: colors.darkBlue,
                  borderWidth: 2,
                  backgroundColor: colors.pureWhite,
                }}>
                Scan Identification
              </Button>

              {image ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {image?.uri ? (
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
                          source={{uri: image?.uri}}
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
                          <TouchableOpacity onPress={() => setImage('')}>
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

              <Heading>Business Profile</Heading>
              <MyInput
                label="Business name"
                name="name"
                type="name"
                placeholder="Enter business name"
                placeholderTextColor={colors.darkWhiteLow}
              />

              <MyInput
                label="Company number"
                name="companynumber"
                type="companynumber"
                placeholder="Enter company number"
                placeholderTextColor={colors.darkWhiteLow}
              />
              <MyInput
                label="Telephone number"
                name="telephone"
                type="telephone"
                placeholder="Enter telephone number"
                placeholderTextColor={colors.darkWhiteLow}
              />
              <MyInput
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter email address"
                placeholderTextColor={colors.darkWhiteLow}
              />
              <MyInput
                label="Website"
                name="website"
                type="website"
                placeholder="Enter Website"
                placeholderTextColor={colors.darkWhiteLow}
              />

              <Heading>Business Address</Heading>
              <MyInput
                label="Full Address"
                name="fulladress"
                type="fulladdress"
                placeholder="Enter business address"
                placeholderTextColor={colors.darkWhiteLow}
              />

              {/* <Heading>Job Sector</Heading>

              <View
                style={{
                  marginTop: Platform.OS === 'ios' ? 20 : 0,
                }}>
                <TextInput
                  placeholder="Add Job Sectors"
                  underlineColorAndroid="#D0D2D0"
                  onChangeText={(val) => setJobSector(val)}
                  onEndEditing={() => onSubmitTextInput()}
                  style={{
                    width: '100%',
                    fontSize: 18,
                    paddingBottom: 5,
                    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                    borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  }}
                />
              </View>

              <FlatList
                data={jobSectorArr}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#3eb561',
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 10,
                        marginRight: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}>
                        {item}
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.pureBlack,
                          borderRadius: 20,
                          width: 20,
                          height: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => removeData(item, index)}>
                          <IconCross name="cross" size={15} color="#3eb561" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              /> */}

              {/* <View
                style={{
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('82%'),
                  marginTop: heightPercentageToDP('2%'),
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
                  Job Sector
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <Dropdown
                  data={jobRoleData}
                  placeholder={'Select Job Sector'}
                  onChangeText={(item, value) => {
                    let title = jobRoleData[value].label;
                    onSubmitTextInput(item, title);
                    console.log('items', title+'  '+item)
                  }}
                  style={{
                    height: 40,
                    flex: 1,
                    backgroundColor: colors.pureWhite,
                    width: widthPercentageToDP(75),
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
                    size={20}
                    color={colors.darkBlue}
                  />
                </View>
              </View> */}

              <View
                style={{
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('82%'),
                  marginTop: heightPercentageToDP('2%'),
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
                  Job Sector
                </Text>
              </View>

              {/* <DropDownPicker
                searchable={true}
                loading={loading}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                showTickIcon={false}
                dropDownDirection="BOTTOM"
                onChangeValue={(item) => {
                  {
                    item?.value
                      ? onSubmitTextInput(item?.value, item?.label)
                      : null;
                  }
                  //console.log('items', title+'  '+item)
                  console.log('items', item);
                }}
                activityIndicatorColor={colors.green}
                searchPlaceholder="Search..."
                placeholder="Select Shift Role"
                placeholderStyle={{
                  color: colors.darkWhiteLow,
                }}
                containerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgb(193,193,193)',
                }}
                style={{
                  width: widthPercentageToDP(80),
                  borderWidth: 0,
                  borderColor: '#ABB1BB',
                  borderRadius: open ? 30 : 30,
                }}
                selectedItemLabelStyle={{
                  color: colors.green,
                }}
                dropDownContainerStyle={{
                  borderColor: '#ABB1BB',
                  borderRadius: 10,
                }}
                searchContainerStyle={{
                  borderWidth: 0,
                }}
                ArrowUpIconComponent={({style}) => (
                  <FontAwesome5
                    style={{
                      zIndex: 5,
                    }}
                    name="angle-up"
                    size={20}
                    color="#3EB561"
                  />
                )}
                ArrowDownIconComponent={({style}) => (
                  <FontAwesome5
                    style={{
                      zIndex: 5,
                    }}
                    name="angle-down"
                    size={20}
                    color="#3EB561"
                  />
                )}
              /> */}

              <DropDownPicker
                searchable={true}
                loading={loadingDropDown}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                showTickIcon={false}
                dropDownDirection={'BOTTOM'}
                zIndex={1000}
                zIndexInverse={1000}
                onChangeValue={(item) => {
                  {
                    item?.value
                      ? onSubmitTextInput(item?.value, item?.label)
                      : null;
                  }
                  //console.log('items', title+'  '+item)
                  console.log('items', item);
                }}
                activityIndicatorColor={colors.green}
                searchPlaceholder="Search..."
                placeholder="Select Shift Role"
                placeholderStyle={{
                  color: colors.darkWhiteLow,
                }}
                style={{
                  width: widthPercentageToDP(85),
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ABB1BB',
                  borderRadius: open ? 30 : 30,
                }}
                selectedItemLabelStyle={{
                  color: colors.green,
                }}
                searchTextInputProps={{
                  borderWidth: 0,
                  underlineColorAndroid: 'transparent',
                }}
                scrollViewProps={true}
                containerStyle={{
                  height: 40,
                  width: widthPercentageToDP(85),
                }}
                ArrowUpIconComponent={() => (
                  <IconArrow name="up" size={16} color={colors.green} />
                )}
                ArrowDownIconComponent={() => (
                  <IconArrow name="down" size={16} color={colors.green} />
                )}
              />

              <FlatList
                data={jobSectorArrShow}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#3eb561',
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 20,
                        marginRight: 10,
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <View style={{flex: 3}}>
                        <Text
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            color: colors.pureWhite,
                          }}>
                          {item?.title}
                        </Text>
                      </View>
                      <View style={{flex: 0.3, paddingRight: 5}}>
                        <View
                          style={{
                            backgroundColor: colors.pureWhite,
                            borderRadius: 20,
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => onRemove(item, index)}>
                            <IconCross
                              name="cross"
                              size={15}
                              color={colors.green}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />

              <TouchableOpacity
                onPress={() => setTermCondition(!termCondition)}>
                <CheckBox termCondition={termCondition} />
              </TouchableOpacity>

              <Button
                disabled={loading == false ? true : false}
                textStyle={styles.submitButtonText}
                style={[
                  styles.submitButton,
                  {marginBottom: 20, marginTop: open ? 60 : 0},
                ]}
                onPress={props.handleSubmit}>
                {loading == false ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  'Complete Registration'
                )}
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
            onPress={() => _hideModalScan()}
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
    </Container>
  );
}
