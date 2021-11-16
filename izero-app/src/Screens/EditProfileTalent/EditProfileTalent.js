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
  TouchableHighlight,
  PermissionsAndroid,
  FlatList,
  TextInput,
} from 'react-native';
import {
  Container,
  AuthHeader,
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
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import types from '../../Redux/types';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';
//import { TouchableOpacity } from 'react-native-gesture-handler';

import axios from 'axios';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import IconCross from 'react-native-vector-icons/Entypo';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import colors from '../../Constants/colors';

import EditIcon from 'react-native-vector-icons/AntDesign';
import {emailRegex} from '../../Constants/regex';
import {phoneNumberRegex} from '../../Constants/phoneNumberRegex';

import {useIsFocused} from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.setListMode('SCROLLVIEW');

import IconArrow from 'react-native-vector-icons/Entypo';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

let jobRoleData = [];

export default function EditProfileTalent({navigation}) {
  const isFocused = useIsFocused();
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const jobSectors = useSelector((state) => state?.app?.jobSectors);

  console.log('user', user);

  const [loading, setLoading] = useState(true);
  const [loadingDropDown, setLoadingDropDown] = useState(false);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [tel, setTel] = useState(user?.phone);
  const [gender, setGender] = useState(user?.gender);
  const [genderInput, setGenderInput] = useState('');

  const [profileImage, setProfileImage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const [addDescription, setAddDescription] = useState('');

  const [addDescriptionArr, setAddDescriptionArr] = useState('');

  const [editableTextInput, setEditableTextInput] = useState(false);

  const [jobSectorArrShow, setJobSectorArrShow] = useState([]);

  const [loadingSector, setLoadingSector] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(jobSectors);

  let data = [
    {
      label: 'Male',
      value: 'Male',
    },
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  useEffect(() => {
    console.log('EditProfileTalent');
    
    getJobSectorLocal();
    getJobSectors();

    setTimeout(function () {
      setLoading(false);
    }, 500);

  }, [isFocused]);


  const getJobSectorLocal = async () => {
    let temp = [];

    for (var i = 0; i < user?.job_sectors?.length; i++) {
      let obj = {
        label: user?.job_sectors[i]?.title,
        id: user?.job_sectors[i]?.job_sector_id,
        ID: user?.job_sectors[i]?.id,
      };
      temp.push(obj);
    }
    setJobSectorArrShow(temp);
  };

  // const getJobSector = async () => {
  //   setLoading(true);
  //   try {
  //     let res = await Api.get('/job_sectors', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });

  //     console.log('Get All Job Sector Api Response', res);

  //     for (var i = 0; i < res.data.data.length - 1; i++) {
  //       jobRoleData[i] = {
  //         label: res.data.data[i].title,
  //         value: {
  //           label: res.data.data[i].title,
  //           value: parseInt(res.data.data[i].id),
  //         },
  //       };
  //     }

  //     setLoading(false);

  //     setItems(jobRoleData);
  //     console.log({jobRoleData});
  //   } catch (error) {
  //     setLoading(false);
  //     console.log({error});
  //   }
  // };

  const getJobSectors = async () => {
    try {
      let res = await Api.get('/job_sectors', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Job Sector Api Response', res);
      let jobRoleData = [];
      for (var i = 0; i < res?.data?.data?.length - 1; i++) {
        jobRoleData[i] = {
          label: res?.data?.data[i]?.title,
          value: {
            label: res?.data?.data[i]?.title,
            value: parseInt(res?.data?.data[i]?.id),
          },
        };
      }
      dispatch({
        type: types.JOB_SECTORS,
        jobSectors: jobRoleData,
      });
    } catch (error) {
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
        user: res?.data?.data,
      });
      setLoading(false);
      //RootNavigation.navigate('ProfileTalent');
    } catch (error) {
      setLoading(false);
      console.log({error});
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

  const saveSector = async (item, index) => {
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
  };

  const deleteSector = async (item, index) => {
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
        alert('Something went wrong please try again later');
        setLoading(false);
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

              {/* <ScrollView
                contentContainerStyle={{alignItems: 'center'}}
                showsVerticalScrollIndicator={false}> */}
              <Form showsVerticalScrollIndicator={false}>
                {/* <TouchableOpacity onPress={() => selectPhotoFromLibaray()}>
                    <ImagePicker
                      edit
                      imageSize={widthPercentageToDP('28%')}
                      check={true}
                    />
                  </TouchableOpacity> */}
                {loadingImage == false ? (
                  <View style={{marginTop: 40}}>
                    <ActivityIndicator
                      size="large"
                      color={colors.darkBlueHigh}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    //onPress={() => selectPhotoFromLibaray()}
                    onPress={() => _showModal()}>
                    <ImagePicker
                      edit
                      imageSize={widthPercentageToDP('28%')}
                      check={true}
                    />
                  </TouchableOpacity>
                )}
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
                      // placeholder={
                      //   editableTextInput ? 'First Name' : firstName
                      // }
                      editable={editableTextInput}
                      placeholderTextColor={
                        editableTextInput ? colors.darkGrey : colors.darkBlue
                      }
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
                        flexDirection: 'row',
                        width: widthPercentageToDP(80),
                        marginLeft: 5,
                      }}>
                      <Dropdown
                        data={data}
                        placeholder={gender == null ? 'Select gender' : gender}
                        placeholderTextColor={
                          gender == null || gender == ''
                            ? colors.darkWhiteLow
                            : colors.darkBlue
                        }
                        onChangeText={(item) => {
                          setGenderInput(item);
                        }}
                        style={{
                          flex: 1,
                          height: 40,
                          backgroundColor: colors.pureWhite,
                          width: widthPercentageToDP(80),
                        }}
                        pickerStyle={{
                          marginTop: 10,
                          marginLeft: 15,
                          color: colors.darkBlue,
                        }}
                      />
                      <FontAwesome5
                        style={{
                          zIndex: 5,
                          position: 'absolute',
                          right: widthConverter(2),
                          top: heightConverter(10),
                        }}
                        name="angle-down"
                        size={20}
                        color="#3EB561"
                      />
                    </View>

                    <Heading>Job Sector</Heading>

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
                      }}
                      // listItemContainerStyle={{
                      //   borderWidth: 0.3,
                      //   borderColor: 'rgb(193,193,193)',
                      // }}
                      selectedItemLabelStyle={{
                        color: colors.green,
                      }}
                      searchTextInputProps={{
                        borderWidth: 0.5,
                        borderColor: 'rgb(193,193,193)',
                        underlineColorAndroid: 'transparent',
                        height: Platform.OS === 'ios' ? 30 : 30,
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
                        <IconArrow
                          name="chevron-up"
                          size={24}
                          color={colors.green}
                        />
                      )}
                      ArrowDownIconComponent={() => (
                        <IconArrow
                          name="chevron-down"
                          size={24}
                          color={colors.green}
                        />
                      )}
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
                                  backgroundColor: colors.green,
                                  width: widthPercentageToDP(85),
                                  flexDirection: 'row',
                                  marginTop: 20,
                                  marginRight: 10,
                                  alignItems: 'center',
                                  borderRadius: 20,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
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
                                      onPress={() => deleteSector(item, index)}>
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
                                  width: widthPercentageToDP(80),
                                  alignSelf: 'center',
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
                                    width: widthPercentageToDP(75),
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

                    {/* <Button
                      style={[styles.button,{ marginTop: heightPercentageToDP('3%'), marginBottom: heightPercentageToDP('3.5%')}]}
                      //onPress={props.handleSubmit}
                      onPress={() =>
                        navigation.navigate('EditBusinessProfileTalent')
                      }>
                      Edit Business Profile
                    </Button> */}
                  </>
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
              </Form>
              {/* </ScrollView> */}
            </>
          );
        }}
      </Formik>
    </Container>
  );
}
