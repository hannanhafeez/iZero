import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Container, Button, JobCardClientSecondTab} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';

import {TouchableHighlight} from 'react-native-gesture-handler';
import IconCross from 'react-native-vector-icons/Entypo';
import IconCheck from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';

import Api from '../../../api/index';

import types from '../../../Redux/types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import * as firebase from 'firebase';
import Fire from '../../../Components/Fire/Fire';

import DropDownPicker from 'react-native-dropdown-picker';

import {firebaseConfig} from '../../../Components/Config/config';

import firestore from '@react-native-firebase/firestore';

import IconStar from 'react-native-vector-icons/Entypo';
import {Rating} from 'react-native-ratings';
import colors from '../../../Constants/colors';
import {useIsFocused} from '@react-navigation/native';

export default function Staff(props) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const jobDetails = useSelector((state) => state?.app?.jobDetails);

  const [loading, setLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);

  let JobID = props?.route?.params?.jobID;

  let shiftID = props?.route?.params?.shiftID;

  let status = props?.route?.params?.status;

  const [vissibleRating, setVissibleRating] = useState(false);

  const [review, setReview] = useState('');

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [checkGroupChat, setCheckGroupChat] = useState(false);

  const [jobUsers, setJobUsers] = useState('');

  const [jobUsersFindTalent, setJobUsersFindTalent] = useState('');

  const jwt = useSelector((state) => state?.auth?.accessToken);

  const [rateAvatar, setRateAvatar] = useState('');

  const [rateName, setRateName] = useState('');

  const [rateID, setRateID] = useState('');
  const [rateUserID, setRateUserID] = useState('');

  const [checkTalents, setCheckTalents] = useState(false);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);

  const [vissibleAccept, setVissibleAccept] = useState(false);

  const [groupChatID, setGroupChatID] = useState([]);

  const [statusUsers, setStatusUsers] = useState([]);

  let check = false;

  useEffect(() => {
    console.log('JobStaff');
    getJobDetails();
  }, [isFocused]);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });

      console.log('Job Details Staff API res', res);

      let temp = [];
      let temp2 = [];
      let groupChatIDs = [];
      let checkTalent = false;
      let counter = 0;
      let tempStatus = [];

      for (var v = 0; v < res?.data?.data?.job_users.length; v++) {
        if (res?.data?.data?.job_users[v]?.status === 'confirmed') {
          setCheckGroupChat(true);
          counter++;
        } else {
          setCheckGroupChat(false);
        }
      }

      for (var v = 0; v < res?.data?.data?.job_users.length; v++) {
        if (
          (res?.data?.data?.job_users[v]?.application_status === 'confirmed' &&
            res?.data?.data?.job_users[v]?.invitation_type == 'talent') ||
          (res?.data?.data?.job_users[v]?.application_status === 'confirmed' &&
            res?.data?.data?.job_users[v]?.invitation_type == 'client') ||
          (res?.data?.data?.job_users[v]?.application_status === 'waiting' &&
            res?.data?.data?.job_users[v]?.invitation_type == 'client') ||
          (res?.data?.data?.job_users[v]?.application_status === 'declined' &&
            res?.data?.data?.job_users[v]?.invitation_type == 'client')
        ) {
          if (
            res?.data?.data?.job_users[v]?.application_status === 'confirmed' &&
            res?.data?.data?.job_users[v]?.clocked_in !== null &&
            res?.data?.data?.job_users[v]?.application_status === 'confirmed' &&
            res?.data?.data?.job_users[v]?.clocked_out !== null
          ) {
            tempStatus.push(res?.data?.data?.job_users[v]?.status);
          } else if (
            res?.data?.data?.job_users[v]?.application_status === 'confirmed' &&
            res?.data?.data?.job_users[v]?.clocked_in !== null &&
            res?.data?.data?.job_users[v]?.clocked_out === null
          ) {
            tempStatus.push(res?.data?.data?.job_users[v]?.status);
          }

          counter++;
          checkTalent = true;
          setCheckTalents(false);
          //setCheckGroupChat(true);
          temp.push(res?.data?.data?.job_users[v]);
          if (groupChatIDs.includes(res?.data?.data?.job_users[v]?.user_id)) {
          } else {
            groupChatIDs.push(res?.data?.data?.job_users[v]?.user_id);
          }
        } else {
          if (
            res?.data?.data?.job_users[v]?.invitation_type !== 'confirmed' &&
            counter < 1
          ) {
            setCheckTalents(true);
            //setCheckGroupChat(false);
            temp2.push(res?.data?.data?.job_users[v]);
          }
        }
      }
      setGroupChatID(groupChatIDs);
      setJobUsers(temp);
      setJobUsersFindTalent(temp2);
      setStatusUsers(tempStatus);

      for (var v1 = 0; v1 < temp.length; v1++) {
        if (temp[v1].application_status === 'confirmed') {
          setCheckGroupChat(true);
        } else {
          setCheckGroupChat(false);
        }
      }
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  // const getJobDetails = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Job Details Header Employer side API res', res);
  //     setLoading(true);

  //     dispatch({
  //       type: types?.JOB_DETAILS,
  //       jobDetails: res?.data?.data,
  //     });
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const rateFunc = (item) => {
    setRateName(item?.first_name + ' ' + item?.last_name);
    setRateAvatar(item?.avatar);
    setRateID(item?.id);
    setRateUserID(item?.user_id);
    setVissibleRating(true);
  };

  const submitReview = async () => {
    setLoadingReview(false);
    let data = new FormData();
    data.append('title', review);
    data.append('description', review);
    data.append('rating', defaultRating);
    data.append('rating_detail', review);
    data.append('type', 'User');
    data.append('ratable_id', rateID);
    console.log({data});

    try {
      let res = await Api.post('/add_review', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Rate Staff API response', res);
    } catch (error) {
      alert('Something went wrong please try again later');
      console.log({error});
    }

    let data2 = new FormData();
    data2.append('title', review);
    data2.append('description', review);
    data2.append('rating', defaultRating);
    data2.append('rating_detail', review);
    data2.append('type', 'Job');
    data2.append('ratable_id', rateUserID);
    console.log({data2});

    try {
      let res = await Api.post('/add_review', data2, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Rate Staff API response', res);
      setLoadingReview(true);
      Alert.alert('', 'You have successfully Rate staff', [
        {
          text: 'OK',
          onPress: () => setVissibleRating(false),
        },
      ]);
    } catch (error) {
      alert('Something went wrong please try again later');
      setLoadingReview(true);
      setVissibleRating(false);
      console.log({error});
    }
  };

  const acceptFunc = async (item) => {
    setVissibleAccept(true);
    let id = item?.ID;
    try {
      let data = new FormData();
      data.append('ID', id);
      data.append('status', 1);
      let res = await Api.post('/accept_reject_application', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Accept Shift api response', res);
      setVissibleAccept(false);
      Alert.alert('', 'You have accepted shift successfully.', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setVissibleAccept(false);
      alert('Something went wrong please try again latter');
      getJobDetails();
    }
  };

  const declinedFunc = async (item) => {
    setVissibleDeclined(true);
    let id = item?.ID;
    try {
      let data = new FormData();
      data.append('ID', id);
      data.append('status', 0);
      let res = await Api.post('/accept_reject_application', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Declined Shift api response', res);
      setVissibleDeclined(false);
      Alert.alert('', 'You have declined shift successfully.', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setVissibleDeclined(false);
      alert('Something went wrong please try again latter');
      getJobDetails();
    }
  };

  const talentInformationBook2 = (shiftID, check) => {
    let id = jobDetails?.id;

    dispatch({
      type: types.LIVE_BOOK,
      liveBook: true,
    });

    dispatch({
      type: types.SHIFT_ID,
      shiftId: id,
    });

    navigation.navigate('FindStaff');

    // navigation.navigate('JobsClient', {open: 4, check: check});
  };

  const sendMessageAPI = async (item, index) => {
    let conversation_id = item?.user_id;

    let data = new FormData();
    data.append('user', conversation_id);
    console.log({data});

    try {
      let res = await Api.post('/create_conversation', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Create Chat API response', res);

      navigation?.navigate('Chat', {
        conversationID: res?.data?.conversation_id,
        name: item?.first_name + ' ' + item?.last_name,
        avatar: item?.avatar,
        singleMultiChat: false,
      });
    } catch (error) {
      alert('Something went wrong please try again later');
      console.log({error});
    }
  };

  const sendMessageGroupAPI = async () => {
    let groupChatIDs = groupChatID.toString();

    let data = new FormData();
    data.append('users', groupChatIDs);
    data.append('job_shift_id', shiftID);
    console.log({data});
    try {
      let res = await Api.post('/create_conversation', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Create Group Chat API response', res);

      navigation?.navigate('Chat', {
        conversationID: res?.data?.conversation_id,
        name: 'Group Chat',
        avatar: '../../../Assets/Images/group-chat.png',
        singleMultiChat: true,
      });
    } catch (error) {
      alert('Something went wrong please try again later');
      console.log({error});
    }
  };

  return (
    <Container check={true}>
      {/* <ScrollView> */}
      {loading == false ? (
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.darkBlueHigh} />
        </View>
      ) : (
        <>
          <View style={{marginTop: 20, flex: 1}}>
            {checkTalents ? (
              <FlatList
                bounces={false}
                data={jobUsersFindTalent}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: 30,
                      flex: 1,
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: widthPercentageToDP('100%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(22, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        color: '#303E56',
                      }}>
                      No applicants found
                    </Text>
                  </View>
                }
                renderItem={({item, index}) => {
                  let check = true;
                  return (
                    <>
                      <View
                        style={{
                          borderBottomWidth: 0,
                          width: widthPercentageToDP('100%'),
                          paddingHorizontal: widthPercentageToDP('5.8%'),
                          paddingVertical: widthPercentageToDP('6%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderBottomColor: colors.darkGreyHigh,
                        }}>
                        <JobCardClientSecondTab
                          title={item?.first_name + ' ' + item?.last_name}
                          image={{uri: item?.avatar}}
                          appliedFor={item?.title}
                          shiftTitle={item?.job_shift_title}
                          applicants={true}
                        />
                      </View>
                      <View
                        style={{
                          paddingVertical: widthPercentageToDP('0%'),
                          paddingHorizontal: widthPercentageToDP('0%'),
                          paddingLeft: widthPercentageToDP('0%'),
                          paddingRight: widthPercentageToDP('0%'),
                          flexDirection: 'row',
                          borderBottomWidth: 0.3,
                          borderBottomColor: colors.darkGreyHigh,
                          borderTopWidth: 0.3,
                          borderTopColor: colors.darkGreyHigh,
                        }}>
                        <View>
                          <TouchableOpacity
                            style={{
                              paddingVertical: widthPercentageToDP('5%'),
                              width: widthPercentageToDP(50),
                              alignItems: 'center',
                            }}
                            onPress={() => acceptFunc(item)}>
                            <Text
                              style={{
                                color: '#44B766',
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                              }}>
                              Accept
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            borderLeftWidth: 0.5,
                            borderColor: colors.darkGreyHigh,
                          }}>
                          <TouchableOpacity
                            style={{
                              paddingVertical: widthPercentageToDP('5%'),
                              width: widthPercentageToDP(50),
                              alignItems: 'center',
                            }}
                            onPress={() => declinedFunc(item)}>
                            <Text
                              style={{
                                color: colors.red,
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                              }}>
                              Decline
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  );
                }}
              />
            ) : (
              <FlatList
                bounces={false}
                data={jobUsers}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <View
                    style={{
                      marginTop: 30,
                      flex: 1,
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: widthPercentageToDP('100%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(22, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        color: '#303E56',
                      }}>
                      No Staff Found
                    </Text>
                  </View>
                }
                renderItem={({item, index}) => {
                  let today = new Date(item?.start_date);
                  let day = today?.toString()?.split(' ')[0];
                  let date = today?.toString()?.split(' ')[2];
                  let month = today?.toString()?.split(' ')[1];
                  var itemDate = day + ' ' + date + ' ' + month;

                  return (
                    <>
                      <View
                        style={{
                          flex: 1,
                          borderTopColor: '#E3E3E5',
                          borderTopWidth: 1,
                          justifyContent: 'center',
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: widthPercentageToDP('100%'),
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              alignContent: 'center',
                              alignItems: 'center',
                              paddingTop: '2%',
                            }}>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                backgroundColor:
                                  item?.application_status === 'confirmed' &&
                                  item?.clocked_in !== null &&
                                  item?.application_status === 'confirmed' &&
                                  item?.clocked_out !== null
                                    ? colors.green
                                    : item?.application_status ===
                                        'confirmed' &&
                                      item?.clocked_in !== null &&
                                      item?.clocked_out === null
                                    ? '#99cc00'
                                    : item?.application_status == 'confirmed'
                                    ? colors.pureYellow
                                    : item?.application_status == 'waiting'
                                    ? '#f7bf3b'
                                    : item?.application_status == 'cancelld'
                                    ? colors.red
                                    : item?.application_status == 'declined'
                                    ? colors.red
                                    : null,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              flex: 7,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                lineHeight: 24,
                                color: '#303E56',
                              }}>
                              {item?.first_name + ' ' + item?.last_name}
                            </Text>
                            {item?.user?.user_sector[index]?.role ? (
                              <Text style={{color: '#64C07F'}}>
                                {item?.user?.user_sector[index]?.role
                                  ? item?.user?.user_sector[index]?.role?.title
                                  : ''}
                              </Text>
                            ) : null}

                            <View>
                              <Text
                                style={{
                                  fontSize: RFValue(20, 812),
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#9CA3AA',
                                  marginTop: 5,
                                }}>
                                {itemDate}
                              </Text>

                              <Text
                                style={{
                                  fontSize: RFValue(20, 812),
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#9CA3AA',
                                  marginTop: 5,
                                }}>
                                {item?.start_time.slice(
                                  0,
                                  item?.end_time.length - 11,
                                ) +
                                  ' - ' +
                                  item?.end_time.slice(
                                    0,
                                    item?.end_time.length - 11,
                                  )}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                              }}
                              source={{
                                uri: item?.avatar,
                              }}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: 10,
                            marginLeft: 40,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flex: 8,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              {item?.application_status === 'confirmed' &&
                              item?.clocked_in !== null &&
                              item?.application_status === 'confirmed' &&
                              item?.clocked_out !== null ? (
                                <>
                                  {item?.rating ? (
                                    <View
                                      style={{
                                        marginLeft: 30,
                                        borderColor: '#ABB0BA',
                                        backgroundColor: colors.pureWhite,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        paddingVertical: 5,
                                        justifyContent: 'center',
                                        height: 30,
                                        alignSelf: 'center',
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          marginRight: 10,
                                        }}>
                                        <Text
                                          style={{
                                            color: '#ABB0BA',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                          }}>
                                          Rated:
                                        </Text>
                                        <Rating
                                          ratingCount={5}
                                          type="custom"
                                          onFinishRating={item?.rating}
                                          style={{
                                            paddingLeft: 10,
                                          }}
                                          ratingColor="#24334C"
                                          reviewColor="blue"
                                          tintColor={colors.pureWhite}
                                          ratingBackgroundColor="#c8c7c8"
                                          imageSize={17}
                                          defaultRating={10}
                                          readonly={true}
                                        />
                                      </View>
                                    </View>
                                  ) : (
                                    <TouchableHighlight
                                      underlayColor=""
                                      onPress={() => rateFunc(item)}>
                                      <View
                                        style={{
                                          marginLeft: 30,
                                          borderColor: '#ABB0BA',
                                          backgroundColor: colors.pureWhite,
                                          borderWidth: 1,
                                          borderRadius: 20,
                                          paddingVertical: 5,
                                          justifyContent: 'center',
                                          height: 30,
                                          alignSelf: 'center',
                                        }}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            marginRight: 10,
                                          }}>
                                          <Text
                                            style={{
                                              color: '#ABB0BA',
                                              paddingLeft: 10,
                                              paddingRight: 10,
                                            }}>
                                            RATE ME
                                          </Text>
                                          <IconStar
                                            name="star"
                                            size={15}
                                            color="#ABB0BA"
                                          />
                                        </View>
                                      </View>
                                    </TouchableHighlight>
                                  )}
                                </>
                              ) : (
                                <View
                                  style={{
                                    backgroundColor:
                                      item?.application_status ===
                                        'confirmed' &&
                                      item?.clocked_in !== null &&
                                      item?.application_status ===
                                        'confirmed' &&
                                      item?.clocked_out !== null
                                        ? colors.green
                                        : item?.application_status ===
                                            'confirmed' &&
                                          item?.clocked_in !== null &&
                                          item?.clocked_out === null
                                        ? '#99cc00'
                                        : item?.application_status ==
                                          'confirmed'
                                        ? '#3eb561'
                                        : item?.application_status == 'waiting'
                                        ? colors.pureYellow
                                        : item?.application_status == 'cancelld'
                                        ? colors.red
                                        : item?.application_status == 'declined'
                                        ? colors.red
                                        : null,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <Text
                                    style={{
                                      color:
                                        item?.application_status == 'confirmed'
                                          ? colors.pureWhite
                                          : item?.application_status ==
                                            'waiting'
                                          ? colors.pureWhite
                                          : item?.application_status ==
                                            'cancelld'
                                          ? '#F51313'
                                          : item?.application_status ==
                                            'declined'
                                          ? colors.pureWhite
                                          : null,
                                      paddingVertical: 8,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                    }}>
                                    {item?.application_status === 'confirmed' &&
                                    item?.clocked_in !== null &&
                                    item?.application_status === 'confirmed' &&
                                    item?.clocked_out !== null
                                      ? item?.status?.charAt(0)?.toUpperCase() +
                                        item?.status?.slice(1)
                                      : item?.application_status ===
                                          'confirmed' &&
                                        item?.clocked_in !== null &&
                                        item?.clocked_out === null
                                      ? item?.status?.charAt(0)?.toUpperCase() +
                                        item?.status?.slice(1)
                                      : item?.application_status == 'confirmed'
                                      ? item?.application_status
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        item?.application_status?.slice(1)
                                      : item?.application_status == 'waiting'
                                      ? item?.application_status
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        item?.application_status?.slice(1)
                                      : item?.application_status == 'cancelld'
                                      ? item?.application_status
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        item?.application_status?.slice(1)
                                      : item?.application_status == 'declined'
                                      ? item?.application_status
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        item?.application_status?.slice(1)
                                      : null}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: 5,
                            }}>
                            {item?.application_status === 'confirmed' ? (
                              <View>
                                <TouchableHighlight
                                  underlayColor=""
                                  onPress={() => sendMessageAPI(item, index)}>
                                  {item?.application_status == 'confirmed' ? (
                                    <View
                                      style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 50,
                                        backgroundColor: '#24334c',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <ChatIcon width={25} height={25} />
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        //backgroundColor: '#24334c',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    />
                                  )}
                                </TouchableHighlight>
                              </View>
                            ) : null}

                            {item?.application_status === 'confirmed' &&
                            item?.clocked_in !== null &&
                            item?.clocked_out === null ? (
                              <TouchableHighlight
                                //onPress={() => sendMessageAPI(item, index)}
                                underlayColor=""
                                style={{
                                  marginLeft: 40,
                                  borderColor: '#ABB0BA',
                                  backgroundColor: colors.pureWhite,
                                  borderWidth: 1,
                                  borderRadius: 20,
                                  paddingVertical: 5,
                                  justifyContent: 'center',
                                  height: 30,
                                  width: '52%',
                                }}>
                                <Text
                                  style={{
                                    color: '#ABB0BA',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                  }}>
                                  ClockedIn:
                                  {'  ' +
                                    item?.clocked_in.slice(
                                      0,
                                      item?.clocked_in.length - 3,
                                    )}
                                </Text>
                              </TouchableHighlight>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    </>
                  );
                }}
              />
            )}
          </View>

          {status == 'live' || status == 'search' || status == 'upComing' ? (
            <>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  width: widthPercentageToDP('100%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => talentInformationBook2(shiftID, check)}
                  style={{
                    width: widthConverter(261),
                    height: heightConverter(50),
                    backgroundColor: '#3EB561',
                    borderWidth: 2,
                    borderWidth: 0,
                  }}
                  textStyle={{color: colors.pureWhite}}>
                  FIND STAFF
                </Button>

                {checkGroupChat ? (
                  <View style={{marginLeft: 20}}>
                    <TouchableOpacity
                      underlayColor=""
                      onPress={() => sendMessageGroupAPI()}
                      style={{
                        //position: 'absolute',
                        //bottom: 25,
                        //right: 5,
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        backgroundColor: '#24334c',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../Assets/Images/group-chat.png')}
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </>
          ) : null}
        </>
      )}

      <Modal transparent animationType="fade" visible={vissibleRating}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => setVissibleRating(false)}
            style={{
              width: 60,
              height: 60,
              borderRadius: 60,
              backgroundColor: '#3EB561',
              alignSelf: 'flex-end',
              marginRight: 20,
              marginBottom: -25,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconCross name="cross" size={35} color={colors.pureWhite} />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: colors.pureWhite,
              height: '75%',
            }}>
            <View
              style={{
                marginTop: 20,
                marginLeft: 40,
                marginBottom: 40,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(20, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#24334c',
                    marginTop: 10,
                  }}>
                  Review Staff:
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                  }}
                  source={
                    rateAvatar
                      ? {uri: rateAvatar}
                      : require('../../../Assets/Demo/Logo1.png')
                  }
                />
                <View>
                  <Text
                    style={{
                      fontFamily: 'Europa-Bold',
                      fontSize: RFValue(20, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: '#24334c',
                      paddingLeft: 20,
                    }}>
                    {rateName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Europa-Bold',
                      fontSize: RFValue(14, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: '#24334c',
                      paddingLeft: 20,
                    }}>
                    {'Brand Ambassador'}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(20, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#24334c',
                    marginTop: 20,
                  }}>
                  Choose Star Rating:
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  //justifyContent: 'center',
                  marginTop: 10,
                }}>
                {maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item}
                      onPress={() => setDefaultRating(item)}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'cover',
                        }}
                        source={
                          item <= defaultRating
                            ? require('../../../Assets/Images/filledStar.png')
                            : require('../../../Assets/Images/unFilledStar.png')
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text
                style={{
                  fontFamily: 'Europa',
                  fontSize: 17,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#24334c',
                  marginTop: Platform.OS === 'ios' ? 10 : 10,
                }}>
                Your Honest Review
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: 'Europa',
                  fontSize: 15,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  color: '#24334c',
                }}
                onChangeText={(val) => setReview(val)}
                underlineColorAndroid="transparent"
                multiline={true}
                editable={true}
                placeholder={'Please type your review...'}
                placeholderTextColor={'rgba(220,222,226)'}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignSelf: 'center',
                marginBottom: '10%',
              }}>
              <Button
                onPress={() => submitReview()}
                style={{
                  width: widthConverter(261),
                  height: heightConverter(50),
                  backgroundColor: '#3EB561',
                  borderWidth: 2,
                  borderWidth: 0,
                }}
                textStyle={{color: colors.pureWhite}}>
                {loadingReview == false ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size="large"
                      color={colors.darkBlueHigh}
                    />
                  </View>
                ) : (
                  'SUBMIT REVIEW'
                )}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={vissibleAccept}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: '20%',
              backgroundColor: colors.pureWhite,
              borderRadius: 4,
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <ActivityIndicator size="large" color={colors.darkBlueHigh} />
            </View>
            <View style={{marginTop: 10}}>
              <Text>Accepting Shift...</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={vissibleDeclined}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: '20%',
              backgroundColor: colors.pureWhite,
              borderRadius: 4,
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <ActivityIndicator size="large" color={colors.darkBlueHigh} />
            </View>
            <View style={{marginTop: 10}}>
              <Text>Declining Shift...</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* </ScrollView> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: heightConverter(40),
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(19),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  sticky: {
    width: widthConverter(375),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
  ButtonTalent: {
    width: widthConverter(261),
    height: heightConverter(50),
    backgroundColor: colors.pureWhite,
    borderColor: '#515C70',
    borderWidth: 2,
  },
});
