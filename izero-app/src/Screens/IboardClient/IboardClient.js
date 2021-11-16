import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Modal,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCardClientSecondTab,
  JobCardClientSearchTab,
  JobCardClient,
  Heading,
  Button,
  FinanceCardClient,
  NotificationsCardClient,
} from '../../Components';
import styles from './Styles';
import {ScrollView} from 'react-native-gesture-handler';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import ActiveComponent from '../../Components/Active/index';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import types from '../../Redux/types';
import Api from '../../api/index';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

import IconCross from 'react-native-vector-icons/Entypo';
import {SearchIcon, FilterIcon} from '../../Assets/Icons';

import IconBell from 'react-native-vector-icons/FontAwesome';
import {NotificationsCardClientIboard} from '../../Components/NotificationsCardClientIboard/NotificationsCardClientIboard';

import CheckIcon from 'react-native-vector-icons/AntDesign';
import BlockIcon from 'react-native-vector-icons/Entypo';
import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function IboardClient({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [loadingReview, setLoadingReview] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const [liveTotal, setliveTotal] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);

  const completed = useSelector((state) => state?.app?.completed);
  const live = useSelector((state) => state?.app?.live);
  const liveJobs = useSelector((state) => state?.app?.liveJobs);
  const upComing = useSelector((state) => state?.app?.upComing);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];
  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource0, setFilteredDataSource0] = useState([]);
  const [masterDataSource0, setMasterDataSource0] = useState([]);

  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);

  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);

  const [expenses, setExpenses] = useState([]);

  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  const [nextURLUpComimgJobs, setNextURLUpComimgJobs] = useState('');

  const [loadingUpComing, setLoadingUpComing] = useState(true);

  const [vissibleRating, setVissibleRating] = useState(false);

  const [vissibleNotes, setVissibleNotes] = useState(false);

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [review, setReview] = useState('');

  const [notes, setNotes] = useState('');

  const [statusApproveDeclined, setStatusApproveDeclined] = useState('');

  const [expenseID, setExpenseID] = useState('');

  useEffect(() => {
    console.log('Iboard Employer');
    getIboardJobs();
    //getSearchData();
    setCheckSearch(false);
    getCalendarListData();
    //getDataFinance();
    getJobSectors();
    getShiftFeeRate();
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

  const getShiftFeeRate = async () => {
    let jobFeeData = [];
    try {
      let res = await Api.get('/wages_rate', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Shift Fee Rate Api Response', res);

      for (var i = 0; i < res?.data?.data?.length; i++) {
        jobFeeData[i] = {
          label: res?.data?.data[i]?.title,
          value: parseInt(res?.data?.data[i]?.rate),
        };
      }
      dispatch({
        type: types.JOB_FEES,
        jobFees: jobFeeData,
      });
    } catch (error) {
      console.log({error});
    }
  };

  const getIboardJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/home', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard UpComings Jobs for Employer Api Response', res);
      setLoading(true);

      setliveTotal(res?.data?.no_live_jobs);
      setCompletedTotal(res?.data?.no_completed_jobs);

      setNextURLUpComimgJobs(
        res?.data?.upcomming?.next_page_url !== null
          ? res?.data?.upcomming?.next_page_url
          : null,
      );

      dispatch({
        type: types.UP_COMINGS,
        upComing: res?.data?.upcomming?.data,
      });

      dispatch({
        type: types.NOTIFICATION_TOTAL,
        notificationTotal: res?.data?.count,
      });
      setExpenses(res?.data?.expenses);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getCalendarListData = async () => {
    try {
      let res = await Api.get('/calenderDates', {
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

      setMarkedDatesArray(markedDatesArray2);

      dispatch({
        type: types.CALENDAR_LIST,
        calendarList: markedDatesArray2,
      });
    } catch (error) {
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Employer Api Response', res);

      setFilteredDataSource0(res?.data?.jobs);
      setMasterDataSource0(res?.data?.jobs);

      setFilteredDataSource1(res?.data?.talents);
      setMasterDataSource1(res?.data?.talents);

      setFilteredDataSource2(res?.data?.finance);
      setMasterDataSource2(res?.data?.finance);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData0 = masterDataSource0.filter(function (item) {
        const itemData0 = item?.job_role?.title
          ? item?.job_role?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredDataSource0(newData0);
      setSearch(text);

      const newData1 = masterDataSource1.filter(function (item) {
        const itemData1 =
          item.first_name && item?.user_sector?.title
            ? item.first_name.toUpperCase() +
              ' ' +
              item?.user_sector?.title.toUpperCase()
            : ''.toUpperCase();
        const textData1 = text.toUpperCase();
        return itemData1.indexOf(textData1) > -1;
      });
      setFilteredDataSource1(newData1);
      setSearch(text);

      const newData2 = masterDataSource2.filter(function (item) {
        const itemData2 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData2 = text.toUpperCase();
        return itemData2.indexOf(textData2) > -1;
      });
      setFilteredDataSource2(newData2);
      setSearch(text);
    } else {
      setFilteredDataSource0(masterDataSource0);
      setFilteredDataSource1(masterDataSource1);
      setFilteredDataSource2(masterDataSource2);
      setSearch(text);
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
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );

      let nextUpComing = res?.data?.upcomming?.data;

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

  const ItemView0 = ({item}) => {
    let jobID = item?.job?.id,
      shiftID = item?.id,
      status = 'search';
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => {
              navigation.navigate('JobDetailsClient', {
                jobID: jobID,
                shiftID: shiftID,
                status: status,
              });
              dispatch({
                type: types?.JOB_DETAILS,
                jobDetails: item,
              });
            }}
            image={{uri: item?.job?.company?.logo}}
            title={item?.job_role?.title}
            checkDate={true}
            date={
              item?.start_date && item?.end_date
                ? item?.start_date?.substring(0, item?.start_date.length - 5) +
                  ' - ' +
                  item?.end_date?.substring(0, item?.end_date?.length - 5)
                : 'No Date Found'
            }
          />
        </View>
      </>
    );
  };

  const talentInformationBook2 = (item, check) => {
    let id = item?.user_id;
    navigation.navigate('TalentInformationBook', {
      id,
      check,
    });
    dispatch({
      type: types.FIND_TALENTS,
      findTalents: item?.user_sector,
    });
  };

  const ItemView2 = ({item}) => {
    let check = false;
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => talentInformationBook2(item, check)}
            image={{uri: item?.avatar ? item?.avatar : ''}}
            title={item?.first_name + ' ' + item?.last_name}
            checkProfession={true}
            profession={item?.user_sector?.title}
          />
        </View>
      </>
    );
  };

  const ItemView3 = ({item}) => {
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => navigation.navigate('FinanceDetails')}
            image={{uri: item?.company?.logo}}
            title={item?.title}
            checkJobStatus={true}
            jobStatus={true}
          />
        </View>
      </>
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

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  // const getDataFinance = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get('/client_finance', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Finance Api Response', res);
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
  //       expenses: res?.data?.expneses,
  //     });
  //     dispatch({
  //       type: types.SAVED_QUOTES,
  //       savedQuotes: res?.data?.saved_quotes,
  //     });
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const rateFunc = (item) => {
    // setRateName(item?.first_name + ' ' + item?.last_name);
    //setRateAvatar(item?.avatar);
    //setRateID(item?.id);
    //setRateUserID(item?.user_id);
    setVissibleRating(true);
  };

  const submitReview = async () => {};

  const approveFunc = async (item) => {
    setExpenseID(item?.id);
    setStatusApproveDeclined('approved');
    //setVissibleNotes(true);
  };

  const declineFunc = async (item) => {
    setExpenseID(item?.id);
    setStatusApproveDeclined('declined');
    setVissibleNotes(true);
  };

  const approvedDeclined = async (item) => {
    if (statusApproveDeclined === 'declined') {
      setVissibleNotes(false);
      let data = new FormData();
      data.append('expense_id', expenseID);
      data.append('status', 'declined');
      data.append('note', notes);
      setLoading(false);
      try {
        let res = await Api.post('/accept_reject_expense', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Declined Expense API for employer response', res);
        setLoading(true);
        Alert.alert('', 'You have been successfully Declined expense', [
          {
            text: 'OK',
            onPress: () => getIboardJobs(),
          },
        ]);
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
    } else {
      let data = new FormData();
      data.append('expense_id', item?.id);
      data.append('status', 'approved');
      data.append('note', notes);
      setLoading(false);

      try {
        let res = await Api.post('/accept_reject_expense', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Approve Expense API for employer response', res);
        setLoading(true);
        Alert.alert('', 'You have been successfully Approved expense', [
          {
            text: 'OK',
            onPress: () => getIboardJobs(),
          },
        ]);
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
    }
  };

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
              onPress={() => navigation.navigate('NotificationsClient')}
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
                fontSize: 17,
                color: colors.darkGrey,
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                paddingLeft: 20,
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
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
              onPress={() => navigation.navigate('NotificationsClient')}
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
      //contentContainerStyle={{alignItems: 'center'}}
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
                onPress={() =>
                  navigation.navigate('Jobs')
                  //RootNavigation.navigate('Jobs')
                }
              />
              <Card
                label="COMPLETED JOBS"
                total={completedTotal}
                onPress={() => 
                  //navigation.navigate('Jobs')
                  RootNavigation.navigate('Jobs')
                }
              />
            </View>
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                <View
                  style={{
                    marginBottom: heightPercentageToDP('1%'),
                    marginLeft: 20,
                    marginTop: heightPercentageToDP('3%'),
                    width: widthPercentageToDP('88.4%'),
                  }}>
                  <Text
                    style={{
                      color: colors.darkGreyHigh,
                      fontFamily: 'Europa-Bold',
                      fontSize: RFValue(21, 812),
                    }}>
                    Notifications
                  </Text>
                </View>

                <FlatList
                  data={expenses}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    let id = item?.id,
                      status = item?.expense ? 'expense' : 'newApplicants',
                      approveDeclined;
                    return (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          width: widthPercentageToDP('100%'),
                          paddingHorizontal: widthPercentageToDP('5.8%'),
                          paddingVertical: widthPercentageToDP('3%'),
                          justifyContent: 'space-between',
                          borderBottomColor: colors.darkGreyHigh,
                        }}>
                        <NotificationsCardClientIboard
                          onPress={() => rateFunc()}
                          title={item?.title}
                          navigation={navigation}
                          jobTitle={item?.expense?.title}
                          fee={item?.cost}
                          status={item?.expense ? 'expense' : 'pending'}
                          item={item}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 20,
                            flex: 1,
                            paddingTop: heightPercentageToDP('1%'),
                            paddingBottom: heightPercentageToDP('1%'),
                            alignItems: 'center',
                          }}>
                          {status === 'expense' ? (
                            <>
                              <TouchableHighlight
                                underlayColor=""
                                onPress={
                                  () => approvedDeclined(item) //approveFunc(item)
                                }>
                                <View
                                  style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 35,
                                    backgroundColor: colors.green,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: widthPercentageToDP('3%'),
                                    borderColor: colors.green,
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <CheckIcon
                                    name="check"
                                    size={25}
                                    color={colors.pureWhite}
                                  />
                                </View>
                              </TouchableHighlight>

                              <TouchableHighlight
                                underlayColor=""
                                onPress={() => declineFunc(item)}>
                                <View
                                  style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 35,
                                    backgroundColor: '#E5899E',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: widthPercentageToDP('3%'),
                                    justifyContent: 'center',
                                  }}>
                                  <BlockIcon
                                    name="block"
                                    size={25}
                                    color={colors.pureWhite}
                                  />
                                </View>
                              </TouchableHighlight>

                              <TouchableHighlight
                                underlayColor=""
                                onPress={() => {
                                  // navigation.navigate('ExpenseDetails', {
                                  //   id: item?.id,
                                  // });
                                  RootNavigation.navigate('ExpenseDetails', {id: item?.id})
                                  dispatch({
                                    type: types?.EMPLOYEER_EXPENSE_DETAILS,
                                    employeerExpenseDetails: item,
                                  });
                                }}>
                                <View
                                  style={{
                                    height: heightPercentageToDP('3.2%'),
                                    width: widthPercentageToDP('25%'),
                                    borderRadius: 13,
                                    backgroundColor: colors.pureWhite,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: colors.darkGreyHigh,
                                    borderWidth: 1,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: RFValue(12, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGreyHigh,
                                    }}>
                                    Expense Details
                                  </Text>
                                </View>
                              </TouchableHighlight>
                              {/* </View> */}
                            </>
                          ) : null}
                        </View>
                      </View>
                    );
                  }}
                />

                {/* <Heading
                  containerStyle={[
                    styles.headingCon,
                    {marginBottom: heightPercentageToDP('1%'), marginLeft: 20},
                  ]}
                  style={styles.heading}>
                  Upcoming Jobs
                </Heading> */}
                <View
                  style={{
                    marginBottom: heightPercentageToDP('1%'),
                    marginLeft: 20,
                    marginTop: heightPercentageToDP('3%'),
                    width: widthPercentageToDP('88.4%'),
                  }}>
                  <Text
                    style={{
                      color: colors.darkGreyHigh,
                      fontFamily: 'Europa-Bold',
                      fontSize: RFValue(21, 812),
                    }}>
                    Upcoming Jobs
                  </Text>
                </View>
                {upComing?.length < 1 || upComing == undefined ? (
                  <>
                    <Heading
                      containerStyle={[styles.headingCon, {marginLeft: 20}]}
                      style={[styles.heading, {fontSize: RFValue(17, 812)}]}>
                      You currenty have no jobs listed
                    </Heading>
                    <View
                      style={[
                        styles.firstRow,
                        {
                          paddingHorizontal: widthPercentageToDP('9%'),
                          paddingVertical: widthPercentageToDP('4%'),
                        },
                      ]}>
                      <Button
                        onPress={() => navigation.navigate('CreateJobClient')}
                        textStyle={styles.btnText}
                        style={[
                          styles.button,
                          {marginTop: heightPercentageToDP('0%')},
                        ]}>
                        CREATE A NEW JOB
                      </Button>
                    </View>
                  </>
                ) : null}
                <>
                  <FlatList
                    data={upComing}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      let jobID = item?.job?.id,
                        shiftID = item?.id,
                        status = 'upComing';
                      return (
                        <>
                          {item !== undefined ? (
                            <View style={styles.firstRow}>
                              <JobCardClientSecondTab
                                onPress={() => {
                                  navigation.navigate('JobDetailsClient', {
                                    jobID: jobID,
                                    shiftID: shiftID,
                                    status: status,
                                  });
                                  dispatch({
                                    type: types?.JOB_DETAILS,
                                    jobDetails: item,
                                  });
                                }}
                                navigation={navigation}
                                title={item?.job_role?.title}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                jobID={item?.job?.id}
                                shiftID={shiftID}
                                image={{
                                  uri:
                                    item?.job?.company.logo !== ''
                                      ? item?.job?.company.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                price={'Shift Fee: £' + item?.total_pay}
                                time={
                                  'Shift Time: ' +
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
                                checkData={item?.job_users?.user ? true : false}
                                date={
                                  item?.start_date?.substring(
                                    0,
                                    item?.start_date?.length - 5,
                                  ) +
                                  ' - ' +
                                  item?.end_date?.substring(
                                    0,
                                    item?.end_date?.length - 5,
                                  )
                                }
                                jobDetails={true}
                                live={true}
                                item={item}
                              />
                            </View>
                          ) : null}
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
                            <Text style={{color: '#3eb561'}}>Load more</Text>
                          </View>
                        </TouchableHighlight>
                      )}
                    </>
                  ) : null}
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
              <>
                {filteredDataSource0.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#3EB561',
                      }}>
                      IN JOBS
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredDataSource0}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView0}
                />
                {filteredDataSource1.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#3EB561',
                      }}>
                      STAFF
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredDataSource1}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView2}
                />
                {filteredDataSource2.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#3EB561',
                      }}>
                      FINANCE
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredDataSource2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView3}
                />
              </>
            )}
          </>
        )}

        <Modal transparent animationType="fade" visible={vissibleNotes}>
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
                height:
                  Platform.OS === 'ios'
                    ? heightPercentageToDP('30%')
                    : heightPercentageToDP('35%'),
                width: '90%',
                borderRadius: 20,
              }}>
              <TouchableOpacity
                onPress={() => setVissibleNotes(false)}
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
                  marginTop: 10,
                  marginLeft: 40,
                  marginRight: 40,
                }}>
                <View style={{marginTop: 10, marginBottom: 10}}>
                  <Text style={styles.title}>Add Notes</Text>
                  <TextInput
                    style={{
                      borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                      borderBottomColor:
                        Platform.OS === 'ios' ? '#D0D2D0' : '#D0D2D0',
                      marginTop: Platform.OS === 'ios' ? 15 : 0,
                      color: colors.darkBlue,
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Please type your notes..."
                    placeholderTextColor={colors.darkGrey}
                    onChangeText={(text) => {
                      setNotes(text);
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                  marginBottom: '10%',
                }}>
                <Button
                  onPress={() => approvedDeclined()}
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
                    'SUBMIT'
                  )}
                </Button>
              </View>
            </View>
          </View>
        </Modal>

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
                      //rateAvatar
                      // ? {uri: rateAvatar}
                      //:
                      //require('../../Assets//Demo/Logo1.png')
                      {
                        uri:
                          'https://www.obstechnologia.com/Content/Images/umair.png',
                      }
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
                      {/* {rateName ? rateName : ''} */}
                      {'Umair Naseer'}
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
                              ? require('../../Assets/Images/filledStar.png')
                              : require('../../Assets/Images/unFilledStar.png')
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
                    color: colors.darkGrey,
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
                    color: colors.darkBlue,
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
      </ScrollView>
    </Container>
  );
}
