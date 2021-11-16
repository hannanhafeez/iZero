// import React from 'react';
// import {View, Text, TouchableWithoutFeedback} from 'react-native';
// import {Container, ImageHeader, Button} from '../../../Components';
// import {Calendar as CalendarComponent} from 'react-native-calendars';
// import styles from './Styles';
// import {ArrowIcon} from '../../../Assets/Icons';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {
//   widthPercentageToDP,
//   heightPercentageToDP,
//   heightConverter,
// } from '../../../Helpers/Responsive';
// import {ScrollView} from 'react-native-gesture-handler';

// export default function Unavailable({navigation}) {
//   return (
//     <Container >
//       <CalendarComponent
//         style={{
//           width: widthPercentageToDP('100%'),
//           marginTop: heightConverter(40),
//           shadowColor: 'rgba(0, 0, 0, 0.07)',
//           shadowOffset: {
//             width: 1,
//             height: 1,
//           },
//           shadowRadius: 20,
//           shadowOpacity: 1,
//           paddingBottom: 20,
//         }}
//         markingType={'period'}
//         markedDates={{
//           '2020-08-15': {marked: true, dotColor: '#50cebb'},
//           '2012-08-16': {marked: true, dotColor: '#50cebb'},
//           '2012-08-21': {
//             startingDay: true,
//             color: '#50cebb',
//             textColor: colors.pureWhite,
//           },
//           '2012-08-22': {color: '#70d7c7', textColor:colors.pureWhite},
//           '2012-08-23': {
//             color: '#70d7c7',
//             textColor:colors.pureWhite,
//             marked: true,
//             dotColor: colors.pureWhite,
//           },
//           '2012-08-24': {color: '#70d7c7', textColor:colors.pureWhite},
//           '2012-08-25': {
//             endingDay: true,
//             color: '#50cebb',
//             textColor:colors.pureWhite,
//           },
//         }}
//         renderArrow={(direction) => (
//           <View
//             style={[
//               styles.arrowCon,
//               direction === 'left' ? {transform: [{rotate: '180deg'}]} : null,
//             ]}>
//             <ArrowIcon />
//           </View>
//         )}
//         theme={{
//           backgroundColor: colors.pureWhite,
//           calendarBackground: colors.pureWhite,
//           textSectionTitleColor: '#b6c1cd',
//           textSectionTitleDisabledColor: '#d9e1e8',
//           selectedDayBackgroundColor: '#00adf5',
//           selectedDayTextColor: colors.pureWhite,
//           todayTextColor: '#00adf5',
//           dayTextColor: '#2d4150',
//           textDisabledColor: '#d9e1e8',
//           dotColor: '#00adf5',
//           selectedDotColor: colors.pureWhite,
//           arrowColor: 'orange',
//           disabledArrowColor: '#d9e1e8',
//           monthTextColor: '#24334c',
//           indicatorColor: 'blue',
//           textDayFontFamily: 'Europa',
//           textMonthFontFamily: 'Europa-Bold',
//           textDayHeaderFontFamily: 'Europa',
//           textDayFontWeight: '300',
//           textMonthFontWeight: 'bold',
//           textDayHeaderFontWeight: '300',
//           textDayFontSize: 16,
//           textMonthFontSize: RFValue(22, 812),
//           textDayHeaderFontSize: 16,
//         }}
//       />

//       {/* <View style={styles.row}>
//         <View style={styles.innerRow}>
//           <View style={styles.oval}></View>
//           <Text style={styles.time}>Available</Text>
//         </View>
//         <View style={styles.innerRow}>
//           <View
//             style={[
//               styles.oval,
//               {backgroundColor: 'rgba(142, 150, 163, 0.2)'},
//             ]}></View>
//           <Text style={[styles.time]}>Unavailable</Text>
//         </View>
//       </View> */}

