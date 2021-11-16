import React, {useState, useEffect, Component} from 'react';
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
import {
  Container,
  ImageHeader,
  Heading,
  Button,
  JobCardCalender,
} from '../../Components';
import styles from './Styles';
import {ArrowIcon, ChatIcon, PhoneaIcon} from '../../Assets/Icons';
import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import IconCross from 'react-native-vector-icons/Entypo';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';
import Icon from 'react-native-vector-icons/Entypo';
import types from '../../Redux/types';
import Api from '../../api/index';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

export default function BookingAddCalenderClient({navigation, route}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const [loading, setLoading] = useState(true);

  let jobDetailData = route.params;

  let jobTiitle = jobDetailData?.jobData?.job_tilte;

  let startDate = new Date(jobDetailData?.jobData?.start_date);

  let dayStart = startDate?.toString()?.split(' ')[0];
  let dateStart = startDate?.toString()?.split(' ')[2];
  let monthStart = startDate?.toString()?.split(' ')[1];

  var jobDate = dayStart + ' ' + dateStart + ' ' + monthStart;


  let jobLocation = jobDetailData?.jobData?.address_data;

  let jobNotes =
    'Please make sure you are 15 minutes early for check and covid checks';

  let jobDescription = jobDetailData?.jobData?.description;

  let jobStartTime =
    jobDetailData?.jobData?.start_date + ' ' + jobDetailData?.jobData?.end_time;

  let jobEndTime =
    jobDetailData?.jobData?.end_date + ' ' + jobDetailData?.jobData?.end_time;

  let jobID = jobDetailData?.jobData?.job_id;

  const [checkAcive, setCheckAcive] = useState(false);

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  let data = [1, 2];

  useEffect(() => {
    console.log('BookingAddCalenderClient');
  }, [isFocused]);

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    //getSearchData();
  };

  const addToCalender = async () => {
    setLoading(false);
    let data = new FormData();
    data.append('title', jobTiitle);
    data.append('description', jobDescription);
    data.append('start_time', jobStartTime);
    data.append('end_time', jobEndTime);
    data.append('google_event_id', '');
    console.log({data});

    try {
      let res = await Api.post('/addToClientCalender', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Add Calender Api res', res);
      setLoading(true);
      Alert.alert('', 'You have successfully added this job in calender', [
        {
          text: 'OK',
          //onPress: () => navigation.navigate(''),
        },
      ]);
    } catch (error) {
      alert('Something went wrong please try again later');
      setLoading(true);
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
              placeholderTextColor={colors.lightWhite}
              //onChangeText={(text) => searchFilterFunction(text)}
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
              <IconCross name="cross" size={30} color={colors.darkBlue} />
            </TouchableOpacity>
          </>
        ) : (
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
        )}
      </View>

      <View style={styles.row}>
        <View style={styles.innerrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon style={styles.rotate} />
          </TouchableOpacity>
          <Text style={styles.header}>Bookings</Text>
        </View>
        {/* <View style={styles.tag} style={styles.tagOne}>
          <Text style={styles.tagTextOne}>Find Staff</Text>
        </View> */}
      </View>
      <ScrollView>
        <View style={styles.firstRow}>
          {/* <JobCardCalender
            onPress={() => navigation.navigate('JobDetails')}
            image={require('../../Assets/Demo/Logo1.png')}
            title="Brand Ambassador"
            address="11 Hunstable Area, 
              London, NW8 6LJ"
            price="125.00"
            time="12:30 - 16:30"
            checkAcive={checkAcive}
            data={data}
            dueDate={'Wed 25 Jun'}
            inVoiceNo={112}
          /> */}
          <JobCardCalender
            // onPress={() =>
            //   navigation.navigate('JobDetails', {jobID: Number(jobID)})
            // }
            image={require('../../Assets/Demo/Logo1.png')}
            title={jobDetailData?.jobData?.job_tilte}
            address={jobDetailData?.jobData?.location}
            // price="125.00"
            date={jobDate}
            time={
              jobDetailData?.jobData?.start_time?.substring(
                0,
                jobDetailData?.jobData?.start_time?.length - 3,
              ) +
              ' - ' +
              jobDetailData?.jobData?.end_time?.substring(
                0,
                jobDetailData?.jobData?.end_time?.length - 3,
              )
            }
            checkAcive={checkAcive}
            data={data}
            //dueDate={'Wed 25 Jun'}
            //inVoiceNo={112}
          />
        </View>

        {/* <View style={{marginTop: 50, marginLeft: '15%', marginBottom: '4%'}}>
          {checkAcive ? (
            <TouchableOpacity
              style={[
                styles.button,
                {justifyContent: 'center', backgroundColor: '#3eb561'},
              ]}
              // onPress={() => buttonPress()}
            >
              <Text style={{color: colors.pureWhite, fontWeight: 'bold', fontSize: 18}}>
                {'MANAGE SHIFT(S)'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {justifyContent: 'center', backgroundColor: '#3eb561'},
              ]}
             onPress={() => navigation.navigate('Finance')}
            >
              <Text style={{color: colors.pureWhite, fontWeight: 'bold', fontSize: 18}}>
                {'VIEW IN FINANCE'}
              </Text>
            </TouchableOpacity>
          )}
        </View> */}

        {/* <View style={styles.firstRow} /> */}

        <View
          style={[
            styles.content,
            {
              paddingTop: heightConverter(21),

              marginRight: '6%',
              marginLeft: '6%',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>Location</Text>
              <Text style={styles.units}>
                {/* Islamabad, Islamabad Capital Territory */}
                {jobLocation ? jobLocation : 'No location found'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.firstRow} />
        <View
          style={[
            styles.content,
            {
              paddingTop: heightConverter(21),
              marginRight: '6%',
              marginLeft: '6%',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>Notes</Text>
              <Text style={styles.units}>
                {/* Please make sure you are 15 minutes early for check and covid
                checks. */}
                {jobNotes}
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={{marginTop: 50, marginLeft: '15%', marginBottom: '4%'}}>
          <TouchableOpacity
            style={[styles.button, {justifyContent: 'center'}]}
            onPress={() => addToCalender()}>
            <Text style={{color: colors.pureWhite, fontWeight: 'bold'}}>
              {loading == false ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : (
                'Add to Calendar'
              )}
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </Container>
  );
}
