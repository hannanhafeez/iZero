import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Container, ImageHeader, Heading, Button} from '../../Components';
import styles from './Styles';
import {ArrowIcon, ChatIcon, PhoneaIcon} from '../../Assets/Icons';
import {
  widthConverter,
  heightConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import Tabs from './Tabs/Tabs';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';

import IconCross from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import colors from '../../Constants/colors';

export default function BookingAvailability({navigation}) {
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);
  
  const dispatch = useDispatch();

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const calendarList = useSelector((state) => state?.app?.calendarList);

  const toDayGetDate = new Date();

  let todayCalenderDate = moment(toDayGetDate).format('YYYY-MM-DD').toString();
  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  useEffect(() => {
    console.log('BookingAvailability');
    getAllDatesInfo();
  }, []);

  const getAllDatesInfo = async () => {
    try {
      let res = await Api.get('/talent_calenderDates', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calender All Dates Info Api Response', res);
      let tempArr = res?.data?.date;
      let v = 1;
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
      setMarkedDatesArray(markedDatesArray2);

      dispatch({
        type: types.CALENDAR_LIST_AVAILBILITY,
        calendarListAvailbility: markedDatesArray2,
      });
    } catch (error) {
      console.log({error});
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
          {checkSearch == false ? (
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
          ) : null}
        </View>
        {checkSearch ? (
          <>
            <TextInput
              placeholder="Search iZero"
              underlineColorAndroid="transparent"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
                paddingLeft: 20,
                fontSize: 17,
              }}/>
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
              <IconCross name="cross" size={30} color={colors.pureBlack} />
            </TouchableOpacity>
          </>
        ) : (
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
        )}
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.innerrow}>
            <ArrowIcon style={styles.rotate} />
            <Text style={styles.header}>Availability</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarTalent')}>
          <View style={styles.tag} style={styles.tagOne}>
            <Text style={styles.tagTextOne}>View Calendar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Tabs />
    </Container>
  );
}
