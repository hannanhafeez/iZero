import React, {useState, useEffect, Component} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Modal,
  Alert,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  JobCardSerach,
  Heading,
  Button,
  NotificationsCardTalent,
  NotificationsCardTalentIboard,
  JobCardTalentSecondTab,
} from '../../Components';
import styles from './Styles';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';

import types from '../../Redux/types';
import Api from '../../api/index';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import IconCross from 'react-native-vector-icons/Entypo';

import {SearchIcon} from '../../Assets/Icons';

import {IboardHeaderTalent} from '../../Components/IboardHeaderTalent/IboardHeaderTalent';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function IboardTalent({navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const completed = useSelector((state) => state?.app?.completed);
  const live = useSelector((state) => state?.app?.live);
  const upComing = useSelector((state) => state?.app?.upComing);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  const [liveTotal, setliveTotal] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);

  const [checkSearch, setCheckSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [notificationsOfeeredJobs, setNotificationsOfeeredJobs] = useState([]);

  const [nextURLUpComimgJobs, setNextURLUpComimgJobs] = useState('');

  const [loadingUpComing, setLoadingUpComing] = useState(true);

  const markedDatesArray2 = {};

  const markedDatesArray3 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];
  var currentDate = day + ' ' + date + ' ' + month;

  useEffect(() => {
    console.log('Iboard Staff');
    getIboardData();
    //getSearchData();
    //getDataFinance();
    setCheckSearch(false);
    getAvailability();
    getAllDatesInfo();

    getJobSectors();
  }, [isFocused]);

  const getJobSectors = async () => {
    try {
      let res = await Api.get('/job_sectors', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Job Sector Api Response', res);
      let jobRoleData = [];
      for (var i = 0; i < res?.data?.data?.length - 1; i++) {
        jobRoleData[i] = {
          label: res.data.data[i].title,
          value: {
            label: res.data.data[i].title,
            value: parseInt(res.data.data[i].id),
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

  const getIboardData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/dashboard', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Staff Api Response', res);

      setLoading(true);
      setliveTotal(res?.data?.no_live_jobs);
      setCompletedTotal(res?.data?.no_completed_jobs);
      setNotificationsOfeeredJobs(res?.data?.offered_jobs);
      setNextURLUpComimgJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );
      dispatch({
        type: types.UP_COMINGS,
        upComing: res?.data?.appllied?.data,
      });

      dispatch({
        type: types.NOTIFICATION_TOTAL,
        notificationTotal: res?.data?.count,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getAvailability = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/unavailable_dates`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get unAvailbility Api Response', res);
      setLoading(true);

      let tempArr = res?.data?.dates;

      for (let i = 0; i < tempArr.length; i++) {
        let data = {
          selected: true,
          marked: true,
          textColor: colors.pureBlack,
          dotColor: colors.red,
        };

        markedDatesArray3[moment(tempArr[i]).format('YYYY-MM-DD')] = data;
      }
      console.log('markedDatesArray3', markedDatesArray3);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getAllDatesInfo = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talent_calenderDates', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calender All Dates Info Api Response', res);

      let tempArr = res?.data?.date;

      for (let i = 0; i < tempArr.length; i++) {
        let data = {
          marked: true,
          dotColor: 'green',
        };

        markedDatesArray2[moment(tempArr[i]).format('YYYY-MM-DD')] = data;
      }

      console.log('markedDatesArray2', markedDatesArray2);

      setMarkedDatesArray(markedDatesArray2);
      setLoading(true);

      const finalObject = Object.assign(markedDatesArray3, markedDatesArray2); //Save objecct in redux

      dispatch({
        type: types.AVAILBILITY_CALENDAR_SHOW,
        availibilityShow: finalObject,
      });
      console.log('finalObject', finalObject);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/all_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Staff Api Response', res);
      // setLoading(true);
      // setFilteredDataSource(res?.data?.data);
      // setMasterDataSource(res?.data?.data);

      setFilteredDataSource(res?.data?.jobs);
      setMasterDataSource(res?.data?.jobs);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item?.title
          ? item?.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const acceptFunc = async (item) => {
    // setVissibleAccept(true);
    setLoading(false);
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
      console.log('Accept Offer api response', res);
      // setVissibleAccept(false);
      setLoading(true);
      Alert.alert('', 'You have accepted offer successfully.', [
        {
          text: 'OK',
          onPress: () => getIboardData(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setLoading(true);
      alert('Something went wrong please try again latter');
      getIboardData();
    }
  };

  const declinedFunc = async (item) => {
    //setVissibleDeclined(true);
    setLoading(false);
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
      console.log('Declined Offer api response', res);
      //setVissibleDeclined(false);
      setLoading(true);
      Alert.alert('', 'You have declined offer successfully.', [
        {
          text: 'OK',
          onPress: () => getIboardData(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setLoading(true);
      //setVissibleDeclined(false);
      alert('Something went wrong please try again latter');
      getIboardData();
    }
  };

  const LoadMoreUpComingData = async () => {
    setLoadingUpComing(false);
    try {
      let res = await Api.get(`${nextURLUpComimgJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next UpComing Jobs Api Response', res);

      setNextURLUpComimgJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );

      let nextUpComing = res?.data?.appllied?.data;

      let tempUpComing = upComing;

      for (var v = 0; v < nextUpComing.length; v++) {
        tempUpComing.push(nextUpComing[v]);
      }

      dispatch({
        type: types.UP_COMINGS,
        upComing: tempUpComing,
      });
      setLoadingUpComing(true);
    } catch (error) {
      setLoadingUpComing(true);
      console.log({error});
    }
  };

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          marginTop: '60%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(20, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            marginBottom: heightPercentageToDP('1.1%'),
          }}>
          No Jobs Found
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  // const getDataFinance = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get('/talent_finance', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Finance Staff Api Response', res);
  //     setLoading(true);

  //     dispatch({
  //       type: types.TOTAL_SPEND,
  //       totalSpend: res?.data?.total_spent,
  //     });

  //     dispatch({
  //       type: types.TOTAL_FEE,
  //       totalFee: res?.data?.total_fee,
  //     });

  //     dispatch({
  //       type: types.OVER_VIEW,
  //       overView: res?.data?.overview,
  //     });

  //     dispatch({
  //       type: types.IN_PROGRESS,
  //       inProgress: res?.data?.in_process,
  //     });
  //     dispatch({
  //       type: types.COMPLETED_FINANCE,
  //       completedFinance: res?.data?.completed,
  //     });
  //     dispatch({
  //       type: types.EXPENSES,
  //       expenses: res?.data?.expenses?.expense_data,
  //     });
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const ItemView = ({item}) => {
    let shiftID = item?.id,
      jobID = item?.job?.id,
      checkFav = true,
      statusJob = 'search';
    return (
      <View style={styles.firstRow}>
        <JobCardSerach
          title={item?.title}
          jobTitle={'Total Jobs: ' + item?.data?.length}
          //navigation={navigation}
          // onPress={() =>
          //   navigation.navigate('JobDetailsTalent', {
          //     shiftID: shiftID,
          //     statusJob: statusJob,
          //     checkFav: checkFav,
          //     jobID: jobID,
          //     jwt: jwt,
          //   })
          // }
          onPress={() =>
            // navigation.navigate('SearchListTalent', {
            //   shiftID: shiftID,
            //   statusJob: statusJob,
            //   checkFav: checkFav,
            //   jobID: jobID,
            //   jwt: jwt,
            //   data: item?.data,
            //   title: item?.title,
            // })
            RootNavigation.navigate('SearchListTalent', {
              shiftID: shiftID,
              statusJob: statusJob,
              checkFav: checkFav,
              jobID: jobID,
              jwt: jwt,
              data: item?.data,
              title: item?.title,
            })
          }
          //   image={{
          //   uri:
          //   item?.data[0].job?.company?.logo !== ''
          //       ? item?.data[0].job?.company?.logo
          //       : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
          // }}
          images={item?.data[0].job?.company?.logo}
          // checkFav={true}
          // jobTitle={'Job Title: ' + item?.job?.title}
          // statusJob={'search'}
          // jobID={item?.job?.id}
          // price={'Shift Fee: ' + '£' + item?.total_pay}
          // address={item?.address_data}
          // image={{
          //   uri:
          //     item?.job?.company?.logo !== ''
          //       ? item?.job?.company?.logo
          //       : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
          // }}
          // time={
          //   item?.start_time?.substring(0, item?.start_time?.length - 3) +
          //   ' - ' +
          //   item?.end_time?.substring(0, item?.end_time?.length - 3)
          // }
          // date={
          //   item?.start_date.substring(0, item?.start_date.length - 5) +
          //   ' - ' +
          //   item?.end_date.substring(0, item?.end_date.length - 5)
          // }
          // jobDetails={true}
        />
      </View>
    );
  };

  const talentInformationBook2 = async (item, check) => {};
  return (
    <Container safeArea>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightPercentageToDP('9%'),
          borderBottomWidth: 0.3,
          borderBottomColor: colors.darkGreyHigh,
          width: widthPercentageToDP('100%'),
          paddingHorizontal: widthPercentageToDP('5.8%'),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {checkSearch == false ? (
            <>
              <Image
                source={
                  user?.avatar !== null
                    ? {uri: user?.avatar}
                    : require('../../Assets/Images/avatar.png')
                }
                style={{
                  borderRadius: widthPercentageToDP('12%'),
                  width: widthPercentageToDP('12%'),
                  height: widthPercentageToDP('12%'),
                }}
              />
              <View
                style={{
                  marginLeft: widthPercentageToDP('4%'),
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: RFValue(16, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue2,
                  }}>
                  {currentDate}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(24, 812),
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: colors.green,
                  }}>
                  {user?.first_name + ' ' + user?.last_name}
                </Text>
              </View>
            </>
          ) : null}
        </View>
        {checkSearch ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsTalent')}
              style={{
                marginRight: 10,
              }}>
              <View>
                {notificationTotal > 0 ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 12,
                      backgroundColor: colors.red,
                      marginBottom: -12,
                      marginLeft: 15,
                      zIndex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: colors.pureWhite,
                        }}>
                        {notificationTotal}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <IconBell name="bell-o" size={30} color={colors.green} />
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Search iZero"
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.lightWhite}
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
                paddingLeft: 20,
                fontSize: 17,
                color: colors.darkGrey,
              }}
            />
            <TouchableOpacity
              onPress={() => setCheckSearch(!checkSearch)}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                borderRadius: widthPercentageToDP('12%') / 2,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconCross name="cross" size={30} color={colors.darkBlue} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => searchFunc()}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                borderRadius: widthPercentageToDP('12%') / 2,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SearchIcon />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsTalent')}
              style={{
                marginLeft: 10,
                marginTop: 10,
              }}>
              <View>
                {notificationTotal > 0 ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 12,
                      backgroundColor: colors.red,
                      marginBottom: -12,
                      marginLeft: 15,
                      zIndex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: colors.pureWhite,
                        }}>
                        {notificationTotal}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <IconBell name="bell-o" size={30} color={colors.green} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        // onScroll ={() => onScrollRefresh()}
      >
        {checkSearch == false ? (
          <>
            <View
              style={[
                styles.firstRow,
                {
                  paddingVertical: widthPercentageToDP('6%'),
                },
              ]}>
              <Card
                total={liveTotal}
                onPress={() => navigation.navigate('Jobs', {select: 1})}
              />
              <Card
                label="COMPLETED JOBS"
                total={completedTotal}
                onPress={() => navigation.navigate('Jobs', {select: 3})}
              />
            </View>

            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {upComing?.length < 1 ? (
                  <>
                    <View
                      style={{
                        height: 100,
                        marginTop: 20,
                        justifyContent: 'center',
                      }}>
                      <Heading
                        containerStyle={styles.headingCon}
                        style={[
                          styles.heading,
                          {fontSize: RFValue(17, 812), textAlign: 'center'},
                        ]}>
                        No jobs at the moment
                      </Heading>
                    </View>
                  </>
                ) : (
                  <>
                    <Heading
                      containerStyle={[
                        styles.headingCon,
                        {
                          marginBottom: heightPercentageToDP('1%'),
                          marginLeft: 20,
                        },
                      ]}
                      style={[styles.heading, {color: colors.darkGreyHigh}]}>
                      Notifications
                    </Heading>

                    <FlatList
                      data={notificationsOfeeredJobs}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.job?.id,
                          checkFav = true,
                          check = false,
                          statusJob = 'upComing',
                          checkIn = true;
                        return (
                          <>
                            <View
                              style={[
                                styles.firstRow,
                                {
                                  borderBottomWidth: 0,
                                },
                              ]}>
                              <JobCardTalentSecondTab
                                onPress={() =>
                                  talentInformationBook2(item, check)
                                }
                                title={item?.job_shift_title}
                                image={{uri: item?.avatar}}
                                appliedFor={item?.title}
                                price={'Shift Fee: ' + '£' + item?.total_pay}
                                //shiftTitle={item?.title}
                                clientName={
                                  item?.first_name !== null
                                    ? item?.first_name + ' ' + item?.last_name
                                    : null
                                }
                                designation={
                                  item?.user_sector[index]?.title
                                    ? (
                                        item?.user_sector[index]?.title +
                                        ' ' +
                                        (item?.user_sector?.length - 1)
                                      ).toUpperCase() + '  OTHERS'
                                    : ''
                                }
                                date={item?.start_date + ' - ' + item?.end_date}
                                timeTag={
                                  item?.start_time?.substring(
                                    0,
                                    item?.start_time?.length - 3,
                                  ) +
                                  ' - ' +
                                  item?.end_time?.substring(
                                    0,
                                    item?.end_time?.length - 3,
                                  )
                                }
                                // shiftTitle={item?.job_shift_title}
                                applicants={true}
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                borderBottomWidth:
                                  Platform.OS === 'ios' ? 0.6 : 0.6,
                                borderBottomColor: colors.darkGreyHigh,
                                borderTopWidth:
                                  Platform.OS === 'ios' ? 0.6 : 0.6,
                                borderTopColor: colors.darkGreyHigh,
                              }}>
                              <TouchableOpacity
                                style={{
                                  paddingVertical: widthPercentageToDP('6%'),
                                  alignItems: 'center',
                                  flex: 1,
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

                              <View
                                style={{
                                  width: 0.5,
                                  backgroundColor: colors.darkGreyHigh,
                                }}
                              />
                              <TouchableOpacity
                                style={{
                                  paddingVertical: widthPercentageToDP('6%'),
                                  flex: 1,
                                  alignItems: 'center',
                                }}
                                onPress={() => declinedFunc(item)}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa-Bold',
                                    fontSize: RFValue(22, 812),
                                    fontWeight: 'bold',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.red,
                                  }}>
                                  Decline
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      }}
                    />

                    <Heading
                      containerStyle={styles.headingCon}
                      style={styles.heading}>
                      Upcoming Jobs
                    </Heading>
                  </>
                )}

                <>
                  <View style={styles.row}>
                    {loading == false ? (
                      <ActivityIndicator
                        size="large"
                        color={colors.darkBlueHigh}
                      />
                    ) : null}
                  </View>
                  {upComing?.length < 1 ? null : (
                    <>
                      <FlatList
                        data={upComing}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          let shiftID = item?.id,
                            jobID = item?.job?.id,
                            checkFav = true,
                            statusJob = 'upComing',
                            checkIn = true;
                          return (
                            <>
                              <View style={styles.firstRow}>
                                <JobCard
                                  title={item?.job_role?.title}
                                  //navigation={navigation}
                                  onPress={() => {
                                    navigation.navigate('JobDetailsTalent', {
                                      shiftID: shiftID,
                                      statusJob: statusJob,
                                      checkFav: checkFav,
                                      jobID: jobID,
                                      jwt: jwt,
                                    });
                                    dispatch({
                                      type: types?.JOB_DETAILS,
                                      jobDetails: item,
                                    });
                                  }}
                                  jobTitle={'Job Title: ' + item?.job?.title}
                                  statusJob={'upComing'}
                                  jobID={item?.job?.id}
                                  checkFav={true}
                                  image={{
                                    uri:
                                      item?.job?.company?.logo !== ''
                                        ? item?.job?.company?.logo
                                        : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                  }}
                                  //price={'£' + item?.total_pay}
                                  time={
                                    item?.start_time?.substring(
                                      0,
                                      item?.start_time?.length - 3,
                                    ) +
                                    ' - ' +
                                    item?.end_time?.substring(
                                      0,
                                      item?.end_time?.length - 3,
                                    )
                                  }
                                  address={item?.address_data}
                                  date={
                                    item?.start_date.substring(
                                      0,
                                      item?.start_date.length - 5,
                                    ) +
                                    ' - ' +
                                    item?.end_date.substring(
                                      0,
                                      item?.end_date.length - 5,
                                    )
                                  }
                                  jobDetails={true}
                                  checkIn={true}
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                      {nextURLUpComimgJobs !== null ? (
                        <>
                          {loadingUpComing == false ? (
                            <View style={{marginTop: 20}}>
                              <ActivityIndicator
                                size="large"
                                color={colors.darkBlueHigh}
                              />
                            </View>
                          ) : (
                            <TouchableHighlight
                              onPress={() => LoadMoreUpComingData()}
                              style={{
                                flex: 1,
                                width: '25%',
                                borderRadius: 10,
                                backgroundColor: colors.pureWhite,
                                alignItems: 'center',
                                alignContent: 'flex-end',
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 10,
                                marginRight: 10,
                              }}>
                              <View
                                style={{
                                  marginBottom: 10,
                                  marginTop: 10,
                                }}>
                                <Text style={{color: '#3eb561'}}>
                                  Load more
                                </Text>
                              </View>
                            </TouchableHighlight>
                          )}
                        </>
                      ) : null}
                    </>
                  )}
                </>
              </>
            )}
          </>
        ) : (
          <>
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                ListEmptyComponent={listEmptyComponent}
                renderItem={ItemView}
              />
            )}
          </>
        )}
      </ScrollView>

      {/* <Modal transparent animationType="fade" visible={vissibleAccept}>
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
              <Text>Accepting Offer...</Text>
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
              <Text>Declining Offer...</Text>
            </View>
          </View>
        </View>
      </Modal>
    */}
    </Container>
  );
}
