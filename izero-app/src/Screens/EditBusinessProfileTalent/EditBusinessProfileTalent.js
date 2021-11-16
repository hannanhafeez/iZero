import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput,
  AuthInput2,
  AuthInput3,
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
import {
  heightPercentageToDP,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import IconCross from 'react-native-vector-icons/Entypo';

import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import colors from '../../Constants/colors';

import EditIcon from 'react-native-vector-icons/AntDesign';
import {phoneNumberRegex} from '../../Constants/phoneNumberRegex';
import {emailRegex} from '../../Constants/regex';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IconQuestion from 'react-native-vector-icons/AntDesign';
import types from '../../Redux/types';

import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.setListMode('SCROLLVIEW');

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

let jobRoleData = [];

export default function EditBusinessProfileTalent({navigation}) {
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  console.log('user', user);

  const [loading, setLoading] = useState(false);

  const [loadingDropDown, setLoadingDropDown] = useState(false);

  const dispatch = useDispatch();

  const [businessName, setBusinessName] = useState(user?.meta?.company_name);
  const [businessEmail, setBusinessEmail] = useState(
    user?.meta?.business_email,
  );
  const [businessTel, setBusinessTel] = useState(user?.meta?.company_phone);
  const [businessCompanyNumber, setBusinessCompanyNumber] = useState(
    user?.meta?.company_number,
  );
  const [businessWebsite, setBusinessWebsite] = useState(
    user?.meta?.business_website,
  );
  const [businessAddress, setBusinessAddress] = useState(
    user?.meta?.company_address,
  );

  
  const [addDescription, setAddDescription] = useState('');

  const [addDescriptionArr, setAddDescriptionArr] = useState('');

  const [editableTextInput, setEditableTextInput] = useState(false);

  const [jobSectorArrShow, setJobSectorArrShow] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [loadingImage, setLoadingImage] = useState(true);

  const [loadingSector, setLoadingSector] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('EditBusinessProfileTalent');
    //getData();
    getJobSectorLocal();
    getJobSector();
  }, []);

  const getJobSectorLocal = async () => {
    let temp = [];

    for (var i = 0; i < user?.job_sectors.length; i++) {
      let obj = {
        label: user?.job_sectors[i]?.title,
        id: user?.job_sectors[i]?.job_sector_id,
        ID: user?.job_sectors[i]?.id,
      };
      temp.push(obj);
    }
    setJobSectorArrShow(temp);
  };

  const getJobSector = async () => {
    setLoading(true);
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

      setLoading(false);

      setItems(jobRoleData);
      console.log({jobRoleData});
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      let res = await Api.get('/user_detail', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get Edit Business Api Response', res);
      setLoading(false);

      setBusinessName(res?.data?.data?.meta?.business_name);
      setBusinessEmail(res?.data?.data?.meta?.business_email);
      setBusinessTel(res?.data?.data?.meta?.business_telephone);
      setBusinessCompanyNumber(res?.data?.data?.meta?.business_company_number);
      setBusinessWebsite(res?.data?.data?.meta?.business_website);
      setBusinessAddress(res?.data?.data?.meta?.business_address);

      let temp = [];

      for (var i = 0; i < res?.data?.data?.job_sectors.length - 1; i++) {
        let obj = {
          label: res?.data?.data?.job_sectors[i]?.title,
          id: res?.data?.data?.job_sectors[i]?.job_sector_id,
          description: '',
        };
        temp.push(obj);
      }

      setJobSectorArrShow(temp);

    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const onSubmitTextInput = (item, title) => {
    console.log(item, title);

    let temp = {label: title, item: item};

    const data = jobSectorArrShow;
    let filterArray = data.filter((val, i) => {
      if (val?.label == title) {
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
      if (val?.label !== item?.label) {
        return val;
      }
    });

    setJobSectorArrShow(filterArray);
  };

  const onSubmitText = (value) => {
    setAddDescription(value);
    setAddDescriptionArr([...addDescriptionArr, value]);
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
        setLoadingImage(true);
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
        let sourceSend = response.base64;
        console.log('respon send', sourceSend);
        let data = new FormData();
        data.append('image', sourceSend);
        setShowModal(false);
        setLoadingImage(true);
        //   axios({
        //     url: 'https://obstechnologia.com/izero/api/update_profile_pic',
        //     method: 'POST',
        //     data: data,
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       Accept: 'application/json',
        //       Authorization: `Bearer ${jwt}`,
        //     },
        //   })
        //     .then((response) => {
        //       setLoadingImage(true);
        //       console.log(`response`, response);
        //       return response;
        //     })
        //     .catch((error) => {
        //       setLoadingImage(true);
        //       console.log(`error`, error);
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

  const editBusinessProfile = useCallback(async (values) => {
    Keyboard.dismiss();

    let businessNameInput = values.businessname;
    let emailInput = values.email;
    let telInput = values.tel;
    let companyNumberInput = values.companynumber;
    let websiteInput = values.website;
    let businessAddressInput = values.businessaddress;

    let data = new FormData();

    data.append(
      'business_name',
      businessNameInput == '' || businessNameInput == undefined
        ? businessName
        : businessNameInput,
    );

    data.append(
      'business_email',
      emailInput == '' || emailInput == undefined ? businessEmail : emailInput,
    );

    data.append(
      'business_telephone',
      companyNumberInput == '' || companyNumberInput == undefined
        ? businessTel
        : companyNumberInput,
    );

    data.append(
      'company_number',
      telInput == '' || telInput == undefined
        ? businessCompanyNumber
        : telInput,
    );

    data.append(
      'business_website',
      websiteInput == '' || websiteInput == undefined
        ? businessWebsite
        : websiteInput,
    );

    data.append(
      'business_address',
      businessAddressInput == '' || businessAddressInput == undefined
        ? businessAddress
        : businessAddressInput,
    );

    console.log({data});

    if (businessNameInput === '' || businessNameInput === undefined) {
      alert('Please enter business name');
    } else if (emailInput === '' || emailInput === undefined) {
      alert('Please enter email name');
    } else if (!emailRegex.test(emailInput)) {
      alert('Please enter valid email');
    } else if (telInput === '' || telInput === undefined) {
      alert('Please enter tel name');
    } else if (!phoneNumberRegex.test(telInput)) {
      alert('Please enter valid number');
    } else if (companyNumberInput === '' || companyNumberInput === undefined) {
      alert('Please enter company number name');
    } else if (!phoneNumberRegex.test(companyNumberInput)) {
      alert('Please enter valid number');
    } else if (websiteInput === '' || websiteInput === undefined) {
      alert('Please enter website');
    } else if (
      businessAddressInput === '' ||
      businessAddressInput === undefined
    ) {
      alert('Please enter business address');
    } else {
      try {
        setLoading(true);
        let res = await Api.post('/edit_profile', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Edit Profile Api response', res);
        setLoading(false);
        Alert.alert('Congratulations', 'Your profile successfully updated.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => getDataUserDetails()},
        ]);
      } catch (err) {
        setLoading(false);
        alert('Something went wrong please try again later');
        getDataUserDetails();
        console.log({err});
      }
    }
  });

  const getDataUserDetails = async () => {
    setLoading(true);
    try {
      let res = await Api.get('/user_detail', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get User Details Api Response', res);

      dispatch({
        type: types.ADD_USER,
        accessToken: jwt,
        user: res.data.data,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const saveSector = useCallback(async (item, index) => {
    setLoadingSector(true);
    let data = new FormData();
    data.append('job_role_id', item?.item);
    data.append('description', addDescription);

    try {
      let res = await Api.post('/save_sector', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Job save sector Api response', res);
      setLoadingSector(false);
      Alert.alert('', 'You have successfully added job sector.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => getDataUserDetails()},
      ]);
    } catch (err) {
      setLoadingSector(false);
      getDataUserDetails();
      alert('Something went wrong please try again later');
      console.log({err});
    }
  });

  const deleteSector = useCallback(async (item, index) => {
    setLoadingSector(true);
    let data = new FormData();
    data.append('id', item?.ID);
    console.log({data});
    try {
      let res = await Api.post('/delete_sector', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Job sector delete Api response', res);
      setLoadingSector(false);
      Alert.alert('', 'You have successfully deleted job sector.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => getDataUserDetails()},
      ]);
    } catch (err) {
      setLoadingSector(false);
      getDataUserDetails();
      alert('Something went wrong please try again later');
      console.log({err});
    }
  });

  return (
    <Container safeArea>
      <Formik
        onSubmit={(values) => editBusinessProfile(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <>
              <Header
                backButton={() => navigation.goBack()}
                save={() => props.handleSubmit()}>
                Edit Profile
              </Header>

              <Form showsVerticalScrollIndicator={false} scrollEnabled={true}>
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
                        Business Details
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
                      label="Business Name"
                      name="businessname"
                      type="businessname"
                      value={businessName}
                      onChangeText={(val) => setBusinessName(val)}
                      placeholder="Business Name"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    <MyInput
                      label="Email"
                      name="email"
                      type="email"
                      value={businessEmail}
                      onChangeText={(val) => setBusinessEmail(val)}
                      placeholder="Email"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    <MyInput
                      label="Tel"
                      name="tel"
                      type="tel"
                      value={businessTel}
                      onChangeText={(val) => setBusinessTel(val)}
                      placeholder="Tel"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    <MyInput
                      label="Company Number"
                      name="companynumber"
                      type="companynumber"
                      value={businessCompanyNumber}
                      onChangeText={(val) => setBusinessCompanyNumber(val)}
                      placeholder="Company Number"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    <MyInput
                      label="Website"
                      name="website"
                      type="website"
                      value={businessWebsite}
                      onChangeText={(val) => setBusinessWebsite(val)}
                      placeholder="Website"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    <View>
                      <Heading>Business Details</Heading>
                    </View>

                    <MyInput
                      label="Business Address"
                      name="businessaddress"
                      type="businessaddress"
                      value={businessAddress}
                      onChangeText={(val) => setBusinessAddress(val)}
                      placeholder="Business Address"
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
                    />

                    {/* <Heading>Job Sectors</Heading> */}

                    <View
                      style={{
                        marginTop: 10,
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
                        Job Sectors
                      </Text>
                      <View
                        style={{
                          marginTop: 5,
                          borderWidth: 1,
                          height: 20,
                          width: 20,
                          borderRadius: 20,
                          borderColor: '#BCBCBC',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <IconQuestion
                          name="question"
                          size={15}
                          color={'#404040'}
                          style={{alignSelf: 'center'}}
                        />
                      </View>
                    </View>

                    <Text style={{color: '#5b6679', marginTop: 10}}>
                      Add the job sectors you are involved in
                    </Text>

                    {/* <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Dropdown
                        data={jobRoleData}
                        placeholder={'Select Job Sector'}
                        onChangeText={(item, value) => {
                          let title = jobRoleData[value].label;
                          onSubmitTextInput(item, title);
                        }}
                        style={{
                          height: 40,
                          flex: 1,
                          backgroundColor: colors.pureWhite,
                          width: widthPercentageToDP(79),
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
                      scrollViewProps={true}
                      containerStyle={{
                        height: 40,
                        width: widthPercentageToDP(80),
                      }}                
                    />

                    {loadingSector ? (
                      <View style={{marginTop: 20}}>
                        <ActivityIndicator
                          size="large"
                          color={colors.darkBlueHigh}
                        />
                      </View>
                    ) : (
                      <FlatList
                        data={jobSectorArrShow}
                        renderItem={({item, index}) => {
                          return (
                            <>
                              <View
                                style={{
                                  backgroundColor: '#3eb561',
                                  width: widthPercentageToDP(79),
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
                                    {item?.label}
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
                                      onPress={() =>
                                        //onRemove(item, index)
                                        deleteSector(item, index)
                                      }>
                                      <IconCross
                                        name="cross"
                                        size={15}
                                        color={colors.green}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: 20,
                                  flexDirection: 'row',
                                  width: widthPercentageToDP(79),
                                }}>
                                <TextInput
                                  underlineColorAndroid="#D0D2D0"
                                  placeholder="Add Description"
                                  onChangeText={(value) =>
                                    setAddDescription(value)
                                  }
                                  placeholderTextColor={colors.darkWhiteLow}
                                  style={{
                                    flex: 1,
                                    height: heightPercentageToDP('3%'),
                                    fontFamily: 'Europa',
                                    fontSize: Platform.OS === 'ios' ? 17 : 17,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    width: widthPercentageToDP(40),
                                    borderBottomWidth:
                                      Platform.OS === 'ios' ? 1 : 0,
                                    borderBottomColor:
                                      Platform.OS === 'ios' ? '#D0D2D0' : null,
                                    color: colors.darkBlue,
                                    marginTop: 20,
                                  }}
                                />
                                <TouchableHighlight
                                  underlayColor=""
                                  onPress={() => saveSector(item, index)}
                                  style={{
                                    flex: 1,
                                    marginTop: 10,
                                    marginLeft: 10,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      width: 60,
                                      height: 40,
                                      borderRadius: 10,
                                      backgroundColor: colors.green,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: colors.pureWhite,
                                      }}>
                                      SAVE
                                    </Text>
                                  </View>
                                </TouchableHighlight>
                              </View>
                            </>
                          );
                        }}
                        keyExtractor={(item) => item.id}
                      />
                    )}
                    <View
                      style={{
                        marginBottom: open
                          ? heightPercentageToDP(35)
                          : heightPercentageToDP(10),
                      }}
                    />
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
