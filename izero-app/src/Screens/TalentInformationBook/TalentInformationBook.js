import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
  wi,
} from '../../Components';

import {Ovaltwo} from '../../Assets/Graphics/Ovaltwo';
import {BackArrow, ArrowIcon, HeartIcon, HeartIcon2} from '../../Assets/Icons';
import {ChatIcon} from '../../Assets/Icons';

import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';
import styles from './Styles';
import IconArrow from 'react-native-vector-icons/AntDesign';
import IconPlus from 'react-native-vector-icons/AntDesign';
import IconStar from 'react-native-vector-icons/FontAwesome';
import IconCross from 'react-native-vector-icons/Entypo';

import {Dropdown} from 'react-native-material-dropdown-v2';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, dispatch} from 'react-redux';
import Api from '../../api';
import colors from '../../Constants/colors';

export default function TalentInformationBook({navigation, route}) {
  let paramsData = route?.params;

  let staffID = paramsData?.id;
  let check = paramsData?.check;

  const [selected, setSelected] = useState(-1);

  const [loading, setLoading] = useState(false);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const jobID = useSelector((state) => state?.app?.createJobID);
  const shiftID = useSelector((state) => state?.app?.shiftId);
  const staffDetails = useSelector((state) => state?.app?.staffDetails);

  const user = useSelector((state) => state?.app?.user);

  const liveBook = useSelector((state) => state?.app?.liveBook);

  const shiftId = useSelector((state) => state?.app?.shiftId);

  const [loadingFavUnFav, setLoadingFavUnFav] = useState(true);

  const [loadingTalentInfo, setLoadingTalentInfo] = useState(true);

  const [avatar, setAvatar] = useState(staffDetails?.avatar);

  const [status, setStatus] = useState(staffDetails?.is_favorite);

  const [name, setName] = useState(
    staffDetails?.first_name + ' ' + staffDetails?.last_name,
  );
  const [address, setAddress] = useState(staffDetails?.address);

  const [totalCompletedJobs, setTotalCompletedJobs] = useState(
    staffDetails?.shifts?.length > 0 ? staffDetails?.shifts?.length : '',
  );

  const [jobShifts, setJobShifts] = useState([]);

  const [vissibleShift, setVissibleShift] = useState(false);

  const [vissibleJobs, setVissibleJobs] = useState(false);

  const [shiftList, setShiftList] = useState(false);

  const [jobsList, setJobsList] = useState(false);

  useEffect(() => {
    console.log('TalentInformationBook');
    //getStaffData();
    setTimeout(function () {
      setLoadingTalentInfo(false);
    }, 500);

    let responseJson = staffDetails?.shifts?.map((item) => {
      item.isSelect = false;
      return item;
    });
    setJobShifts(responseJson);
    getJobs();
  }, [status]);

  const getStaffData = async () => {
    setLoadingTalentInfo(true);
    try {
      let res = await Api.get(`talent_detail?user_id=${staffID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get Staff information Api Response', res);

      setAvatar(res?.data?.data?.avatar);
      setName(res?.data?.data?.first_name + ' ' + res?.data?.data?.last_name);
      setAddress(res?.data?.data?.address);

      setTotalCompletedJobs(
        res?.data?.data?.shifts?.length > 0
          ? res?.data?.data?.shifts?.length
          : '',
      );

      setStatus(res?.data?.data?.is_favorite);

      let responseJson = res?.data?.data?.shifts?.map((item) => {
        item.isSelect = false;
        return item;
      });

      setJobShifts(responseJson);
      setLoadingTalentInfo(false);
    } catch (error) {
      setLoadingTalentInfo(false);
      console.log({error});
    }
  };

  const getJobs = async () => {
    setLoading(true);
    try {
      let res = await Api.get('/client_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get Employer Jobs Api Response', res);
      setLoading(false);
      setJobsList(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const selectShiftForJobs = (item, index) => {
    console.log(item);
    setVissibleJobs(false);
    setShiftList(item?.shifts);
    setVissibleShift(true);
  };

  const talentInformationBookComplete = async (item) => {
    setVissibleShift(false);
    let jobIDParamsSelected = item?.id;
    if (jobIDParamsSelected == '') {
      alert('Kindly Select job for book Staff.');
    } else {
      setVissibleShift(false);
      navigation.navigate('SelectShiftsClient', {
        jobIDParams: jobIDParamsSelected,
        staffID: staffID,
        jwtTocken: jwt,
      });
    }
  };

  const talentInformationBookComplete2 = async () => {
    navigation.navigate('SelectShiftsClient', {
      jobIDParams: shiftID, //jobID ? jobID : shiftId,
      staffID: staffID,
      jwtTocken: jwt,
    });
  };

  const favStaff = async () => {
    setLoadingFavUnFav(false);
    try {
      let data = new FormData();
      data.append('talent_id', staffID);
      data.append('status', 1);
      let res = await Api.post('/fav_unfav_talent', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Fav api response', res);
      setLoadingFavUnFav(true);
      Alert.alert('', 'You have successfully added staff in favourite list', [
        {
          text: 'OK',
          onPress: () => getStaffData(),
        },
      ]);
    } catch (error) {
      setLoadingFavUnFav(true);
      alert('Something went wrong please try again latter');
      console.log({error});
    }
  };

  const unFavStaff = async () => {
    setLoadingFavUnFav(false);
    try {
      let data = new FormData();
      data.append('talent_id', staffID);
      data.append('status', 0);
      let res = await Api.post('/fav_unfav_talent', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Un fav api response', res);
      setLoadingFavUnFav(true);
      Alert.alert(
        '',
        'You have successfully removed staff from favourite list.',
        [
          {
            text: 'OK',
            onPress: () => getStaffData(),
          },
        ],
      );
    } catch (error) {
      console.log({error});
      setLoadingFavUnFav(true);
      alert('Something went wrong please try again latter');
    }
  };

  const selectShiftForJobApply = (item, index) => {
    item.isSelect = !item.isSelect;
    const indexTemp = jobShifts.findIndex((item) => item.id === item.id);
    setJobShifts[indexTemp] = item;

    if (item.isSelect) {
      setSelected(index);
    } else {
      setSelected(-1);
    }
  };

  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        No Jobs Completed
      </Text>
    </View>
  );

  // const sendMessageAPI = async () => {
  //   let conversation_id = staffID;
  //   let data = new FormData();
  //   data.append('user', conversation_id);
  //   console.log({data});
  //   try {
  //     let res = await Api.post('/create_conversation', data, {
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     });
  //     console.log('Create Chat API response', res);
  //     navigation?.navigate('Chat', {
  //       conversationID: res?.data?.conversation_id,
  //       name: name,
  //       avatar: avatar,
  //       singleMultiChat: false,
  //     });
  //   } catch (error) {
  //     alert('Something went wrong please try again later');
  //     console.log({error});
  //   }
  // };

  return (
    <Container>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightConverter(329),
        }}>
        <Ovaltwo
          height={heightConverter(170)}
          width={widthConverter(375)}
          color={colors.darkBlue}
        />
        <View
          style={{
            backgroundColor: 'null',
            position: 'absolute',
          }}>
          <View
            style={{
              width: widthPercentageToDP('100%'),
              paddingHorizontal: widthPercentageToDP('5.8%'),
              paddingTop: heightConverter(100),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                backgroundColor: colors.pureWhite,
                shadowColor: 'rgba(0, 0, 0, 0.07)',
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#efefef',
                borderRadius: widthPercentageToDP('12%') / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ArrowIcon
                style={{
                  transform: [{rotate: '180deg'}],
                }}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
            <View
              style={{
                width: widthPercentageToDP('22%'),
                height: widthPercentageToDP('22%'),
                backgroundColor: colors.pureWhite,
                shadowColor: 'rgba(36, 51, 76, 0.14)',
                shadowOffset: {
                  width: 0,
                  height: 11,
                },
                shadowRadius: 22,
                shadowOpacity: 1,
                borderRadius: widthPercentageToDP('22%') / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  borderRadius: 40,
                  width: widthPercentageToDP('21%'),
                  height: widthPercentageToDP('21%'),
                }}
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../../Assets/Demo/Logo1.png')
                }
              />
            </View>

            <>
              {status == false ? (
                <TouchableOpacity
                  disabled={loadingFavUnFav == false ? true : false}
                  onPress={() => favStaff()}>
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      backgroundColor: colors.pureWhite,
                      shadowColor: 'rgba(0, 0, 0, 0.07)',
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {loadingFavUnFav == false ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      <HeartIcon />
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={loadingFavUnFav == false ? true : false}
                  onPress={() => unFavStaff()}>
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      backgroundColor: colors.pureWhite,
                      shadowColor: 'rgba(0, 0, 0, 0.07)',
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {loadingFavUnFav == false ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      // <HeartIcon2 />
                      <Image
                        style={{
                          borderRadius: 30,
                          width: 30,
                          height: 30,
                        }}
                        source={require('../../Assets/Images/fav.png')}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </>
          </View>

          <Text
            style={{
              color: colors.darkBlue,
              fontFamily: 'Europa-Bold',
              fontSize: RFValue(20, 812),
              fontWeight: 'bold',
              fontStyle: 'normal',
              letterSpacing: 0,
              textAlign: 'center',
              marginTop: 25,
            }}>
            {name}
          </Text>

          {address ? (
            <Text
              style={{
                color: colors.darkBlue,
                fontFamily: 'Europa',
                fontSize: RFValue(18, 812),
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                marginTop: 5,
              }}>
              {address}
            </Text>
          ) : null}

          {totalCompletedJobs ? (
            <Text
              style={{
                color: colors.darkBlue,
                fontFamily: 'Europa',
                fontSize: RFValue(18, 812),
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                marginTop: 5,
              }}>
              {totalCompletedJobs !== ''
                ? 'Jobs Completed: ' + totalCompletedJobs
                : null}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 0.8}}>
          {loadingTalentInfo ? (
            <View style={{flex: 1, marginTop: 80}}>
              <ActivityIndicator size="large" color={colors.darkBlueHigh} />
            </View>
          ) : (
            <FlatList
              bounces={false}
              data={jobShifts}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => EmptyComponent()}
              style={{width: '100%'}}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderTopColor: '#E3E3E5',
                      borderTopWidth: 1,
                      justifyContent: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <TouchableHighlight
                      underlayColor=""
                      onPress={() => selectShiftForJobApply(item, index)}
                      style={{flexDirection: 'row'}}>
                      <>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 20,
                          }}>
                          <Image
                            style={{height: 50, width: 50, borderRadius: 50}}
                            source={
                              item?.job?.company?.logo
                                ? {uri: item?.job?.company?.logo}
                                : require('../../Assets/Demo/Logo1.png')
                            }
                          />
                        </View>
                        <View
                          style={{
                            flex: 4,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: RFValue(18, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              lineHeight: 24,
                              color: '#303E56',
                            }}>
                            {item?.title}
                          </Text>
                          <Text style={{color: '#ABB1BB'}}>
                            {item?.job?.company?.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            marginRight: 20,
                          }}>
                          {selected === index ? (
                            <IconArrow
                              name="down"
                              size={20}
                              color={colors.green}
                            />
                          ) : (
                            <IconArrow
                              name="right"
                              size={20}
                              color={colors.green}
                            />
                          )}
                        </View>
                      </>
                    </TouchableHighlight>

                    {selected === index ? (
                      <View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                          <View
                            style={{
                              marginLeft: 30,
                              backgroundColor: colors.lightGreen,
                              borderRadius: 20,
                              paddingVertical: 5,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#78C890',
                                paddingLeft: 10,
                                paddingRight: 10,
                              }}>
                              {item?.start_date?.substring(
                                0,
                                item?.start_date.length - 5,
                              ) +
                                ' - ' +
                                item?.end_date?.substring(
                                  0,
                                  item?.end_date?.length - 5,
                                )}
                            </Text>
                          </View>

                          <View
                            style={{
                              marginLeft: 30,
                              borderColor: colors.darkGreyLow,
                              backgroundColor: colors.pureWhite,
                              borderWidth: 1,
                              borderRadius: 20,
                              paddingVertical: 5,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: colors.darkGreyLow,
                                paddingLeft: 10,
                                paddingRight: 10,
                              }}>
                              {item?.start_time?.substring(
                                0,
                                item?.start_time?.length - 3,
                              ) +
                                ' - ' +
                                item?.end_time?.substring(
                                  0,
                                  item?.end_time?.length - 3,
                                )}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginLeft: 30}}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              fontSize: RFValue(20, 812),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 25,
                            }}>
                            Job location
                          </Text>

                          <Text
                            style={{
                              fontSize: RFValue(20, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 5,
                            }}>
                            {item?.job?.location}
                          </Text>
                        </View>

                        <View style={{marginLeft: 30}}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              fontSize: RFValue(20, 812),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 25,
                            }}>
                            Employer
                          </Text>

                          <Text
                            style={{
                              fontSize: RFValue(20, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 5,
                            }}>
                            {item?.job?.user?.first_name +
                              ' ' +
                              item?.job?.user?.last_name}
                          </Text>
                        </View>

                        <View style={{marginLeft: 30}}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              fontSize: RFValue(20, 812),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 25,
                            }}>
                            Rating
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 20,
                            marginLeft: 30,
                            marginRight: 30,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              fontSize: RFValue(20, 812),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 10,
                              marginLeft: 20,
                            }}>
                            Team Leader
                          </Text>

                          <Text
                            style={{
                              fontSize: RFValue(18, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: '#ABB1BB',
                              marginTop: 5,
                              marginLeft: 20,
                            }}>
                            Thu 26 Jun 2020
                          </Text>

                          <Text
                            style={{
                              fontSize: RFValue(18, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 20,
                              marginLeft: 20,
                              textAlign: 'justify',
                            }}>
                            Great Team Leader, done all what was expected of
                            Very punctual, polite and all the staff here adore
                            here.
                          </Text>

                          <View
                            style={{
                              //flex: 1,
                              flexDirection: 'row',
                              marginLeft: 30,
                              borderColor: colors.darkBlue,
                              borderWidth: 1.5,
                              borderRadius: 20,
                              paddingVertical: 6,
                              marginTop: 20,
                              width: 130,
                            }}>
                            <Text
                              style={{
                                color: colors.darkBlue,
                                paddingLeft: 15,
                                paddingRight: 10,
                                fontSize: RFValue(18, 812),
                              }}>
                              Rating 5
                            </Text>
                            <IconStar
                              name="star"
                              size={15}
                              color={colors.darkBlue}
                              style={{marginTop: 4}}
                            />
                          </View>
                        </View>

                        <View style={{marginTop: 20}}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              fontSize: RFValue(20, 812),
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkBlue,
                              marginTop: 10,
                              marginLeft: 30,
                            }}>
                            Job Sector
                          </Text>
                        </View>

                        <View
                          style={{
                            //flex: 1,
                            flexDirection: 'row',
                            marginLeft: 30,
                            borderRadius: 20,
                            paddingVertical: 6,
                            marginTop: 20,
                            width: 130,
                            backgroundColor: colors.lightGreen,
                          }}>
                          <Text
                            style={{
                              color: colors.green,
                              paddingLeft: 10,
                              paddingRight: 10,
                              fontWeight: 'bold',
                            }}>
                            TEAM LEADER
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: RFValue(18, 812),
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            marginTop: 20,
                            marginLeft: 30,
                            marginRight: 30,
                            textAlign: 'justify',
                          }}>
                          Great Team Leader, done all what was expected of Very
                          punctual, polite and all the staff here adore here.
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 30,
                            marginRight: 10,
                            marginTop: 20,
                          }}>
                          <IconPlus
                            name="plus"
                            size={14}
                            color={colors.green}
                            style={{marginTop: 8}}
                          />
                          <Text
                            style={{
                              fontSize: RFValue(20, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              marginLeft: 5,
                              color: colors.green,
                              textAlign: 'justify',
                            }}>
                            Read More
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 30,
                            borderRadius: 20,
                            paddingVertical: 6,
                            marginTop: 20,
                            width: 180,
                            backgroundColor: colors.lightGreen,
                          }}>
                          <Text
                            style={{
                              color: colors.green,
                              paddingLeft: 15,
                              paddingRight: 15,
                              fontWeight: 'bold',
                            }}>
                            BRAND AMBASSADOR
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: RFValue(18, 812),
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            marginTop: 20,
                            marginLeft: 30,
                            marginRight: 30,
                            textAlign: 'justify',
                          }}>
                          Great Team Leader, done all what was expected of Very
                          punctual, polite and all the staff here adore here.
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 30,
                            marginRight: 10,
                            marginTop: 20,
                          }}>
                          <IconPlus
                            name="plus"
                            size={14}
                            color={colors.green}
                            style={{marginTop: 8}}
                          />
                          <Text
                            style={{
                              fontSize: RFValue(20, 812),
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              marginLeft: 5,
                              color: colors.green,
                              textAlign: 'justify',
                            }}>
                            Read More
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              }}
            />
          )}
        </View>

        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            width: widthPercentageToDP('100%'),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {check ? (
            <Button
              onPress={() =>
                //liveBook
                shiftId
                  ? talentInformationBookComplete2()
                  : setVissibleJobs(true)
              }
              style={{
                width: widthConverter(261),
                height: heightConverter(50),
                backgroundColor: '#3EB561',
                borderWidth: 2,
                borderWidth: 0,
              }}
              textStyle={{color: colors.pureWhite}}>
              BOOK STAFF
            </Button>
          ) : null}

          {/* <View style={{marginLeft: 20}}>
          <TouchableOpacity
            underlayColor=""
            onPress={() => sendMessageAPI()}
            style={{
              height: 55,
              width: 55,
              borderRadius: 50,
              backgroundColor: colors.darkBlue,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ChatIcon width={widthConverter(30)} height={heightConverter(28)} />
          </TouchableOpacity>
        </View> */}
        </View>
      </View>

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
              onPress={() => setVissibleJobs(false)}
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
                backgroundColor: colors.darkBlue,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Europa-Bold',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  color: colors.pureWhite,
                  marginTop: 10,
                }}>
                Select Job
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
              }}>
              <FlatList
                data={jobsList}
                style={{
                  backgroundColor: colors.pureWhite,
                  height: '85%',
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  let createdDate = new Date(item?.created_at);

                  let createdJobDay = createdDate?.toString()?.split(' ')[0];
                  let createdJobDate = createdDate?.toString()?.split(' ')[2];
                  let createdJobMonth = createdDate?.toString()?.split(' ')[1];

                  var createdDateFinal =
                    createdJobDay +
                    ' ' +
                    createdJobDate +
                    ' ' +
                    createdJobMonth;

                  return (
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
                        <View style={{flex: 0.4}}>
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
                            Job :
                          </Text>
                        </View>

                        <View style={{flex: 0.7}}>
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
                            {item?.title}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 0.4}}>
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
                            Description :
                          </Text>
                        </View>

                        <View style={{flex: 0.7}}>
                          <Text
                            style={{
                              marginBottom: heightPercentageToDP('0.3%'),
                              fontFamily: 'Europa-Bold',
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGreyHigh,
                            }}>
                            {item?.description}
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 0.4}}>
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
                            Date :
                          </Text>
                        </View>

                        <View style={{flex: 0.7}}>
                          <Text
                            style={{
                              marginBottom: heightPercentageToDP('0.3%'),
                              fontFamily: 'Europa-Bold',
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGreyHigh,
                            }}>
                            {createdDateFinal}
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
                          onPress={() => selectShiftForJobs(item, index)}
                          style={{
                            width: 100,
                            height: 30,
                            backgroundColor: '#3EB561',
                            borderWidth: 2,
                            borderWidth: 0,
                          }}
                          textStyle={{color: colors.pureWhite, fontSize: 14}}>
                          Select Job
                        </Button>
                        <View style={{marginLeft: 10}}>
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 40,
                            }}
                            source={{
                              uri: item?.logo,
                            }}
                          />
                        </View>
                      </View>
                    </View>
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
              //flex: 1,
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
                backgroundColor: colors.darkBlue,
                paddingBottom: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Europa-Bold',
                  fontSize: 20,
                  fontWeight: 'bold',
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
                  backgroundColor: colors.pureWhite,
                  height: '85%',
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
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
                            Job Role :
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
                            Shift Role :
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
                            Address :
                          </Text>
                        </View>

                        <View style={{flex: 0.9}}>
                          <Text
                            style={{
                              marginBottom: heightPercentageToDP('0.3%'),
                              fontFamily: 'Europa-Bold',
                              fontWeight: 'bold',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGreyHigh,
                              marginLeft: 10,
                            }}>
                            {item?.address_data}
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
                          flex: 1,
                        }}>
                        <Button
                          onPress={() => talentInformationBookComplete(item)}
                          style={{
                            width: 100,
                            height: 30,
                            backgroundColor: '#3EB561',
                            borderWidth: 2,
                            borderWidth: 0,
                          }}
                          textStyle={{color: colors.pureWhite, fontSize: 14}}>
                          Select Shift
                        </Button>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