//       <Button style={styles.btn}>Save Availability</Button>
//     </Container>
//   );
// }



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
import {Container, ImageHeader, Button} from '../../../Components';
import {Calendar as CalendarComponent} from 'react-native-calendars';
import styles from './Styles';
import {ArrowIcon} from '../../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../../Helpers/Responsive';

import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';

import types from '../../../Redux/types';
import Api from '../../../api/index';
import colors from '../../../Constants/colors';

export default function Unavailable({navigation}) {
  const [loading, setLoading] = useState(false);

  const [loadingUnavailibility, setLoadingUnavailibility] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const calendarListAvailbility = useSelector((state) => state?.app?.calendarListAvailbility);

  const [loadingCalender, setLoadingCalender] = useState(false);

  const [getAvailabilityCalendar, setGetAvailabilityCalendar] = useState([]);

  const [availabilityCalendar, setAvailabilityCalendar] = useState('');

  const [availabilityCalendarArr, setAvailabilityCalendarArr] = useState([]);

  const toDayGetDate = new Date();

  let todayCalenderDate = moment(toDayGetDate).format('YYYY-MM-DD').toString();

  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  useEffect(() => {
    console.log('Unavailable');
    getAvailability();
    getAllDatesInfo();
  }, [isFocused]);


  const getAvailability = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/client_calender_data?date`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calender Added Jobs Api Response', res);
      setGetAvailabilityCalendar(res?.data?.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getAllDatesInfo = async () => {
    setLoadingCalender(false);
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

        if (i === tempArr.length - 1) {
          setLoadingCalender(true);
        }
      }

      setMarkedDatesArray(markedDatesArray2);

      dispatch({
        type: types.CALENDAR_LIST_AVAILBILITY,
        calendarListAvailbility: markedDatesArray2,
      });
    } catch (error) {
      setLoadingCalender(true);
      console.log({error});
    }
  };

  const calendarPress = (day) => {
    if (markedDatesArray.hasOwnProperty(day)) {
      console.log('match');
    } else {
      console.log('not match');
      
        if (availabilityCalendar.includes(day)) {
        } else {
          setAvailabilityCalendar([...availabilityCalendar, day]);
      }
    }
  };

  const saveAvailability = async () => {
    setLoadingUnavailibility(false);
    let data = new FormData();
    data.append('data', availabilityCalendar);
    console.log({data});

    try {
      let res = await Api.post('/set_availability', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Set Unavailibility API response', res);
      setLoadingUnavailibility(true);
      Alert.alert('', 'You have successfully Updated Unavailibility', [
        {
          text: 'OK',
          onPress: () => getAllDatesInfo(),
        },
      ]);
      setAvailabilityCalendar('');
    } catch (error) {
      setLoadingUnavailibility(true);
      alert('Something went wrong please try again later');
      console.log({error});
    }
  };

  return (
    <Container safeArea>
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
            markingType={'period'}
            markedDates={calendarListAvailbility}
            onDayPress={(day) => calendarPress(day?.dateString)}
            // markedDates={{
            //   '2021-08-15': {marked: true, dotColor: '#50cebb'},
            //   '2021-08-16': {marked: true, dotColor: '#50cebb'},
            //   '2021-08-21': {
            //     startingDay: true,
            //     color: '#50cebb',
            //     textColor:colors.pureWhite,
            //   },
            //   '2021-08-22': {color: '#70d7c7', textColor: colors.pureWhite},
            //   '2021-08-23': {
            //     color: '#70d7c7',
            //     textColor: colors.pureWhite,
            //     marked: true,
            //     dotColor: colors.pureWhite,
            //   },
            //   '2021-08-24': {color: '#70d7c7', textColor: colors.pureWhite},
            //   '2021-08-25': {
            //     endingDay: true,
            //     color: '#50cebb',
            //     textColor: colors.pureWhite,
            //   },
            // }}
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
              todayTextColor: '#00adf5',
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

          <Button onPress={() => saveAvailability()} style={styles.btn}>
            {loadingUnavailibility == false ? (
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
