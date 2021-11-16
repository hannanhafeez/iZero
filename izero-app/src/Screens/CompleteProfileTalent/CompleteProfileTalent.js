import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Text,
  View,
  FlatList,
  Image,
  Platform,
  Modal,
  TouchableHighlight,
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
  CheckBox,
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

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useSelector, useDispatch} from 'react-redux';
import Api from '../../api';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import IconCross from 'react-native-vector-icons/Entypo';
import axios from 'axios';

import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Constants/colors';
import types from '../../Redux/types';
import {RFValue} from 'react-native-responsive-fontsize';
import {EditIcon} from '../../Assets/Icons';
import {ninRegex} from '../../Constants/ninRegex';

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

export default function CompleteProfileTalent({navigation}) {
  const [image, setImage] = useState('');
  const [loadingDropDown, setLoadingDropDown] = useState(false);
  const [userImage, setUserImage] = useState('');
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const userType = useSelector((state) => state?.auth?.userType);
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const id = useSelector((state) => state?.auth?.user?.id);

  const talentSkills = useSelector((state) => state?.app?.talentSkills);

  const firstName = useSelector((state) => state?.auth?.user?.first_name);
  const lastName = useSelector((state) => state?.auth?.user?.last_name);
  const email = useSelector((state) => state?.auth?.user?.email);
  const phone = useSelector((state) => state?.auth?.user?.phone);

  const user = useSelector((state) => state?.auth?.user);

  const [termCondition, setTermCondition] = useState(false);

  const [val, setVal] = useState('');

  const [jobSector, setJobSector] = useState('');

  const [jobSectorArr, setJobSectorArr] = useState([]);

  const [jobSectorArrShow, setJobSectorArrShow] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showModalScan, setShowModalScan] = useState(false);

  const [userProfilePic, setUserProfilePic] = useState('');

  const [scanImage, setScanImage] = useState('');

  const [loadingSector, setLoadingSector] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('CompleteProfileTalent');
    getJobSector();
  }, []);

  const getJobSector = async () => {
    setLoading(false);
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
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
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

  const _showModalScan = () => {
    setShowModalScan(true);
  };

  const _hideModalScan = () => {
    setShowModalScan(false);
  };

  const completeProfileRequest = async (values) => {
    Keyboard.dismiss();
    let temp = [];
    for (var i = 0; i < jobSectorArrShow.length; i++) {
      temp.push(jobSectorArrShow[i].item);
    }

    let number = values.number;
    let address = values.address;

    let data = new FormData();
    data.append('user_id', id);
    data.append('national_insurance_number', number);
    data.append('home_address', address);

    for (var i = 0; i < temp?.length; i++) {
      data.append('job_sectors[' + i + ']', temp[i]);
    }

    data.append('identification_card', scanImage);
    data.append('type', userType);
    console.log({data});

    if (number == '' || number == undefined) {
      alert('Please Enter Number');
    } else if (!ninRegex.test(number)) {
      alert('Please Enter Valid Number');
    } else if (address == '' || address == undefined) {
      alert('Please Enter Address');
    } else if (image == '') {
      alert('Please Scan Identification');
    } else if (temp.length == 0) {
      alert('Please Enter Business JobSector');
    } else {
      setLoading(false);
      try {
        let res = await Api.post('/create_profile', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Complete Profile api response', res);
        Alert.alert('', 'You have successfully created profile', [
          {
            text: 'OK',
            onPress: () => 
            navigation.navigate('SelectSection'),
          },
        ]);
        setLoading(true);
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
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
          <Text
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(20, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              lineHeight: 44,
              letterSpacing: 0,
              textAlign: 'center',
              color: '#24334c',
            }}>
            {email}
          </Text>
          <Text
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(20, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: '#24334c',
            }}>
            {phone}
          </Text>
        </TouchableOpacity>
        <Formik
          onSubmit={(values) => completeProfileRequest(values)}
          initialValues={{star: true}}>
          {(props) => {
            return (
              <Form showsVerticalScrollIndicator={false}>
                {/* <TouchableOpacity
                onPress={() =>
                  //selectPhotoFromLibaray()
                  _showModal()
                }>
                <ImagePicker
                  edit={false}
                  imageSize={widthPercentageToDP('28%')}
                  check={true}
                />
              </TouchableOpacity> */}
                <Heading>National Insurance Number</Heading>
                <MyInput
                  label="Enter number "
                  name="number"
                  type="number"
                  placeholder="National Insurance Number"
                  placeholderTextColor={'#DCDFE3'}
                />

                <Heading>Your home address</Heading>
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

                {/* <Heading>Job Sector</Heading> */}

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

                {/* <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <Dropdown
                    data={jobRoleData}
                    placeholder={'Select Job Sector'}
                    placeholderTextColor={colors.darkWhiteLow}
                    onChangeText={(item, value) => {
                      let title = jobRoleData[value].label;
                      onSubmitTextInput(item, title);
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
                      color={colors.green}
                    />
                  </View>
                </View> */}

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
                    width: widthPercentageToDP(80),
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
                  // searchContainerStyle={{
                  //   borderBottomColor: "#dfdfdf"
                  // }}
                  // dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
                  scrollViewProps={true}
                  containerStyle={{
                    height: 40,
                    width: widthPercentageToDP(80),
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
                          marginTop: 10,
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
                  style={[styles.submitButton, {marginBottom: 20}]}
                  onPress={props.handleSubmit}>
                   {loading == false ? (
                    <ActivityIndicator
                      size="large"
                      color={colors.darkBlueHigh}
                    />
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
      </ScrollView>
    </Container>
  );
}
