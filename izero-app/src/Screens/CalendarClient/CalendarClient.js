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

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function CalendarClient({navigation}) {
  const [loading, setLoading] = useState(true);
  const [loadingCalender, setLoadingCalender] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const jwt = useSelector((state) => state?.auth?.accessToken);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  const calendarList = useSelector((state) => state?.app?.calendarList);

  let today = new Date();

  let calenderData = [1];

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [calendarAdded, setCalendarAdded] = useState([]);

  const [search, setSearch] = useState('');

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [masterJobs, setMasterJobs] = useState([]);

  const [filteredTalents, setFilteredTalents] = useState([]);
  const [masterTalents, setMasterTalents] = useState([]);

  const [filteredFinance, setFilteredFinance] = useState([]);
  const [masterFinance, setMasterFinance] = useState([]);

  const toDayGetDate = new Date();

  let todayCalenderDate = moment(toDayGetDate).format('YYYY-MM-DD').toString();

  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  console.log('calendarList', calendarList);

  useEffect(() => {
    console.log('CalenderClient');
    getAllDatesInfo();
    //getSearchData();
    setCheckSearch(false);
    getCalenderAdded();
  }, [isFocused]);

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const getAllDatesInfo = async () => {
    setLoadingCalender(false);
    try {
      let res = await Api.get('/calenderDates', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calender All Dates Info Api Response', res?.data?.date);

      let tempArr = res?.data?.date;

      for (let i = 0; i < tempArr.length; i++) {
        let data = {
          marked: true,
          dotColor: 'green',
        };

        markedDatesArray2[moment(tempArr[i]).format('YYYY-MM-DD')] = data;

        if (i === tempArr.length - 1) {
          console.log('iii', i);
          //setCalenderCheck(true);
          setLoadingCalender(true);
        }
      }
      setMarkedDatesArray(markedDatesArray2);
      dispatch({
        type: types.CALENDAR_LIST,
        calendarList: markedDatesArray2,
      });
    } catch (error) {
      setLoadingCalender(true);
      console.log({error});
    }
  };

  const getCalenderAdded = async () => {
    setLoading(false);
    try {
      let res = await Api.get(
        `/client_calender_data?date=${todayCalenderDate}`,
        {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        },
      );
      console.log('Calender Added Jobs Api Response', res);
      setCalendarAdded(res?.data?.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search employer Api Response', res);
      setFilteredJobs(res?.data?.jobs);
      setMasterJobs(res?.data?.jobs);

      setFilteredTalents(res?.data?.talents);
      setMasterTalents(res?.data?.talents);

      setFilteredFinance(res?.data?.finance);
      setMasterFinance(res?.data?.finance);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData0 = masterJobs.filter(function (item) {
        const itemData0 = item?.job_role?.title
          ? item?.job_role?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredJobs(newData0);
      setSearch(text);

      const newData1 = masterTalents.filter(function (item) {
        const itemData1 =
          item.first_name && item?.user_sector?.title
            ? item.first_name.toUpperCase() +
              ' ' +
              item?.user_sector?.title.toUpperCase()
            : ''.toUpperCase();
        const textData1 = text.toUpperCase();
        return itemData1.indexOf(textData1) > -1;
      });
      setFilteredTalents(newData1);
      setSearch(text);

      const newData2 = masterFinance.filter(function (item) {
        const itemData2 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData2 = text.toUpperCase();
        return itemData2.indexOf(textData2) > -1;
      });
      setFilteredFinance(newData2);
      setSearch(text);
    } else {
      setFilteredJobs(masterJobs);
      setFilteredTalents(masterTalents);
      setFilteredFinance(masterFinance);
      setSearch(text);
    }
  };

  const ItemView0 = ({item}) => {
    let jobID = item?.job?.id,
      shiftID = item?.id;
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
              // navigation.navigate('JobDetailsClient', {
              //   jobID: jobID,
              //   shiftID: shiftID,
              // });

              RootNavigation.navigate('JobDetailsClient', {
                jobID: jobID,
                shiftID: shiftID,
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
          {filteredJobs !== '' &&
          filteredTalents !== '' &&
          filteredFinance !== ''
            ? 'No Expense Found'
            : ''}
        </Text>
      </View>
    );
  };

  const bookList = (day) => {
    let daywith = day.dateString.trim('');
    navigation.navigate('BookingListClient', {daywith: daywith});
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
        showsVerticalScrollIndicator={false}>
        {checkSearch == false ? (
          <>
            {loading == false ? (
              <View style={{marginTop: 30}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {loadingCalender === false ? (
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
                    markedDates={calendarList}
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
                      todayTextColor: colors.pureWhite,
                      todayBackgroundColor: colors.green,
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
                  <ScrollView>
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
                              <Text style={styles.time}>
                                {/* 08:00 */}

                                {finalTimeEnd}
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
                            {/* <View
                              style={{
                                width: widthPercentageToDP('100%'),
                                paddingHorizontal: widthPercentageToDP('5.8%'),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: heightPercentageToDP('4%'),
                              }}>
                              <Text style={styles.time}>09:00</Text>
                              <View
                                style={{
                                  height: 1,
                                  width: widthPercentageToDP('73%'),
                                  borderStyle: 'solid',
                                  borderBottomWidth: 0.3,
                                  borderColor: colors.darkGreyHigh,
                                }}></View>
                            </View> */}

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
                                    {/* Brand Ambassador Set Up */}
                                    {item?.title}
                                  </Text>
                                  <Text style={styles.cardTime}>
                                    {/* 07:00 - 08:30 */}
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
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {filteredJobs.length > 0 ? (
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
                  data={filteredJobs}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView0}
                />
                {filteredTalents.length > 0 ? (
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
                  data={filteredTalents}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView2}
                />
                {filteredFinance.length > 0 ? (
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
                  data={filteredFinance}
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
