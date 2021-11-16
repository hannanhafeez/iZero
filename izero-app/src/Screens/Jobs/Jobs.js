import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  ScrollView,
  TouchableHighlight,
  Modal,
  Platform,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  JobCardSerach,
  Heading,
  Button,
  JobCardTalentSecondTab,
} from '../../Components';
import styles from './Styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {FilterIcon} from '../../Assets/Icons';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import Api from '../../api';
import {useIsFocused} from '@react-navigation/native';

import types from '../../Redux/types';
import {RFValue} from 'react-native-responsive-fontsize';

import IconCross from 'react-native-vector-icons/Entypo';
import {SearchIcon} from '../../Assets/Icons';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function Jobs({navigation, route}) {
  let dataParams = route?.params;

  let selectParams = dataParams?.select;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const [loadingOffered, setLoadingOffered] = useState(true);
  const [loadingLive, setLoadingLive] = useState(true);
  const [loadingUpComing, setLoadingUpComing] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [loadingFavourite, setLoadingFavourite] = useState(true);
  const [loadingApplied, setLoadingApplied] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  const [nextURLOfferedJobs, setNextURLOfferedJobs] = useState('');
  const [nextURLLiveJobs, setNextURLLiveJobs] = useState('');
  const [nextURLUpCommingJobs, setNextURLUpCommingJobs] = useState('');
  const [nextURLCompletedJobs, setNextURLCompletedJobs] = useState('');
  const [nextURLFavouriteJobs, setNextURLFavouriteJobs] = useState('');
  const [nextURLAppliedJobs, setNextURLAppliedJobs] = useState('');

  const [nextURLSearchJobs, setNextURLSearchJobs] = useState('');

  const applied = useSelector((state) => state?.app?.applied);
  const completed = useSelector((state) => state?.app?.completed);
  const favorite = useSelector((state) => state?.app?.favorite);
  const live = useSelector((state) => state?.app?.live);
  const upComing = useSelector((state) => state?.app?.upComing);
  const offered = useSelector((state) => state?.app?.offered);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];
  let year = today?.toString()?.split(' ')[3];
  var currentDate = day + ' ' + date + ' ' + month;

  var currentDate1 = day + ' ' + date + ' ' + month + ' ' + year;

  const [selected, setSelected] = useState(selectParams ? selectParams : 0);
  const [checkSearch, setCheckSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [checkLiveJobs, setCheckLiveJobs] = useState(false);

  const [filteredLiveJobs, setFilteredLiveJobs] = useState([]);

  const [masterLiveJobs, setMasterLiveJobs] = useState([]);

  useEffect(() => {
    console.log('Jobs Staff');
    //getDataJobs();
    getSearchData();

    getLiveJobs();
    getAppliedJobs();
    getOfferedJobs();
    getUpComingsJobs();
    getCompletedJobs();
    getFavouriteJobs();
    setCheckSearch(false);
  }, [isFocused]);

  // const getDataJobs = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get('/jobs', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Jobs Staff Api Response', res);
  //     setLoading(true);
  //     dispatch({
  //       type: types.APPLICANTS,
  //       applicants: res?.data?.data?.applicants,
  //     });

  //     dispatch({
  //       type: types.TALENTS,
  //       talents: res?.data?.data?.talents,
  //     });
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const getLiveJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talentLiveJobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Live Jobs Staff Api Response', res);
      setNextURLLiveJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);
      dispatch({
        type: types.LIVE,
        live: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getAppliedJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talentAppliedJobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Applied Jobs Staff Api Response', res);
      setNextURLAppliedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);
      dispatch({
        type: types.APPLIED,
        applied: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getOfferedJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talentOfferJobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Offered Jobs Staff Api Response', res);
      setNextURLOfferedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);
      dispatch({
        type: types.OFFERED_JOBS,
        offered: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getUpComingsJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/dashboard', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('UpComing Jobs Staff Api Response', res);
      setNextURLUpCommingJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );
      setLoading(true);
      dispatch({
        type: types.UP_COMINGS,
        upComing: res?.data?.appllied?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getCompletedJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talentcompletedjobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Completed Jobs Staff Api Response', res);
      setNextURLCompletedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);
      dispatch({
        type: types.COMPLETED,
        completed: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getFavouriteJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/favoritesjobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Favrouite Jobs Staff Api Response', res);
      setNextURLFavouriteJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);
      dispatch({
        type: types.FAVOURITE,
        favorite: res?.data?.data,
      });
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
          images={item?.data[0].job?.company?.logo}
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
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const acceptFunc = async (item) => {
    //setVissibleAccept(true);
    setLoading(true);
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
      //setVissibleAccept(false);
      Alert.alert('', 'You have accepted offer successfully.', [
        {
          text: 'OK',
          onPress: () => getOfferedJobs(),
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log({error});
      //setVissibleAccept(false);
      setLoading(false);
      alert('Something went wrong please try again latter');
      getOfferedJobs();
    }
  };

  const declinedFunc = async (item) => {
    //setVissibleDeclined(true);
    setLoading(true);
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
      Alert.alert('', 'You have declined offer successfully.', [
        {
          text: 'OK',
          onPress: () => getOfferedJobs(),
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log({error});
      //setVissibleDeclined(false);
      setLoading(false);
      alert('Something went wrong please try again latter');
      getOfferedJobs();
    }
  };

  const talentInformationBook2 = (item, check) => {
    // let id = item?.user_id;
    // navigation.navigate('TalentInformationBook', {
    //   id,
    //   check,
    // });
    // dispatch({
    //   type: types.FIND_TALENTS,
    //   findTalents: item?.user_sector,
    // });
  };

  const LoadMoreLiveData = async () => {
    setLoadingLive(false);
    try {
      let res = await Api.get(`${nextURLLiveJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Live Jobs Api Response', res);
      setNextURLLiveJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;

      let temp = live;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.LIVE,
        live: temp,
      });
      setLoadingLive(true);
    } catch (error) {
      setLoadingLive(true);
      console.log({error});
    }
  };

  const LoadMoreOfferedData = async () => {
    setLoadingOffered(false);
    try {
      let res = await Api.get(`${nextURLOfferedJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Offered Jobs Api Response', res);
      setNextURLOfferedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );

      let nextData = res?.data?.data;

      let temp = offered;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.OFFERED_JOBS,
        offered: temp,
      });
      setLoadingOffered(true);
    } catch (error) {
      setLoadingOffered(true);
      console.log({error});
    }
  };

  const LoadMoreUpcomingData = async () => {
    setLoadingUpComing(false);
    try {
      let res = await Api.get(`${nextURLUpCommingJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next UpComing Jobs Api Response', res);
      setNextURLUpCommingJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );
      let nextData = res?.data?.appllied?.data;

      let temp = upComing;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.UP_COMINGS,
        upComing: temp,
      });
      setLoadingUpComing(true);
    } catch (error) {
      setLoadingUpComing(true);
      console.log({error});
    }
  };

  const LoadMoreCompletedData = async () => {
    setLoadingCompleted(false);
    try {
      let res = await Api.get(`${nextURLCompletedJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Completed Jobs Api Response', res);

      setNextURLCompletedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;

      let temp = completed;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.COMPLETED,
        completed: temp,
      });

      setLoadingCompleted(true);
    } catch (error) {
      setLoadingCompleted(true);
      console.log({error});
    }
  };

  const LoadMoreFavouriteData = async () => {
    setLoadingFavourite(false);
    try {
      let res = await Api.get(`${nextURLFavouriteJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Favourite Jobs Api Response', res);

      setNextURLFavouriteJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;

      let temp = completed;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.COMPLETED,
        completed: temp,
      });

      setLoadingFavourite(true);
    } catch (error) {
      setLoadingFavourite(true);
      console.log({error});
    }
  };

  const LoadMoreAppliedData = async () => {
    setLoadingApplied(false);
    try {
      let res = await Api.get(`${nextURLAppliedJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Applied Jobs Api Response', res);

      setNextURLAppliedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;

      let temp = applied;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.APPLIED,
        applied: temp,
      });

      setLoadingApplied(true);
    } catch (error) {
      setLoadingApplied(true);
      console.log({error});
    }
  };

  const LoadMoreSearchData = async () => {
    setLoadingApplied(false);
    try {
      let res = await Api.get(`${nextURLSearchJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next Applied Jobs Api Response', res);

      setNextURLAppliedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;

      let temp = applied;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      console.log('Next2', temp);
      dispatch({
        type: types.APPLIED,
        applied: temp,
      });

      setLoadingApplied(true);
    } catch (error) {
      setLoadingApplied(true);
      console.log({error});
    }
  };

  const getSearchLiveJobs = async () => {
    setFilteredLiveJobs(live);
    setMasterLiveJobs(live);
  };

  const searchLiveJobsFunc = () => {
    setCheckLiveJobs(!checkLiveJobs);
    getSearchLiveJobs();
  };

  const searchFilterLiveJobsFunction = (text) => {
    if (text) {
      const newData0 = masterLiveJobs.filter(function (item) {
        console.log(item);
        const itemData0 = item?.job_role?.title
          ? item?.job_role?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredLiveJobs(newData0);
      setSearch(text);
    } else {
      setFilteredLiveJobs(masterLiveJobs);
      setSearch(text);
    }
  };

  const ItemViewLiveJobs = ({item, index}) => {
    let shiftID = item?.id,
      jobID = item?.job?.id,
      checkFav = true,
      statusJob = 'live';

    let date = true;
    let dateCheckIn = currentDate1;
    let clockedout;

    item?.apply_shifts?.map((item, key) => {
      if (item?.clockedin === dateCheckIn) {
        return (date = false), (dateCheckIn = item?.clocked_in);
      }
    });

    item?.apply_shifts?.map((item, key) => {
      if (item?.clockedout !== null) {
        return (clockedout = item?.clocked_out);
      }
    });
    return (
      <>
        <View style={styles.firstRow}>
          <JobCard
            navigation={navigation}
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
            statusJob={'live'}
            checkFav={true}
            image={{
              uri:
                item?.job?.company.logo !== ''
                  ? item?.job?.company.logo
                  : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
            }}
            address={item?.address_data}
            title={item?.job_role?.title}
            shiftID={item?.id}
            jobTitle={'Job Title: ' + item?.job?.title}
            // shiftTitle={item?.title}
            price={'Shift Fee: ' + '£' + item?.job_fee}
            time={
              item?.start_time?.substring(0, item?.start_time?.length - 3) +
              ' - ' +
              item?.end_time?.substring(0, item?.end_time?.length - 3)
            }
            date={
              item?.start_date?.substring(0, item?.start_date?.length - 5) +
              ' - ' +
              item?.end_date?.substring(0, item?.end_date?.length - 5)
            }
            jobDetails={true}
            shiftID={shiftID}
            jobID={jobID}
            checkIn={date}
            dateCheckIn={dateCheckIn}
            clockedout={clockedout}
            jwt={jwt}
          />
        </View>
      </>
    );
  };

  const listEmptyComponentLiveJobs = () => {
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
          {filteredLiveJobs !== '' ? 'No live jobs found' : ''}
        </Text>
      </View>
    );
  };

  return (
    <Container safeArea>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightPercentageToDP('9%'),
          borderBottomWidth: 0.3,
          borderBottomColor: '#8e96a3',
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
      {checkSearch == false ? (
        <>
          <View style={{paddingBottom: 10}}>
            <View style={styles.horizontal}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingLeft: widthPercentageToDP('5.8%'),
                }}>
                <Button
                  textStyle={styles.btnText}
                  style={styles.category}
                  onPress={() => {
                    setSelected(0);
                  }}
                  textStyle={[
                    selected === 0
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 0
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Offered Jobs
                </Button>

                <Button
                  textStyle={styles.btnText}
                  style={styles.category}
                  onPress={() => {
                    setSelected(1);
                    setCheckLiveJobs(false);
                  }}
                  textStyle={[
                    selected === 1
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 1
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Live Jobs
                </Button>
                <Button
                  onPress={() => {
                    setSelected(2);
                    setCheckLiveJobs(false);
                  }}
                  textStyle={[
                    selected === 2
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 2
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Upcoming Jobs
                </Button>

                <Button
                  onPress={() => {
                    setSelected(3);
                    setCheckLiveJobs(false);
                  }}
                  textStyle={[
                    selected === 3
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 3
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Completed Jobs
                </Button>

                <Button
                  onPress={() => {
                    setSelected(4);
                    setCheckLiveJobs(false);
                  }}
                  textStyle={[
                    selected === 4
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 4
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Favourite Jobs
                </Button>
                <Button
                  onPress={() => {
                    setSelected(5);
                    setCheckLiveJobs(false);
                  }}
                  textStyle={[
                    selected === 5
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 5
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Applied
                </Button>
              </ScrollView>
            </View>
          </View>
        </>
      ) : null}

      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {checkSearch == false ? (
          <>
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {selected === 0 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Offered Jobs</Text>
                        <Text style={styles.sub}>
                          {offered?.length} Jobs offer
                        </Text>
                      </View>
                    </View>

                    <FlatList
                      data={offered}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let check = false;
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
                                //title={item?.first_name + ' ' + item?.last_name}
                                title={item?.job_shift_title}
                                image={{uri: item?.avatar}}
                                appliedFor={item?.title}
                                price={'Shift Fee: ' + '£' + item?.total_pay}
                                //shiftTitle={item?.title}
                                clientName={
                                  item?.client?.first_name +
                                  ' ' +
                                  item?.client?.last_name
                                }
                                designation={
                                  item?.user_sector.length > 0
                                    ? (
                                        item?.user_sector[index]?.title +
                                        ' ' +
                                        (item?.user_sector?.length - 1)
                                      ).toUpperCase() + '  OTHERS'
                                    : null
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
                                  style={[styles.title, {color: '#44B766'}]}>
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
                                  style={[styles.title, {color: colors.red}]}>
                                  Decline
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLOfferedJobs !== null ? (
                      <>
                        {loadingOffered == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreOfferedData()}
                            underlayColor=""
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
                ) : null}

                {selected === 1 ? (
                  <>
                    {checkLiveJobs ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search live jobs"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) =>
                              searchFilterLiveJobsFunction(text)
                            }
                            style={{
                              fontSize: 17,
                              color: colors.darkGrey,
                              width: widthPercentageToDP('75%'),
                              height: widthPercentageToDP('12%'),
                              paddingLeft: 20,
                              borderWidth: 1,
                              borderRadius: 30,
                              borderColor: 'rgba(0, 0, 0, 0.07)',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchLiveJobsFunc()}
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
                              marginLeft: 20,
                            }}>
                            <IconCross
                              name="cross"
                              size={30}
                              color={colors.darkBlue}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.row}>
                        <View>
                          <Text style={styles.title}>Jobs</Text>
                          <Text style={styles.sub}>
                            {live?.length} Jobs match your job sector
                          </Text>
                        </View>

                        <View style={{marginTop: 20, marginLeft: -20}}>
                          <TouchableOpacity
                            onPress={() => setCheckLiveJobs(!checkLiveJobs)}>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {/* <FlatList
                      data={live}
                      keyExtractor={(item, index) => index.toString()}
                      //onEndReached={()=>alert('hi')}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.job?.id,
                          checkFav = true,
                          statusJob = 'live';

                        let date = true;
                        let dateCheckIn = currentDate1;
                        let clockedout;

                        item?.apply_shifts?.map((item, key) => {
                          if (item?.clockedin === dateCheckIn) {
                            return (
                              (date = false), (dateCheckIn = item?.clocked_in)
                            );
                          }
                        });

                        item?.apply_shifts?.map((item, key) => {
                          if (item?.clockedout !== null) {
                            return (clockedout = item?.clocked_out);
                          }
                        });

                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCard
                                navigation={navigation}
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
                                statusJob={'live'}
                                checkFav={true}
                                image={{
                                  uri:
                                    item?.job?.company.logo !== ''
                                      ? item?.job?.company.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                title={item?.job_role?.title}
                                shiftID={item?.id}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                // shiftTitle={item?.title}
                                price={'Shift Fee: ' + '£' + item?.job_fee}
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
                                shiftID={shiftID}
                                jobID={jobID}
                                checkIn={date}
                                dateCheckIn={dateCheckIn}
                                clockedout={clockedout}
                                jwt={jwt}
                              />
                            </View>
                          </>
                        );
                      }}
                    /> */}

                    {checkLiveJobs ? (
                      <FlatList
                        data={filteredLiveJobs}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentLiveJobs}
                        renderItem={ItemViewLiveJobs}
                      />
                    ) : (
                      <FlatList
                        data={live}
                        keyExtractor={(item, index) => index.toString()}
                        //onEndReached={()=>alert('hi')}
                        renderItem={({item, index}) => {
                          let shiftID = item?.id,
                            jobID = item?.job?.id,
                            checkFav = true,
                            statusJob = 'live';

                          let date = true;
                          let dateCheckIn = currentDate1;
                          let clockedout;

                          item?.apply_shifts?.map((item, key) => {
                            if (item?.clockedin === dateCheckIn) {
                              return (
                                (date = false), (dateCheckIn = item?.clocked_in)
                              );
                            }
                          });

                          item?.apply_shifts?.map((item, key) => {
                            if (item?.clockedout !== null) {
                              return (clockedout = item?.clocked_out);
                            }
                          });

                          return (
                            <>
                              <View style={styles.firstRow}>
                                <JobCard
                                  navigation={navigation}
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
                                  statusJob={'live'}
                                  checkFav={true}
                                  image={{
                                    uri:
                                      item?.job?.company.logo !== ''
                                        ? item?.job?.company.logo
                                        : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                  }}
                                  address={item?.address_data}
                                  title={item?.job_role?.title}
                                  shiftID={item?.id}
                                  jobTitle={'Job Title: ' + item?.job?.title}
                                  // shiftTitle={item?.title}
                                  price={'Shift Fee: ' + '£' + item?.job_fee}
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
                                  shiftID={shiftID}
                                  jobID={jobID}
                                  checkIn={date}
                                  dateCheckIn={dateCheckIn}
                                  clockedout={clockedout}
                                  jwt={jwt}
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                    )}

                    {nextURLLiveJobs !== null && checkLiveJobs !== true ? (
                      <>
                        {loadingLive == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreLiveData()}
                            underlayColor=""
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
                ) : null}

                {selected === 2 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Jobs</Text>
                        <Text style={styles.sub}>
                          {upComing?.length + ' '}
                          Upcoming Jobs
                        </Text>
                      </View>
                    </View>

                    <FlatList
                      data={upComing}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.job?.id,
                          checkFav = true,
                          statusJob = 'upComing';
                        date = true;
                        return (
                          <>
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
                                image={{
                                  uri:
                                    item?.job?.company?.logo !== ''
                                      ? item?.job?.company?.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                statusJob={'upComing'}
                                checkFav={true}
                                address={item?.address_data}
                                title={item?.job_role?.title}
                                shiftID={item?.id}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                // shiftTitle={item?.title}
                                price={'Shift Fee: ' + '£' + item?.total_pay}
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
                                checkIn={date}
                                jobDetails={true}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLUpCommingJobs !== null ? (
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
                            onPress={() => LoadMoreUpcomingData()}
                            underlayColor=""
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
                ) : null}

                {selected === 3 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Jobs</Text>
                        <Text style={styles.sub}>
                          {completed?.length} Completed Jobs
                        </Text>
                      </View>
                    </View>

                    <FlatList
                      data={completed}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.job?.id,
                          checkFav = true,
                          statusJob = 'completed';
                        date = true;
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCard
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
                                statusJob={'completed'}
                                checkFav={true}
                                image={{
                                  uri:
                                    item?.job?.company?.logo !== ''
                                      ? item?.job?.company?.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                title={item?.job_role?.title}
                                shiftID={item?.id}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                // shiftTitle={item?.title}
                                price={'Shift Fee: ' + '£' + item?.job_fee}
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
                                rate="true"
                                rating={item?.rating}
                                jobDetails={true}
                                jobStatus={'Completed'}
                                completedButton={false}
                                checkIn={date}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLCompletedJobs !== null ? (
                      <>
                        {loadingCompleted == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreCompletedData()}
                            underlayColor=""
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
                ) : null}

                {selected === 4 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Jobs</Text>
                        <Text style={styles.sub}>
                          {favorite?.length} Favourite Jobs
                        </Text>
                      </View>
                      {/* <TouchableOpacity
                    onPress={() => navigation.navigate('JobsFilter')}>
                    <FilterIcon />
                  </TouchableOpacity> */}
                    </View>

                    <FlatList
                      data={favorite}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.id,
                          checkFav = true,
                          statusJob = 'favorite',
                          date = true;
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCard
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
                                image={{
                                  uri:
                                    item?.job?.company?.logo !== ''
                                      ? item?.job?.company?.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                title={item?.job_role?.title}
                                shiftID={item?.id}
                                price={'Shift Fee: ' + '£' + item?.total_pay}
                                jobTitle={'Job Title: ' + item?.job?.title}
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
                                jobStatus={'favorite'}
                                completedButton={true}
                                checkIn={date}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLFavouriteJobs !== null ? (
                      <>
                        {loadingFavourite == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreFavouriteData()}
                            underlayColor=""
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
                ) : null}

                {selected === 5 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Applied Jobs</Text>
                        <Text style={styles.sub}>
                          {applied.length} Jobs Applied
                        </Text>
                      </View>
                    </View>

                    <FlatList
                      data={applied}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let shiftID = item?.id,
                          jobID = item?.job?.id,
                          checkFav = true,
                          statusJob = 'applied',
                          date = true;
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCard
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
                                statusJob={'applied'}
                                checkFav={true}
                                image={{
                                  uri:
                                    item?.job?.company?.logo !== ''
                                      ? item?.job?.company?.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                title={item?.job_role?.title}
                                shiftID={item?.job?.id}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                price={'Shift Fee: ' + '£' + item?.job_fee}
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
                                applied={true}
                                jobDetails={true}
                                checkIn={date}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLAppliedJobs !== null ? (
                      <>
                        {loadingApplied == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreAppliedData()}
                            underlayColor=""
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
                ) : null}
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

        <Modal transparent animationType="fade" visible={vissibleAccept}>
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
      </ScrollView>
    </Container>
  );
}
