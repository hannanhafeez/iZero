import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Container, ImageHeader, Button} from '../../Components';
import {Calendar as CalendarComponent} from 'react-native-calendars';
import styles from './Styles';
import {ArrowIcon} from '../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';

import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';

import types from '../../Redux/types';
import Api from '../../api/index';
import colors from '../../Constants/colors';

export default function Available({navigation}) {
  const [loading, setLoading] = useState(false);

  const [loadingUnavailibility, setLoadingUnavailibility] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const availibility = useSelector((state) => state?.app?.availibility);

  let today = new Date();
  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const markedDatesArray2 = {};

  const markedDatesArray3 = {};

  const markedDatesArray4 = {};

  const markedDatesArray5 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  const [selectedDatesForwardArr, setSelectedDatesForwardArr] = useState([]);

  useEffect(() => {
    console.log('Available');
    getAvailability();
    getAllDatesInfo();
  }, [isFocused]);

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
          selectedColor: '#ff4d4d',
          textColor: colors.pureBlack,
          color: '#ff4d4d',
          dotColor: '#ff4d4d',
        };
  

        // let data = {
        //   selected: true,
        //   marked: true,
        //   textColor: colors.pureBlack,
        //   dotColor: colors.red,
        // };

        markedDatesArray3[moment(tempArr[i]).format('YYYY-MM-DD')] = data;
      }
      console.log('markedDatesArray3', markedDatesArray3);
      //
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
          selected: true,
          marked: true,
          selectedColor: '#d5d7dc',
          textColor: colors.pureWhite,
          color: '#d5d7dc',
          dotColor: '#d5d7dc',
        };

        markedDatesArray2[moment(tempArr[i]).format('YYYY-MM-DD')] = data;
      }

      console.log('markedDatesArray2', markedDatesArray2);

      setMarkedDatesArray(markedDatesArray2);
      setLoading(true);

      const finalObject = Object.assign(markedDatesArray3, markedDatesArray2); //Save objecct in redux

      dispatch({
        type: types.AVAILBILITY,
        availibility: finalObject,
      });

      console.log('finalObject', finalObject);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const onPress = (day) => {
    const finalObject1 = Object.assign(availibility);

    if (markedDatesArray?.hasOwnProperty(day)) {
      console.log('match');
    } else if (availibility?.hasOwnProperty(day)) {
      //Remove Object key from Object
      delete finalObject1[day];

      dispatch({
        type: types.AVAILBILITY,
        availibility: finalObject1,
      });

      console.log('finalObject1', finalObject1);

      let tempDate = moment(day).format('YYYY-MM-DD');

      setSelectedDatesForwardArr([...selectedDatesForwardArr, tempDate]);
    } else {
      console.log('not match');

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


      markedDatesArray4[day] = data;

      console.log('markedDatesArray4', markedDatesArray4);

      let tempDate = moment(day).format('YYYY-MM-DD');

      setSelectedDatesForwardArr([...selectedDatesForwardArr, tempDate]);
    }

    const finalObject = Object.assign(markedDatesArray4, availibility); //Save objecct in redux

    dispatch({
      type: types.AVAILBILITY,
      availibility: finalObject,
    });
  };

  const getData = () => {
    getAllDatesInfo();
    getAvailability();
  };

  const saveAvailability = async () => {
    let temp = [];
    let tempSend = [];

    Object.entries(availibility).forEach((val) => temp.push(val));

    for (var v = 0; v < temp.length; v++) {
      if (temp[v][1]?.dotColor === '#ff4d4d') {
        tempSend.push(temp[v][0]);
      }
    }

    let data = new FormData();
    for (var i = 0; i < tempSend.length; i++) {
      data.append('dates[' + i + ']', tempSend[i]);
    }
    console.log({data});

    setLoadingUnavailibility(true);
    try {
      let res = await Api.post('/set_availability', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Set Unavailibility API response', res);

      setLoadingUnavailibility(false);
      Alert.alert('', 'You have successfully updated availibility', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Available')
        },
      ]);
    } catch (error) {
      setLoadingUnavailibility(false);
      alert('Something went wrong please try again later');
      navigation.navigate('Available');
      console.log({error});
    }
  };



  const getListAvailibility = async () => {

  }

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
        </View>

        <TouchableOpacity
          //onPress={() => searchFunc()}
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
      </View>

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ArrowIcon
              style={{
                transform: [{rotate: '180deg'}],
                marginRight: 17,
              }}
            />
            <Text
              style={{
                fontFamily: 'Europa-Bold',
                fontSize: RFValue(22, 812),
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                color: '#24334c',
              }}>
              Availability
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarTalent')}>
          <View style={styles.tag} style={styles.tagOne}>
            <Text style={styles.tagTextOne}>View Calendar</Text>
          </View>
        </TouchableOpacity>
      </View>

      {loading == false ? (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color={colors.darkBlueHigh} />
        </View>
      ) : (
        <>
          <CalendarComponent
            style={{
              width: widthPercentageToDP('100%'),
              marginTop: heightConverter(40),
              shadowColor: 'rgba(0, 0, 0, 0.07)',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowRadius: 20,
              shadowOpacity: 1,
              paddingBottom: 20,
            }}
            onDayPress={(day) => onPress(day?.dateString)}
            markingType={'period'}
            markedDates={availibility}
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
          {/* <View style={styles.row}>
            <View style={styles.innerRow}>
              <View style={styles.oval}></View>
              <Text style={styles.time}>Available</Text>
            </View>
            <View style={styles.innerRow}>
              <View
                style={[
                  styles.oval,
                  {backgroundColor: 'rgba(142, 150, 163, 0.2)'},
                ]}></View>
              <Text style={[styles.time]}>Unavailable</Text>
            </View>
          </View> */}

          <Button
            disabled={loadingUnavailibility ? true : false}
            onPress={() => saveAvailability()}
            style={styles.btn}>
            {loadingUnavailibility ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              'Save Availability'
            )}
          </Button>
        </>
      )}
    </Container>
  );
}
