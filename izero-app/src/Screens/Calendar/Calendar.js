import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, ImageHeader} from '../../Components';
import {Calendar as CalendarComponent} from 'react-native-calendars';
import styles from './Styles';
import {ArrowIcon} from '../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
//import {ScrollView} from 'react-native-gesture-handler';

import {useSelector, useDispatch} from 'react-redux';
import IconCross from 'react-native-vector-icons/Entypo';
import {SearchIcon} from '../../Assets/Icons';

import Api from '../../api';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import colors from '../../Constants/colors';

export default function CalendarTalent({navigation}) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const toDayGetDate = new Date();

  let todayCalenderDate = moment(toDayGetDate).format('YYYY-MM-DD').toString();

  let CalenderDateArr = [
    '2021-07-12',
    '2021-07-13',
    '2021-07-15',
    '2021-07-16',
    '2021-07-17',
  ];

  useEffect(() => {
    console.log('CalendarTalent');
    getSearchData();
    setCheckSearch(false);
  }, [isFocused]);

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/all_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Staff Api Response', res);
      setLoading(true);
      setFilteredDataSource(res?.data?.data);
      setMasterDataSource(res?.data?.data);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    let jobID = item?.id,
      checkFav = true,
      statusJob = 'search';
    return (
      <View style={styles.firstRow}>
        <JobCard
          title={item?.title}
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
          checkFav={true}
          statusJob={'search'}
          jobID={item?.id}
          price={item?.total_pay ? '£' + item?.total_pay : 'No Fee'}
          address={item?.location}
          image={{
            uri:
              item?.logo !== ''
                ? item?.logo
                : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
          }}
          time={
            item?.shifts.length > 1
              ? 'Multiple Shifts'
              : item?.shifts < 1
              ? 'No Shift Time'
              : item?.shifts[0]?.start_time?.substring(
                  0,
                  item?.shifts[0]?.start_time?.length - 3,
                ) +
                ' - ' +
                item?.shifts[0]?.end_time?.substring(
                  0,
                  item?.shifts[0]?.end_time?.length - 3,
                )
          }
          date={
            item?.start_date && item?.end_date
              ? item?.start_date?.substring(0, item?.start_date.length - 5) +
                ' - ' +
                item?.end_date?.substring(0, item?.end_date?.length - 5)
              : 'No Date Found'
          }
          jobDetails={true}
        />
      </View>
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
          No Jobs Found
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
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
              onPress={() => setCheckSearch(false)}
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
            onPress={() => setCheckSearch(true)}
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
        markingType={'custom'}
        onDayPress={() => navigation.navigate('BookingList')}
        markingType={'period'}
        // markedDates={{
        //   '2020-08-15': {marked: true, dotColor: '#50cebb'},
        //   '2012-08-16': {marked: true, dotColor: '#50cebb'},
        //   '2012-08-21': {
        //     startingDay: true,
        //     color: '#50cebb',
        //     textColor: colors.pureWhite,
        //   },
        //   '2012-08-22': {color: '#70d7c7', textColor: colors.pureWhite},
        //   '2012-08-23': {
        //     color: '#70d7c7',
        //     textColor: colors.pureWhite,
        //     marked: true,
        //     dotColor: colors.pureWhite,
        //   },
        //   '2012-08-24': {color: '#70d7c7', textColor: colors.pureWhite},
        //   '2012-08-25': {endingDay: true, color: '#50cebb', textColor: colors.pureWhite},
        // }}

        markedDates={{
          // '2021-05-15': {marked: true, dotColor: '#50cebb'},
          // '2021-05-16': {marked: true, dotColor: '#50cebb'},
          // '2021-05-21': {startingDay: true, color: '#50cebb', textColor:colors.pureWhite},
          // '2021-05-22': {color: '#70d7c7', textColor: colors.pureWhite},
          // '2021-05-23': {color: '#70d7c7', textColor: colors.pureWhite, marked: true, dotColor: colors.pureWhite},
          // '2021-05-24': {color: '#70d7c7', textColor: colors.pureWhite},
          //'2021-07-14': {endingDay: true, startingDay:true,color: '#3eb561', textColor: colors.pureWhite}
          //198,233,208
          //186,223,254
          [todayCalenderDate]: {
            endingDay: true,
            startingDay: true,
            color: '#3eb561',
            textColor: colors.pureWhite,
          },
          [CalenderDateArr[0]]: {
            textColor: colors.pureBlack,
            marked: true,
            dotColor: 'rgba(186,223,254,1)',
          },
          [CalenderDateArr[1]]: {
            textColor: colors.pureBlack,
            marked: true,
            dotColor: 'rgba(186,223,254,1)',
          },
          [CalenderDateArr[2]]: {
            textColor: colors.pureBlack,
            marked: true,
            dotColor: 'rgba(198,233,208,1)',
          },
          [CalenderDateArr[3]]: {
            textColor: colors.pureBlack,
            marked: true,
            dotColor: 'rgba(198,233,208,1)',
          },
          [CalenderDateArr[4]]: {
            textColor: colors.pureBlack,
            marked: true,
            dotColor: 'rgba(198,233,208,1)',
          },
        }}
        renderArrow={(direction) => (
          <View
            style={[
              styles.arrowCon,
              direction === 'left' ? {transform: [{rotate: '180deg'}]} : null,
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

      <View>
        <ScrollView>
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
            <Text style={styles.time}>07:00</Text>
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
              paddingTop: heightPercentageToDP('4%'),
              paddingBottom: heightPercentageToDP('4%'),
            }}>
            <Text style={styles.time}>08:00</Text>
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
          </View>

          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('BookingDetails')}>
              <View
                style={{
                  width: widthPercentageToDP('77%'),
                  height: heightPercentageToDP('12%'),
                  borderRadius: 5,
                  backgroundColor: '#3eb561',
                  marginTop: widthPercentageToDP('12%'),
                  padding: 15,
                }}>
                <Text style={styles.title}>Brand Ambassador Set Up</Text>
                <Text style={styles.cardTime}>07:00 - 08:30</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}
