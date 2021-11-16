import React, {useState, useEffect, Component, version} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles from './Styles';
import {
  Container,
  ExpenseHeader,
  Button,
  AuthInput2,
  AuthInput3,
  Heading,
} from '../../Components';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {Formik} from 'formik';
import {compose} from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ArrowIcon, TextLogo} from '../../Assets/Icons';
import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import IconCross from 'react-native-vector-icons/Entypo';
import types from '../../Redux/types';
import {useDispatch} from 'react-redux';
import {useSelector, dispatch} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import Api from '../../api';
import {Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {NotificationsCardClientIboard} from '../../Components/NotificationsCardClientIboard/NotificationsCardClientIboard';
import colors from '../../Constants/colors';

let jobRoleData = [];

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function UploadExpensesTalent({navigation, route}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const jwt = useSelector((state) => state?.auth?.accessToken);

  let data = route?.params;
  let shiftID = data?.shiftID,
    userID = data?.userID,
    shiftName = data?.shiftName;

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expensePrice, setExpensePrice] = useState('');

  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseReasonForPurchase, setExpenseReasonForPurchase] = useState('');
  const [expensePurchaseFrom, setExpensePurchaseFrom] = useState('');
  const [expenseUploadPrrof, setExpenseUploadPrrof] = useState('');
  const [expenseJob, setExpenseJob] = useState('');

  const [image, setImage] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState(jobRoleData);

  const [showModal, setShowModal] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const [vissibleNotes, setVissibleNotes] = useState(false);

  const [vissibleShift, setVissibleShift] = useState(false);

  const [vissibleJobs, setVissibleJobs] = useState(false);

  const [shiftList, setShiftList] = useState(false);

  const [selectedShiftRole, setSelectedShiftRole] = useState('');

  const [selectedShiftRoleid, setSelectedShiftRoleId] = useState('');

  const [userId, setUserId] = useState('');

  useEffect(() => {
    console.log('UploadExpensesTalent');
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await Api.get('/applied_job_list', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Job Api Response', res);
      setShiftList(res.data.data);
    } catch (error) {
      console.log({error});
    }
  };

  const UploadExpenses = async (values) => {
    setLoading(true);
    let title = expenseTitle;
    let price = expensePrice;

    //let Description = values.description;
    let ReasonForPurchase = values.reasonforpurchase
      ? values.reasonforpurchase
      : '';
    let PurchasedFrom = values.purchasedfrom ? values.purchasedfrom : '';

    let data = new FormData();

    data.append('title', title);
    data.append('cost', price);
    data.append('description', '');
    data.append('reason', ReasonForPurchase);
    data.append('purchase_from', PurchasedFrom);
    data.append('proof', image?.base64);
    // data.append('job_shift_id', selectedShiftRoleid);
    // data.append('user_id', userId);
    data.append('job_shift_id', shiftID ? shiftID : selectedShiftRoleid);
    data.append('user_id', userID ? userID : userId);
    console.log({data});

    if (
      title == undefined ||
      title == '' ||
      price == undefined ||
      price == '' ||
      // Description == undefined ||
      // Description == '' ||
      (shiftName == true) & (selectedShiftRoleid == '') ||
      // ReasonForPurchase == undefined ||
      // ReasonForPurchase == '' ||
      // PurchasedFrom == undefined ||
      // PurchasedFrom == '' ||

      image == '' ||
      image == undefined
    ) {
      setLoading(true);
      alert('Kindly fill all the information');
    } else {
      try {
        let res = await Api.post('/add_expense', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Upload Expenses API response', res);
        setLoading(false);
        Alert.alert('', 'You have successfully added the expense', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch (error) {
        alert('Something went wrong please try again later');
        setLoading(false);
        console.log({error});
      }
    }
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
      setLoadingImage(false);
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
        setImage(response);
        setShowModal(false);
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
      setShowModal(false);
      var responseImage = {};
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        setImage(response);
      }
    });
  };

  const selectShiftRole = (item) => {
    setSelectedShiftRoleId(item?.id);
    setSelectedShiftRole(item?.job_role?.title);
    setUserId(item?.job?.user?.id);
    setVissibleShift(false);
  };

  return (
    <Container>
      <View
        style={{
          width: widthConverter(375),
          height: heightConverter(248),
          backgroundColor: '#24334c',
          alignItems: 'center',
          marginBottom: Platform.OS === 'ios' ? 0 : 30,
          zIndex: 1,
          paddingTop: Platform.OS === 'ios' ? 30 : 10,
        }}>
        <View
          style={{
            width: widthConverter(331),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: heightConverter(10),
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconCon}>
            <ArrowIcon
              style={{
                transform: [{rotate: '180deg'}],
              }}
            />
          </TouchableOpacity>
          <TextLogo width={widthConverter(155)} height={heightConverter(22)} />
        </View>

        <View
          style={{
            width: widthConverter(325),
            paddingTop: heightConverter(16),
            paddingBottom: heightConverter(16),
          }}>
          <Text
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(14, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: colors.pureWhite,
              marginBottom: Platform.OS === 'ios' ? 10 : 0,
            }}>
            Expenses
          </Text>

          <TextInput
            onChangeText={(value) => setExpenseTitle(value)}
            placeholder={'Title'}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            underlineColorAndroid="transparent"
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(24, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              borderBottomWidth: 1,
              borderColor: colors.darkGrey,
              color: colors.pureWhite,
            }}
          />
        </View>

        <View
          style={{
            width: widthConverter(325),
            height: heightConverter(94),
            borderRadius: 5,
            backgroundColor: '#3eb561',
            shadowColor: 'rgba(91, 102, 121, 0.15)',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowRadius: 18,
            shadowOpacity: 1,
            justifyContent: 'center',
            paddingHorizontal: widthConverter(23),
          }}>
          <Text
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(14, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: colors.pureWhite,
              marginBottom: Platform.OS === 'ios' ? 10 : 0,
            }}>
            NET PAY
          </Text>
          <TextInput
            onChangeText={(value) => setExpensePrice(value)}
            placeholder={'£ 0.00'}
            placeholderTextColor="#6FC588"
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            style={{
              fontFamily: 'Europa',
              fontSize: RFValue(24, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              borderBottomWidth: 1,
              borderColor: '#68DD8A',
              color: colors.pureWhite,
            }}
          />
        </View>
      </View>

      {/* <View style={{marginTop: heightPercentageToDP('5')}}> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 10}}>
        <Formik
          onSubmit={(values) => UploadExpenses(values)}
          initialValues={{star: true}}>
          {(props) => {
            return (
              <>
                <Form showsVerticalScrollIndicator={false}>
                  {/* <MyInput
                    label="Description"
                    name="description"
                    type="description"
                    placeholder="Add Description"
                    placeholderTextColor={colors.darkWhiteLow}
                  /> */}
                  <View style={{marginTop: heightPercentageToDP('5')}} />

                  {/* <MyInput
                  label="Reason for purchase"
                  name="reasonforpurchase"
                  type="reasonforpurchase"
                  placeholder="Add Reason"
                />
                <MyInput
                  label="Purchased From"
                  name="purchasedfrom"
                  type="purchasedfrom"
                  placeholder="Add location of purchase"
                /> */}

                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Europa',
                      fontSize: RFValue(18, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      lineHeight: 24,
                      letterSpacing: 0,
                      color: colors.darkGrey,
                    }}>
                    Please upload proof of purchase
                  </Text>

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

                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    <Button
                      onPress={() => _showModal()}
                      style={{
                        width: widthConverter(261),
                        height: heightConverter(50),
                        backgroundColor: colors.pureWhite,
                        borderColor: colors.darkBlue,
                        borderWidth: 1,
                        marginLeft: 10,
                      }}
                      textStyle={{color: colors.darkBlue}}>
                      SELECT IMAGE
                    </Button>
                  </View>

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

                  <View style={{marginTop: heightPercentageToDP('4')}} />

                  {shiftID ? (
                    // <View style={{flexDirection: 'row'}}>
                    //   <Text
                    //     style={{
                    //       fontFamily: 'Europa',
                    //       fontSize: 17,
                    //       fontWeight: 'normal',
                    //       fontStyle: 'normal',
                    //       letterSpacing: 0,
                    //       color: colors.darkGrey,
                    //       marginTop: Platform.OS === 'ios' ? 10 : 10,
                    //       marginLeft: '5%',
                    //     }}>
                    //     Selected Shift
                    //   </Text>
                    //   <Text
                    //     style={{
                    //       fontFamily: 'Europa',
                    //       fontSize: 17,
                    //       fontWeight: 'normal',
                    //       fontStyle: 'normal',
                    //       letterSpacing: 0,
                    //       color: colors.darkGrey,
                    //       marginTop: Platform.OS === 'ios' ? 10 : 10,
                    //       marginLeft: '5%',
                    //     }}>
                    //     {shiftName}
                    //   </Text>
                    // </View>
                    <MyInput
                      label="Selected Shift"
                      name="selectedshift"
                      type="selectedshift"
                      placeholder={shiftName}
                      placeholderTextColor={colors.darkBlue}
                      editable={false}
                    />
                  ) : (
                    <TouchableHighlight
                      underlayColor=""
                      style={{paddingVertical: 20}}
                      onPress={() => setVissibleShift(true)}>
                      <>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkGrey,
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Select Shift
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            alignSelf: 'center',
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios'
                                ? colors.darkGreyLow
                                : colors.darkGreyLow,
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                          }}
                          multiline={true}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholderTextColor={
                            selectedShiftRole
                              ? colors.darkBlue
                              : colors.darkWhiteLow
                          }
                          placeholder={
                            selectedShiftRole
                              ? selectedShiftRole
                              : 'Select Shift'
                          }
                        />
                      </>
                    </TouchableHighlight>
                  )}
                  <View>
                    {/* 
                  
                     <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Europa',
                      fontSize: RFValue(18, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      lineHeight: 24,
                      letterSpacing: 0,
                      color: '#5C6778',
                    }}>
                    Job
                  </Text>
                  <Dropdown
                    placeholder="Select job"
                    data={jobRoleData}
                    onChangeText={(item) => {
                      setExpenseJob(item);
                    }}
                    pickerStyle={{marginTop: 10, marginLeft: 15}}
                  />
                  <FontAwesome5
                    style={styles.downIcon}
                    name="angle-down"
                    size={20}
                    color="#3EB561"
                  /> */}
                  </View>

                  <Button
                    //onPress={() => navigation.navigate('Tab')}
                   disabled={loading ? true : false}
                    onPress={props.handleSubmit}
                    style={{
                      width: widthConverter(261),
                      height: heightConverter(50),
                      backgroundColor: colors.darkBlue,
                      alignSelf: 'center',
                      marginBottom: 20,
                      marginTop: 30,
                    }}
                    textStyle={{color: colors.pureWhite}}>
                    {loading ? (
                      <ActivityIndicator
                        size="large"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      'UPLOAD EXPENSE'
                    )}
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik>
      </ScrollView>
      {/* </View> */}
      <>
        <Modal transparent animationType="fade" visible={vissibleJobs}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.pureWhite,
                height: '80%',
                width: '90%',
                borderRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => setVissibleShift(false)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: colors.green,
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconCross name="cross" size={20} color={colors.pureWhite} />
              </TouchableOpacity>

              <View
                style={{
                  width: '80%',
                  borderRadius: 80,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#24334c',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: colors.pureWhite,
                    marginTop: 10,
                  }}>
                  Select Shift
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                }}>
                <FlatList
                  data={shiftList}
                  style={{
                    backgroundColor: colors.width,
                    height: '85%',
                    //flex:1,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableHighlight onPress={() => selectShiftRole(item)}>
                        <View
                          style={{
                            flex: 1,
                            borderTopWidth: 1,
                            borderTopColor: colors.darkGreyHigh,
                            borderWidth: 1,
                            borderColor: colors.darkGreyHigh,
                            borderRadius: 10,
                            width: '95%',
                            paddingHorizontal: widthPercentageToDP('5.8%'),
                            paddingVertical: widthPercentageToDP('1%'),
                            justifyContent: 'space-between',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGrey,
                              }}>
                              Job Role:
                            </Text>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                                marginLeft: 35,
                              }}>
                              {item?.job?.title}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGrey,
                              }}>
                              Shift Title:
                            </Text>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGreyHigh,
                                marginLeft: 28,
                              }}>
                              {item?.job_role?.title}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: '#24334c',
                              }}>
                              Description:
                            </Text>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGreyHigh,
                                marginLeft: 15,
                              }}>
                              {item?.title?.charAt(0).toUpperCase() +
                                item?.title?.slice(1)}
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent animationType="fade" visible={vissibleShift}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.pureWhite,
                height: '80%',
                width: '90%',
                borderRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => setVissibleShift(false)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: '#3EB561',
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconCross name="cross" size={20} color={colors.pureWhite} />
              </TouchableOpacity>

              <View
                style={{
                  width: '80%',
                  borderRadius: 80,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#24334c',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: colors.pureWhite,
                    marginTop: 10,
                  }}>
                  Select Shift
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                }}>
                <FlatList
                  data={shiftList}
                  style={{
                    backgroundColor: colors.width,
                    height: '85%',
                    //flex:1,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      // <TouchableHighlight onPress={() => selectShiftRole(item)}>
                      <View
                        style={{
                          flex: 1,
                          borderTopWidth: 1,
                          borderTopColor: colors.darkWhiteLow,
                          borderWidth: 1,
                          borderColor: colors.darkWhiteLow,
                          borderRadius: 10,
                          width: '90%',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          justifyContent: 'space-between',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginTop: 10,
                        }}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                          <View style={{flex: 0.3}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Job Role:
                            </Text>
                          </View>

                          <View style={{flex: 0.8}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGreyHigh,
                              }}>
                              {item?.job?.title}
                            </Text>
                          </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1}}>
                          <View style={{flex: 0.3}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Shift Title:
                            </Text>
                          </View>

                          <View style={{flex: 0.8}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGreyHigh,
                              }}>
                              {item?.job_role?.title}
                            </Text>
                          </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1}}>
                          <View style={{flex: 0.3}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Description:
                            </Text>
                          </View>

                          <View style={{flex: 0.8}}>
                            <Text
                              style={{
                                marginBottom: heightPercentageToDP('0.3%'),
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(14, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkGreyHigh,
                              }}>
                              {item?.title?.charAt(0).toUpperCase() +
                                item?.title?.slice(1)}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginBottom: 5,
                            marginTop: 5,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Button
                            onPress={() => selectShiftRole(item)}
                            style={{
                              width: 100,
                              height: 30,
                              backgroundColor: '#3EB561',
                              borderWidth: 2,
                              borderWidth: 0,
                            }}
                            textStyle={{
                              color: colors.pureWhite,
                              fontSize: 14,
                            }}>
                            Select Shift
                          </Button>
                        </View>
                      </View>
                      // </TouchableHighlight>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    </Container>
  );
}
