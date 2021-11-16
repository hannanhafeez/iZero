import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Container, ImageHeader, JobCardClientSearchTab} from '../../Components';
import {Calendar as CalendarComponent} from 'react-native-calendars';
import styles from './Styles';
import {ArrowIcon} from '../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import IconCross from 'react-native-vector-icons/Entypo';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';
import Icon from 'react-native-vector-icons/Entypo';
import types from '../../Redux/types';
import Api from '../../api/index';
import moment from 'moment';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

export default function CalendarTalent({navigation}) {
  const [loading, setLoading] = useState(false);

  const [loadingCalender, setLoadingCalender] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const jwt = useSelector((state) => state.auth.accessToken);
  const calendarList = useSelector((state) => state?.app?.calendarList);

  const availibilityShow = useSelector((state) => state?.app?.availibilityShow);

  const availibility = useSelector((state) => state?.app?.availibility);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  let today = new Date();

  let calenderData = [1];

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [calendarAdded, setCalendarAdded] = useState([]);

  const [search, setSearch] = useState('');
  const [filteredDataSource0, setFilteredDataSource0] = useState([]);
  const [masterDataSource0, setMasterDataSource0] = useState([]);

  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);

  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);

  const toDayGetDate = new Date();

  let todayCalenderDate = moment(toDayGetDate).format('YYYY-MM-DD').toString();

  const markedDatesArray2 = {};

  const markedDatesArray3 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  useEffect(() => {
    console.log('CalendarTalent');
    getSearchData();
    //getCalenderAdded();
    setCheckSearch(false);
    
    
    getAvailability();
    getAllDatesInfo();
  
    // setTimeout(function () {
    //   setLoading(false);
    //   setLoadingCalender(false);
    // }, 500);
    
  }, [isFocused]);

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const getAvailability = async () => {
    setLoading(true);
    setLoadingCalender(true);
    try {
      let res = await Api.get(`/unavailable_dates`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get unAvailbility Api Response', res);


      let tempArr = res?.data?.dates;

      for (let i = 0; i < tempArr.length; i++) {
        // let data = {
        //   selected: true,
        //   marked: true,
        //   textColor: colors.pureBlack,
        //   dotColor: colors.red,
        // };
        let data = {
          selected: true,
          marked: true,
          selectedColor: '#ff4d4d',
          textColor: colors.pureBlack,
          color: '#ff4d4d',
          dotColor: '#ff4d4d',
        };
  

        markedDatesArray3[moment(tempArr[i]).format('YYYY-MM-DD')] = data;
      }
      console.log('markedDatesArray3', markedDatesArray3);
      setLoading(false);
      setLoadingCalender(false);
    } catch (error) {
      setLoading(false);
      setLoadingCalender(false);
      console.log({error});
    }
  };

  const getAllDatesInfo = async () => {
    setLoading(true);
    setLoadingCalender(true);
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
      setLoading(false);
      setLoadingCalender(false);
      const finalObject = Object.assign(markedDatesArray3, markedDatesArray2); //Save objecct in redux

      dispatch({
        type: types.AVAILBILITY_CALENDAR_SHOW,
        availibilityShow: finalObject,
      });

      console.log('finalObject', finalObject);
    } catch (error) {
      setLoading(false);
      setLoadingCalender(false);
      console.log({error});
    }
  };

  // const getAllDatesInfo = async () => {
  //   setLoadingCalender(false);
  //   try {
  //     let res = await Api.get('/talent_calenderDates', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Calender All Dates Info Api Response', res);
  //     let tempArr = res?.data?.date;
  //     let v = 1;
  //     for (let i = 0; i < tempArr.length; i++) {
  //       let data = {
  //         marked: true,
  //         dotColor: 'green',
  //       };

  //       markedDatesArray2[moment(tempArr[i]).format('YYYY-MM-DD')] = data;

  //       if (i === tempArr.length - 1) {
  //         setLoadingCalender(true);
  //       }
  //     }
  //     setMarkedDatesArray(markedDatesArray2);

  //     dispatch({
  //       type: types.CALENDAR_LIST,
  //       calendarList: markedDatesArray2,
  //     });
  //   } catch (error) {
  //     setLoadingCalender(true);
  //     console.log({error});
  //   }
  // };

  const getCalenderAdded = async () => {
    setLoading(true);
    setLoadingCalender(true);
    try {
      let res = await Api.get(
        `/client_calender_data?date=${todayCalenderDate}`,
        {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        },
      );
      console.log('Calender Added Jobs Api Response', res);
      setCalendarAdded(res?.data?.data);
      setLoading(false);
      setLoadingCalender(false);
    } catch (error) {
      setLoading(false);
      setLoadingCalender(false);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(true);
    setLoadingCalender(true);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search employer Api Response', res);
      setFilteredDataSource0(res?.data?.jobs);
      setMasterDataSource0(res?.data?.jobs);

      setFilteredDataSource1(res?.data?.talents);
      setMasterDataSource1(res?.data?.talents);

      setFilteredDataSource2(res?.data?.finance);
      setMasterDataSource2(res?.data?.finance);
      setLoading(false);
      setLoadingCalender(false);
    } catch (error) {
      setLoading(false);
      setLoadingCalender(false);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData0 = masterDataSource0.filter(function (item) {
        const itemData0 = item.title
          ? item.title.toUpperCase()
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

  const ItemView0 = ({item}) => {
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
            image={{uri: item?.company?.logo}}
            title={item?.title}
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

  const ItemView2 = ({item}) => {
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
            image={{uri: item?.company?.logo}}
            title={item?.title}
            checkJobStatus={true}
            jobStatus={true}
          />
        </View>
      </>
    );
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
          {filteredDataSource0 !== '' &&
          filteredDataSource1 !== '' &&
          filteredDataSource2 !== ''
            ? 'No Expense Found'
            : ''}
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

  const bookList = (day) => {
    let daywith = day.dateString.trim('');
    navigation.navigate('BookingListTalent', {daywith: daywith});
    // let temp = [];
    // let tempSend = [];
    // Object.entries(availibilityShow).forEach((val) => temp.push(val));
    // //console.log(temp);

    // for (var v = 0; v < temp.length; v++) {
    //   if (temp[v][1]?.dotColor === colors.red && temp[v][0] === daywith) {
    //     // tempSend.push(temp[v][0]);
    //     console.log('hi');
    //   } else if (temp[v][1]?.dotColor !== colors.red && temp[v][0] !== daywith) {
    //     navigation.navigate('BookingListTalent', {daywith: daywith});
    //   }
    // }
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
      //contentContainerStyle={{alignItems: 'center'}}
      >
        {checkSearch == false ? (
          <>
            {loading ? (
              <View style={{marginTop: 30}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                <View
                  style={{
                    width: widthConverter(375),
                    paddingHorizontal: widthConverter(22),
                    paddingTop: heightConverter(18),
                    paddingBottom: heightConverter(25),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                      <ArrowIcon
                        style={{
                          transform: [{rotate: '180deg'}],
                          marginRight: 17,
                        }}password
                        
                      />
                    </TouchableOpacity> */}
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(22, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                      }}>
                      Calendar
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Available')}>
                    <View
                      style={{
                        width: widthConverter(105),
                        height: heightConverter(26),
                        borderRadius: widthConverter(13),
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#3eb561',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      style={{
                        width: widthConverter(135),
                        height: heightConverter(26),
                        borderRadius: widthConverter(13),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(91, 102, 121, 0.09)',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa',
                          fontSize: RFValue(15, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#5b6679',
                        }}>
                        Set Availability
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {loadingCalender ? (
                  <View style={{marginTop: 30}}>
                    <ActivityIndicator
                      size="large"
                      color={colors.darkBlueHigh}
                    />
                  </View>
                ) : (
                  <CalendarComponent
                    style={{
                      width: widthPercentageToDP('100%'),
                      shadowColor: 'rgba(0, 0, 0, 0.07)',
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1,
                      paddingBottom: 20,
                    }}
                    onDayPress={(day) => bookList(day)}
                    markingType={'period'}
                    //markedDates={calendarList}
                    markedDates={availibilityShow}
                    renderArrow={(direction) => (
                      <View
                        style={[
                          styles.arrowCon,
                          direction === 'left'
                            ? {transform: [{rotate: '180deg'}]}
                            : null,
                        ]}>
                        <ArrowIcon />
                      </View>
                    )}
                    theme={{
                      backgroundColor: colors.pureWhite,
                      calendarBackground: colors.pureWhite,
                      textSectionTitleColor: '#b6c1cd',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#00adf5',
                      selectedDayTextColor: colors.pureWhite,
                      //todayTextColor: colors.pureWhite,
                     //todayBackgroundColor: colors.green,
                      dayTextColor: '#2d4150',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#00adf5',
                      selectedDotColor: colors.pureWhite,
                      arrowColor: 'orange',
                      disabledArrowColor: '#d9e1e8',
                      monthTextColor: '#24334c',
                      indicatorColor: 'blue',
                      textDayFontFamily: 'Europa',
                      textMonthFontFamily: 'Europa-Bold',
                      textDayHeaderFontFamily: 'Europa',
                      textDayFontWeight: '300',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      textDayFontSize: 16,
                      textMonthFontSize: RFValue(22, 812),
                      textDayHeaderFontSize: 16,
                    }}
                  />
                )}
                <View>
                  <ScrollView
                    style={
                      {
                        //backgroundColor: colors.red
                      }
                    }>
                    <FlatList
                      data={calendarAdded}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let TimeStart =
                          item?.start_time?.split(' ', 2)[1] +
                          ' - ' +
                          item?.end_time?.split(' ', 2)[1];
                        let finalTimeStart =
                          TimeStart?.split(':', 2)[0] +
                          ':' +
                          TimeStart?.split(':', 2)[1];

                        let TimeEnd =
                          item?.end_time?.split(' ', 2)[1] +
                          ' - ' +
                          item?.end_time?.split(' ', 2)[1];
                        let finalTimeEnd =
                          TimeEnd?.split(':', 2)[0] +
                          ':' +
                          TimeEnd?.split(':', 2)[1];
                        return (
                          <>
                            <View
                              style={{
                                width: widthPercentageToDP('100%'),
                                paddingHorizontal: widthPercentageToDP('5.8%'),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: heightPercentageToDP('4%'),
                                paddingBottom: heightPercentageToDP('4%'),
                              }}>
                              <Text style={styles.time}>
                                {/* 07:00 */}
                                {finalTimeStart}
                              </Text>
                              <View
                                style={{
                                  height: 1,
                                  width: widthPercentageToDP('73%'),
                                  borderStyle: 'solid',
                                  borderBottomWidth: 0.3,
                                  borderColor: colors.darkGreyHigh,
                                }}></View>
                            </View>
                            <View
                              style={{
                                width: widthPercentageToDP('100%'),
                                paddingHorizontal: widthPercentageToDP('5.8%'),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: heightPercentageToDP('8%'),
                                paddingBottom: heightPercentageToDP('4%'),
                              }}>
                              <Text style={styles.time}>{finalTimeEnd}</Text>
                              <View
                                style={{
                                  height: 1,
                                  width: widthPercentageToDP('73%'),
                                  borderStyle: 'solid',
                                  borderBottomWidth: 0.3,
                                  borderColor: colors.darkGreyHigh,
                                }}></View>
                            </View>

                            <View style={styles.row}>
                              <TouchableWithoutFeedback
                              //onPress={() =>navigation.navigate('BookingDetailsCalnderClient')}
                              >
                                <View
                                  style={{
                                    width: widthPercentageToDP('77%'),
                                    height: heightPercentageToDP('12%'),
                                    borderRadius: 5,
                                    backgroundColor: '#3eb561',
                                    marginTop: widthPercentageToDP('12%'),
                                    padding: 15,
                                  }}>
                                  <Text style={styles.title}>
                                    {item?.title}
                                  </Text>
                                  <Text style={styles.cardTime}>
                                    {finalTimeStart + ' - ' + finalTimeEnd}
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            </View>
                          </>
                        );
                      }}
                    />
                  </ScrollView>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            {loading ? (
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
                  //ListEmptyComponent={listEmptyComponent}
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
                  //ListEmptyComponent={listEmptyComponent}
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
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView3}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </Container>
  );
}
